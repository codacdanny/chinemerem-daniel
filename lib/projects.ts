export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  domain: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  /** accent color used for the 3D accent + hover glow */
  accent: string;
};

export const projects: Project[] = [
  {
    id: "tradebet",
    index: "01",
    name: "TRADEBET",
    tagline: "Trade the match, live.",
    domain: "Web3 · DeFi · Prediction Markets",
    year: "2025",
    role: "Solo — protocol, oracle & app",
    status: "Live on Solana devnet",
    summary:
      "A perpetual prediction market for football win-probability. Every outcome — “France to win” — is a price that moves tick-by-tick during the match. Go long or short, and cash out any second for PnL. A perpetual future on a football match.",
    highlights: [
      "Anchor program (Rust) written, tested and deployed to Solana devnet",
      "TxODDS TxLINE integration: on-chain subscribe → JWT → live World Cup fixtures & scores",
      "TypeScript keeper derives live win-probability and pushes it on-chain via an oracle",
      "Peer-to-pool USDC vault (Gains/GMX model); Merkle-proof trustless settlement",
    ],
    stack: [
      "Rust",
      "Anchor",
      "Solana",
      "Next.js 16",
      "React 19",
      "three.js",
      "TypeScript",
      "Tailwind v4",
    ],
    links: [
      { label: "Live app", href: "https://the-tradebet-beta.vercel.app" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/14AvNvhb5R1oOIBbWa6fe-kxBK25CZHy1/view",
      },
    ],
    accent: "#39ff88",
  },
  {
    id: "parallel",
    index: "02",
    name: "Parallel",
    tagline: "Job search & hiring, matched.",
    domain: "HR-tech · Marketplace · SaaS",
    year: "2025 →",
    role: "Senior Frontend Engineer",
    status: "Production · leading recruiter UX",
    summary:
      "A modern applicant-tracking and talent-sourcing platform. I lead the core recruiter experience — I architected and shipped “HireOS,” the recruiter workspace, from the ground up, and built the search and AI application flows that sit at the heart of the product.",
    highlights: [
      "Built HireOS: app shell, navigation, notification system and dashboard from scratch",
      "Algolia faceted talent-search over a candidate knowledge graph — ~60% faster sourcing",
      "AIApply flow with real-time Anthropic job-fit summaries — ~75% higher completion",
      "Reusable modal/workflow system (dnd-kit + Framer Motion) — ~20% less feature time",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "LoopBack 4",
      "gRPC",
      "Stripe",
      "Algolia",
      "Redux Toolkit",
      "Anthropic SDK",
    ],
    links: [{ label: "Visit", href: "https://useparallel.com" }],
    accent: "#66e7ff",
  },
  {
    id: "acheva",
    index: "03",
    name: "Acheva",
    tagline: "Result processing, digitised.",
    domain: "EdTech · Enterprise SaaS",
    year: "2025",
    role: "Full-stack — solo build",
    status: "In production trials",
    summary:
      "Digitises academic result processing for Nigerian universities. Replaces a paper-based, multi-role approval chain with a traceable, role-gated workflow — a genuinely hard state machine spanning six roles, two cohort types and an inline moderation flow.",
    highlights: [
      "6-role approval state machine (Lecturer → Coordinator → HOD → Dean → Advisor → Publish)",
      "NestJS + MongoDB backend; Angular 19/20 staff & student portals (NgRx, Zoneless)",
      "Full result lifecycle: Excel import, send, approve/reject, publish, moderate",
      "Backend-computed GPA, grade analytics and performance charts; React landing",
    ],
    stack: [
      "NestJS",
      "MongoDB",
      "Angular 19/20",
      "NgRx",
      "React 19",
      "TypeScript",
      "JWT",
    ],
    accent: "#2793ff",
  },
  {
    id: "paybyleap",
    index: "04",
    name: "PayByLeap",
    tagline: "Global payments in minutes.",
    domain: "Fintech · Payments · Crypto",
    year: "2025",
    role: "Full-Stack Engineer",
    status: "Shipped · paybyleap.com",
    summary:
      "A cross-border payments product for everyday people — send money globally in minutes, with stablecoin support, global invoicing, and virtual & physical cards. Built as an installable PWA, with security taken seriously end to end.",
    highlights: [
      "Custom AES-CBC encryption/decryption (Web Crypto API) on every API request & response",
      "Payment-workflow engine with business-rule validation for accuracy & compliance",
      "Multi-step approval workflows with file uploads, comments and reserve-charge handling",
      "Stablecoin + crypto flows, multi-currency, international phone/KYC inputs",
    ],
    stack: [
      "React",
      "TypeScript",
      "TanStack Query",
      "PWA",
      "crypto-js",
      "Tailwind",
    ],
    accent: "#c084fc",
  },
  {
    id: "chainstatement",
    index: "05",
    name: "ChainStatement",
    tagline: "Proof of income, on-chain.",
    domain: "Web3 · Fintech · SaaS",
    year: "2024",
    role: "Solo build",
    status: "Hackathon · $3/export",
    summary:
      "Turns any Solana wallet into a formal PDF transaction statement in local currency (NGN, USD, GBP…) with historical exchange rates on every line item. Built for crypto freelancers who need proof of income for banks, visas or landlords.",
    highlights: [
      "Helius Enhanced API → classify transactions into statement rows",
      "CoinGecko + FX rates for historical per-line fiat values",
      "Bank-statement PDF via @react-pdf/renderer",
      "Stripe-gated $3 export with post-payment delivery",
    ],
    stack: [
      "Next.js",
      "Solana",
      "Helius",
      "Stripe",
      "@react-pdf/renderer",
      "TypeScript",
    ],
    accent: "#f5b74a",
  },
  {
    id: "gongsound",
    index: "06",
    name: "Gongsound",
    tagline: "We amplify culture.",
    domain: "Brand · Motion · Full-stack",
    year: "2025",
    role: "Design engineer — solo",
    status: "Live",
    summary:
      "An Afro-luxury site for a Benin City entertainment label — record label, artist management, events. Where I let the craft off the leash: Awwwards-grade motion, a gold soundwave canvas, and a full auth/CMS backend behind it.",
    highlights: [
      "Lenis smooth scroll, GSAP ScrollTrigger reveals, parallax, custom cursor",
      "Gold soundwave canvas, kinetic marquees, editorial typography",
      "Next.js 16 + Prisma + Supabase + NextAuth backend",
      "All motion gated behind prefers-reduced-motion",
    ],
    stack: [
      "Next.js 16",
      "GSAP",
      "Lenis",
      "Framer Motion",
      "Prisma",
      "Supabase",
    ],
    accent: "#e6b84c",
  },
];

export const capabilities: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: [
      "Next.js (App Router)",
      "React 19",
      "Angular 19/20 · NgRx",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion · GSAP",
      "React Three Fiber · three.js",
      "Lenis · WebGL motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "NestJS",
      "LoopBack 4",
      "Node.js",
      "MongoDB · Mongoose",
      "Prisma · Postgres",
      "Supabase",
      "gRPC · REST",
      "JWT · NextAuth",
    ],
  },
  {
    title: "Web3",
    items: [
      "Solana",
      "Anchor · Rust",
      "Wallet Adapter",
      "SPL Token",
      "Helius",
      "On-chain oracles",
      "Merkle settlement",
    ],
  },
  {
    title: "Product & Infra",
    items: [
      "Stripe billing",
      "Algolia · Contentful",
      "Stream Chat",
      "PWA",
      "0→1 product design",
      "Vercel · AWS",
    ],
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "6+", label: "Years shipping production web apps" },
  { value: "60%", label: "Faster candidate sourcing at Parallel" },
  { value: "75%", label: "Higher application completion (AIApply)" },
  { value: "72%", label: "Load-time cut on a full site rebuild" },
];
