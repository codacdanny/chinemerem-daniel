"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Magnetic from "./ui/Magnetic";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } })
    .__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <button
          onClick={() => scrollTo("#top")}
          className="font-display text-sm font-bold tracking-tight text-fg"
          aria-label="Back to top"
        >
          CD
          <span className="text-acid">.</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              data-cursor=""
              className="label !text-[0.68rem] rounded-full px-4 py-2 text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </button>
          ))}
        </div>

        <Magnetic strength={0.5}>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Résumé"
            className="group relative inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-fg transition-colors hover:border-acid hover:text-acid"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acid" />
            Résumé
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
