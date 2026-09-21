import { Wallet, Coins, ArrowLeftRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DiscordIcon, TelegramIcon, XIcon } from "@/components/wage/icons";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { href: SITE.telegram, label: "Telegram", hint: "t.me/wagetokensol", Icon: TelegramIcon },
  { href: SITE.discord, label: "Discord", hint: "Early pension desk", Icon: DiscordIcon },
  { href: SITE.twitter, label: "X", hint: "@wagetokensol", Icon: XIcon },
] as const;

const STEPS = [
  {
    n: "01",
    icon: Wallet,
    title: "Get Wallet",
    body: "Install Phantom or Solflare. Write the seed down like it is your last paycheck — because it might be.",
  },
  {
    n: "02",
    icon: Coins,
    title: "Buy SOL",
    body: "On-ramp or CEX, then send SOL to your wallet. Gas is cheap. Excuses are not.",
  },
  {
    n: "03",
    icon: ArrowLeftRight,
    title: "Swap for $WAGE",
    body: "When CA drops, paste it into Pumpfun or Axiom. Slippage honest. Chart loud.",
  },
] as const;

const FAQS = [
  {
    q: "What is $WAGE?",
    a: "The anti-grind token on Solana. No bosses, no annual reviews, no pizza-party raises. $WAGE is your CFO — a meme with a mandate to clock out for good.",
  },
  {
    q: "How do I buy?",
    a: "Get a Solana wallet, fund it with SOL, and swap for $WAGE the second the contract drops. Telegram and X will carry the CA. Do not buy lookalikes.",
  },
  {
    q: "Is there a tax?",
    a: "0%. In and out. We do not take a cut of your clock-out.",
  },
  {
    q: "Is liquidity locked? Is the contract renounced?",
    a: "Yes and yes. Locked liquidity, contract renounced. No quiet unlocks. No admin key hanging around after hours.",
  },
  {
    q: "When does the CA drop?",
    a: "Follow @wagetokensol, join Telegram, and sit in Discord. When we punch the clock, you will know in the same minute.",
  },
  {
    q: "Is this financial advice?",
    a: "No. $WAGE is a meme with a mandate. Do your own research. Don't bet rent. Charts go both ways, unlike your old manager's empathy.",
  },
] as const;

export function Community() {
  return (
    <section id="community" className="scroll-mt-28">
      <div className="bg-accent text-accent-fg">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent-fg/70">
            04 — The Desk
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Clock out for the last time.
          </h2>
          <p className="mt-4 max-w-xl text-base text-accent-fg/80">
            The cubicle will not text you back. The chart might. Pick a door.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-14 items-center gap-3 rounded-md bg-accent-fg px-4 py-3 text-accent transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.96]"
              >
                <social.Icon className="size-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-display text-sm font-bold uppercase tracking-wide">
                    {social.label}
                  </span>
                  <span className="block truncate text-xs text-accent/70">{social.hint}</span>
                </span>
              </a>
            ))}
          </div>

          <h3 className="mt-14 font-display text-xl font-bold uppercase tracking-tight">
            How to buy
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.n} className="rounded-md bg-accent-fg p-5 text-fg">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-sm bg-accent text-accent-fg">
                    <step.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-xs font-bold tracking-[0.18em] text-muted">
                    {step.n}
                  </span>
                </div>
                <h4 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-accent">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-14 font-display text-xl font-bold uppercase tracking-tight">FAQ</h3>
          <div className="mt-5 rounded-md bg-accent-fg/10 px-5">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <footer className="border-t border-line bg-bg">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-display font-bold uppercase tracking-wide text-fg">
            © {new Date().getFullYear()} $WAGE · Punch out.
          </p>
          <p className="max-w-md text-xs leading-relaxed">
            Not financial advice. Meme token. Do your own research. Don't quit your job until the
            chart actually covers rent.
          </p>
        </div>
      </footer>
    </section>
  );
}
