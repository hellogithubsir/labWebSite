# Harmonizing Intelligence Lab

This repository contains the formal Next.js frontend for the Harmonizing
Intelligence Lab website. The active application is intentionally small while
the Figma pages are being implemented.

Historical experiments and research materials are kept outside this repository
in the sibling `../labWebSite-archive/` directory. They are not runtime inputs
and are not part of the active build.

## Structure

- `src/` — active Next.js application and shared frontend code
- `public/` — production static assets
- root configuration files — Next.js, TypeScript, ESLint, Tailwind and shadcn/ui

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

The application currently exposes the root route `/` as a project shell so the
Figma implementation can be added without carrying historical routes forward.
