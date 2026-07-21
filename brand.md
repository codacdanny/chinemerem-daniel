# Brand — Chinemerem Daniel · Portfolio

_Status: active_

Personal portfolio for **Chinemerem Daniel** (aka **codacdanny**), a **product engineer** who
takes ideas from **0 → 1** — shipping real, deployed products across web3/DeFi, fintech,
EdTech and HR-tech. The site is a proof-of-work artifact: it must itself feel like the best
thing in his portfolio. Target bar: **Awwwards Site of the Day**.

## Positioning & voice

- **Headline promise:** "I take products from an idea to something people use."
- **Feel:** cinematic, editorial-tech, confident, alive. A dark gallery with electric energy —
  precise typography, real 3D, motion that reacts to you. Never a template.
- **Tone:** first-person, plain, senior. Short declaratives. "I ship." "Built, deployed, live."
  No buzzword soup, no "passionate about clean code" clichés.

## Palette (dark-first)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#080809` | Page background — near-black, faint cool undertone |
| `--bg-raise` | `#101012` | Raised panels / cards |
| `--bg-elev` | `#17171A` | Popovers / elevated surfaces |
| `--line` | `rgba(240,240,235,0.10)` | Hairline borders / dividers |
| `--line-strong` | `rgba(240,240,235,0.18)` | Strong borders |
| `--fg` | `#F4F4F0` | Primary text (warm off-white) |
| `--muted` | `#8A8D94` | Secondary text |
| `--faint` | `#565963` | Tertiary / captions |
| `--acid` | `#D7FB4A` | **Primary accent** — acid lime. Energy, CTAs, active state, highlights |
| `--acid-deep` | `#A8C71E` | Acid pressed / shadow |
| `--cyan` | `#66E7FF` | Secondary accent — cool glow, links, data |
| `--rose` | `#FF6A5E` | Warm accent — rare emphasis |

Acid lime on near-black is the signature. Use it sparingly and with intent — one accent per
viewport, on the thing that matters most. Cyan is the cool counter-glow.

## Gradients & effects

- **Signature glow:** radial acid-lime + cyan blooms at very low opacity floating on `--bg`.
- **Accent gradient:** `#D7FB4A → #66E7FF` (lime→cyan) for the hero highlight / key wordmark.
- **Grain:** a subtle film-grain overlay across the whole page (very low opacity) — kills the
  "flat CSS gradient" AI-slop look.
- **Hairline grid:** faint 1px grid in section backgrounds.

## Typography

- **Display / headings:** **Space Grotesk** (700). Oversized, tight tracking, kinetic.
- **Editorial accent:** **Instrument Serif** (italic) for a few emphasis words ("build", "ship",
  "product") — the one classy contrast against all the grotesque.
- **Body / UI:** **Inter**.
- **Labels / mono / numbers:** **JetBrains Mono**, uppercase micro-labels with wide tracking,
  tabular numerals for all figures.

## Motion (Awwwards-grade)

- **Smooth scroll:** Lenis inertia scrolling site-wide.
- **Scroll choreography:** GSAP ScrollTrigger — line-by-line text reveals, pinned sections,
  parallax, horizontal project scroll.
- **3D:** React Three Fiber — an interactive hero object that reacts to the cursor, plus 3D
  accents. Real-time, not video.
- **Micro-interactions:** 150ms; transitions 200–400ms; custom cursor with magnetic hover.
- **Reduced motion:** every non-essential animation gated behind `prefers-reduced-motion`, and
  a static fallback for the 3D canvas.

## Reference

This file is the source of truth for color, type, and voice. Full craft rules come from the
`frontend-design-guidelines` skill.
