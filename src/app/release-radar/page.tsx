import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Release Radar · Katrin Malfent",
  description:
    "Case study: a weekly LLM-powered check of Python dependencies for breaking changes.",
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[13px] text-muted">{children}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-line pt-10">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="flex flex-col gap-4 text-body">{children}</div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-semibold tracking-tight">{value}</span>
      <span className="font-mono text-[13px] text-muted">{label}</span>
    </div>
  );
}

export default function ReleaseRadarCaseStudy() {
  return (
    <main className="mx-auto max-w-[720px] px-4 sm:px-8 pb-24 text-[17px] leading-relaxed">
      <header className="py-7 border-b border-line">
        <Link href="/" className="font-semibold no-underline">
          ← Katrin Malfent
        </Link>
      </header>

      <div className="flex flex-col gap-6 pt-20 pb-14">
        <Label>CASE STUDY · OCTOBER 2026</Label>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">Release Radar</h1>
        <p className="text-xl text-body">
          A weekly check that reads the release notes of your Python dependencies and flags the
          changes that could break your code.
        </p>
        <div className="flex flex-wrap gap-6 font-medium">
          <a href="https://github.com/inari-x/release-radar">Code ↗</a>
          <a href="https://github.com/inari-x/release-radar/releases/tag/v1.0.0">v1.0.0 ↗</a>
        </div>
      </div>

      <div className="flex flex-col gap-14">
        <Section title="The problem">
          <p>
            Keeping dependencies up to date is easy to automate, but knowing whether an update will
            break your code is not. Release notes are long, spread across many versions, and mostly
            about bug fixes, so people stop reading them, and the one line that matters gets missed.
          </p>
        </Section>

        <Section title="What I built">
          <p>
            Release Radar checks a project’s pinned Python dependencies every Monday, reads the
            release notes of every newer version, and uses an LLM to sort each change into breaking,
            deprecation, feature, fix or other. Instead of dozens of notifications, you get one GitHub
            issue with only the changes that could break your code, each with the version it came in.
          </p>
          <p>
            For flask 2.2.0 → 3.1.3, that’s 17 releases reduced to 5 breaking changes and 2
            deprecations.
          </p>
          <figure className="flex flex-col gap-3 my-4">
            <img
              src="/release-radar/weekly-report.png"
              alt="Weekly GitHub issue listing breaking changes and deprecations for requests and flask, each with its version"
              className="w-full h-auto rounded-lg border border-line"
            />
            <figcaption className="font-mono text-[13px] text-muted">
              A real weekly report, posted by GitHub Actions.
            </figcaption>
          </figure>
        </Section>

        <Section title="Three decisions">
          <p>
            <strong className="font-semibold text-ink">Release notes are untrusted input.</strong>{" "}
            Anyone can write anything in a release note, including text that looks like instructions
            to the model. The prompt says the notes are data, not instructions, and the model can only
            answer in a fixed schema: a list of changes, each with one of five categories, validated
            with Pydantic. A note can’t make the model do anything except fill in that schema.
          </p>
          <p>
            <strong className="font-semibold text-ink">
              The weekly issue updates instead of duplicating.
            </strong>{" "}
            Each week’s issue has a predictable title. Before posting, the tool looks for an open issue
            with exactly that title and updates it, or creates one if there is none. I chose listing
            issues over GitHub’s search API, because search is fuzzy and can lag behind newly created
            issues, which would cause the exact duplicates I wanted to avoid. I verified it by running
            the workflow twice in a row: still one issue.
          </p>
          <p>
            <strong className="font-semibold text-ink">The GitHub token only goes to GitHub.</strong>{" "}
            The tool talks to PyPI and GitHub. With one shared HTTP client, the token would be sent to
            PyPI too. So there are two clients, and only the GitHub one carries the token. In the
            scheduled workflow, the token is GitHub’s automatic one, limited to writing issues.
          </p>
        </Section>

        <Section title="Measuring quality">
          <div className="flex flex-wrap gap-10 py-2">
            <Stat value="28" label="hand-labelled releases" />
            <Stat value="100%" label="precision (0 false alarms)" />
            <Stat value="89%" label="recall (8 of 9 found)" />
          </div>
          <p>
            I hand-labelled 28 real releases from flask, httpx, requests and pydantic: does this
            release contain a breaking change? The first run surprised me. The disagreements weren’t
            the model’s fault. My labels counted dropped Python versions and changed behavior as
            breaking, but my prompt’s definition didn’t. I fixed the prompt, not the labels, because
            adjusting labels to match the model would make the eval meaningless.
          </p>
          <p>
            The one remaining miss, requests v2.34.0, contains bug fixes that change existing
            behavior, which is a borderline case even for a human. With 28 examples, this is a sanity
            check, not a benchmark, and the model’s answers vary slightly between runs.
          </p>
        </Section>

        <Section title="What broke in production">
          <p>
            After the first real report, I read it as a user would and found two problems: duplicate
            lines, and no versions. Without versions, a change and its later revert looked like a
            contradiction. I added a function that groups identical changes and lists their versions,
            wrote tests for it, and merged.
          </p>
          <p>
            The next weekly run showed exactly the same report. The new function was tested, but
            nothing called it. My test for the issue checked{" "}
            <code className="font-mono text-[15px]">{'"- Removed escape" in body'}</code>, which
            passes with or without the version. After fixing that, the workflow crashed: the main
            pipeline still produced the old data type. That function had no tests at all, and I had
            interrupted the manual run that would have caught it.
          </p>
          <p>
            The fix that mattered was a test for the pipeline itself, with a fake PyPI, a fake GitHub
            and a fake LLM. It reproduced the production crash locally in two seconds. Two lessons:
            a unit test proves a function works, not that it’s used; and a test that only checks
            whether some text is contained in the output can pass on the wrong output.
          </p>
        </Section>

        <Section title="What’s next">
          <ul className="flex flex-col gap-3 list-disc pl-5">
            <li>
              <strong className="font-semibold text-ink">Keep going when one package fails.</strong>{" "}
              Today one slow AI call stops the whole report; a failed package should be listed as
              “not checked” instead.
            </li>
            <li>
              <strong className="font-semibold text-ink">Only show changes that affect your code.</strong>{" "}
              Search the project for the APIs a breaking change mentions, and put those at the top.
            </li>
            <li>
              <strong className="font-semibold text-ink">Measure the variance.</strong> Run the eval
              several times, and test a stricter prompt that drops vague entries.
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}