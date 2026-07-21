"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/projects";

/** Counts up numeric portions of a stat value when it scrolls into view. */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const end = Number(match[1]);
    const suffix = match[2];
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(end * eased) + suffix);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular">
      {display}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group bg-bg p-6 transition-colors hover:bg-bg-raise md:p-8"
          >
            <div className="font-display text-5xl font-bold tracking-tight text-fg md:text-6xl">
              <span className="transition-colors group-hover:text-acid">
                <StatValue value={s.value} />
              </span>
            </div>
            <p className="mt-3 text-sm leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
