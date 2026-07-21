"use client";

import { capabilities } from "@/lib/projects";
import Reveal from "../ui/Reveal";

export default function Capabilities() {
  return (
    <section className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <span className="label mb-4 block text-acid">Capabilities</span>
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
            A full-stack toolkit, <span className="font-serif-accent text-acid">frontend</span>-first.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={i * 0.05}
              className="bg-bg p-6 md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {cap.title}
                </h3>
                <span className="label tabular text-faint">
                  0{i + 1}
                </span>
              </div>
              <ul className="space-y-2.5">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-muted"
                  >
                    <span className="h-1 w-1 rounded-full bg-acid/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
