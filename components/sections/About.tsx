"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "../ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <span className="label mb-4 block text-acid">About</span>
            <div className="sticky top-28">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-bg-raise">
                <Image
                  src="/daniel-portrait.jpeg"
                  alt="Chinemerem Daniel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                {/* acid tint wash + bottom scrim for label legibility */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,9,0.85),rgba(8,8,9,0)_45%)]" />
                <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[radial-gradient(circle_at_70%_15%,rgba(215,251,74,0.25),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="label !text-[0.6rem]">{site.location}</span>
                  <span className="label !text-[0.6rem] text-acid">
                    @{site.handle}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal y={30} stagger={0.12}>
              <h2 className="mb-10 font-display text-3xl font-bold leading-[1.05] tracking-tight text-fg md:text-5xl md:leading-[1.05]">
                I&apos;m Chinemerem — a senior frontend engineer who likes the
                messy, exciting <span className="font-serif-accent text-acid">start</span> of things.
              </h2>
              {site.bio.map((para) => (
                <p
                  key={para.slice(0, 20)}
                  className="mb-6 max-w-2xl text-lg leading-relaxed text-muted"
                >
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
              {[
                { k: "Role", v: site.role },
                { k: "Experience", v: `${site.yearsExperience} years` },
                { k: "Based in", v: site.location },
                { k: "Status", v: "Available" },
              ].map((d) => (
                <div key={d.k}>
                  <p className="label !text-[0.6rem] mb-2">{d.k}</p>
                  <p className="text-sm font-medium text-fg">{d.v}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
