# agpAIso - Complete Project Guide

**Last Updated:** April 23, 2026  
**Project Status:** Ready for Presentation  
**Target Audience:** Team members (beginner-friendly)

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [What Is This Project?](#what-is-this-project)
3. [Tech Stack Overview](#tech-stack-overview)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [How to Run the Project](#how-to-run-the-project)
7. [Environment Setup](#environment-setup)
8. [Database & Data](#database--data)
9. [Authentication Flow](#authentication-flow)
10. [Main User Flows](#main-user-flows)
11. [API Endpoints](#api-endpoints)
12. [Folder Guide](#folder-guide)
13. [Common Tasks](#common-tasks)
14. [Troubleshooting](#troubleshooting)
15. [Presentation Tips](#presentation-tips)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (copy .env.example to .env)
cp .env.example .env

# 3. Generate Prisma client
npm run prisma:generate

# 4. Run database migrations
npm run prisma:migrate

# 5. Start development server
npm run dev

# 6. Open browser
# Visit http://localhost:3000
```

---

## 🎯 What Is This Project?

**agpAIso** is an AI-powered URL credibility checker that helps students verify if online sources are trustworthy or potentially fake news.

### The Problem It Solves
Students often struggle to determine if online articles and sources are credible. This tool uses AI to analyze URLs and provide:
- **Credibility Score** (0-10)
- **Verdict** (Credible, Questionable, Not Credible)
- **Summary** of the content
- **Reasoning** behind the score
- **Counter Facts** to watch out for

### Target Users
- Students researching for assignments
- Anyone who wants to fact-check online content quickly

---

## 🛠️ Tech Stack Overview

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI (headless components)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js (via Next.js API Routes)
- **Database:** SQLite (via Prisma ORM)
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs for password hashing
- **AI Provider:** Google Gemini API

### Key Libraries
- **Prisma:** Database ORM (Object-Relational Mapping)
- **jose:** JWT creation and verification
- **zod:** Input validation
- **react-hook-form:** Form handling
- **Google Auth Library:** Google Sign-In integration

---

## 📁 Project Structure

```
agpAIso/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page (/)
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── verify/              # URL verification workspace (protected)
│   ├── account/             # Account settings (protected)
│   ├── billing/             # Usage & plans (protected)
│   ├── api/                 # API routes (backend endpoints)
│   │   ├── auth/           # Authentication endpoints
│   │   ├── analyze/        # URL analysis endpoint
│   │   └── account/        # Account management endpoints
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
│
├── components/              # Reusable React components
│   ├── ui/                 # Base UI components (buttons, inputs, etc.)
│   ├── verify/             # Verification workspace components
│   ├── navbar.tsx          # Main navigation
│   ├── hero-section.tsx    # Landing hero
│   └── ...                 # Other landing sections
│
├── lib/                     # Utility functions & business logic
│   ├── auth.ts             # Authentication helpers
│   ├── api-usage.ts        # Usage tracking & limits
│   ├── gemini.ts           # Gemini AI integration
│   ├── fetch-article.ts    # URL content fetching
│   ├── google-auth.ts      # Google OAuth helpers
│   └── db.ts               # Database connection
│
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migration files
│
├── public/                  # Static assets (images, videos)
├── hooks/                   # Custom React hooks
├── styles/                  # Additional stylesheets
├── docs/                    # Documentation files
│
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example            # Environment template
├── package.json            # Dependencies & scripts
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## ✨ Key Features

### 1. **User Authentication**
- Email/password registration and login
- Google Sign-In integration
- JWT-based session management
- Protected routes (verify, account, billing)

### 2. **URL Credibility Analysis**
- Submit any public URL
- AI analyzes content using Google Gemini
- Returns credibility score, verdict, summary, and reasoning
- Chat-style interface for easy interaction

### 3. **Usage Limits**
- Free tier: 50 checks per day
- Usage resets daily at 12:00 AM Philippine Time (PHT)
- Real-time usage counter
- Upgrade prompts when limit reached

### 4. **Account Management**
- View profile information
- Link/unlink Google account
- Manage authentication methods

### 5. **Billing Dashboard**
- View current usage
- See available plans (Free, Pro, Unlimited)
- Usage visualization with progress bars

---

## 🏃 How to Run the Project

### Prerequisites
- **Node.js** 18+ installed
- **npm** (comes with Node.js)
- **Git** (for version control)

### Step-by-Step Setup

#### 1. Clone the Repository (if not already done)
```bash
git clone <repository-url>
cd AgpAIso_LP
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual values
# Use any text editor (VS Code, Notepad, etc.)
```

#### 4. Generate Prisma Client
```bash
npx prisma generate
```

#### 5. Run Database Migrations
```bash
npx prisma migrate dev
```

#### 6. Start Development Server
```bash
npm run dev
```

#### 7. Open in Browser
Navigate to: `http://localhost:3000`

---

## 🔐 Environment Setup

Create a `.env` file in the project root with these variables:

```env
# Database (SQLite file path)
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a random string)
# You can use: openssl rand -base64 32
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Google Gemini API Key
# Get from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY="your-gemini-api-key-here"

# Optional: Gemini model override
GEMINI_MODEL="gemini-2.5-flash-lite"

# Google OAuth (for Google Sign-In)
# Get from: https://console.cloud.google.com/
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
```

### How to Get API Keys

#### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and paste into `.env`

#### Google OAuth Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized JavaScript origins: `http://localhost:3000`
7. Copy Client ID to `.env`

---

## 💾 Database & Data

### Database Type
- **SQLite** - A file-based database (stored as `dev.db`)
- No separate database server needed
- Perfect for development and small projects

### Database Schema

#### User Table
```prisma
model User {
  id              String    # Unique user ID
  email           String    # User email (unique)
  fullName        String    # User's full name
  passwordHash    String?   # Hashed password (nullable for Google-only accounts)
  googleId        String?   # Google account ID (if linked)
  apiUsageCount   Int       # Current usage count
  apiUsageLimit   Int       # Daily limit (default: 50)
  apiUsageResetAt DateTime? # Last reset timestamp
  createdAt       DateTime  # Account creation date
  updatedAt       DateTime  # Last update date
}
```

### Database Commands

```bash
# Generate Prisma client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description_of_change

# Open Prisma Studio (visual database editor)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## 🔑 Authentication Flow

### Registration Flow
1. User fills out registration form (email, name, password)
2. Frontend validates input
3. POST request to `/api/auth/register`
4. Backend validates and hashes password
5. Creates user in database
6. Issues JWT token in HTTP-only cookie
7. Redirects to landing page (logged in)

### Login Flow
1. User enters email and password
2. POST request to `/api/auth/login`
3. Backend verifies password
4. Issues JWT token in cookie
5. Redirects to landing page (logged in)

### Google Sign-In Flow
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User authorizes
4. Frontend receives Google ID token
5. POST request to `/api/auth/google` with token
6. Backend verifies token with Google
7. Creates or links user account
8. Issues JWT token in cookie
9. Redirects to landing page (logged in)

### Session Management
- JWT stored in HTTP-only cookie named `agpaiso_session`
- Cookie expires after 7 days
- Protected routes check for valid JWT
- `/api/auth/me` endpoint returns current user or null

---

## 🎬 Main User Flows

### 1. New User Registration
```
Landing Page → Click "Get Started" → Register Form → 
Enter Details → Submit → Logged In → Landing Page
```

### 2. Existing User Login
```
Landing Page → Click "Login" → Login Form → 
Enter Credentials → Submit → Logged In → Landing Page
```

### 3. URL Verification (Core Feature)
```
Logged In → Click "Analyze Now" or "Verify" → 
Verify Page → Paste URL → Click "Analyze" → 
Loading Animation → Result Card with Score/Verdict/Summary
```

### 4. Check Usage
```
Logged In → Click "Billing" → 
View Usage Bar → See Remaining Checks → 
View Available Plans
```

### 5. Link Google Account
```
Logged In → Click "Account" → 
Click "Link Google Account" → 
Google OAuth → Account Linked
```

---

## 🌐 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
**Purpose:** Create new user account  
**Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "SecurePass123!"
}
```
**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

#### POST `/api/auth/login`
**Purpose:** Log in existing user  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
**Response:**
```json
{
  "user": { ... }
}
```

#### POST `/api/auth/google`
**Purpose:** Google Sign-In  
**Body:**
```json
{
  "credential": "google-id-token"
}
```

#### GET `/api/auth/me`
**Purpose:** Get current logged-in user  
**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "fullName": "...",
    "apiUsageCount": 5,
    "apiUsageLimit": 50
  }
}
```

#### POST `/api/auth/logout`
**Purpose:** Log out user (clears session cookie)

### Analysis Endpoint

#### POST `/api/analyze`
**Purpose:** Analyze URL credibility  
**Requires:** Authentication  
**Body:**
```json
{
  "url": "https://example.com/article"
}
```
**Response:**
```json
{
  "success": true,
  "url": "https://example.com/article",
  "title": "Article Title",
  "analysis": {
    "score": 7.5,
    "summary": "This article appears credible...",
    "reasoning": "The source is well-established...",
    "verdict": "Credible",
    "factors": [
      "Established news source",
      "Multiple citations",
      "Recent publication"
    ]
  },
  "remaining": 45
}
```

### Account Endpoints

#### POST `/api/account/google`
**Purpose:** Link Google account to existing user

#### DELETE `/api/account/google`
**Purpose:** Unlink Google account

---

## 📂 Folder Guide

### `/app` - Pages & Routes
This is where all pages live. Each folder becomes a route.

- **`page.tsx`** - Landing page (home)
- **`login/page.tsx`** - Login page
- **`register/page.tsx`** - Registration page
- **`verify/page.tsx`** - URL verification workspace (protected)
- **`account/page.tsx`** - Account settings (protected)
- **`billing/page.tsx`** - Usage dashboard (protected)
- **`api/`** - Backend API routes (server-side code)

### `/components` - Reusable UI Components
All React components that are used across pages.

- **`ui/`** - Base components (buttons, inputs, cards, dialogs, etc.)
- **`verify/`** - Verification-specific components
  - `VerifyClient.tsx` - Main verification interface
  - `ChatLayout.tsx` - Chat-style layout wrapper
  - `MessageBubble.tsx` - Individual message display
  - `ResultCard.tsx` - Analysis result display
  - `TypingDots.tsx` - Loading animation
- **`navbar.tsx`** - Main navigation bar
- **`hero-section.tsx`** - Landing page hero
- **`features-section.tsx`** - Features showcase
- **`pricing-section.tsx`** - Pricing plans
- **`footer.tsx`** - Site footer

### `/lib` - Business Logic & Utilities
Backend helper functions and core logic.

- **`auth.ts`** - Password hashing, JWT creation/verification
- **`api-usage.ts`** - Usage tracking, limit checking, daily reset
- **`gemini.ts`** - Google Gemini API integration
- **`fetch-article.ts`** - Fetch and parse URL content
- **`google-auth.ts`** - Google OAuth token verification
- **`db.ts`** - Database connection setup

### `/prisma` - Database
Database schema and migrations.

- **`schema.prisma`** - Database structure definition
- **`migrations/`** - Database version history

### `/public` - Static Files
Images, videos, and other static assets.

---

## 🔧 Common Tasks

### Adding a New Page
1. Create folder in `/app` (e.g., `/app/about`)
2. Add `page.tsx` file
3. Export default React component
4. Access at `/about`

### Creating a New Component
1. Create file in `/components` (e.g., `my-component.tsx`)
2. Write React component
3. Export component
4. Import where needed

### Modifying Database Schema
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name change_description`
3. Run `npx prisma generate`
4. Restart dev server

### Adding a New API Endpoint
1. Create route file in `/app/api` (e.g., `/app/api/hello/route.ts`)
2. Export GET, POST, etc. functions
3. Access at `/api/hello`

### Styling Components
- Use Tailwind CSS classes directly in JSX
- Global styles in `app/globals.css`
- Component-specific styles inline or in CSS modules

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database errors
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: deletes data)
npx prisma migrate reset
```

### Port 3000 already in use
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Environment variables not working
- Make sure `.env` file exists in project root
- Restart dev server after changing `.env`
- Check for typos in variable names

### Google Sign-In not working
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- Check authorized origins in Google Cloud Console
- Make sure you're using `http://localhost:3000` (not 127.0.0.1)

### Gemini API errors
- Verify `GEMINI_API_KEY` is correct
- Check API quota in Google AI Studio
- Try different model: `GEMINI_MODEL="gemini-1.5-pro"`

---

## 🎤 Presentation Tips

### Demo Flow Suggestion
1. **Start with Landing Page**
   - Show clean, professional design
   - Highlight key features
   - Point out "Analyze Now" CTA

2. **Show Registration**
   - Quick sign-up process
   - Mention Google Sign-In option
   - Show validation (try weak password)

3. **Main Feature: URL Verification**
   - Paste a real news URL
   - Show loading animation
   - Explain the result:
     - Credibility score
     - Verdict classification
     - Summary and reasoning
     - Counter facts to watch for

4. **Show Usage Tracking**
   - Navigate to Billing page
   - Show usage bar
   - Explain daily limit and reset time
   - Show plan options

5. **Account Management**
   - Show Account page
   - Demonstrate Google account linking

### Key Points to Emphasize
- **Problem:** Students struggle to verify online sources
- **Solution:** AI-powered credibility analysis in seconds
- **Technology:** Modern web stack (Next.js, React, AI)
- **User Experience:** Clean, intuitive, chat-style interface
- **Scalability:** Usage limits, multiple plans, authentication

### Technical Highlights
- Full-stack application (frontend + backend)
- Real AI integration (Google Gemini)
- Secure authentication (JWT, bcrypt)
- Database management (Prisma + SQLite)
- Modern React patterns (hooks, server components)
- Responsive design (mobile-friendly)

### Questions You Might Get

**Q: How does the AI analysis work?**  
A: We fetch the article content, send it to Google Gemini API with a structured prompt, and parse the JSON response containing score, verdict, and reasoning.

**Q: Is the data secure?**  
A: Yes, passwords are hashed with bcrypt, sessions use HTTP-only cookies, and we follow security best practices.

**Q: Can it scale?**  
A: Yes, the architecture supports multiple plans, usage limits, and can be deployed to production with minimal changes.

**Q: What happens when the limit is reached?**  
A: Users see a clear message and are prompted to upgrade. Free tier resets daily at midnight PHT.

**Q: Why SQLite?**  
A: Perfect for development and small-scale deployment. Can easily migrate to PostgreSQL or MySQL for production.

---

## 📝 Quick Reference

### Important Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality
npx prisma studio    # Open database GUI
npx prisma generate  # Regenerate Prisma client
```

### Important Files
- `.env` - Environment variables (secrets)
- `package.json` - Dependencies and scripts
- `prisma/schema.prisma` - Database schema
- `app/api/analyze/route.ts` - Main analysis logic
- `lib/gemini.ts` - AI integration
- `components/verify/VerifyClient.tsx` - Main UI

### Important URLs (when running)
- `http://localhost:3000` - Landing page
- `http://localhost:3000/login` - Login
- `http://localhost:3000/register` - Register
- `http://localhost:3000/verify` - Verification workspace
- `http://localhost:3000/billing` - Usage dashboard
- `http://localhost:3000/account` - Account settings

---

## 🎓 Learning Resources

### For Beginners
- [Next.js Tutorial](https://nextjs.org/learn)
- [React Documentation](https://react.dev/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)

### For This Project
- [Next.js App Router](https://nextjs.org/docs/app)
- [Prisma with SQLite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [JWT Authentication](https://jwt.io/introduction)
- [Google Gemini API](https://ai.google.dev/docs)

---

## ✅ Pre-Presentation Checklist

- [ ] `.env` file is configured with all required keys
- [ ] Database is set up (`npx prisma generate` and `npx prisma migrate dev`)
- [ ] Development server starts without errors (`npm run dev`)
- [ ] Can register a new account
- [ ] Can log in with credentials
- [ ] Can analyze a URL successfully
- [ ] Usage counter updates correctly
- [ ] Billing page shows usage
- [ ] Account page loads
- [ ] Google Sign-In works (if configured)
- [ ] Mobile view looks good
- [ ] No console errors in browser

---

## 🚀 Deployment Notes (Future)

When ready to deploy to production:

1. **Environment Variables**
   - Set all `.env` variables in hosting platform
   - Use strong `JWT_SECRET`
   - Configure production Google OAuth origins

2. **Database**
   - Consider migrating to PostgreSQL or MySQL
   - Update `DATABASE_URL` in `.env`
   - Run migrations on production database

3. **Hosting Options**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Render

4. **Build Command**
   ```bash
   npm run build
   ```

5. **Start Command**
   ```bash
   npm run start
   ```

---

## 📞 Support & Contact

For questions or issues:
- Check this guide first
- Review code comments
- Check Next.js and Prisma documentation
- Ask team lead

---

**Good luck with your presentation! 🎉**

*Remember: You built something real that solves a real problem. Be confident!*
