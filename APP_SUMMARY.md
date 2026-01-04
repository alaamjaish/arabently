# 🌙 Arabently - Saudi Arabic Learning Platform

> **"Learn the Saudi Dialect The Smart Way"**

Arabently is a modern course platform designed to teach conversational Saudi Arabic through an innovative "Next Step" system that guides students through a structured learning path with built-in spaced repetition.

---

## 🎯 Core Concept

Unlike traditional course platforms where students navigate freely, Arabently uses a **guided roadmap system**:

1. **Next Step Dashboard** - Students see exactly what to do next (watch a lesson, listen to a script, review previous content)
2. **Spaced Repetition** - The system automatically schedules content reviews at optimal intervals
3. **Listening Practice** - AI-generated Saudi dialect audio using Google Gemini TTS
4. **Progress Tracking** - Track completion and current step in the learning journey

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16.1** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Supabase** | Authentication, Database (PostgreSQL), RLS |
| **Google Gemini API** | Text-to-Speech for Saudi dialect audio |
| **next-themes** | Dark/Light mode support |
| **Vercel** | Deployment |

---

## 📁 Project Structure

```
arabently/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/           # Login page
│   │   │   ├── signup/          # Registration page
│   │   │   └── pending/         # Pending approval page
│   │   ├── (dashboard)/         # Protected dashboard pages
│   │   │   ├── dashboard/       # Main dashboard with "Next Step"
│   │   │   ├── course/[slug]/   # Course overview
│   │   │   │   ├── lesson/[lessonId]/  # Lesson detail page
│   │   │   │   └── script/[scriptId]/  # Script listening page
│   │   │   └── layout.tsx       # Dashboard layout with sidebar
│   │   ├── api/
│   │   │   └── tts/route.ts     # Google Gemini TTS API endpoint
│   │   ├── globals.css          # Global styles & theme variables
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── InlineTTSPlayer.tsx  # Compact audio player for lessons
│   │   ├── TTSAudioPlayer.tsx   # Full audio player for scripts
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   └── ThemeToggle.tsx      # Dark/Light mode toggle
│   ├── lib/
│   │   └── supabase/            # Supabase client utilities
│   └── middleware.ts            # Auth middleware
├── supabase/
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Mock data seed file
└── public/                      # Static assets
```

---

## 🗃️ Database Schema

### Tables Overview

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends auth.users) |
| `courses` | Course metadata |
| `units` | Course units (10 per course) |
| `lessons` | Individual lessons (5 per unit, 50 total) |
| `scripts` | Audio scripts for listening practice |
| `roadmap_steps` | The "Next Step" sequence |
| `student_progress` | User progress tracking |
| `enrollments` | Course enrollments |

### Key Relationships

```
courses
  └── units (1:many)
        └── lessons (1:many)
              └── scripts (1:many)
  └── roadmap_steps (1:many)
  └── student_progress (1:many per user)
```

### Roadmap Step Types

- `lesson` - Watch a new lesson
- `script` - Listen to a new script
- `review_script` - Review a previously heard script (spaced repetition)

---

## ✨ Key Features

### 1. **Next Step System**
The homepage shows exactly what the student should do next based on their progress. No decision paralysis - just click "Next Step" and continue learning.

### 2. **AI-Powered Saudi Dialect TTS**
- Uses **Google Gemini 2.5 Flash TTS** for natural Arabic speech
- Custom prompts ensure authentic Saudi dialect pronunciation
- Audio generates on-demand for scripts and listening practice
- Fallback to Gemini Pro for enhanced quality

### 3. **Bilingual Interface**
- English + Arabic UI throughout
- Arabic content rendered with proper RTL support
- Beautiful Arabic typography (IBM Plex Sans Arabic, Amiri fonts)

### 4. **Theme Support**
- Light and dark modes
- Warm, cultural color palette
- Arabic-inspired design elements

### 5. **Mobile Responsive**
- Fully responsive across all devices
- Mobile-optimized navigation
- Touch-friendly audio controls

### 6. **Approval-Based Access**
- Users sign up and await approval
- Admin approves users in Supabase
- Approved users can access course content

---

## 📚 Course Structure

**Foundational Arabic Course** - كورس تأسيس العربية

| Component | Count |
|-----------|-------|
| Units | 10 |
| Lessons per Unit | 5 |
| Total Lessons | 50 |
| Scripts | 23+ |
| Roadmap Steps | 86 |

### Sample Unit Topics
1. Greetings & Basic Phrases
2. Introductions
3. Numbers & Counting
4. Food & Drinks
5. Shopping & Bargaining
6. Directions & Places
7. Time & Schedules
8. Family & Relationships
9. Weather & Seasons
10. Culture & Customs

---

## 🔐 Authentication Flow

1. **Sign Up** → User registers with email/password
2. **Pending** → Redirected to pending approval page
3. **Admin Approval** → Admin sets `is_approved = true` in Supabase
4. **Access Granted** → User can access dashboard and course content

---

## 🎨 Design System

### Colors (Dark Mode)
- Background: Deep charcoal (`#1a1814`)
- Card: Warm dark (`#252118`)
- Primary: Gold/Amber (`#d4a853`)
- Accent: Coral/Rose (`#c75c5c`)

### Colors (Light Mode)
- Background: Warm cream (`#faf8f5`)
- Card: Pure white (`#ffffff`)
- Primary: Deep amber (`#b8860b`)
- Accent: Terracotta (`#a04040`)

### Typography
- **Headers**: Amiri (Arabic calligraphic style)
- **Body**: IBM Plex Sans Arabic (clean, modern)

---

## 🔧 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google AI (for TTS)
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🚀 Deployment

- **Platform**: Vercel
- **URL**: arabently.vercel.app (or custom domain)
- **Database**: Supabase (PostgreSQL)
- **CDN**: Vercel Edge Network

---

## 📝 Future Features (Planned)

1. **AI Tutor** - Speech-based practice with Google AI
   - Live conversation practice
   - Context-aware based on completed lessons
   - Pronunciation feedback
   - Custom prompts per lesson/unit

2. **Video Hosting** - Move from YouTube embeds to dedicated hosting
3. **Payment Integration** - Course purchases
4. **Admin Dashboard** - User management, content management

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📄 License

Private - All rights reserved.

---

*Built with ❤️ for Arabic learners worldwide*

