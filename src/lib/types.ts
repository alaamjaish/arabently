// Database types for Arabently

export interface Profile {
  id: string
  full_name: string | null
  is_approved: boolean
  approved_at: string | null
  created_at: string
}

export interface Course {
  id: string
  title: string
  title_ar: string
  slug: string
  description: string | null
  total_units: number
  is_published: boolean
  created_at: string
}

export interface Unit {
  id: string
  course_id: string
  unit_number: number
  title: string
  title_ar: string
  total_lessons: number
}

export interface Lesson {
  id: string
  unit_id: string
  lesson_number: number
  title: string
  title_ar: string
  video_urls: string[]
  content: string | null
}

export interface Script {
  id: string
  lesson_id: string | null
  title: string
  audio_url: string
  script_text: string | null
  type: 'input' | 'dialogue' | 'practice'
}

export type StepType = 'lesson' | 'script' | 'review_script'

export interface RoadmapStep {
  id: string
  course_id: string
  step_order: number
  step_type: StepType
  lesson_id: string | null
  script_id: string | null
  description: string | null
}

export interface StudentProgress {
  id: string
  user_id: string
  course_id: string
  current_step: number
  completed_steps: number[]
  started_at: string
  last_accessed: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  is_active: boolean
}

// Extended types with relations
export interface UnitWithLessons extends Unit {
  lessons: Lesson[]
}

export interface CourseWithUnits extends Course {
  units: UnitWithLessons[]
}

export interface CurrentStep extends RoadmapStep {
  lesson?: Lesson
  script?: Script
}
