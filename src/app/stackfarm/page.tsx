import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stackfarm · Katrin Malfent-Birlem",
  description: "Case study: a cozy one-thumb farming game for iPhone, built with Three.js and Capacitor.",
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

const screens = [
  { src: "/stackfarm/screen-1.jpg", alt: "Farmer carrying a tall stack of corn past the market" },
  { src: "/stackfarm/screen-2.jpg", alt: "Boss fight against the Big Bad Wolf at night" },
  { src: "/stackfarm/screen-3.jpg", alt: "Rolling a giant pumpkin to the weigh-in in Orchard Hills" },
];

export default function StackfarmCaseStudy() {
  return (
    <main className="mx-auto max-w-[720px] px-4 sm:px-8 pb-24 text-[17px] leading-relaxed">
      <header className="py-7 border-b border-line">
        <Link href="/" className="font-semibold no-underline">
          ← Katrin Malfent-Birlem
        </Link>
      </header>

      <div className="flex flex-col gap-6 pt-20 pb-14">
        <Label>CASE STUDY · OCTOBER 2026</Label>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">Stackfarm</h1>
        <p className="text-xl text-body">
          A cozy one-thumb farming game for iPhone: gather your harvest, stack it on your back, build,
          sell, and defend your farm at night.
        </p>
        <p className="font-mono text-[13px] text-muted">In App Store review · on TestFlight</p>
      </div>

      <div className="flex flex-col gap-14">
        <Section title="The game">
          <p>
            You walk your farmer around with one thumb, and everything you pick up stacks on your back.
            Sell it, build with it, or throw it at raiders who come at night. There are five worlds:
            Meadow Farm, Orchard Hills, Frosty Mine, Seaside Harbor and Sky Islands, each with its own
            layout, its own mini-game and its own goal that finishes the world.
          </p>
          <div className="grid grid-cols-3 gap-3 my-4">
            {screens.map((s) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={640}
                height={1388}
                className="h-auto w-full rounded-[14px] border border-line"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-10 py-2">
            <Stat value="5" label="worlds, each with a mini-game" />
            <Stat value="60 fps" label="on iPhone" />
            <Stat value="580" label="commits in the first week" />
          </div>
        </Section>

        <Section title="Who built what">
          <p>
            Stackfarm is a two-person project, built with AI coding agents doing much of the
            implementation. My co-developer built the rendering optimizations, the level editor and the
            marketing site. My part was the game itself: the tutorial, the economy and balancing, raids
            and boss fights, the redesign of four of the five worlds, the world goals, and getting it to
            run at 60 fps on an iPhone.
          </p>
        </Section>

        <Section title="Balancing with a bot instead of a feeling">
          <p>
            An idle game lives or dies by its pacing: too fast and there is nothing left to do, too slow
            and people quit. Instead of guessing, every balance change was checked with a pacing bot
            that plays a world from start to finish and reports the time it took, coins per minute and
            orders per minute. The rule for every redesign: stay within about 10% of the previous pace.
          </p>
          <p>
            The Frosty Mine goal is a good example. The first version finished 15% too fast, so I made
            each depth cost 60% more. That run was too slow, with fewer coins per minute, so the final
            value landed at about 40%. Measure, adjust, measure again: the same loop as an eval, applied
            to game design.
          </p>
        </Section>

        <Section title="60 fps on a phone">
          <p>
            Three.js inside a phone app has a tight budget. To keep it smooth, I added adaptive graphics quality that lowers the resolution when the frame rate drops, a
            frame-rate display for testing, and static batching so unchanged objects are drawn together
            instead of one by one. One catch: in Low Power Mode, iOS caps the frame rate, and the
            adaptive logic read that as a slow phone and lowered quality for no reason. It now
            recognizes a capped frame rate and leaves the quality alone.
          </p>
        </Section>

        <Section title="From browser to App Store">
          <p>
            The game is a plain JavaScript web app built with Vite. Capacitor wraps it into a native iOS
            app and gives it access to haptics, local file saves, sharing and Game Center. Because the
            core is a web app, it also runs in a desktop browser during development.
          </p>
        </Section>

        <Section title="What’s next">
          <ul className="flex flex-col gap-3 list-disc pl-5">
            <li>Launch on the App Store once review is through.</li>
            <li>A playable web version on this site.</li>
            <li>Real play data to check the pacing bot against actual players.</li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
