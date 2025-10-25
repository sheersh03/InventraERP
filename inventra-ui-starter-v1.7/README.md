# Inventra UI Starter (Next.js + Tailwind + Tokens)

AE2 (Apple + Futuristic) • DV2 (Violet–Indigo gradient) • AI-C (Neon Pulse) • Auto-Adaptive Theme

## Quick Start
```bash
pnpm install
pnpm dev
```
Open http://localhost:3000

## Features
- Next.js App Router + Tailwind + TypeScript
- Auto-adaptive theme (light/dim/dark) by time/OS
- Multi-brand ready via `[data-brand]`
- Figma tokens (`tokens/tokens.json`) + CSS variables + Tailwind mapping
- Example screens: Dashboard, Inventory, Production
- Components: BrandButton, GlassPanel, CopilotTrigger, Navbar, StatCard
- Drop 2: Typography tokens, motion utilities, AppShell (theme/density toggles), CommandBar (⌘K), Modal, Tabs, Inputs, Badge

## Theming
Switch theme at runtime by setting `data-theme` on `<html>`:
```js
document.documentElement.setAttribute('data-theme','light'|'dim'|'dark');
```
White-label branding:
```js
document.documentElement.setAttribute('data-brand','orchid');
```
Density (Simple/Pro):
```js
document.documentElement.setAttribute('data-density','simple'|'pro');
```

Enjoy building **Inventra** — simple like water, fast like quantum.

---

## Drop 3 (added)
- **Navigation:** Sidebar + topbar search
- **DataTable Pro:** sorting, search, pagination
- **Toasts:** context-based notifications
- **Form validation:** simple client-side rules (Sales → New Invoice)
- **Sales page:** table + form demo

---

## Drop 4 (added)
- **Motion tokens:** durations & easing (`--motion-*`, `--ease-*`)
- **Micro-components:** `Spinner`, `Skeleton`, `ProgressBar`, `AsyncButton`, `ListReveal`, `Tooltip`
- **Route loading UX:** `app/orders/loading.tsx` with indeterminate bar + card skeletons
- **Staggered list reveal:** smooth progressive item mount
- **Button ripple & async feedback** (spinner + text swap)
- **New page:** `/orders` showcasing these patterns

---

## Drop 5 (Full): **invis — Inventra + Jarvis**
- **Invis Copilot** `/invis` — chat-like panel that classifies text → intents → action stubs
- **Intent registry** (`lib/invis.ts`, `lib/types.ts`) for mapping natural language to ERP actions
- **Notifications Center** `/inbox`
- **Approvals & Collaboration** `/approvals` — builder + comments thread
- **Central Collaboration Layer stubs** (comments, tasks concept)
- Production notes: replace stubs with server actions, connect to DB, and LLM routing in backend

---

## Drop 6 — SaaS & Scale (Starter Pack)
- **Multi-tenant foundation:** Prisma models for Tenant/Org/Site/User/Roles, Subscription, Usage, Webhooks, Audit
- **Org Switcher** in top bar (local demo)
- **Billing & Usage** page `/billing`
- **Integrations Hub** `/integrations` with CSV import stub + webhook tester
- **Audit Trail** `/audit`
- **API stubs:** `/api/webhooks/stripe`, `/api/webhooks/inventra`, `/api/usage`
- **DB:** SQLite dev (`.env.example`) — swap to Postgres in prod
- Next steps: generate Prisma client, run migrations, connect Stripe keys, wire server actions

---

## v1.6 Additions (Drop 6.1)
- **Plan Guards:** `lib/entitlements.ts` with `hasFeature(plan, key)`
- **Auth/RBAC Demo:** cookie-based role switcher + `AuthRoleSwitcher` in the top bar
- **Stripe Checkout Stub:** `/api/billing/checkout` + UI at `/billing/checkout`
- **CSV Mapping Wizard:** component for column mapping in Integrations page
- **Server Actions Stubs:** `recordUsage` and `writeAudit` in `app/actions.ts`
- **Tenant Theming:** brand color override via `data-brand` attribute

---

## v1.7 (Drop 6.2): DB-backed actions + Stripe sessions + Webhook logs
- **Prisma client**: `lib/db.ts`
- **DB server actions**: `app/db-actions.ts` (`recordUsageDB`, `writeAuditDB`, `upsertTenant`, `listWebhookLogs`)
- **Stripe checkout (real if keys present)**: `/api/billing/checkout`
  - Set `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` in `.env`
- **Webhook persistence**: `/api/webhooks/stripe` & `/api/webhooks/inventra` store to `WebhookLog`
- **Viewer**: `/webhooks` page

### Setup (dev)
```bash
cp .env.example .env   # set Stripe keys optionally
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name drop6_2
pnpm dev
```
