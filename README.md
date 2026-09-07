# Harmonizing Intelligence Lab

This repository contains the formal Next.js frontend for the Harmonizing
Intelligence Lab website. The active application is intentionally small while
the approved design screens are being implemented.

Historical experiments and research materials are kept outside this repository
in the sibling ../labWebSite-archive/ directory. They are not runtime inputs
and are not part of the active build.

## Structure

- src/ — active Next.js application and shared frontend code
- public/ — production static assets
- root configuration files — Next.js, TypeScript, ESLint, Tailwind and shadcn/ui
- .git-hooks/ and scripts/ — local engineering guardrails

## Current engineering state

The repository remains in rehabilitation mode. The tracked package and
frontend configuration files were restored from `HEAD` after explicit
authorization. Run `npm ci` before frontend and browser checks.

The following checks are available:

- make test-guardrails — self-tests the naming and scratch-path guard
- make check-guardrails — scans tracked and untracked project paths
- make check — runs the frontend lint, typecheck and production build checks
- make check-ui — builds and starts the production app, then runs Playwright
  against the critical root route

The health route `/healthz` is available and has been verified against the
production server: `GET /healthz` returns HTTP 200, `application/json`, and the
exact body `{"status":"ok"}`. The target critical UI route is /. Playwright
verification for / now checks a successful navigation response and the visible
primary heading. Failed browser runs retain a Playwright trace under `.next/`.

## Commands

The intended project commands are:

- npm ci
- npm run dev
- npm run typecheck
- npm run lint
- npm run build
- npm run check
- npm run test:e2e
- make check-ui

The current repository claims passing production runtime evidence for
`/healthz` and local Playwright evidence for `/`. CI installs Chromium and runs
the same browser entry in an independent blocking job; remote CI success is not
claimed until that workflow has run.

The application currently exposes the root route / as a project shell so the
approved design can be added without carrying historical routes forward.

## Engineering references

- AGENTS.md — repository rules and enforcement index
- CONTEXT.md — bounded context, invariants and open questions
- constraints.yaml — strictness profile, verification surfaces and rehabilitation state
- docs/architecture/figma-single-url.md — provenance for the seven single-URL screen states
- docs/adr/0001-single-url-screen-sequence.md — single URL screen-sequence decision
- docs/adr/0002-native-css-page-transition.md — native CSS page-transition decision
- [docs/reference/mitibm-section-navigation/README.md](docs/reference/mitibm-section-navigation/README.md) — MIT‑IBM section-navigation motion reference
