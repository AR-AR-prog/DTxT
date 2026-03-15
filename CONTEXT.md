# agpAIso – Project Context

*Update this file after every meaningful change so any AI assistant (Copilot, Claude, GPT, Gemini, Cursor, etc.) has accurate context about the project.*

**What it is:** Next.js 16 (App Router) landing + auth app for an AI-powered URL credibility / fake-news verification tool (CCIS students). Credibility analysis uses Google Gemini API; no other external ML.

**Stack:** Next.js 16, React 19, Tailwind, Prisma 7, SQLite (`dev.db`), bcryptjs, jose (JWT), zod. Credibility: Gemini API (REST), server-side fetch for article content.

---

## Pages / Routes

| Route | Purpose |
|-------|--------|
| `/` | Landing (Navbar, Hero, Workflow, Features, How It Works, Testimonials, FAQ, Pricing, CTA, Footer). Hero “Analyze Now” → `/verify` if logged in, else `/register`. |
| `/login` | Login form → POST `/api/auth/login`, redirect `/` on success |
| `/register` | Register form → POST `/api/auth/register`, redirect `/` on success |
| `/verify` | Protected (server-side auth). Full-screen chat-style URL verification UI; calls `POST /api/analyze`; logout in header → `/api/auth/logout` then `/`. |
| `/account` | Protected (server-side auth). Account settings – view profile, link or disconnect Google account. |
| `/billing` | Protected (server-side auth). Usage dashboard and plan selection UI for testing account limits. |

---

## Auth (Implemented)

- **User model (Prisma):** `id`, `email`, `fullName`, `passwordHash`, `apiUsageCount`, `apiUsageLimit` (default 50 for testing), `apiUsageResetAt` (nullable daily reset marker), `createdAt`, `updatedAt`.
- **Registration:** `POST /api/auth/register` – Zod validation, strong-password enforcement, bcrypt hash, create user, set JWT cookie, return user.
- **Login:** `POST /api/auth/login` – verify password, set JWT cookie, return user. If the account is Google-only, returns a clear error instructing the user to use Google sign-in.
- **Google Sign-In:** `POST /api/auth/google` – verifies a Google ID token server-side, links or creates the user, then sets the same JWT cookie used by password auth.
- **Session:** JWT in HTTP-only cookie `agpaiso_session` (7d, SameSite=Lax). `GET /api/auth/me` returns `{ user }` or `{ user: null }` (includes `apiUsageCount`, `apiUsageLimit`).
- **Auth token resolution:** shared session lookup now supports request-header cookie parsing for route handlers and token-based lookup for server pages (`getAuthenticatedUserFromToken`) to avoid request-context cookie misses.
- **Dynamic auth reads:** `app/api/auth/me/route.ts`, `app/verify/page.tsx`, and `app/billing/page.tsx` are forced dynamic to prevent stale cached unauthenticated responses when session lookup is done through shared helpers.
- **Runtime note:** after Prisma schema changes, run `pnpm prisma generate` and restart `pnpm dev`; stale generated client can silently break auth reads that select new fields like `apiUsageResetAt`.
- **Logout:** `POST /api/auth/logout` – clears session cookie.
- **UI:** Navbar fetches `/api/auth/me`; when logged in shows “Signed in as {name}” + Sign out; otherwise Login / Get Started. Login and register pages now offer both password auth and Google sign-in.

---

## API Usage Limiting (Implemented)

- Each user: `api_usage_count` (starts 0), `api_usage_limit` (default 50 for testing), `api_usage_reset_at`.
- **URL analysis:** `POST /api/analyze` body `{ "url": "https://..." }`.
  - Requires auth (401 if no cookie).
  - Daily reset: when a user is loaded on a new Philippine calendar day (`Asia/Manila`, UTC+8), usage is reset to 0 automatically before the request continues.
  - 403 when `apiUsageCount >= apiUsageLimit` (“API usage limit reached”).
  - Flow: load user and normalize daily usage → fetch URL → extract title + text (`lib/fetch-article.ts`) → call Gemini `generateContent` (`lib/gemini.ts`) with prompt for credibility JSON → parse response → **then** increment usage (only on success).
  - Success response: `{ success, url, title, analysis: { score, summary, reasoning, verdict, factors? }, remaining }`. Errors: 422 (fetch failed), 502 (Gemini failed), 503 (no `GEMINI_API_KEY`).
- Helpers: `lib/api-usage.ts` – `getAuthenticatedUser()`, `hasRemainingUsage()`, `incrementUsage()`.
- User-facing copy: billing and verify UI explicitly state that free searches reset at **12:00 AM Philippine Time (PHT)**, including the verify header counter pill.

---

## Credibility Analysis (Gemini)

- **Fetch:** `lib/fetch-article.ts` – fetches URL, strips HTML, extracts `<title>` and main text (capped ~30k chars), 10s timeout.
- **Gemini:** `lib/gemini.ts` – calls `generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` with `responseMimeType: "application/json"`. Test config currently uses `GEMINI_MODEL=gemini-2.5-flash-lite` for higher free-tier headroom. Prompt asks for JSON: `score` (0–10), `summary`, `reasoning`, `verdict`, optional `factors`. Returns typed `CredibilityAnalysis`.

---

## Key Files

- **Redesign PRD:** `REDESIGN_PRD.md` (root) defines frontend-only redesign scope, functional parity contract, design/motion system, phased implementation gates, QA matrix, and a ready Cursor+Opus execution prompt.
- **Documentation seed:** `PROJECT_CONTEXT.md` (root) is a teammate-facing master prompt pack for generating UML and UI documentation against the real agpAIso codebase, including grounded actors, modules, routes, and an 8-step diagram guide.
- **Diagram AI context (new):** `docs/ai-diagram-context.md` is the single-source markdown context file for Claude Project uploads, covering system overview, actors, simplified use cases, component boundaries, data model responsibilities, workflow, interactions, deployment view, and UI structure for consistent UML outputs; it now also includes explicit partitioned activity diagram rules (strict actor columns/swimlanes, top-to-bottom lane flow, and handoff sequencing) plus a dedicated Claude response-style contract (concise output behavior, step-scoped generation, and required PlantUML+Mermaid formatting).
- **Redesign implementation (completed in this repo):** global editorial token pass in `app/globals.css`, landing redesign across `components/navbar.tsx`, `hero-section.tsx`, `features-section.tsx`, `how-it-works-section.tsx`, `pricing-section.tsx`, `cta-section.tsx`, `footer.tsx`, auth-shell redesign in `app/login/page.tsx` and `app/register/page.tsx`, and verify shell palette alignment in `components/verify/ChatLayout.tsx`.
- **DB:** `prisma/schema.prisma`, `prisma.config.ts`, `lib/db.ts` (Prisma + SQLite adapter). `User.passwordHash` is nullable to support Google-only accounts, and `User.googleId` stores the linked Google identity.
- **Auth:** `lib/auth.ts` (hash, JWT, cookies), `app/api/auth/*`.
- **Google Auth:** `lib/google-auth.ts` (Google ID token verification), `app/api/auth/google/route.ts` (sign-in/register), `app/api/account/google/route.ts` (link/unlink for signed-in users), `components/google-sign-in-button.tsx` (branded button, supports `login`/`register`/`link` modes).
- **Usage:** `lib/api-usage.ts`, `app/api/analyze/route.ts`.
- **Credibility:** `lib/fetch-article.ts`, `lib/gemini.ts`.
- **UI:** `components/navbar.tsx` (auth-aware), `app/login/page.tsx`, `app/register/page.tsx`, landing sections in `components/`.
- **Verify:** `app/verify/page.tsx` (server auth + redirect), `components/verify/VerifyClient.tsx`, `ChatLayout.tsx`, `MessageBubble.tsx`, `TypingDots.tsx`, `ResultCard.tsx` (chat UI, result card with status badge, score bar, summary, reasoning, Counter Facts).
- **Animations:** `hooks/use-in-view.ts` (IntersectionObserver for scroll-triggered animations). Hero: staggered fade-in, CTA hover scale. Navbar: backdrop blur on scroll, nav link underline hover. Features, How It Works, CTA: fade/slide on scroll. Verify: message bubbles slide-in. Auth pages: form card fade-in. Footer: link hover underline. Uses `tw-animate-css` and Tailwind `transition-*`.
- **Post-redesign cleanup:** fixed invalid JSON syntax in `components.json` and normalized a Tailwind utility in `components/verify/VerifyClient.tsx` (`min-h-50`) to keep diagnostics/lint clean for the updated UI layer.
- **Lint cleanup (no behavior change):** removed remaining warnings by cleaning an unused map arg in `components/testimonials-section.tsx` and replacing type-only action constants with discriminated string literal action types in `components/ui/use-toast.ts` and `hooks/use-toast.ts`.
- **Additional UX enhancement pass:** `app/page.tsx` now includes `WorkflowSection`, `TestimonialsSection`, and a new `FaqSection`; `components/faq-section.tsx` added as an interactive accordion with product-specific questions. `components/workflow-section.tsx` rewritten from unrelated "workflow automation" copy to agpAIso-specific steps (Paste URL, Fetch+Parse, Get Verdict, Act Faster) and matching visuals. `components/verify/VerifyClient.tsx` now uses a focused URL input bar (removed non-functional plus/microphone controls) and a richer empty state with suggested URL chips and remaining usage indicator. `components/verify/ChatLayout.tsx` header now includes quick links to Account and Billing plus "Sign out" labeling. Lint remains clean.
- **Navigation + polish pass:** `components/navbar.tsx` anchor links now target real sections (`#features`, `#how-it-works`, `#testimonials`, `#faq`, `#pricing`) instead of the previous non-existent `#about`; section IDs were added in `components/testimonials-section.tsx` and `components/faq-section.tsx` to support that navigation. `components/verify/ResultCard.tsx` was upgraded with icon-backed status chips, stronger score hierarchy (serif score + segmented animated meter), explicit verdict line, and numbered counter-fact cards. `app/billing/BillingClient.tsx` now has a monthly/yearly billing-cycle toggle and replaces browser `alert()` with an inline “checkout coming soon” confirmation state for plan selection. Lint remains clean (0 errors, 0 warnings).
- **Editorial trust-surface pass (Phase 1):** strengthened global design tokens/utilities in `app/globals.css` (editorial section dividers, document-card surface, unified verdict state classes, motion timing tokens), refined navigation ergonomics and mobile section wayfinding in `components/navbar.tsx`, and aligned section hierarchy in `components/features-section.tsx` + `components/how-it-works-section.tsx`. Verify flow presentation was elevated in `components/verify/ChatLayout.tsx`, `components/verify/VerifyClient.tsx`, `components/verify/MessageBubble.tsx`, and `components/verify/ResultCard.tsx` with evidence-brief framing, improved empty/input states, and calmer premium verdict styling. Protected page consistency was brought to `app/billing/BillingClient.tsx` and `app/account/AccountClient.tsx` using the same editorial shell and status language while preserving auth/usage behavior. Also fixed an existing JSX wrapper mismatch in `components/hero-section.tsx` discovered during linting. `pnpm lint` currently exits clean (`0`).
- **Verify depth pass (Phase 2 focus):** `components/verify/VerifyClient.tsx` now adds richer desk guidance (input assist line, expanded empty-state “what you get” panels), message timestamps, and source-domain context for user submissions while preserving request/response and usage-limit semantics. `components/verify/MessageBubble.tsx` now renders lightweight metadata lines above user/AI/error bubbles for better conversation traceability. `components/verify/ResultCard.tsx` now includes confidence band + review guidance blocks and a fallback state when no counter-facts are returned, improving scan quality without changing analysis data contracts. `components/verify/ChatLayout.tsx` now includes clearer mode messaging and mobile usage context. `pnpm lint` remains clean (`0`).
- **Mobile + accessibility refinement pass:** strengthened keyboard focus visibility in `app/globals.css` (`.focus-ring`), added a reusable `.sr-only` helper for accessible labels, and adjusted background attachment/texture sizing on small screens for smoother mobile rendering. Improved tap targets and focus parity in `components/navbar.tsx`, `components/hero-section.tsx`, `components/pricing-section.tsx`, and `components/verify/ChatLayout.tsx`; added explicit URL input labeling and a polite live region for message updates in `components/verify/VerifyClient.tsx`; added tab semantics to billing cycle controls and larger actionable targets in `app/billing/BillingClient.tsx`; and tightened account action accessibility in `app/account/AccountClient.tsx`. Functional auth/analyze/usage behavior remains unchanged. `pnpm lint` exits clean (`0`).
- **Landing visual polish pass (hero + CTA):** `components/hero-section.tsx` gained improved small-screen typography rhythm, subtle atmospheric light layers, an editorial callout line, and a compact trust-chip row to reinforce the product voice while preserving behavior. `components/cta-section.tsx` gained tighter responsive spacing, stronger framing accents, improved mobile type scaling, and a secondary `Continue with login` action to reduce dead-end friction at page end. CTA buttons now align with the touch-target/focus standards introduced earlier. `pnpm lint` remains clean (`0`).
- **Gemini-review refinement pass:** implemented high-priority UI fixes from external design review. In `components/pricing-section.tsx`, the highlighted Pro card now uses `overflow-visible` so the recommended badge is never clipped. In verify flow, `components/verify/VerifyClient.tsx` now uses darker placeholder contrast and stronger input focus/hover treatment for the primary submit loop, while `components/verify/ChatLayout.tsx` increases top utility spacing for cleaner navigation rhythm. In `components/workflow-section.tsx`, the inter-step connector line is now thicker/darker for clearer sequence legibility, and meta label contrast was improved. In `app/login/page.tsx`, the left editorial panel content is vertically centered to align better with the auth form. In `components/features-section.tsx` and `components/hero-section.tsx`, small uppercase meta labels were darkened and secondary info cards gained subtle separation for scanability. Functional behavior and backend contracts remain unchanged. `pnpm lint` exits clean (`0`).
- **Gemini round-2 fit-and-flow pass:** removed the top navbar utility strip in `components/navbar.tsx` to reclaim above-the-fold space and reduce crowding, then expanded desktop nav-pill breathing room (`px-6/xl:px-10` container and wider per-link padding). `components/hero-section.tsx` was rebalanced for smaller laptop fit with tighter vertical spacing and responsive headline scaling (`text-4xl -> xl:text-7xl`, `leading-tight`). Auth page wrappers in `app/login/page.tsx` and `app/register/page.tsx` now use scroll-safe viewport behavior (`min-h-screen` + `overflow-y-auto`), and register form density was compacted (reduced vertical paddings and spacing) to keep primary actions visible on shorter screens. `components/testimonials-section.tsx` now equalizes field-note/archive card heights using `h-full` + quote min-heights for cleaner baseline alignment. `components/pricing-section.tsx` adjusted `/mo` typographic alignment/opacity for tighter price harmony. Functional behavior unchanged; `pnpm lint` exits clean (`0`).
- **Short-viewport QA pass (768/800/900 focus):** added compact-height helpers in `app/globals.css` (`.short-vp-hide`, `.short-vp-tight` under `@media (max-height: 860px)`) to preserve default desktop composition while preventing short-laptop crowding. Applied these to non-critical hero supporting blocks in `components/hero-section.tsx` so lower-priority chips/callouts collapse on short heights; also added a bounded preview panel (`lg:max-h-[70vh]` with internal scroll) to prevent the right hero surface from forcing excess fold pressure. Applied `.short-vp-tight` to login/register headers and form cards in `app/login/page.tsx` and `app/register/page.tsx` for additional compactness on short displays. Functional behavior unchanged; `pnpm lint` remains clean (`0`).
- **1366x768 micro-rhythm pass (typography + spacing only):** refined above-the-fold rhythm in `components/navbar.tsx` and `components/hero-section.tsx` without structural changes. Navbar vertical padding and desktop nav-pill internals were slightly tightened to reduce header footprint while preserving click comfort. Hero section top/bottom spacing and internal gaps were tuned, with a moderated laptop type scale (`sm/lg/xl` headline steps) so the value proposition and primary CTA remain visible sooner on common 13" displays. Supporting hero stat card spacing was compacted slightly, and the right preview panel bound was tightened from `70vh` to `66vh` for improved fold behavior on short laptop heights. `pnpm lint` exits clean (`0`).

---

## Env

- `DATABASE_URL` (e.g. `file:./dev.db`)
- `JWT_SECRET`
- `GEMINI_API_KEY` (Google Gemini API key for credibility analysis)
- `GEMINI_MODEL` (optional Gemini model override; currently `gemini-2.5-flash-lite` for free-tier testing)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (Google Identity Services client ID used by the browser button)
- `GOOGLE_CLIENT_ID` (server-side audience check for Google ID token verification; can match the public client ID)

See `.env.example`.
