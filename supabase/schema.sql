-- Arabently Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND is_approved = (SELECT is_approved FROM profiles WHERE id = auth.uid()));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- COURSES
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  total_units INTEGER DEFAULT 10,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses" ON courses
  FOR SELECT USING (is_published = TRUE);

-- ============================================
-- UNITS
-- ============================================
CREATE TABLE IF NOT EXISTS units (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  unit_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  total_lessons INTEGER DEFAULT 5,
  UNIQUE(course_id, unit_number)
);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view units of published courses" ON units
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses WHERE courses.id = units.course_id AND courses.is_published = TRUE)
  );

-- ============================================
-- LESSONS
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  video_urls JSONB DEFAULT '[]'::jsonb,
  content TEXT,
  UNIQUE(unit_id, lesson_number)
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can view lessons" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_approved = TRUE
    )
  );

-- ============================================
-- SCRIPTS (Audio inputs for listening practice)
-- ============================================
CREATE TYPE script_type AS ENUM ('input', 'dialogue', 'practice');

CREATE TABLE IF NOT EXISTS scripts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  script_text TEXT,
  type script_type DEFAULT 'input'
);

ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can view scripts" ON scripts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_approved = TRUE
    )
  );

-- ============================================
-- ROADMAP STEPS (The "Next Step" system)
-- ============================================
CREATE TYPE step_type AS ENUM ('lesson', 'script', 'review_script');

CREATE TABLE IF NOT EXISTS roadmap_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  step_order INTEGER NOT NULL,
  step_type step_type NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  script_id UUID REFERENCES scripts(id) ON DELETE SET NULL,
  description TEXT,
  UNIQUE(course_id, step_order)
);

ALTER TABLE roadmap_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can view roadmap" ON roadmap_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_approved = TRUE
    )
  );

-- ============================================
-- STUDENT PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  current_step INTEGER DEFAULT 1,
  completed_steps INTEGER[] DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON student_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON student_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON student_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- ENROLLMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_units_course_id ON units(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_scripts_lesson_id ON scripts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_course_id ON roadmap_steps(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON student_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
