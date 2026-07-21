"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import Magnetic from "../ui/Magnetic";

const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

function scrollTo(href: string) {
  const el = document.querySelector(href);
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element) => void } }).__lenis;
  if (el && lenis) lenis.scrollTo(el);
  else el?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mountScene, setMountScene] = useState(false);

  // defer the WebGL canvas one tick so first paint (text) is instant
  useEffect(() => {
    const id = requestAnimationFrame(() => setMountScene(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 1.05, ease: "power4.out", stagger: 0.09 },
          "-=0.4",
        )
        .from(
          ".hero-sub",
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.5",
        )
        .from(".hero-meta", { opacity: 0, duration: 0.9 }, "-=0.4");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-24 pb-14 md:px-10"
    >
      {/* 3D canvas */}
      <div className="absolute inset-0 -z-10">
        {mountScene && <HeroScene />}
        {/* radial glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,251,74,0.10),transparent_60%)] blur-2xl" />
        <div className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-[36vw] w-[36vw] rounded-full bg-[radial-gradient(circle,rgba(102,231,255,0.08),transparent_60%)] blur-2xl" />
        {/* legibility scrim */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,9,0.35),rgba(8,8,9,0)_30%,rgba(8,8,9,0.75))]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <div className="hero-eyebrow mb-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          <span className="label !text-fg">{site.availability}</span>
        </div>

        <h1 className="font-display text-[13.5vw] font-bold leading-[0.9] tracking-[-0.03em] text-fg md:text-[10.5vw] lg:text-[9vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Chinemerem</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">
              Daniel<span className="text-acid">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="hero-sub max-w-xl text-balance text-lg leading-relaxed text-muted md:col-span-7 md:text-xl">
            Senior frontend engineer &amp; product builder. I take ideas from{" "}
            <span className="font-serif-accent text-fg">an empty repo</span> to
            products people actually use — across{" "}
            <span className="text-fg">web3</span>,{" "}
            <span className="text-fg">fintech</span>,{" "}
            <span className="text-fg">edtech</span> and{" "}
            <span className="text-fg">HR-tech</span>.
          </p>

          <div className="hero-cta-wrap flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <Magnetic strength={0.4}>
              <button
                onClick={() => scrollTo("#work")}
                data-cursor="View"
                className="hero-cta group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-acid px-6 text-sm font-semibold text-bg transition-transform"
              >
                See selected work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-y-0.5">
                  <path d="M8 2v12M8 14l4-4M8 14l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={() => scrollTo("#contact")}
                data-cursor=""
                className="hero-cta inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:border-fg"
              >
                Get in touch
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* bottom meta bar */}
      <div className="hero-meta mx-auto mt-14 flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <span className="label">Based in {site.location}</span>
        <span className="label hidden sm:block">
          {site.yearsExperience} years · React · Next.js · Solana
        </span>
        <span className="label flex items-center gap-2">
          Scroll
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden className="animate-bounce">
            <path d="M6 1v14M6 15l4-4M6 15l-4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </section>
  );
}
