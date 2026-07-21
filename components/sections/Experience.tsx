"use client";

import { experience } from "@/lib/experience";
import Reveal from "../ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label mb-4 block text-acid">Experience</span>
            <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
              Where I&apos;ve <span className="font-serif-accent text-acid">shipped</span>.
            </h2>
          </div>
          <p className="max-w-sm text-muted md:text-right">
            {experience[experience.length - 1].period.split("—")[0].trim()} to
            now — remote teams across New York, Toronto and Lagos.
          </p>
        </Reveal>

        <div className="relative">
          {/* vertical rail */}
          <div className="absolute left-0 top-2 hidden h-full w-px bg-line md:block" />

          <div className="space-y-3 md:space-y-0">
            {experience.map((role) => (
              <Reveal
                key={role.company + role.period}
                y={24}
                className="group relative grid gap-4 border-t border-line py-8 md:grid-cols-[0.9fr_1.6fr] md:gap-10 md:py-12 md:pl-10"
              >
                {/* node */}
                <span className="absolute left-0 top-[3.1rem] hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-line-strong bg-bg transition-colors group-hover:border-acid group-hover:bg-acid md:block" />

                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-fg md:text-2xl">
                      {role.company}
                    </h3>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/40 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-acid">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{role.title}</p>
                  <p className="mt-1 label !text-[0.6rem] !text-faint">
                    {role.location}
                  </p>
                  <p className="mt-1 label !text-[0.6rem]">{role.period}</p>
                </div>

                <div>
                  <ul className="space-y-2.5">
                    {role.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-acid/60" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.62rem] text-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
