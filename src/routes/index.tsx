import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Community } from "@/components/wage/community";
import { Hero } from "@/components/wage/hero";
import { Lore } from "@/components/wage/lore";
import { Movie } from "@/components/wage/movie";
import { Navbar } from "@/components/wage/navbar";
import { Why } from "@/components/wage/why";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Lore />
        <Movie />
        <Why />
        <Community />
      </main>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-fg)",
            border: "1px solid color-mix(in oklab, var(--color-accent) 45%, transparent)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          },
        }}
      />
    </>
  );
}
