import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type Point = { t: number; p: number };

function buildSeries(last: number): Point[] {
  const start = last / 1.4;
  const n = 28;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const ease = t * t;
    const noise = Math.sin(i * 1.7) * 0.00005 + Math.sin(i * 0.6) * 0.00003;
    const p = i === n - 1 ? last : start + (last - start) * ease + noise;
    return { t: i, p };
  });
}

export function Sparkline({ price }: { price: number }) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => buildSeries(price), [price]);

  if (!mounted) {
    return <div className="h-20 w-full rounded-sm bg-green/10" aria-hidden="true" />;
  }

  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="wageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-green)" stopOpacity={0.38} />
              <stop offset="100%" stopColor="var(--color-green)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Area
            type="monotone"
            dataKey="p"
            stroke="var(--color-green)"
            strokeWidth={2.25}
            fill="url(#wageFill)"
            isAnimationActive={!reduceMotion}
            animationDuration={700}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LivePrice({ price }: { price: number }) {
  return (
    <p className="font-display text-4xl font-bold tracking-tight text-fg tabular-nums sm:text-5xl">
      ${price.toFixed(4)}
    </p>
  );
}
