# Product Requirements Document (PRD)
## Arabently - Saudi Arabic Learning Platform

**Version:** 1.0  
**Last Updated:** January 4, 2026  
**Author:** Arabently Team  
**Status:** In Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Vision & Goals](#3-vision--goals)
4. [Target Users](#4-target-users)
5. [User Personas](#5-user-personas)
6. [User Journey](#6-user-journey)
7. [Feature Requirements](#7-feature-requirements)
8. [Technical Architecture](#8-technical-architecture)
9. [Database Design](#9-database-design)
10. [API Specifications](#10-api-specifications)
11. [UI/UX Requirements](#11-uiux-requirements)
12. [Success Metrics](#12-success-metrics)
13. [Release Phases](#13-release-phases)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Appendix](#15-appendix)

---

## 1. Executive Summary

### 1.1 Product Overview

**Arabently** is an innovative online learning platform specifically designed to teach conversational Saudi Arabic to non-native speakers. Unlike traditional language learning apps that rely on gamification or generic content, Arabently provides a structured, guided learning experience through a unique "Next Step" system that eliminates decision paralysis and ensures optimal learning progression.

### 1.2 Key Differentiators

| Feature | Traditional Platforms | Arabently |
|---------|----------------------|-----------|
| Learning Path | Self-directed navigation | Guided "Next Step" system |
| Content Review | User-dependent | Automatic spaced repetition |
| Dialect Focus | MSA (Modern Standard Arabic) | Saudi dialect specifically |
| Audio Quality | Pre-recorded only | AI-generated native dialect TTS |
| Decision Load | High (choose what to learn) | Zero (system decides) |

### 1.3 Core Value Proposition

> *"Just press Next Step. We handle the learning science."*

---

## 2. Problem Statement

### 2.1 The Challenge

Learning Saudi Arabic presents unique challenges:

1. **Dialect Scarcity** - Most Arabic courses teach MSA (Modern Standard Arabic), which differs significantly from spoken Saudi dialect
2. **Decision Fatigue** - Students waste cognitive energy deciding what to study next
3. **Inconsistent Review** - Learners skip important review sessions, leading to poor retention
4. **Lack of Authentic Audio** - Limited access to native Saudi dialect audio content
5. **Overwhelming Curricula** - Traditional courses present too many options, causing paralysis

### 2.2 Current Solutions & Their Gaps

| Solution | Gap |
|----------|-----|
| Duolingo/Babbel | No Saudi dialect; gamification over substance |
| YouTube Channels | No structure; no progress tracking |
| Private Tutors | Expensive; inconsistent availability |
| University Courses | Teach MSA, not colloquial Saudi |
| Other Arabic Apps | Focus on reading/writing, not speaking |

### 2.3 Our Solution

A purpose-built platform that:
- Teaches **only** Saudi Arabic dialect
- **Eliminates choices** - students just click "Next Step"
- **Automates spaced repetition** - system schedules reviews
- Uses **AI-generated authentic audio** - Google Gemini TTS with Saudi dialect prompting
- Provides a **clear 50-lesson curriculum** across 10 units

---

## 3. Vision & Goals

### 3.1 Product Vision

*To become the definitive platform for learning conversational Saudi Arabic, enabling anyone to communicate naturally with Saudi speakers within 6 months.*

### 3.2 Mission Statement

Democratize Saudi Arabic education through technology-driven, scientifically-backed learning methods that remove friction and maximize retention.

### 3.3 Business Goals

| Goal | Target | Timeline |
|------|--------|----------|
| Registered Users | 1,000 | Q1 2026 |
| Paying Students | 200 | Q2 2026 |
| Course Completion Rate | 60% | Q3 2026 |
| Monthly Active Users | 500 | Q2 2026 |
| Revenue | $20,000 MRR | Q4 2026 |

### 3.4 Product Goals

| Goal | Metric | Target |
|------|--------|--------|
| Reduce decision fatigue | Clicks to next activity | ≤ 1 click |
| Increase review compliance | % of scheduled reviews completed | > 80% |
| Improve listening skills | Time spent on scripts | 40% of total time |
| Enable speaking practice | AI Tutor sessions/week | 3 sessions |
| Maintain engagement | Daily active users | 30% of registered |

---

## 4. Target Users

### 4.1 Primary Audience

- **Expats in Saudi Arabia** - Professionals relocated for work
- **Aspiring Expats** - People planning to move to Saudi Arabia
- **Heritage Speakers** - Second/third generation diaspora reconnecting with roots
- **Arabic Enthusiasts** - Language learners interested in spoken dialects
- **Business Professionals** - Those with Saudi business partnerships

### 4.2 Geographic Focus

- Primary: United States, United Kingdom, Europe
- Secondary: Southeast Asia, South Asia, Africa
- Tertiary: Global Arabic diaspora

### 4.3 Demographics

| Attribute | Range |
|-----------|-------|
| Age | 25-45 |
| Education | College+ |
| Income | Middle to Upper |
| Tech Comfort | Moderate to High |
| Learning Style | Self-directed but needs guidance |

---

## 5. User Personas

### 5.1 Persona: "The Relocating Professional"

**Name:** Michael Chen  
**Age:** 34  
**Occupation:** Oil & Gas Engineer  
**Location:** Houston, TX → Relocating to Dhahran  

**Background:**
> "I just accepted a position with Aramco and I'm moving to Saudi Arabia in 4 months. I took Arabic in college but it was all formal stuff - I can't understand anyone when they actually talk!"

**Goals:**
- Understand colleagues in casual conversation
- Navigate daily life (shopping, dining, directions)
- Show respect by speaking the local dialect

**Frustrations:**
- College Arabic was MSA, not useful for conversation
- YouTube videos are scattered and unstructured
- Doesn't know what to prioritize with limited time

**How Arabently Helps:**
- Clear 50-lesson path with specific timeline
- Focus on Saudi dialect, not MSA
- "Next Step" eliminates daily planning
- AI-generated audio for authentic listening practice

---

### 5.2 Persona: "The Heritage Reconnector"

**Name:** Fatima Al-Rashid  
**Age:** 28  
**Occupation:** Marketing Manager  
**Location:** London, UK  

**Background:**
> "My parents are from Riyadh but I grew up in England. I understand when my grandmother speaks but I can't respond properly. It's embarrassing at family gatherings."

**Goals:**
- Speak confidently with family members
- Understand cultural nuances and expressions
- Pass this knowledge to her future children

**Frustrations:**
- Parents speak too fast to learn from
- Apps teach Egyptian or Levantine dialect
- Feels disconnected from her heritage

**How Arabently Helps:**
- Saudi-specific vocabulary and expressions
- Graduated difficulty from basics to fluent
- Listening practice with authentic dialogue
- Cultural context embedded in lessons

---

### 5.3 Persona: "The Curious Learner"

**Name:** James Thompson  
**Age:** 42  
**Occupation:** University Professor (History)  
**Location:** Boston, MA  

**Background:**
> "I study Gulf history and I'm tired of relying on translators. I want to consume media, interview subjects, and truly understand the region I've dedicated my career to."

**Goals:**
- Consume Saudi media independently
- Conduct research interviews without translators
- Deeper cultural understanding

**Frustrations:**
- Academic Arabic is formal and literary
- Hard to find structured resources for dialects
- Inconsistent self-study progress

**How Arabently Helps:**
- Structured curriculum with clear milestones
- Progress tracking motivates consistency
- Listening practice builds comprehension
- Future AI Tutor for speaking practice

---

## 6. User Journey

### 6.1 Discovery → Enrollment

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY MAP                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Discovery]  →  [Landing Page]  →  [Sign Up]  →  [Pending]     │
│       │               │                │              │          │
│   Social Media    View Benefits    Create Account   Wait for    │
│   Word of Mouth   Watch Preview    Enter Details    Approval    │
│   Google Search                                                  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Approval]  →  [Dashboard]  →  [Next Step]  →  [Learning]      │
│       │             │               │               │            │
│   Email Sent    See Progress    Click Button    Watch/Listen    │
│   Access Given  View Course     Start Activity  Complete Step   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Completion]  →  [Review]  →  [AI Practice]  →  [Mastery]      │
│       │              │              │               │            │
│   Finish Step    System Prompts   Speak with AI   Fluency       │
│   Mark Done      Review Content   Get Feedback    Achieved      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Daily Learning Session

1. **Login** → User opens Arabently
2. **Dashboard** → Sees "Next Step" prominently displayed
3. **Start** → Clicks the single CTA button
4. **Activity** → Either watches lesson OR listens to script
5. **Complete** → Marks step as done
6. **Repeat** → Dashboard shows next activity
7. **Logout** → Progress saved, ready for tomorrow

### 6.3 Typical Weekly Flow

| Day | Activity Type | Content |
|-----|---------------|---------|
| Mon | Lesson | Unit 3, Lesson 1 - "At the Restaurant" |
| Tue | Script | Script 8 - Restaurant dialogue |
| Wed | Script | Script 9 - Ordering food |
| Thu | Review | Script 5 (spaced repetition) |
| Fri | Lesson | Unit 3, Lesson 2 - "Saudi Food Vocabulary" |
| Sat | Script | Script 10 - Food items practice |
| Sun | AI Tutor | Speaking practice (future feature) |

---

## 7. Feature Requirements

### 7.1 MVP Features (Phase 1) ✅

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| F1.1 | User Authentication (Email/Password) | P0 | ✅ Done |
| F1.2 | Approval-based Access Control | P0 | ✅ Done |
| F1.3 | Landing Page | P0 | ✅ Done |
| F1.4 | Dashboard with "Next Step" | P0 | ✅ Done |
| F1.5 | Course Overview Page | P0 | ✅ Done |
| F1.6 | Lesson Detail Page | P0 | ✅ Done |
| F1.7 | Script Listening Page | P0 | ✅ Done |
| F1.8 | Progress Tracking | P0 | ✅ Done |
| F1.9 | Video Embedding (YouTube) | P0 | ✅ Done |
| F1.10 | AI TTS Audio Generation | P0 | ✅ Done |
| F1.11 | Dark/Light Theme | P1 | ✅ Done |
| F1.12 | Mobile Responsive Design | P1 | ✅ Done |

### 7.2 Phase 2 Features (Planned)

| ID | Feature | Priority | Target |
|----|---------|----------|--------|
| F2.1 | AI Tutor (Speaking Practice) | P0 | Q1 2026 |
| F2.2 | Payment Integration (Stripe) | P0 | Q1 2026 |
| F2.3 | Admin Dashboard | P1 | Q1 2026 |
| F2.4 | User Management | P1 | Q1 2026 |
| F2.5 | Email Notifications | P2 | Q2 2026 |
| F2.6 | Progress Analytics | P2 | Q2 2026 |

### 7.3 Phase 3 Features (Future)

| ID | Feature | Priority | Target |
|----|---------|----------|--------|
| F3.1 | Dedicated Video Hosting | P1 | Q3 2026 |
| F3.2 | Mobile App (iOS/Android) | P2 | Q4 2026 |
| F3.3 | Community Features | P3 | Q4 2026 |
| F3.4 | Certificate Generation | P3 | Q4 2026 |
| F3.5 | Multiple Courses | P2 | 2027 |

### 7.4 Feature Details

#### F1.4 - Dashboard with "Next Step"

**Description:**  
The main dashboard displays the student's current position in the learning roadmap and shows exactly one "Next Step" action to take.

**Requirements:**
- Display student's name and welcome message
- Show overall progress percentage
- Display "Next Step" card with:
  - Step type (Lesson/Script/Review)
  - Content title (English + Arabic)
  - Duration estimate
  - Clear CTA button
- Show course completion stats
- Allow manual course navigation (secondary)

**Acceptance Criteria:**
- [ ] Dashboard loads in < 2 seconds
- [ ] Next Step is the most prominent element
- [ ] Progress reflects completed_steps accurately
- [ ] Works on mobile devices

---

#### F1.10 - AI TTS Audio Generation

**Description:**  
Generate authentic Saudi dialect audio on-demand using Google Gemini's text-to-speech capabilities.

**Requirements:**
- API endpoint at `/api/tts`
- Accept Arabic text and voice parameters
- Return playable WAV audio
- Custom prompting for Saudi dialect pronunciation
- Support multiple voice options (Kore, Aoede, etc.)

**Technical Implementation:**
- Model: `gemini-2.5-flash-preview-tts`
- Audio format: LINEAR16 (PCM) → converted to WAV
- Sample rate: 24kHz
- Dialect prompt: "Speak this Arabic text in authentic Saudi dialect..."

**Acceptance Criteria:**
- [ ] Audio generates in < 5 seconds
- [ ] Pronunciation matches Saudi dialect
- [ ] Audio plays on all browsers
- [ ] Graceful error handling

---

#### F2.1 - AI Tutor (Speaking Practice)

**Description:**  
A conversational AI agent that engages students in spoken Saudi Arabic practice sessions.

**Requirements:**
- Real-time speech-to-speech interaction
- Context-aware based on completed lessons
- Prompts questions relevant to curriculum progress
- Provides gentle pronunciation feedback
- Supports open-ended conversation

**Technical Approach:**
- Use Google AI Studio's Speech Agent capability
- Custom system prompt per unit/lesson
- Store conversation history for progress tracking
- Define expected questions and error corrections per lesson

**Acceptance Criteria:**
- [ ] Agent speaks natural Saudi dialect
- [ ] Questions align with completed content
- [ ] Session duration: 5-15 minutes
- [ ] Clear session start/end flow

---

## 8. Technical Architecture

### 8.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│   │   CLIENT    │     │   VERCEL    │     │  SUPABASE   │      │
│   │  (Browser)  │────▶│  (Next.js)  │────▶│ (PostgreSQL)│      │
│   └─────────────┘     └─────────────┘     └─────────────┘      │
│          │                   │                                   │
│          │                   │                                   │
│          │            ┌──────▼──────┐                           │
│          │            │  GOOGLE AI  │                           │
│          └───────────▶│ (Gemini TTS)│                           │
│                       └─────────────┘                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Frontend | Next.js 16, React 19 | Server components, app router |
| Styling | Tailwind CSS 4 | Rapid development, responsive |
| State | React hooks | Simple, no external deps |
| Backend | Next.js API Routes | Unified codebase |
| Database | Supabase (PostgreSQL) | Auth + DB + RLS |
| Auth | Supabase Auth | Email/password, extensible |
| TTS | Google Gemini API | Best Arabic dialect support |
| Hosting | Vercel | Seamless Next.js integration |
| CDN | Vercel Edge | Global distribution |

### 8.3 Data Flow

```
User Action → Next.js Page → Supabase Client → PostgreSQL
                  ↓
            API Route → Gemini API → Audio Response
                  ↓
            State Update → UI Re-render
```

### 8.4 Security

| Concern | Solution |
|---------|----------|
| Authentication | Supabase Auth with secure sessions |
| Authorization | Row Level Security (RLS) policies |
| API Keys | Server-side only, environment variables |
| Data Access | Users can only access approved content |
| XSS Prevention | React's built-in escaping |
| CORS | Vercel's default CORS policies |

---

## 9. Database Design

### 9.1 Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   COURSES   │────▶│    UNITS    │────▶│   LESSONS   │
│             │     │             │     │             │
│ id          │     │ id          │     │ id          │
│ title       │     │ course_id   │     │ unit_id     │
│ slug        │     │ unit_number │     │ lesson_num  │
│ description │     │ title       │     │ title       │
└─────────────┘     └─────────────┘     │ video_urls  │
       │                                 └─────────────┘
       │                                        │
       │                                        ▼
       │                                 ┌─────────────┐
       │                                 │   SCRIPTS   │
       │                                 │             │
       │                                 │ id          │
       │                                 │ lesson_id   │
       │                                 │ audio_url   │
       │                                 │ script_text │
       │                                 └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  ROADMAP    │     │  PROGRESS   │
│   STEPS     │     │             │
│             │     │ id          │
│ id          │     │ user_id     │
│ course_id   │     │ course_id   │
│ step_order  │     │ current_step│
│ step_type   │     │ completed[] │
│ lesson_id   │     └─────────────┘
│ script_id   │
└─────────────┘

┌─────────────┐
│  PROFILES   │
│             │
│ id (user)   │
│ full_name   │
│ is_approved │
│ created_at  │
└─────────────┘
```

### 9.2 Table Specifications

#### profiles
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, FK → auth.users |
| full_name | TEXT | nullable |
| is_approved | BOOLEAN | default: false |
| approved_at | TIMESTAMPTZ | nullable |
| created_at | TIMESTAMPTZ | default: now() |

#### courses
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| title | TEXT | not null |
| title_ar | TEXT | not null |
| slug | TEXT | unique, not null |
| description | TEXT | nullable |
| total_units | INTEGER | default: 10 |
| is_published | BOOLEAN | default: false |

#### units
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| course_id | UUID | FK → courses |
| unit_number | INTEGER | not null |
| title | TEXT | not null |
| title_ar | TEXT | not null |
| total_lessons | INTEGER | default: 5 |

#### lessons
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| unit_id | UUID | FK → units |
| lesson_number | INTEGER | not null |
| title | TEXT | not null |
| title_ar | TEXT | not null |
| video_urls | JSONB | default: [] |
| content | TEXT | nullable |

#### scripts
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| lesson_id | UUID | FK → lessons (nullable) |
| title | TEXT | not null |
| audio_url | TEXT | not null |
| script_text | TEXT | nullable |
| type | ENUM | 'input', 'dialogue', 'practice' |

#### roadmap_steps
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| course_id | UUID | FK → courses |
| step_order | INTEGER | not null, unique per course |
| step_type | ENUM | 'lesson', 'script', 'review_script' |
| lesson_id | UUID | FK → lessons (nullable) |
| script_id | UUID | FK → scripts (nullable) |
| description | TEXT | nullable |

#### student_progress
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK → auth.users |
| course_id | UUID | FK → courses |
| current_step | INTEGER | default: 1 |
| completed_steps | INTEGER[] | default: {} |
| started_at | TIMESTAMPTZ | default: now() |
| last_accessed | TIMESTAMPTZ | default: now() |

### 9.3 Row Level Security (RLS) Policies

| Table | Policy | Rule |
|-------|--------|------|
| profiles | View own | `auth.uid() = id` |
| courses | View published | `is_published = TRUE` |
| units | View if course published | FK check on courses.is_published |
| lessons | View if approved | FK check on profiles.is_approved |
| scripts | View if approved | FK check on profiles.is_approved |
| roadmap_steps | View if approved | FK check on profiles.is_approved |
| student_progress | Own data only | `auth.uid() = user_id` |

---

## 10. API Specifications

### 10.1 TTS Endpoint

**Endpoint:** `POST /api/tts`

**Request:**
```json
{
  "text": "السلام عليكم",
  "voice": "Kore",
  "model": "flash"
}
```

**Parameters:**
| Field | Type | Required | Default | Options |
|-------|------|----------|---------|---------|
| text | string | yes | - | Arabic text to speak |
| voice | string | no | "Kore" | Kore, Aoede, Charon, Fenrir, Puck |
| model | string | no | "flash" | flash, pro |

**Response:**
- **Success (200):** Binary WAV audio file
- **Error (400):** `{ "error": "Missing text parameter" }`
- **Error (500):** `{ "error": "Failed to generate audio", "details": "..." }`

**Headers:**
```
Content-Type: audio/wav
Content-Length: <bytes>
```

---

## 11. UI/UX Requirements

### 11.1 Design Principles

1. **Simplicity First** - One primary action per screen
2. **Cultural Authenticity** - Arabic-inspired aesthetics
3. **Accessibility** - WCAG 2.1 AA compliance target
4. **Mobile-First** - Designed for phone use primarily
5. **Bilingual** - English + Arabic throughout

### 11.2 Color System

#### Dark Mode (Primary)
| Token | Value | Usage |
|-------|-------|-------|
| --background | #1a1814 | Page background |
| --foreground | #f5f0e8 | Primary text |
| --card | #252118 | Card backgrounds |
| --primary | #d4a853 | CTAs, highlights |
| --accent | #c75c5c | Secondary actions |
| --muted | #6b5c4d | Subtle text |

#### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| --background | #faf8f5 | Page background |
| --foreground | #1a1814 | Primary text |
| --card | #ffffff | Card backgrounds |
| --primary | #b8860b | CTAs, highlights |
| --accent | #a04040 | Secondary actions |
| --muted | #8b7355 | Subtle text |

### 11.3 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings (AR) | Amiri | 700 | 2rem+ |
| Headings (EN) | IBM Plex Sans Arabic | 700 | 2rem+ |
| Body | IBM Plex Sans Arabic | 400 | 1rem |
| Captions | IBM Plex Sans Arabic | 400 | 0.875rem |

### 11.4 Component Library

| Component | Description |
|-----------|-------------|
| ThemeToggle | Sun/moon icon for theme switching |
| InlineTTSPlayer | Compact audio player for lesson scripts |
| TTSAudioPlayer | Full-featured audio player for script pages |
| ProgressCircle | Circular progress indicator |
| NextStepCard | Prominent CTA card for next activity |
| LessonCard | Lesson preview in course listing |
| UnitAccordion | Expandable unit with lessons |

### 11.5 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Phone portrait |
| Tablet | 640-1024px | Tablet/phone landscape |
| Desktop | > 1024px | Desktop/laptop |

---

## 12. Success Metrics

### 12.1 Key Performance Indicators (KPIs)

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Weekly Active Users | - | 200 | Q2 2026 |
| Course Completion Rate | - | 60% | Q3 2026 |
| Avg. Session Duration | - | 15 min | Q2 2026 |
| Next Step Click Rate | - | 95% | Q1 2026 |
| Audio Play Rate | - | 80% | Q1 2026 |
| User Approval Rate | - | 90% | Q1 2026 |

### 12.2 User Engagement Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| DAU/MAU | Daily to monthly active ratio | > 30% |
| Lessons/Week | Avg lessons completed per user/week | 5 |
| Scripts/Lesson | Scripts listened per lesson | 2 |
| Session Frequency | Sessions per user per week | 4 |
| Return Rate | Users returning within 7 days | 70% |

### 12.3 Technical Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 2s |
| TTS Generation Time | < 5s |
| API Error Rate | < 1% |
| Uptime | 99.9% |
| Lighthouse Score | > 90 |

---

## 13. Release Phases

### Phase 1: MVP (✅ Complete)
**Timeline:** Q4 2025  
**Status:** Deployed

**Deliverables:**
- [x] User authentication
- [x] Course structure (10 units, 50 lessons)
- [x] Next Step system
- [x] Lesson & script pages
- [x] AI TTS integration
- [x] Progress tracking
- [x] Responsive design

### Phase 2: Monetization
**Timeline:** Q1 2026  
**Status:** Planning

**Deliverables:**
- [ ] Stripe payment integration
- [ ] Subscription tiers
- [ ] Admin dashboard
- [ ] AI Tutor (basic)
- [ ] Email notifications

### Phase 3: Scale
**Timeline:** Q2-Q3 2026  
**Status:** Concept

**Deliverables:**
- [ ] Dedicated video hosting
- [ ] Advanced analytics
- [ ] AI Tutor (advanced)
- [ ] Community features
- [ ] Certificate generation

### Phase 4: Expand
**Timeline:** Q4 2026+  
**Status:** Vision

**Deliverables:**
- [ ] Mobile apps (iOS/Android)
- [ ] Additional courses (Gulf dialects)
- [ ] Enterprise/B2B offering
- [ ] API for partners

---

## 14. Risks & Mitigations

### 14.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Gemini API changes | High | Medium | Abstract TTS layer, fallback options |
| Supabase outage | High | Low | Error handling, retry logic |
| Vercel limits | Medium | Low | Monitor usage, upgrade plan |
| Audio format issues | Medium | Medium | WAV conversion, browser testing |

### 14.2 Business Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low user adoption | High | Medium | Marketing, SEO, testimonials |
| High churn rate | High | Medium | Engagement features, email nudges |
| Competition | Medium | Medium | Focus on Saudi dialect niche |
| Content quality | High | Low | Expert review, user feedback |

### 14.3 Operational Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Support volume | Medium | Medium | FAQ, automated responses |
| Content updates | Low | High | CMS for easy updates |
| Security breach | High | Low | RLS, security audits, monitoring |

---

## 15. Appendix

### 15.1 Glossary

| Term | Definition |
|------|------------|
| MSA | Modern Standard Arabic - formal written Arabic |
| Saudi Dialect | Colloquial Arabic spoken in Saudi Arabia |
| Next Step | The guided learning path system |
| Script | Audio content for listening practice |
| Roadmap | The predetermined sequence of learning activities |
| RLS | Row Level Security - Supabase's auth policies |
| TTS | Text-to-Speech technology |

### 15.2 References

- Google Gemini API Documentation
- Supabase Documentation
- Next.js 16 Documentation
- Spaced Repetition Research

### 15.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 4, 2026 | Arabently Team | Initial PRD |

---

*This document is a living specification. Updates will be made as the product evolves.*

---

**Approvals:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Tech Lead | | | |
| Stakeholder | | | |

