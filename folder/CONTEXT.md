# agpAIso – Project Context for GPT

*Update this file when adding or changing features so GPT has accurate context.*

**What it is:** Next.js 16 (App Router) landing + auth app for an AI-powered URL credibility / fake-news verification tool (CCIS students). Credibility analysis uses Google Gemini API; no other external ML.

**Stack:** Next.js 16, React 19, Tailwind, Prisma 7, SQLite (`dev.db`), bcryptjs, jose (JWT), zod. Credibility: Gemini API (REST), server-side fetch for article content.

---

## Pages / Routes

| Route | Purpose |
|-------|--------|
| `/` | Landing (Navbar, Hero, Features, How It Works, CTA, Footer). Hero “Analyze Now” → `/verify` if logged in, else `/register`. |
| `/login` | Login form → POST `/api/auth/login`, redirect `/` on success |
| `/register` | Register form → POST `/api/auth/register`, redirect `/` on success |
| `/verify` | Protected (server-side auth). Full-screen chat-style URL verification UI; calls `POST /api/analyze`; logout in header → `/api/auth/logout` then `/`. |

---

## Auth (Implemented)

- **User model (Prisma):** `id`, `email`, `fullName`, `passwordHash`, `apiUsageCount`, `apiUsageLimit` (default 5), `createdAt`, `updatedAt`.
- **Registration:** `POST /api/auth/register` – Zod validation, bcrypt hash, create user, set JWT cookie, return user.
- **Login:** `POST /api/auth/login` – verify password, set JWT cookie, return user.
- **Session:** JWT in HTTP-only cookie `agpaiso_session` (7d, SameSite=Lax). `GET /api/auth/me` returns `{ user }` or `{ user: null }` (includes `apiUsageCount`, `apiUsageLimit`).
- **Logout:** `POST /api/auth/logout` – clears session cookie.
- **UI:** Navbar fetches `/api/auth/me`; when logged in shows “Signed in as {name}” + Sign out; otherwise Login / Get Started.

---

## API Usage Limiting (Implemented)

- Each user: `api_usage_count` (starts 0), `api_usage_limit` (default 5).
- **URL analysis:** `POST /api/analyze` body `{ "url": "https://..." }`.
  - Requires auth (401 if no cookie).
  - 403 when `apiUsageCount >= apiUsageLimit` (“API usage limit reached”).
  - Flow: fetch URL → extract title + text (`lib/fetch-article.ts`) → call Gemini `generateContent` (`lib/gemini.ts`) with prompt for credibility JSON → parse response → **then** increment usage (only on success).
  - Success response: `{ success, url, title, analysis: { score, summary, reasoning, verdict, factors? }, remaining }`. Errors: 422 (fetch failed), 502 (Gemini failed), 503 (no `GEMINI_API_KEY`).
- Helpers: `lib/api-usage.ts` – `getAuthenticatedUser()`, `hasRemainingUsage()`, `incrementUsage()`.

---

## Credibility Analysis (Gemini)

- **Fetch:** `lib/fetch-article.ts` – fetches URL, strips HTML, extracts `<title>` and main text (capped ~30k chars), 10s timeout.
- **Gemini:** `lib/gemini.ts` – calls `generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent` with `responseMimeType: "application/json"`. Prompt asks for JSON: `score` (0–10), `summary`, `reasoning`, `verdict`, optional `factors`. Returns typed `CredibilityAnalysis`.

---

## Key Files

- **DB:** `prisma/schema.prisma`, `prisma.config.ts`, `lib/db.ts` (Prisma + SQLite adapter).
- **Auth:** `lib/auth.ts` (hash, JWT, cookies), `app/api/auth/*`.
- **Usage:** `lib/api-usage.ts`, `app/api/analyze/route.ts`.
- **Credibility:** `lib/fetch-article.ts`, `lib/gemini.ts`.
- **UI:** `components/navbar.tsx` (auth-aware), `app/login/page.tsx`, `app/register/page.tsx`, landing sections in `components/`.
- **Verify:** `app/verify/page.tsx` (server auth + redirect), `components/verify/VerifyClient.tsx`, `ChatLayout.tsx`, `MessageBubble.tsx`, `TypingDots.tsx`, `ResultCard.tsx` (chat UI, result card with status badge, score bar, summary, reasoning, Counter Facts).

---

## Env

- `DATABASE_URL` (e.g. `file:./dev.db`)
- `JWT_SECRET`
- `GEMINI_API_KEY` (Google Gemini API key for credibility analysis)

See `.env.example`.
