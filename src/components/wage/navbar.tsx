import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200",
        scrolled || open
          ? "border-line/80 bg-bg/92 backdrop-blur-md"
          : "border-transparent bg-bg/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="wage-badge px-2.5 py-1 text-lg" aria-label="$WAGE home">
          $WAGE
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold uppercase tracking-wide text-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="green" size="sm">
            <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
              <span className="sm:hidden">Buy</span>
              <span className="hidden sm:inline">Buy $WAGE</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative size-5">
              <Menu
                className={cn(
                  "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200",
                  open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200",
                  open ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
                )}
              />
            </span>
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-line/80 transition-[max-height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center font-display text-base font-semibold uppercase tracking-wide text-fg"
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="green" className="mt-2 w-full">
            <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
              Buy $WAGE
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
