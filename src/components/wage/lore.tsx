import { Briefcase, Landmark, Unlock } from "lucide-react";

const CARDS = [
  {
    n: "01",
    icon: Briefcase,
    title: "The Trap",
    body: "Forty hours a week sold to a number inflation eats before Friday. PTO requests sit in a manager's inbox like a hostage. The 9-to-5 is a subscription you never agreed to.",
  },
  {
    n: "02",
    icon: Landmark,
    title: "The Realization",
    body: "Corporate loyalty pays in peanuts and a pizza party. The people who 'believe in the mission' still can't cover a blown tire. Raises are a rounding error.",
  },
  {
    n: "03",
    icon: Unlock,
    title: "The Takeover",
    body: "$WAGE becomes your primary financial mandate. You are the CFO now. The chart does not ask for a 1:1. Clock out once — and mean it.",
  },
] as const;

export function Lore() {
  return (
    <section id="lore" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-green">
          01 — Narrative
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-fg sm:text-4xl">
          The Anti-Grind Philosophy
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Three punches on the card. Then you walk.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.n}
              className="group rounded-lg border border-green/70 bg-surface p-6 transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:border-green hover:shadow-[0_0_28px_color-mix(in_oklab,var(--color-green)_22%,transparent)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-sm border border-green/40 bg-bg text-green">
                  <card.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-xs font-bold tracking-[0.18em] text-muted">
                  {card.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-fg">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
