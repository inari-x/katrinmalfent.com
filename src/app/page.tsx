import type { ReactNode } from "react";

type Project = {
  name: string;
  description: string;
  status: string;
  live: boolean;
  stack: string;
  codeUrl?: string;
  terminal?: string;
};

const projects: Project[] = [
  {
    name: "Release Radar",
    description:
      "A weekly check that reads a project's dependencies, finds new releases, and uses an LLM to flag which changelog entries could break your code. One summary instead of a dozen ignored notifications.",
    status: "in progress · stage 2 of 5 · 8 tests passing",
    live: true,
    stack: "Python · httpx · pytest · GitHub Actions",
    codeUrl: "https://github.com/inari-x/release-radar",
    terminal: `$ python -m release_radar requirements.txt
requests      ==2.28.0   latest 2.34.2
flask         ==2.2.0    latest 3.1.3
fastapi       >=0.100    latest 0.142.2
not-a-package ==1.0      latest None`,
  },
  {
    name: "Agenda Watch",
    description:
      "Makes Sacramento City Council decisions searchable: weekly ingestion of agendas and minutes, structured extraction, and answers that cite the exact source page.",
    status: "planned · starts Nov 16",
    live: false,
    stack: "FastAPI · Postgres + pgvector · Next.js",
  },
];

function StatusDot({ live }: { live: boolean }) {
  if (live) {
    return <span className="inline-block size-2 shrink-0 rounded-full bg-accent" />;
  }
  return <span className="inline-block size-2 shrink-0 rounded-full border border-faint" />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-6 font-mono text-[13px] tracking-wide text-muted">{children}</p>;
}

export default function Home() {
  return (
    <div className="mx-auto max-w-[1040px] px-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-7">
        <a href="#top" className="font-semibold tracking-tight">
          Katrin Malfent
        </a>
        <nav aria-label="Main" className="flex flex-wrap gap-7 text-[15px]">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="https://github.com/inari-x">GitHub ↗</a>
        </nav>
      </header>

      <main>
        <section id="top" className="flex flex-col gap-7 py-24 sm:py-28">
          <p className="font-mono text-[13px] tracking-wide text-muted">SOFTWARE ENGINEER · SACRAMENTO</p>
          <h1 className="max-w-[820px] text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl">
            I build AI automations that run without babysitting.
          </h1>
          <p className="max-w-[600px] text-lg text-body">
            Python, LLMs and the unglamorous parts that make them dependable: tests, error handling, evals.
          </p>
          <p className="flex items-center gap-2.5 font-mono text-[13px] text-body">
            <StatusDot live />
            Currently building{" "}
            <a href="#work" className="underline">
              Release Radar
            </a>
          </p>
        </section>

        <section id="work" className="pb-24">
          <SectionLabel>01 — WORK</SectionLabel>
          {projects.map((project) => (
            <article key={project.name} className="flex flex-wrap gap-12 border-t border-line py-12">
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
                <h2 className="text-3xl font-semibold tracking-tight">{project.name}</h2>
                <p className="text-body">{project.description}</p>
                <p className="flex items-center gap-2 font-mono text-[13px] text-body">
                  <StatusDot live={project.live} />
                  {project.status}
                </p>
                <p className="font-mono text-[13px] text-muted">{project.stack}</p>
                {project.codeUrl && (
                  <a href={project.codeUrl} className="self-start text-[15px] font-medium">
                    Code ↗
                  </a>
                )}
              </div>
              {project.terminal ? (
                <pre className="min-w-0 flex-[1_1_420px] overflow-x-auto rounded-[10px] bg-ink p-6 font-mono text-[13px] leading-[1.9] text-[#e9e6df]">
                  {project.terminal}
                </pre>
              ) : (
                <div className="flex min-h-[200px] min-w-0 flex-[1_1_420px] items-center justify-center rounded-[10px] border border-dashed border-[#cfcac0] font-mono text-[13px] text-faint">
                  Screenshot coming soon
                </div>
              )}
            </article>
          ))}
        </section>

        <section id="about" className="flex flex-wrap gap-12 pb-24">
          <p className="flex-[0_0_160px] font-mono text-[13px] tracking-wide text-muted">02 — ABOUT</p>
          <div className="flex min-w-0 max-w-[640px] flex-[1_1_480px] flex-col gap-4">
            <p>
              I&apos;m a software engineer from Austria, now based in Sacramento. I studied computer science in Berlin.
            </p>
            <p className="text-body">
              For the last three years I worked self-employed across marketing, sales and programming. That taught me to
              start from the problem a client actually has, and to build things people use, not just things that work in a
              demo.
            </p>
            <p className="text-body">
              Now I focus on applied AI: making LLM-powered tools reliable enough to run on a schedule with nobody watching.
              I work mostly in Python.
            </p>
            <p className="text-body">
              <strong className="font-semibold text-ink">How I build with AI.</strong> I write core logic myself,
              test-first, and use AI tools for review and explanations. I don&apos;t merge code I can&apos;t explain.
            </p>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 border-t border-line pb-12 pt-8 text-[15px]">
        <a href="mailto:katrinmalfent@gmail.com">katrinmalfent@gmail.com</a>
        <a href="https://github.com/inari-x">GitHub</a>
      </footer>
    </div>
  );
}