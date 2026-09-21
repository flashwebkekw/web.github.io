import { Lock, Megaphone, TrendingUp } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "Pure Mechanics",
    body: "0% tax. Locked liquidity. Contract renounced. No quietly waiting admin key, no 'team allocation' dressed up as a roadmap.",
  },
  {
    icon: Megaphone,
    title: "Relentless Marketing",
    body: "A community-led meme machine. Daily updates, no agency retainers, no slide deck about brand love. We punch the clock in public.",
  },
  {
    icon: TrendingUp,
    title: "Ultimate Exit Strategy",
    body: "Designed to outperform the savings account and the corporate fluff that comes with it. Your raise is the chart. Your CFO is $WAGE.",
  },
] as const;

export function Why() {
  return (
    <section id="why" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
          03 — The Ask
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-fg sm:text-4xl">
          Why $WAGE?
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Three reasons the cubicle does not get a vote.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="overflow-hidden rounded-lg border border-line bg-surface"
            >
              <div className="h-1 bg-accent" />
              <div className="p-6">
                <span className="flex size-10 items-center justify-center rounded-sm bg-accent text-accent-fg">
                  <feature.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-fg">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
