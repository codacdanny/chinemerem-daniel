"use client";

const words = [
  "Product engineering",
  "React · Next.js",
  "TypeScript",
  "Solana · Anchor",
  "0 → 1",
  "Motion & 3D",
  "Design systems",
  "AI integration",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line py-6 md:py-8"
    >
      <div className="edge-fade-x flex whitespace-nowrap">
        <div className="marquee-track flex shrink-0 items-center">
          {row.map((w, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-2xl font-semibold tracking-tight text-fg md:text-4xl">
                {w}
              </span>
              <span className="mx-6 text-acid md:mx-10">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-track flex shrink-0 items-center" aria-hidden>
          {row.map((w, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-2xl font-semibold tracking-tight text-fg md:text-4xl">
                {w}
              </span>
              <span className="mx-6 text-acid md:mx-10">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee-track {
          animation: marquee 38s linear infinite;
        }
        @keyframes marquee {
          to {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
