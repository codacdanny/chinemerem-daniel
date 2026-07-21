"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { projects } from "@/lib/projects";
import Reveal from "../ui/Reveal";

const WorkGem = dynamic(() => import("../three/WorkGem"), { ssr: false });

export default function Work() {
  const colorRef = useRef<string>(projects[0].accent);
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
            colorRef.current = projects[idx].accent;
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <Reveal className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label mb-4 block text-acid">Selected work</span>
            <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
              Things I&apos;ve <span className="font-serif-accent text-acid">built</span>
              <br />
              from zero.
            </h2>
          </div>
          <p className="max-w-sm text-muted md:text-right">
            A mix of shipped client work and products I built end to end —
            protocol, backend, and interface.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* project list */}
          <ol className="order-2 lg:order-1">
            {projects.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-idx={i}
                className="group border-t border-line py-10 transition-opacity duration-500 last:border-b md:py-14"
                style={{ opacity: active === i ? 1 : 0.55 }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="label tabular text-faint">{p.index}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <h3
                        className="font-display text-3xl font-bold tracking-tight transition-colors md:text-5xl"
                        style={{ color: active === i ? p.accent : undefined }}
                      >
                        {p.name}
                      </h3>
                      <span className="label !text-[0.62rem]">{p.year}</span>
                    </div>
                    <p className="mt-1 font-serif-accent text-lg text-muted md:text-xl">
                      {p.tagline}
                    </p>
                  </div>
                </div>

                {/* details expand */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr] data-[open=true]:grid-rows-[1fr]" data-open={active === i}>
                  <div className="overflow-hidden">
                    <div className="pt-6">
                      <div className="mb-5 flex flex-wrap gap-x-6 gap-y-1">
                        <span className="label !text-[0.62rem]">{p.domain}</span>
                        <span className="label !text-[0.62rem] !text-faint">
                          {p.role}
                        </span>
                        <span
                          className="label !text-[0.62rem]"
                          style={{ color: p.accent }}
                        >
                          ● {p.status}
                        </span>
                      </div>
                      <p className="max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
                        {p.summary}
                      </p>

                      <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
                        {p.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2.5 text-sm text-muted"
                          >
                            <span
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                              style={{ background: p.accent }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {p.links && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="Open"
                              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg"
                            >
                              <span
                                className="underline-offset-4 group-hover/link:underline"
                                style={{ textDecorationColor: p.accent }}
                              >
                                {l.label}
                              </span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ color: p.accent }} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                                <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* sticky 3D gem */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-bg-raise">
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
                <WorkGem colorRef={colorRef} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="label !text-[0.62rem]">
                    {projects[active].index} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-[0.62rem] uppercase tracking-[0.2em]"
                    style={{ color: projects[active].accent }}
                  >
                    {projects[active].name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
