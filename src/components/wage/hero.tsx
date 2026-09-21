import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { copyToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

export function Hero() {
  const [copied, setCopied] = useState(false);

  async function copyContract() {
    const ok = await copyToClipboard(SITE.contract);
    if (ok) {
      setCopied(true);
      toast.success("Copied to Clipboard!");
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      toast.error("Could not copy. Select the address instead.");
    }
  }

  return (
    <section id="top" className="relative overflow-x-clip border-b border-dashed border-accent/70">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-4 lg:py-16">
        <div className="max-w-xl pb-2 lg:pb-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            Anti-grind mandate · Solana
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Clock out.
            <br />
            <span className="text-accent">$WAGE</span> is your{" "}
            <span className="text-green">CFO.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            No bosses. No 2% annual raises. Just pure chart growth.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild variant="yellow" size="lg" className="w-full shrink-0 sm:w-auto">
              <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
                Buy $WAGE
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full shrink-0 sm:w-auto"
              onClick={copyContract}
            >
              <span className="relative size-4">
                <Copy
                  className={cn(
                    "absolute inset-0 size-4 transition-[opacity,transform,filter] duration-200",
                    copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
                  )}
                />
                <Check
                  className={cn(
                    "absolute inset-0 size-4 text-green transition-[opacity,transform,filter] duration-200",
                    copied ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
                  )}
                />
              </span>
              Copy Contract Address
            </Button>
          </div>
          <p className="mt-3 font-mono text-xs text-muted">CA · {SITE.contractLabel}</p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <img
            src="/mascot.png"
            alt="Just another worker — the $WAGE rat, coffee in hand"
            width={1024}
            height={1024}
            className="relative z-10 mx-auto h-auto w-full max-h-[560px] object-contain object-bottom [mask-image:radial-gradient(ellipse_72%_78%_at_50%_52%,#000_58%,transparent_82%)]"
          />
          <span className="stamp absolute right-3 top-6 z-20 px-1.5 py-1 text-[8px] sm:right-6 sm:top-10 sm:text-[9px]">
            Punched
            <br />
            Out 09:00
          </span>
        </div>
      </div>
    </section>
  );
}
