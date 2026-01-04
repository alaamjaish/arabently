'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Course, Unit, Lesson, StudentProgress } from '@/lib/types'

interface UnitWithLessons extends Unit {
  lessons: Lesson[]
}

interface CourseData extends Course {
  units: UnitWithLessons[]
}

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  const [course, setCourse] = useState<CourseData | null>(null)
  const [progress, setProgress] = useState<StudentProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedUnits, setExpandedUnits] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Parallel fetch: user and course
      const [userResult, courseResult] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('courses').select('*').eq('slug', slug).single()
      ])

      const user = userResult.data?.user
      const courseData = courseResult.data

      if (!courseData) {
        setLoading(false)
        return
      }

      // First get units
      const unitsResult = await supabase.from('units').select('*').eq('course_id', courseData.id).order('unit_number')
      const units = unitsResult.data || []
      const unitIds = units.map(u => u.id)

      // Parallel fetch: all lessons for all units, and progress
      const [lessonsResult, progressResult] = await Promise.all([
        unitIds.length > 0 
          ? supabase.from('lessons').select('*').in('unit_id', unitIds).order('lesson_number')
          : Promise.resolve({ data: [] }),
        user ? supabase.from('student_progress').select('*').eq('user_id', user.id).eq('course_id', courseData.id).single() : Promise.resolve({ data: null })
      ])

      // Group lessons by unit_id
      const lessonsByUnit = (lessonsResult.data || []).reduce((acc, lesson) => {
        if (!acc[lesson.unit_id]) acc[lesson.unit_id] = []
        acc[lesson.unit_id].push(lesson)
        return acc
      }, {} as Record<string, Lesson[]>)

      // Attach lessons to units
      const unitsWithLessons = units.map(unit => ({
        ...unit,
        lessons: (lessonsByUnit[unit.id] || []).sort((a, b) => a.lesson_number - b.lesson_number)
      }))

      setCourse({ ...courseData, units: unitsWithLessons })
      setProgress(progressResult.data)

      if (unitsWithLessons.length > 0) {
        setExpandedUnits([unitsWithLessons[0].id])
      }

      setLoading(false)
    }

    fetchData()
  }, [slug])

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light opacity-30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-background"></div>
          </div>
          <p className="text-foreground-secondary">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h1>
          <p className="text-foreground-secondary mb-6">Sorry, we could not find the course you are looking for.</p>
          <Link href="/dashboard" className="btn-primary inline-flex">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const completedCount = progress?.completed_steps?.length || 0
  const totalLessons = course.units.reduce((acc, unit) => acc + unit.lessons.length, 0)
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="relative border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
          {/* Back link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground mb-8 transition-colors stagger-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Course Info */}
            <div className="flex-1 stagger-2">
              <div className="badge inline-flex mb-5">
                {course.total_units} Units / {totalLessons} Lessons
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                <span className="gradient-text">{course.title}</span>
              </h1>

              {course.description && (
                <p className="text-foreground-secondary text-base sm:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed">
                  {course.description}
                </p>
              )}

              {/* Quick stats */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl glass">
                  <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-foreground-secondary">Self-paced</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl glass">
                  <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-foreground-secondary">Beginner</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl glass">
                  <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-foreground-secondary">Saudi</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:w-72 stagger-3">
              <div className="glass rounded-2xl p-5 sm:p-6">
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <svg className="w-full h-full progress-ring">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#courseProgressGrad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="352"
                      strokeDashoffset={352 - (352 * progressPercentage) / 100}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="courseProgressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--primary-light)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{Math.round(progressPercentage)}%</span>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                </div>

                <div className="text-center mb-5">
                  <p className="font-medium text-foreground">{completedCount} of {totalLessons}</p>
                  <p className="text-sm text-muted-foreground">lessons completed</p>
                </div>

                <Link
                  href="/dashboard"
                  className="btn-primary w-full text-center block glow-pulse"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 stagger-4">
          Course Content
        </h2>

        <div className="space-y-4">
          {course.units.map((unit, unitIndex) => {
            const isExpanded = expandedUnits.includes(unit.id)

            return (
              <div
                key={unit.id}
                className="glass rounded-2xl overflow-hidden"
                style={{ animationDelay: `${0.1 * (unitIndex + 5)}s` }}
              >
                {/* Unit Header */}
                <button
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full p-4 sm:p-6 flex items-center gap-3 sm:gap-5 hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center font-bold text-base sm:text-lg text-primary flex-shrink-0">
                    {unit.unit_number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base sm:text-lg">{unit.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{unit.lessons.length} lessons</p>
                  </div>

                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Lessons List */}
                <div className={`
                  transition-all duration-300 ease-out overflow-hidden
                  ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="border-t border-border">
                    {unit.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/course/${slug}/lesson/${lesson.id}`}
                        className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 transition-all hover:bg-secondary border-b border-border last:border-b-0"
                      >
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm font-medium text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                          {lesson.lesson_number}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                            {lesson.title}
                          </h4>
                          {lesson.title_ar && (
                            <p className="arabic text-xs sm:text-sm text-primary/70 mt-0.5 truncate">{lesson.title_ar}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Video</span>
                          </div>

                          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
