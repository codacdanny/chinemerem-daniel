# Chinemerem Daniel — Portfolio

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **React Three Fiber** + **drei** + **three.js** — the interactive hero object and the
  sticky "gem" that shifts color per project
- **GSAP** + ScrollTrigger — scroll reveals and text choreography
- **Lenis** — inertia smooth scrolling (synced to GSAP's ticker)
- **Framer Motion**, custom magnetic cursor, film-grain overlay
- **Tailwind CSS v4** — design tokens in `app/globals.css`, source of truth in `brand.md`


## Run

```bash
npm install
cp .env.local.example .env.local   # then add your Resend API key (see below)
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Contact form (email delivery)

The contact form posts to `app/api/contact/route.ts`, which sends the message to
your inbox via **Resend**. To turn it on:

1. Sign up at [resend.com](https://resend.com) and create an **API key**.
2. Put it in `.env.local` as `RESEND_API_KEY=...` (see `.env.local.example`).

With the default sender (`onboarding@resend.dev`) Resend delivers only to the
email on your Resend account — perfect here, since the form always sends **to you**.
No domain verification needed to start. On Vercel, add `RESEND_API_KEY` (and
optionally `CONTACT_TO` / `CONTACT_FROM`) in Project → Settings → Environment Variables.

Until a key is set, the form shows a friendly "email me directly" message and the
direct email link still works.

## Where the content lives (edit these)

| File | Contents |
|---|---|
| `lib/site.ts` | Name, role, contact links, bio |
| `lib/projects.ts` | Selected work, capabilities, headline stats |
| `lib/experience.ts` | Work history + education |
| `brand.md` | Colors, typography, voice — the design source of truth |
| `public/Chinemerem_Daniel_Resume.pdf` | Downloadable résumé (linked in nav + contact) |

### Add a real portrait

Drop a photo at `public/portrait.jpg` and swap the placeholder block in
`components/sections/About.tsx` for an `next/image`.

## Deploy

Push to a Git repo and import into **Vercel** — zero config. Or `npm run build && npm start`.
