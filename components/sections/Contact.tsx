"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "GitHub", href: site.links.github, handle: "codacdanny" },
  { label: "LinkedIn", href: site.links.linkedin, handle: "daniel-chinemerem" },
  { label: "X / Twitter", href: site.links.x, handle: "@codacdanny" },
  { label: "Résumé", href: site.links.resume, handle: "Download PDF" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-word > span", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact-word", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-5 pt-24 pb-10 md:px-10 md:pt-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,251,74,0.08),transparent_62%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px]">
        <span className="label mb-8 block text-acid">Let&apos;s work together</span>

        <h2 className="font-display text-[15vw] font-bold leading-[0.85] tracking-[-0.03em] text-fg md:text-[11vw]">
          <span className="contact-word block overflow-hidden">
            <span className="block">Have an idea?</span>
          </span>
          <span className="contact-word block overflow-hidden">
            <span className="block">
              Let&apos;s <span className="acid-gradient font-serif-accent italic">build</span> it.
            </span>
          </span>
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {/* the form */}
          <div>
            <p className="label mb-5">Send me a message</p>
            <ContactForm />
          </div>

          {/* right rail: availability, direct email, socials */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                {site.availability}. Based in {site.location}, working with remote
                teams worldwide — I usually reply within a day.
              </p>

              <div className="mt-8">
                <p className="label mb-2">Prefer email?</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="Email"
                    className="min-w-0 break-all font-mono text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-acid"
                  >
                    {site.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-wider text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open"
                    className="group flex items-center justify-between gap-3 bg-bg p-4 transition-colors hover:bg-bg-raise"
                  >
                    <span className="shrink-0 text-sm font-medium text-fg">
                      {s.label}
                    </span>
                    <span className="flex min-w-0 items-center gap-2 font-mono text-[0.66rem] text-faint transition-colors group-hover:text-acid">
                      <span className="truncate">{s.handle}</span>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center md:flex-row md:text-left">
          <p className="label !text-[0.62rem]">
            © {year} {site.name}. Built from scratch — Next.js · R3F · GSAP.
          </p>
          <p className="label !text-[0.62rem] !text-faint">
            Designed &amp; engineered by {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
