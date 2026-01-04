'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Course, RoadmapStep, Lesson, Script, StudentProgress } from '@/lib/types'

interface NextStepData {
  step: RoadmapStep
  lesson?: Lesson
  script?: Script
  progress: StudentProgress | null
  course: Course
  totalSteps: number
}

export default function DashboardPage() {
  const [nextStep, setNextStep] = useState<NextStepData | null>(null)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      setUserName(profile?.full_name || 'Learner')

      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)

      setCourses(coursesData || [])

      if (!coursesData || coursesData.length === 0) {
        setLoading(false)
        return
      }

      const course = coursesData[0]

      let { data: progress } = await supabase
        .from('student_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single()

      if (!progress) {
        const { data: newProgress } = await supabase
          .from('student_progress')
          .insert({
            user_id: user.id,
            course_id: course.id,
            current_step: 1,
            completed_steps: [],
          })
          .select()
          .single()
        progress = newProgress
      }

      const { count: totalSteps } = await supabase
        .from('roadmap_steps')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', course.id)

      const { data: step } = await supabase
        .from('roadmap_steps')
        .select('*')
        .eq('course_id', course.id)
        .eq('step_order', progress?.current_step || 1)
        .single()

      if (!step) {
        setLoading(false)
        return
      }

      let lesson = null
      let script = null

      if (step.lesson_id) {
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', step.lesson_id)
          .single()
        lesson = lessonData
      }

      if (step.script_id) {
        const { data: scriptData } = await supabase
          .from('scripts')
          .select('*')
          .eq('id', step.script_id)
          .single()
        script = scriptData
      }

      setNextStep({
        step,
        lesson: lesson || undefined,
        script: script || undefined,
        progress,
        course,
        totalSteps: totalSteps || 0,
      })

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light opacity-30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-background"></div>
          </div>
          <p className="text-foreground-secondary">Loading your progress...</p>
        </div>
      </div>
    )
  }

  const progressPercentage = nextStep?.progress
    ? ((nextStep.progress.completed_steps?.length || 0) / nextStep.totalSteps) * 100
    : 0

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'script':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 sm:mb-10 stagger-1">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            <span className="text-foreground">Welcome back, </span>
            <span className="gradient-text">{userName}</span>
          </h1>
          <p className="text-foreground-secondary text-base sm:text-lg">
            Continue your Arabic learning journey
          </p>
        </div>

        {/* Next Step Card - The Hero Section */}
        {nextStep ? (
          <div className="mb-10 stagger-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm font-medium text-foreground-secondary uppercase tracking-wider">
                Your Next Step
              </span>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              {/* Progress bar at top */}
              <div className="h-1 bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                  {/* Left: Content */}
                  <div className="flex-1">
                    {/* Type indicator */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${nextStep.step.step_type === 'lesson'
                          ? 'bg-accent/10 text-accent'
                          : nextStep.step.step_type === 'script'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-warning/10 text-warning'
                        }
                      `}>
                        {getStepIcon(nextStep.step.step_type)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {nextStep.step.step_type === 'lesson' ? 'Video Lesson' :
                            nextStep.step.step_type === 'script' ? 'Listening Practice' : 'Review Session'}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Step {nextStep.progress?.current_step || 1} of {nextStep.totalSteps}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-foreground">
                      {nextStep.lesson?.title || nextStep.script?.title || nextStep.step.description}
                    </h2>

                    {/* Arabic title - only shown for teaching content */}
                    {(nextStep.lesson?.title_ar || nextStep.script?.title) && (
                      <p className="arabic text-lg text-primary mb-4">
                        {nextStep.lesson?.title_ar}
                      </p>
                    )}

                    <p className="text-foreground-secondary mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                      {nextStep.step.description ||
                        (nextStep.step.step_type === 'lesson'
                          ? 'Watch this video lesson to learn new vocabulary and grammar.'
                          : nextStep.step.step_type === 'script'
                            ? 'Listen to native speakers and train your ear for Arabic.'
                            : 'Review what you have learned to strengthen retention.')
                      }
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={nextStep.lesson
                        ? `/course/${nextStep.course.slug}/lesson/${nextStep.lesson.id}`
                        : `/course/${nextStep.course.slug}/script/${nextStep.script?.id}`
                      }
                      className="btn-primary inline-flex items-center gap-3 glow-pulse"
                    >
                      <span>
                        {nextStep.step.step_type === 'lesson' ? 'Start Lesson' :
                          nextStep.step.step_type === 'script' ? 'Start Listening' : 'Start Review'}
                      </span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Right: Progress Circle */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="relative w-28 sm:w-36 h-28 sm:h-36 mx-auto lg:mx-0">
                      <svg className="w-full h-full progress-ring">
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          stroke="url(#progressGradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="402"
                          strokeDashoffset={402 - (402 * progressPercentage) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--primary-light)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">
                          {Math.round(progressPercentage)}%
                        </span>
                        <span className="text-sm text-muted-foreground">Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-10 text-center mb-10 stagger-2">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No courses available yet</h3>
            <p className="text-foreground-secondary max-w-md mx-auto">
              Check back soon for new Arabic learning content. We are working on something great for you.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length > 0 && (
          <div className="stagger-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
              My Courses
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.slug}`}
                  className="group glass rounded-xl p-6 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {course.total_units} units
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {nextStep && (
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 stagger-4">
            <div className="glass rounded-xl p-3 sm:p-5 text-center">
              <p className="text-xl sm:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                {nextStep.progress?.completed_steps?.length || 0}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Done</p>
            </div>
            <div className="glass rounded-xl p-3 sm:p-5 text-center">
              <p className="text-xl sm:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                {nextStep.totalSteps - (nextStep.progress?.completed_steps?.length || 0)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Left</p>
            </div>
            <div className="glass rounded-xl p-3 sm:p-5 text-center">
              <p className="text-xl sm:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                {nextStep.course.total_units}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Units</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
