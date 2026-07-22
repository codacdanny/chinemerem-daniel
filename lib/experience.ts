export type Role = {
  company: string;
  url?: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Parallel",
    url: "https://useparallel.com",
    title: "Senior Frontend Engineer",
    location: "Remote — New York, USA",
    period: "Nov 2025 — Present",
    current: true,
    points: [
      "Architected and shipped “HireOS,” the recruiter workspace — app shell, navigation, notifications and dashboard — from the ground up.",
      "Built an Algolia-powered faceted talent-search engine over a candidate knowledge graph (geo-radius, company/title scoping, seniority normalization, AI search) — accelerating sourcing by ~60%.",
      "Shipped an AI candidate application flow (AIApply) with real-time Anthropic job-fit summaries, lifting completion rates by ~75%.",
      "Owned a reusable modal/workflow system (dnd-kit + Framer Motion) adopted across the app, cutting feature time by ~20%.",
    ],
    tags: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Algolia", "Anthropic SDK"],
  },
  {
    company: "Awad LLC · doorsift.com",
    url: "https://doorsift.com",
    title: "Full-Stack Engineer",
    location: "Contract — Remote, New York",
    period: "Jun 2025 — Sep 2025",
    points: [
      "Built an AI-powered real-estate investment platform (Next.js 15 + Perplexity) analysing properties across 50+ data points in seconds.",
      "Shipped BRRRR/rental/flip calculators with 30-year projections, cap rate, DSCR, IRR and PDF/Excel export.",
      "Designed a multi-tenant workspace with RBAC, automated monitoring and scheduled search on PostgreSQL, Drizzle ORM and Redis.",
      "Integrated Stripe subscription billing and Resend email automation across Free/Starter/Pro tiers.",
    ],
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Drizzle", "Redis", "Stripe"],
  },
  {
    company: "Harmony Kloud",
    title: "Frontend Engineer",
    location: "Full-time — Remote, Toronto",
    period: "May 2025 — Oct 2025",
    points: [
      "Architected an appointment-scheduling system with React, FullCalendar and Day.js — full timezone handling, fewer conflicts.",
      "Led a UI library migration from Ant Design to shadcn/ui + Tailwind, improving consistency and cutting bundle size.",
      "Built time-split billing with overlap detection and duration validation.",
    ],
    tags: ["React", "FullCalendar", "shadcn/ui", "Tailwind"],
  },
  {
    company: "PayByLeap",
    url: "https://paybyleap.com",
    title: "Full-Stack Engineer",
    location: "Part-time — Remote, Lagos",
    period: "Feb 2025 — Oct 2025",
    points: [
      "Implemented custom AES-CBC encryption/decryption with the Web Crypto API for every API request and response.",
      "Architected payment-workflow management with business-rule validation for transaction accuracy and compliance.",
      "Built multi-step payment approval workflows with file uploads, comments and reserve-charge handling.",
    ],
    tags: ["React", "TypeScript", "Web Crypto API", "TanStack Query"],
  },
  {
    company: "Pamtech Group",
    url: "https://pamtechgroup.com",
    title: "Frontend Engineer",
    location: "Onsite — Owerri, Nigeria",
    period: "Aug 2024 — Feb 2025",
    points: [
      "Redesigned pamtechgroup.com, cutting load time by 72% via image optimization and selective animation.",
      "Shipped a booking platform, a car-data management app, an LMS (Next.js + Supabase) and an e-commerce store across the group.",
    ],
    tags: ["Next.js", "Supabase", "Performance"],
  },
  {
    company: "6ps Group LLC",
    url: "https://6ps.group",
    title: "Full-Stack Engineer",
    location: "Remote — New York, USA",
    period: "Nov 2022 — Jan 2024",
    points: [
      "Partnered with clients to design and ship custom web solutions (incl. Dishquo), improving engagement.",
      "Applied image compression, lazy loading and TanStack optimistic updates to cut load time ~30% across projects.",
    ],
    tags: ["React", "TanStack Query", "Node.js"],
  },
];

export const education = {
  school: "Federal University of Technology, Owerri (FUTO)",
  degree: "B.Tech, Mathematics",
  period: "2018 — 2023",
};
