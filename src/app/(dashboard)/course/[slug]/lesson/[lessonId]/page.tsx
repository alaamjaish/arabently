'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Lesson, Script, Course, Unit, StudentProgress, RoadmapStep } from '@/lib/types'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const lessonId = params.lessonId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [scripts, setScripts] = useState<Script[]>([])
  const [course, setCourse] = useState<Course | null>(null)
  const [unit, setUnit] = useState<Unit | null>(null)
  const [progress, setProgress] = useState<StudentProgress | null>(null)
  const [currentStep, setCurrentStep] = useState<RoadmapStep | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()

      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single()

      if (!lessonData) {
        setLoading(false)
        return
      }
      setLesson(lessonData)

      const { data: unitData } = await supabase
        .from('units')
        .select('*')
        .eq('id', lessonData.unit_id)
        .single()
      setUnit(unitData)

      if (unitData) {
        const { data: courseData } = await supabase
          .from('courses')
          .select('*')
          .eq('id', unitData.course_id)
          .single()
        setCourse(courseData)

        const { data: scriptsData } = await supabase
          .from('scripts')
          .select('*')
          .eq('lesson_id', lessonId)
        setScripts(scriptsData || [])

        if (user && courseData) {
          const { data: progressData } = await supabase
            .from('student_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', courseData.id)
            .single()
          setProgress(progressData)

          const { data: stepData } = await supabase
            .from('roadmap_steps')
            .select('*')
            .eq('course_id', courseData.id)
            .eq('lesson_id', lessonId)
            .single()
          setCurrentStep(stepData)
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [lessonId])

  const handleComplete = async () => {
    if (!currentStep || !progress || !course) return

    setCompleting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const completedSteps = [...(progress.completed_steps || []), currentStep.step_order]
    const nextStepOrder = currentStep.step_order + 1

    await supabase
      .from('student_progress')
      .update({
        completed_steps: completedSteps,
        current_step: nextStepOrder,
        last_accessed: new Date().toISOString(),
      })
      .eq('id', progress.id)

    router.push('/dashboard')
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
          <p className="text-foreground-secondary">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Lesson Not Found</h1>
          <p className="text-foreground-secondary mb-6">Sorry, we could not find this lesson.</p>
          <Link href="/dashboard" className="btn-primary inline-flex">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const videoUrls = lesson.video_urls || []

  return (
    <div className="min-h-screen pb-12">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/course/${slug}`}
              className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Course</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Unit {unit?.unit_number} / Lesson {lesson.lesson_number}
              </span>
            </div>

            <button
              onClick={handleComplete}
              disabled={completing || !currentStep}
              className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Header */}
        <div className="mb-8 stagger-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-accent">Video Lesson</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {lesson.title}
          </h1>
          {lesson.title_ar && (
            <p className="arabic text-xl text-primary">
              {lesson.title_ar}
            </p>
          )}
        </div>

        {/* Video Player */}
        {videoUrls.length > 0 && (
          <div className="mb-8 space-y-6 stagger-2">
            {videoUrls.map((url, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-video bg-background-secondary">
                  <iframe
                    src={url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lesson Notes */}
        {lesson.content && (
          <div className="mb-8 stagger-3">
            <div className="glass rounded-2xl p-6">
              <h2 className="flex items-center gap-2 font-bold text-foreground mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Lesson Notes
              </h2>
              <div className="text-foreground-secondary leading-relaxed whitespace-pre-wrap">
                {lesson.content}
              </div>
            </div>
          </div>
        )}

        {/* Listening Practice */}
        {scripts.length > 0 && (
          <div className="mb-8 stagger-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Listening Practice
            </h2>

            <div className="space-y-4">
              {scripts.map((script) => (
                <div key={script.id} className="glass rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <button className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-lg">
                      <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{script.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{script.type}</p>
                    </div>
                  </div>

                  {script.script_text && (
                    <div className="mt-4 p-4 rounded-xl bg-secondary border border-border">
                      <p className="arabic text-lg text-primary leading-loose text-center">
                        {script.script_text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Action */}
        <div className="glass rounded-xl p-6 flex items-center justify-between stagger-5">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Ready to continue?</p>
            <p className="text-foreground font-medium">
              Mark this lesson as complete and move to the next step.
            </p>
          </div>

          <button
            onClick={handleComplete}
            disabled={completing || !currentStep}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete & Continue
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
