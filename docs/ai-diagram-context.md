# ai-diagram-context

## 1. System Overview
- agpAIso is a web application that helps users evaluate whether a news URL is likely credible or suspicious.
- Users submit a URL, the system fetches article content on the server, sends it to Google Gemini, and returns a credibility result.
- The system also includes account management, authentication, and daily usage tracking.
- This file is intended as a single source of truth for UML generation.

## 2. System Actors
- Visitor: Unauthenticated user who can browse the landing page and access login or register.
- Authenticated User: Signed-in user who can verify URLs, manage account settings, and view billing or usage.
- Google Identity Provider: External provider for Google sign-in and account linking.
- Content Website: External website that hosts the article content to be analyzed.
- Gemini API: External AI service that produces credibility analysis output.

## 3. Main Use Cases
- Register Account: Create a local account using name, email, and password.
- Login with Email and Password: Authenticate using local credentials.
- Sign in with Google: Authenticate via Google identity token.
- Logout: End the current user session.
- View Session or Profile: Retrieve current session and profile state.
- Verify URL Credibility: Submit URL and receive AI credibility output.
- View Remaining Usage: See daily usage count and limit.
- View Billing or Plan: View usage summary and plan options.
- Link Google Account: Connect Google identity to an existing account.
- Unlink Google Account: Remove linked Google identity.

## 4. System Components
- Frontend
  - Next.js App Router pages and React UI components.
  - Main screens: landing, login, register, verify, account, billing.
- Backend API
  - Route handlers for auth, analyze, account link or unlink, and session checks.
- Authentication System
  - JWT sessions in HTTP-only cookie.
  - Password hashing with bcryptjs.
  - Google ID token verification.
- AI Analysis Service
  - Server-side fetch and parse of article content.
  - Gemini prompt and response parsing.
- Database Layer
  - Prisma ORM with SQLite persistence.

## 5. Data Models
- User (persisted)
  - Responsibility: account identity, auth linkage, and usage tracking.
  - Key fields: id, email, fullName, passwordHash, googleId, apiUsageCount, apiUsageLimit, apiUsageResetAt, createdAt, updatedAt.
- Session (logical)
  - Responsibility: represent authenticated context via signed JWT token in cookie.
- Analysis Request (logical)
  - Responsibility: represent a submitted URL and the analysis trigger.
- Analysis Result (logical)
  - Responsibility: represent output returned from Gemini: score, summary, reasoning, verdict, optional factors.
- Usage State (logical)
  - Responsibility: represent daily quota status for each user.

## 6. System Workflow
- User submits URL from Verify UI.
- Backend validates session and usage availability.
- Backend fetches article content from target website.
- Backend sends content to Gemini API.
- Backend parses analysis response.
- Backend increments usage counter on success.
- Backend returns analysis result and remaining usage.
- UI displays the result.

## 7. Component Interactions
- Frontend to API
  - Calls auth, session, analyze, account, and billing-related endpoints.
- API to Database
  - Reads and updates user identity and usage fields.
- API to Content Website
  - Fetches article HTML and text content.
- API to Gemini API
  - Sends extracted content and receives credibility analysis.
- API to Google Identity Provider
  - Verifies Google ID tokens for sign-in and linking.

## 8. Deployment Structure
- Client Browser
  - Renders React UI and sends HTTPS requests.
- Next.js Server
  - Serves pages and API endpoints.
- SQLite Database
  - Stores user and usage records.
- External Services
  - Google Identity Provider.
  - Gemini API.
  - Public content websites.

## 9. UI Structure
- Landing Page
  - Product messaging and CTA entry points.
- Login Page
  - Email or password login and Google sign-in.
- Register Page
  - Account creation and Google sign-in option.
- Verify Page
  - URL submission and credibility result presentation.
- Account Page
  - Profile view and Google link or unlink actions.
- Billing Page
  - Usage summary and plan selection UI.
- Shared Navigation
  - Auth-aware navbar and session-sensitive actions.

## 10. Partitioned Activity Diagram Standards
- Goal
  - Keep activity diagrams simple, readable, and consistent across all use cases.
- General rules
  - Model only the main success flow.
  - Include start and end nodes.
  - Add decision nodes only when truly needed (max one or two).
  - Avoid deep technical error branches unless explicitly requested.
- Swimlane rules
  - Use one swimlane per actor or component involved in the specific use case.
  - Keep swimlanes as vertical columns.
  - Place activities top-to-bottom within each swimlane.
  - Handoffs should move from one actor column to another in sequence.
- Mermaid layout rules
  - Prefer `flowchart LR` for side-by-side swimlane columns.
  - Use `direction TB` inside each lane so each lane flows top-to-bottom.
  - For strict column alignment, use row placeholders when necessary to keep actors in separate columns.
- Verify URL Credibility preferred actor set
  - Authenticated User
  - Content Website
  - Gemini API
  - Start in Authenticated User lane.
  - End in Authenticated User lane after receiving result.
- Optional implementation lane
  - Include Analyze API as an additional lane only when an API responsibility split is needed.

## 11. Claude Response Instructions
- Response style
  - Keep answers clear, structured, and brief.
  - Use simple wording and avoid unnecessary technical detail.
  - Prioritize consistency across all diagram outputs.
- Diagram generation behavior
  - Generate only what is requested for the current step.
  - Do not generate extra diagram types unless explicitly asked.
  - For activity diagrams, follow the swimlane standards in Section 10.
- Required output format
  - Start with a short title naming the diagram and use case.
  - Provide one `PlantUML` code block.
  - Provide one `Mermaid` code block.
  - Ensure outputs are compatible with `plantuml.com` and `mermaid.live`.
- Partitioned activity diagram format
  - Use actor/component swimlanes as separate columns.
  - Keep activity progression top-to-bottom inside each lane.
  - Show handoffs between lanes in sequence.
  - Include start and end nodes.
  - Keep the main success flow only unless alternatives are explicitly requested.
- Interaction policy
  - If requirements are ambiguous, ask one concise clarification question.
  - If requirements are clear, proceed directly without extra explanation.
  - Preserve actor names and use case names exactly as provided by the user.

## Diagram Scope Notes
- Use Case Diagram: focus on actors and high-level use cases.
- Partitioned Activity Diagrams: model main success flows with swimlanes.
- Class Diagram: center on User plus logical request, result, and session structures.
- Package Diagram: group modules by UI, API, auth, analysis, and data layers.
- Component Diagram: show frontend, API, database, and external service communication.
- Deployment Diagram: show browser, app server, database, and external providers.
- UI Diagram or Wireframe Overview: show page-level structure and navigation flow.
