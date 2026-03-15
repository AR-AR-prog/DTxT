# agpAIso Frontend Redesign PRD

## 1. Document Control
- Product: agpAIso
- Scope: Frontend redesign only (visual + motion + UX polish)
- Version: 1.0
- Date: 2026-03-13
- Owner: Product/Design Engineering
- Implementer: Cursor + Claude Opus

## 2. Executive Intent
Redesign the full user-facing interface with a cohesive visual and motion system while preserving all existing behavior, logic, API contracts, and auth/session flow.

This PRD is optimized for phased implementation by Claude Opus with strict no-regression gates after each phase.

## 3. Problem Statement
The current UI is functionally solid but visually inconsistent across routes and interaction states. Motion is present but not systematized. The product needs a deliberate design language that:
- Improves trust and readability for credibility analysis.
- Creates clear visual hierarchy for action-heavy flows.
- Preserves all existing core behaviors and edge-state handling.

## 4. Goals and Non-Goals

### Goals
- Create one cohesive visual language across all pages.
- Introduce consistent, meaningful motion patterns.
- Improve readability, perceived quality, and interaction clarity.
- Preserve existing functionality bit-for-bit.
- Keep mobile and desktop UX reliable.

### Non-Goals
- No backend changes.
- No API route changes.
- No auth/session logic changes.
- No Prisma schema/model changes.
- No payment backend implementation in this effort.

## 5. Hard Constraints (Do-Not-Break Contract)

### Authentication and Session
- Keep JWT cookie session behavior intact.
- Keep login/register response handling and redirects unchanged.
- Keep Google sign-in behavior unchanged.
- Keep protected route behavior unchanged.

### API and Data Flow
- Keep endpoint URLs, methods, payloads, and response assumptions unchanged.
- Keep verify pipeline unchanged: submit -> fetch URL -> analyze -> return result/error.
- Keep usage-limit and remaining-counter math unchanged.

### Validation and Error Semantics
- Preserve existing validation logic and trigger conditions.
- Preserve existing error semantics and state transitions.
- Preserve blocked/fetch-failure handling behavior.

### Usage and Reset Messaging
- Keep usage tracking behavior unchanged.
- Keep reset messaging visible where currently required: 12:00 AM PHT.

### UX and Accessibility
- Maintain responsive behavior across mobile/tablet/desktop.
- Maintain keyboard focus visibility and accessible contrast.
- Implement reduced-motion fallback.

## 6. Current Product Surfaces

### Routes
- /
- /login
- /register
- /verify
- /billing
- /account

### Route Responsibilities
- /: Landing and conversion entry.
- /login, /register: Account entry and creation.
- /verify: Core URL credibility workflow (chat-style interaction).
- /billing: Usage and plans visualization.
- /account: User profile and Google account linking states.

## 7. Target Visual Direction
- Editorial-paper base with modern AI-assistant accents.
- Clear hierarchy and generous spacing.
- Strong contrast and high legibility.
- Asymmetric layouts allowed where they improve narrative flow.
- Avoid generic SaaS look and overused template patterns.

## 8. Final Design System Specification

### Color Tokens (Base)
- bg: #F4F1EA
- bg-muted: #EBE8E0
- surface: #FFFFFF
- surface-strong: #1A5342
- text-primary: #1A1A1B
- text-secondary: #374151
- text-muted: #6B7280
- border: #D6D3CC
- accent-primary: #4A72FF
- accent-secondary: #1A5342
- state-error: #CE4E47
- state-warning: #D97706
- state-success: #166534
- state-info: #0F766E

### Typography
- Heading family: Serif display face (existing project font stack compatible)
- Body/UI family: Sans-serif interface face (existing project font stack compatible)
- Scale:
  - Display: 56-64
  - H1: 36-40
  - H2: 28-32
  - H3: 22-24
  - Body-lg: 18
  - Body: 15-16
  - Caption: 12-13

### Spacing, Radius, Elevation
- Spacing base: 4px
- Common spacing: 8, 12, 16, 24, 32, 48, 64
- Radius:
  - Inputs: 8
  - Cards: 20-24
  - Pills/buttons: full radius as needed
- Elevation:
  - Use light card shadows only where hierarchy needs it.
  - Prefer contrast + borders over heavy shadows.

### Component Language
- Buttons: high contrast, clear hover/focus/disabled states.
- Inputs: clean border emphasis, strong focus ring clarity.
- Cards: editorial blocks with distinct heading hierarchy.
- Badges/alerts: state colors with readable text contrast.
- Navigation: stable header with clear stateful auth actions.

## 9. Motion System Specification

### Motion Philosophy
- Motion should guide attention, not decorate.
- Sequence reveals to reduce cognitive load.
- Keep interactions fast enough for utility workflows.

### Timing Tokens
- fast: 200ms
- base: 300-500ms
- slow/layout: 700-750ms

### Easing Tokens
- standard-out: cubic-bezier(0.16, 1, 0.3, 1)
- standard-in-out: cubic-bezier(0.65, 0, 0.35, 1)

### Pattern Library
- Page enter: fade + y 20 to 0.
- Section reveal: staggered child reveal, 100ms stagger.
- Card/list reveal: sequence-based arrival.
- Hover/press: subtle scale and contrast shift.
- Verify result transition: smooth entrance without delaying readability.
- Continuity transitions: use for horizontal track/carousel motion where applicable.

### Reduced Motion
- Disable stagger and transform-heavy transitions.
- Use opacity-only quick transitions.
- Preserve affordance cues without movement intensity.

## 10. Route-by-Route Redesign Requirements

### Route: /
- Restyle navbar, hero, features, workflow/how-it-works, pricing, CTA, footer.
- Preserve anchor navigation and auth-aware CTA behavior.
- Add staggered entrance for key sections.

### Route: /login
- Restyle form shell and fields.
- Preserve all validation, errors, and redirect behavior.
- Keep Google sign-in mode and callback handling untouched.

### Route: /register
- Restyle form shell and password requirement presentation.
- Preserve password rules and mismatch handling.
- Keep post-register behavior unchanged.

### Route: /verify
- Redesign chat shell, input area, message visuals, result card, and usage indicators.
- Preserve:
  - URL validation behavior
  - loading/typing behavior
  - success and error rendering logic
  - limit reached lockout behavior
  - remaining-counter updates
- Keep reset messaging visible.

### Route: /billing
- Redesign usage block and plan cards.
- Preserve usage math and plan state logic.
- Keep limit-state messaging behavior.

### Route: /account
- Redesign profile and account-linking section UI.
- Preserve Google link/unlink constraints and messaging.

## 11. Component Breakdown Matrix

| Surface | Visual Change Scope | Must Preserve | Risk |
|---|---|---|---|
| Navbar | Header style, spacing, typography, action treatments | Auth state UI logic | Low |
| Hero + Landing sections | Layout, visual hierarchy, section rhythm | Existing section behavior and anchors | Low |
| Login/Register forms | Card and input/button styling | Validation + submit + redirect behavior | Medium |
| Google sign-in button wrapper | Styling only | OAuth callback flow and modes | Medium |
| Verify shell | Layout and visual hierarchy | Core state machine and API flow | High |
| Message and result cards | Typography and card language | Data rendering semantics | Medium |
| Usage indicators | Progress and counters styling | Remaining and limit logic | High |
| Billing plan UI | Card and pricing visuals | Current behavior and calls-to-action | Medium |
| Account linking UI | Visual restyle | Link/unlink constraints | Medium |

## 12. Phased Implementation Plan for Claude Opus

### Phase 1: Foundation + Landing
- Apply global visual tokens and typography usage.
- Redesign landing route sections.
- Verification gate:
  - Landing renders correctly on desktop/mobile.
  - Navbar auth state still behaves.
  - No logic changes.

### Phase 2: Auth Screens
- Redesign login/register visuals.
- Keep Google sign-in integration behavior unchanged.
- Verification gate:
  - Login success/failure unchanged.
  - Register validation semantics unchanged.

### Phase 3: Verify Experience (High Risk)
- Redesign verify page visuals and interaction skin.
- Preserve all behavior and edge states.
- Verification gate:
  - Success, loading, error, limit reached states unchanged.
  - Remaining count behavior unchanged.

### Phase 4: Billing + Account
- Redesign billing and account visuals.
- Preserve usage and linking behavior.
- Verification gate:
  - Billing usage behavior unchanged.
  - Account link/unlink behavior unchanged.

### Phase 5: Motion Polish + QA
- Apply consistent motion patterns and reduced-motion fallbacks.
- Run responsive and regression checks.
- Verification gate:
  - No functionality regressions.
  - Motion is consistent and not excessive.

## 13. QA and Regression Matrix

### Core Flows
- Auth login success path.
- Auth login failure path.
- Register success path.
- Register validation failure path.
- Google sign-in flow.
- Protected-route access behavior.

### Verify Flow
- Valid URL success path.
- Invalid URL path.
- Blocked URL fetch-failure path.
- Rate/limit error states.
- Limit reached lockout and upgrade path.

### Usage and Account
- Counter decrement behavior after success.
- Billing usage display correctness.
- Reset messaging visibility.
- Google link/unlink edge states.

### UI Quality
- Desktop and mobile layout checks.
- Keyboard navigation and visible focus states.
- Contrast checks on text and actions.
- Reduced-motion behavior check.

## 14. Definition of Done
- All phases completed and approved.
- Visual redesign consistent across routes.
- No changes to backend/auth/API/data logic.
- Regression checklist passes.
- No new critical UI/UX defects on mobile or desktop.

## 15. Implementation Prompt for Cursor + Claude Opus
Copy-paste this prompt into Cursor when implementing:

You are implementing a frontend-only redesign in an existing Next.js App Router project.

Hard rules:
1) Do not modify backend logic, API routes, auth/session handling, database schema, or usage-limit logic.
2) Preserve all existing flows, validation semantics, redirects, and error-state behavior.
3) Implement in phases and stop after each phase for review.
4) Keep mobile responsiveness and accessibility.
5) Use intentional motion and include reduced-motion fallback.

Execute using this PRD as source of truth:
- Apply Section 8 (Design System), Section 9 (Motion System), and Section 10 (Route Requirements).
- Follow Section 12 phase order exactly.

For each phase, output:
- Summary of changes
- Exact files changed
- What functionality was explicitly preserved
- Regression checks run and outcomes
- Risks or open questions before next phase

Begin with Phase 1 only. Stop and wait for approval after completion.
