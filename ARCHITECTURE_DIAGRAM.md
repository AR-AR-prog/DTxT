# agpAIso - Architecture Diagram

Visual guide to understand how the application works.

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Landing    │  │    Login     │  │   Register   │        │
│  │     Page     │  │     Page     │  │     Page     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │    Verify    │  │   Account    │  │   Billing    │        │
│  │     Page     │  │     Page     │  │     Page     │        │
│  │  (Protected) │  │  (Protected) │  │  (Protected) │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    API ROUTES                            │  │
│  │                                                          │  │
│  │  /api/auth/register  ─────┐                            │  │
│  │  /api/auth/login     ─────┤                            │  │
│  │  /api/auth/google    ─────┼──► Authentication Logic    │  │
│  │  /api/auth/logout    ─────┤                            │  │
│  │  /api/auth/me        ─────┘                            │  │
│  │                                                          │  │
│  │  /api/analyze        ─────► URL Analysis Logic         │  │
│  │                                                          │  │
│  │  /api/account/google ─────► Account Management         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    BUSINESS LOGIC (lib/)                 │  │
│  │                                                          │  │
│  │  auth.ts          ─► Password hashing, JWT creation     │  │
│  │  api-usage.ts     ─► Usage tracking, limits, reset      │  │
│  │  gemini.ts        ─► AI analysis integration            │  │
│  │  fetch-article.ts ─► URL content fetching               │  │
│  │  google-auth.ts   ─► Google OAuth verification          │  │
│  │  db.ts            ─► Database connection                │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRISMA ORM                                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  User Model:                                             │ │
│  │  - id, email, fullName                                   │ │
│  │  - passwordHash, googleId                                │ │
│  │  - apiUsageCount, apiUsageLimit, apiUsageResetAt        │ │
│  │  - createdAt, updatedAt                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SQLITE DATABASE (dev.db)                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                      users table                         │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │ id │ email │ fullName │ passwordHash │ googleId │  │ │ │
│  │  ├────────────────────────────────────────────────────┤ │ │
│  │  │ apiUsageCount │ apiUsageLimit │ apiUsageResetAt │  │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│                                                                 │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  Google Gemini   │         │  Google OAuth    │            │
│  │      API         │         │    Identity      │            │
│  │                  │         │    Services      │            │
│  │  (AI Analysis)   │         │  (Sign-In)       │            │
│  └──────────────────┘         └──────────────────┘            │
│                                                                 │
│  ┌──────────────────┐                                          │
│  │  External URLs   │                                          │
│  │  (User submits)  │                                          │
│  │                  │                                          │
│  │  (Content fetch) │                                          │
│  └──────────────────┘                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### 1. User Registration Flow

```
User Browser                Next.js API              Database
     │                           │                       │
     │  1. Fill registration     │                       │
     │     form                  │                       │
     │                           │                       │
     │  2. POST /api/auth/       │                       │
     │     register              │                       │
     ├──────────────────────────►│                       │
     │                           │                       │
     │                           │  3. Validate input    │
     │                           │     (Zod)             │
     │                           │                       │
     │                           │  4. Hash password     │
     │                           │     (bcrypt)          │
     │                           │                       │
     │                           │  5. Create user       │
     │                           ├──────────────────────►│
     │                           │                       │
     │                           │  6. User created      │
     │                           │◄──────────────────────┤
     │                           │                       │
     │                           │  7. Generate JWT      │
     │                           │     token             │
     │                           │                       │
     │  8. Set cookie &          │                       │
     │     return user           │                       │
     │◄──────────────────────────┤                       │
     │                           │                       │
     │  9. Redirect to           │                       │
     │     landing page          │                       │
     │                           │                       │
```

### 2. URL Credibility Analysis Flow

```
User Browser          Next.js API        External URL      Gemini API      Database
     │                     │                   │                │              │
     │  1. Paste URL       │                   │                │              │
     │     & click         │                   │                │              │
     │     "Analyze"       │                   │                │              │
     │                     │                   │                │              │
     │  2. POST            │                   │                │              │
     │     /api/analyze    │                   │                │              │
     ├────────────────────►│                   │                │              │
     │                     │                   │                │              │
     │                     │  3. Verify JWT    │                │              │
     │                     │     & get user    │                │              │
     │                     ├───────────────────────────────────────────────────►│
     │                     │                   │                │              │
     │                     │  4. Check usage   │                │              │
     │                     │     limit         │                │              │
     │                     │◄──────────────────────────────────────────────────┤
     │                     │                   │                │              │
     │                     │  5. Fetch URL     │                │              │
     │                     │     content       │                │              │
     │                     ├──────────────────►│                │              │
     │                     │                   │                │              │
     │                     │  6. Return HTML   │                │              │
     │                     │◄──────────────────┤                │              │
     │                     │                   │                │              │
     │                     │  7. Extract title │                │              │
     │                     │     & text        │                │              │
     │                     │                   │                │              │
     │                     │  8. Send to       │                │              │
     │                     │     Gemini API    │                │              │
     │                     ├────────────────────────────────────►│              │
     │                     │                   │                │              │
     │                     │  9. AI analyzes   │                │              │
     │                     │     & returns     │                │              │
     │                     │     JSON          │                │              │
     │                     │◄────────────────────────────────────┤              │
     │                     │                   │                │              │
     │                     │  10. Increment    │                │              │
     │                     │      usage count  │                │              │
     │                     ├───────────────────────────────────────────────────►│
     │                     │                   │                │              │
     │  11. Return         │                   │                │              │
     │      analysis       │                   │                │              │
     │      result         │                   │                │              │
     │◄────────────────────┤                   │                │              │
     │                     │                   │                │              │
     │  12. Display        │                   │                │              │
     │      result card    │                   │                │              │
     │                     │                   │                │              │
```

### 3. Authentication Check Flow (Protected Routes)

```
User Browser              Next.js Server           Database
     │                          │                      │
     │  1. Navigate to          │                      │
     │     /verify              │                      │
     ├─────────────────────────►│                      │
     │                          │                      │
     │                          │  2. Check JWT        │
     │                          │     cookie           │
     │                          │                      │
     │                          │  3. Verify token     │
     │                          │                      │
     │                          │  4. Get user         │
     │                          ├─────────────────────►│
     │                          │                      │
     │                          │  5. Return user      │
     │                          │◄─────────────────────┤
     │                          │                      │
     │  6. Render page          │                      │
     │     with user data       │                      │
     │◄─────────────────────────┤                      │
     │                          │                      │
     
     OR (if not authenticated)
     
     │                          │                      │
     │                          │  2. No valid JWT     │
     │                          │                      │
     │  3. Redirect to          │                      │
     │     /login               │                      │
     │◄─────────────────────────┤                      │
     │                          │                      │
```

---

## 📂 Folder Structure with Responsibilities

```
agpAIso/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page (public)
│   ├── layout.tsx               # Root layout (wraps all pages)
│   ├── globals.css              # Global styles
│   │
│   ├── login/
│   │   └── page.tsx            # Login page (public)
│   │
│   ├── register/
│   │   └── page.tsx            # Registration page (public)
│   │
│   ├── verify/
│   │   └── page.tsx            # URL verification (protected)
│   │
│   ├── account/
│   │   ├── page.tsx            # Account settings (protected)
│   │   └── AccountClient.tsx   # Client component
│   │
│   ├── billing/
│   │   ├── page.tsx            # Usage dashboard (protected)
│   │   └── BillingClient.tsx   # Client component
│   │
│   └── api/                     # Backend API routes
│       ├── auth/
│       │   ├── register/
│       │   │   └── route.ts    # POST - Create account
│       │   ├── login/
│       │   │   └── route.ts    # POST - Login
│       │   ├── logout/
│       │   │   └── route.ts    # POST - Logout
│       │   ├── me/
│       │   │   └── route.ts    # GET - Current user
│       │   └── google/
│       │       └── route.ts    # POST - Google Sign-In
│       │
│       ├── analyze/
│       │   └── route.ts        # POST - Analyze URL
│       │
│       └── account/
│           └── google/
│               └── route.ts    # POST/DELETE - Link/unlink Google
│
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx          # Button component
│   │   ├── input.tsx           # Input component
│   │   ├── card.tsx            # Card component
│   │   └── ...                 # Other UI components
│   │
│   ├── verify/                  # Verification-specific
│   │   ├── VerifyClient.tsx    # Main verification UI
│   │   ├── ChatLayout.tsx      # Chat layout wrapper
│   │   ├── MessageBubble.tsx   # Message display
│   │   ├── ResultCard.tsx      # Analysis result
│   │   └── TypingDots.tsx      # Loading animation
│   │
│   ├── navbar.tsx              # Main navigation
│   ├── hero-section.tsx        # Landing hero
│   ├── features-section.tsx    # Features showcase
│   ├── pricing-section.tsx     # Pricing plans
│   └── ...                     # Other sections
│
├── lib/                         # Business logic & utilities
│   ├── auth.ts                 # Password hashing, JWT
│   ├── api-usage.ts            # Usage tracking, limits
│   ├── gemini.ts               # Gemini API integration
│   ├── fetch-article.ts        # URL content fetching
│   ├── google-auth.ts          # Google OAuth
│   └── db.ts                   # Database connection
│
├── prisma/                      # Database
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
│
├── public/                      # Static assets
│   ├── images/
│   └── videos/
│
├── hooks/                       # Custom React hooks
│   ├── use-toast.ts
│   └── use-in-view.ts
│
├── docs/                        # Documentation
│   └── UAT_*.md               # User acceptance testing
│
├── .env                        # Environment variables (SECRET)
├── .env.example               # Environment template
├── package.json               # Dependencies & scripts
├── next.config.mjs            # Next.js config
├── tailwind.config.js         # Tailwind config
├── tsconfig.json              # TypeScript config
│
├── README.md                  # Project overview
├── PROJECT_GUIDE.md           # Complete guide ⭐
├── PRESENTATION_CHEATSHEET.md # Presentation guide ⭐
└── ARCHITECTURE_DIAGRAM.md    # This file
```

---

## 🔐 Authentication & Session Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION SYSTEM                    │
└─────────────────────────────────────────────────────────────┘

Registration/Login
       │
       ▼
┌──────────────┐
│   Validate   │  ◄── Zod schema validation
│    Input     │
└──────────────┘
       │
       ▼
┌──────────────┐
│     Hash     │  ◄── bcrypt (password only)
│   Password   │
└──────────────┘
       │
       ▼
┌──────────────┐
│    Create    │  ◄── Prisma create/findUnique
│     User     │
└──────────────┘
       │
       ▼
┌──────────────┐
│   Generate   │  ◄── jose library
│     JWT      │
└──────────────┘
       │
       ▼
┌──────────────┐
│  Set Cookie  │  ◄── HTTP-only, SameSite=Lax, 7 days
│ agpaiso_     │
│  session     │
└──────────────┘
       │
       ▼
┌──────────────┐
│   Redirect   │  ◄── To landing page
│     User     │
└──────────────┘

Protected Route Access
       │
       ▼
┌──────────────┐
│  Read Cookie │  ◄── agpaiso_session
└──────────────┘
       │
       ▼
┌──────────────┐
│  Verify JWT  │  ◄── jose library
└──────────────┘
       │
       ├─── Valid ───────► Allow access
       │
       └─── Invalid ─────► Redirect to /login
```

---

## 🤖 AI Analysis Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│              URL CREDIBILITY ANALYSIS PIPELINE              │
└─────────────────────────────────────────────────────────────┘

User submits URL
       │
       ▼
┌──────────────────┐
│  Authenticate    │  ◄── Check JWT token
│      User        │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Check Usage     │  ◄── apiUsageCount < apiUsageLimit?
│     Limit        │
└──────────────────┘
       │
       ├─── At limit ────► Return 403 error
       │
       ▼
┌──────────────────┐
│  Fetch URL       │  ◄── lib/fetch-article.ts
│    Content       │      - HTTP GET request
└──────────────────┘      - 10 second timeout
       │                  - Extract HTML
       ▼
┌──────────────────┐
│  Extract Title   │  ◄── Parse <title> tag
│   and Text       │      - Strip HTML tags
└──────────────────┘      - Limit to ~30k chars
       │
       ▼
┌──────────────────┐
│  Send to Gemini  │  ◄── lib/gemini.ts
│       API        │      - POST to Gemini API
└──────────────────┘      - Structured prompt
       │                  - Request JSON response
       ▼
┌──────────────────┐
│  AI Analyzes     │  ◄── Gemini processes:
│    Content       │      - Source credibility
└──────────────────┘      - Content quality
       │                  - Citations
       ▼                  - Writing style
┌──────────────────┐
│  Parse Response  │  ◄── Extract:
│      JSON        │      - score (0-10)
└──────────────────┘      - verdict
       │                  - summary
       ▼                  - reasoning
┌──────────────────┐      - factors (optional)
│   Increment      │  ◄── apiUsageCount++
│  Usage Count     │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Return Result   │  ◄── Send to frontend
│   to Frontend    │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Display Result  │  ◄── ResultCard component
│      Card        │      - Score visualization
└──────────────────┘      - Verdict badge
                          - Summary & reasoning
                          - Counter facts
```

---

## 💾 Database Schema Visual

```
┌─────────────────────────────────────────────────────────────┐
│                         users TABLE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  id                 String      PRIMARY KEY                 │
│  email              String      UNIQUE, NOT NULL            │
│  fullName           String      NOT NULL                    │
│  passwordHash       String?     NULLABLE (Google-only OK)   │
│  googleId           String?     UNIQUE, NULLABLE            │
│  apiUsageCount      Int         DEFAULT 0                   │
│  apiUsageLimit      Int         DEFAULT 50                  │
│  apiUsageResetAt    DateTime?   NULLABLE                    │
│  createdAt          DateTime    DEFAULT now()               │
│  updatedAt          DateTime    AUTO UPDATE                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Example User Record:
┌──────────────────────────────────────────────────────────────┐
│ id: "clx1234567890abcdef"                                   │
│ email: "student@example.com"                                │
│ fullName: "John Doe"                                        │
│ passwordHash: "$2a$10$..." (bcrypt hash)                    │
│ googleId: null                                              │
│ apiUsageCount: 15                                           │
│ apiUsageLimit: 50                                           │
│ apiUsageResetAt: 2026-04-23T16:00:00.000Z                  │
│ createdAt: 2026-04-20T10:30:00.000Z                        │
│ updatedAt: 2026-04-23T14:25:00.000Z                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 🌐 API Endpoints Map

```
┌─────────────────────────────────────────────────────────────┐
│                      API ENDPOINTS                          │
└─────────────────────────────────────────────────────────────┘

Authentication
├── POST   /api/auth/register     Create new account
├── POST   /api/auth/login        Login with email/password
├── POST   /api/auth/google       Google Sign-In
├── POST   /api/auth/logout       Clear session
└── GET    /api/auth/me           Get current user

Analysis
└── POST   /api/analyze           Analyze URL credibility
                                  (Requires authentication)

Account Management
├── POST   /api/account/google    Link Google account
└── DELETE /api/account/google    Unlink Google account
                                  (Both require authentication)
```

---

## 🔄 State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION STATE                        │
└─────────────────────────────────────────────────────────────┘

Global State (via JWT Cookie)
├── User Authentication Status
│   ├── Logged in: JWT cookie present & valid
│   └── Logged out: No JWT cookie or invalid
│
└── User Data (from /api/auth/me)
    ├── id
    ├── email
    ├── fullName
    ├── apiUsageCount
    └── apiUsageLimit

Component State (React useState)
├── Verify Page
│   ├── messages[] (chat history)
│   ├── inputUrl (current input)
│   ├── isLoading (analysis in progress)
│   └── error (error message if any)
│
├── Billing Page
│   ├── billingCycle (monthly/yearly)
│   └── selectedPlan (user selection)
│
└── Account Page
    └── linkingStatus (Google link state)

Server State (Database)
├── User records
├── Usage counts
└── Reset timestamps
```

---

## 🎨 Component Hierarchy

```
App Layout (app/layout.tsx)
│
├── Landing Page (app/page.tsx)
│   ├── Navbar
│   ├── Hero Section
│   ├── Features Section
│   ├── How It Works Section
│   ├── Testimonials Section
│   ├── FAQ Section
│   ├── Pricing Section
│   ├── CTA Section
│   └── Footer
│
├── Login Page (app/login/page.tsx)
│   ├── Login Form
│   └── Google Sign-In Button
│
├── Register Page (app/register/page.tsx)
│   ├── Registration Form
│   └── Google Sign-In Button
│
├── Verify Page (app/verify/page.tsx) [PROTECTED]
│   └── VerifyClient
│       ├── ChatLayout
│       │   ├── Header (with logout)
│       │   └── Usage Counter
│       ├── Message List
│       │   └── MessageBubble (multiple)
│       │       └── ResultCard (for AI responses)
│       └── Input Area
│           └── Submit Button
│
├── Account Page (app/account/page.tsx) [PROTECTED]
│   └── AccountClient
│       ├── Profile Section
│       └── Google Link Section
│
└── Billing Page (app/billing/page.tsx) [PROTECTED]
    └── BillingClient
        ├── Usage Section
        │   └── Progress Bar
        └── Plans Section
            └── Plan Cards (3)
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                    │
└─────────────────────────────────────────────────────────────┘

User Browser
     │
     │ HTTPS
     ▼
┌──────────────┐
│   Vercel     │  ◄── Hosting platform
│   CDN       │      - Global edge network
└──────────────┘      - Automatic HTTPS
     │                - Serverless functions
     ▼
┌──────────────┐
│  Next.js     │  ◄── Application
│  Server      │      - SSR & API routes
└──────────────┘      - Static optimization
     │
     ├────────────────────────────┐
     │                            │
     ▼                            ▼
┌──────────────┐          ┌──────────────┐
│  PostgreSQL  │          │   External   │
│  Database    │          │   Services   │
│              │          │              │
│  (Neon/      │          │  - Gemini    │
│   Supabase)  │          │  - Google    │
└──────────────┘          │    OAuth     │
                          └──────────────┘

Environment Variables (Vercel)
├── DATABASE_URL (PostgreSQL connection)
├── JWT_SECRET (production secret)
├── GEMINI_API_KEY
├── GOOGLE_CLIENT_ID
└── NEXT_PUBLIC_GOOGLE_CLIENT_ID
```

---

## 📊 Technology Stack Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                         │
└─────────────────────────────────────────────────────────────┘

Frontend
├── Framework: Next.js 16 (App Router)
├── UI Library: React 19
├── Language: TypeScript 5
├── Styling: Tailwind CSS 4
├── Components: Radix UI (headless)
├── Animations: Framer Motion
├── Icons: Lucide React
└── Forms: React Hook Form + Zod

Backend
├── Runtime: Node.js (via Next.js)
├── API: Next.js API Routes
├── Database ORM: Prisma 7
├── Database: SQLite (dev) / PostgreSQL (prod)
├── Authentication: JWT (jose library)
├── Password Hashing: bcryptjs
└── Validation: Zod

External Services
├── AI: Google Gemini API
├── OAuth: Google Identity Services
└── Content Fetch: Native fetch API

Development Tools
├── Package Manager: npm
├── Linting: ESLint
├── Type Checking: TypeScript
└── Database GUI: Prisma Studio
```

---

## 🎯 Key Takeaways

1. **Full-Stack Architecture** - Frontend, backend, and database all in one Next.js app
2. **Modern Tech Stack** - Latest versions of Next.js, React, and TypeScript
3. **Secure Authentication** - JWT tokens, password hashing, OAuth integration
4. **AI Integration** - Real Google Gemini API for credibility analysis
5. **Database Management** - Prisma ORM with SQLite (easily upgradable)
6. **Usage Tracking** - Daily limits with automatic reset
7. **Responsive Design** - Works on all devices
8. **Production Ready** - Can be deployed with minimal changes

---

**For more details, see:**
- `PROJECT_GUIDE.md` - Complete technical guide
- `PRESENTATION_CHEATSHEET.md` - Presentation reference
- `README.md` - Project overview

---

*This diagram is for educational purposes to help the team understand the system architecture.*
