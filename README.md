# agpAIso - AI-Powered URL Credibility Checker

> An intelligent web application that helps students verify the credibility of online sources using AI.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API keys

# Set up database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📖 Documentation

**For complete setup and usage instructions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)**

The guide includes:
- Complete tech stack overview
- Detailed folder structure
- Step-by-step setup instructions
- API endpoint documentation
- Troubleshooting tips
- Presentation guidelines

## ✨ Features

- 🔐 **Secure Authentication** - Email/password + Google Sign-In
- 🤖 **AI-Powered Analysis** - Google Gemini integration
- 📊 **Credibility Scoring** - 0-10 scale with detailed reasoning
- 💬 **Chat Interface** - Intuitive conversation-style UI
- 📈 **Usage Tracking** - Daily limits with automatic reset
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

### Backend
- Next.js API Routes
- Prisma ORM
- SQLite Database
- JWT Authentication
- Google Gemini API

## 📁 Project Structure

```
agpAIso/
├── app/              # Pages and API routes
├── components/       # React components
├── lib/              # Business logic
├── prisma/           # Database schema
├── public/           # Static assets
└── docs/             # Documentation
```

## 🔑 Environment Variables

Required variables (see `.env.example`):

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_ID="your-google-client-id"
```

## 📜 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run setup            # Complete setup (install + DB)
```

## 🎯 Core Features

### URL Credibility Analysis
Submit any public URL and receive:
- **Credibility Score** (0-10)
- **Verdict** (Credible, Questionable, Not Credible)
- **Summary** of the content
- **Reasoning** behind the score
- **Counter Facts** to watch for

### User Management
- Secure registration and login
- Google OAuth integration
- Protected routes
- Session management

### Usage Limits
- Free tier: 50 checks/day
- Automatic daily reset (12:00 AM PHT)
- Real-time usage tracking
- Upgrade prompts

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens in HTTP-only cookies
- Input validation with Zod
- Protected API routes
- Secure session management

## 📱 Pages

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/verify` - URL verification workspace (protected)
- `/account` - Account settings (protected)
- `/billing` - Usage dashboard (protected)

## 🤝 Contributing

This is a student project. For questions or issues, refer to the [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

## 📄 License

Private project for educational purposes.

## 👥 Team

Developed by students for students.

---

**For detailed documentation, troubleshooting, and presentation tips, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)**
