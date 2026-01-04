'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Script, Course, StudentProgress, RoadmapStep } from '@/lib/types'

export default function ScriptPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const scriptId = params.scriptId as string

  const [script, setScript] = useState<Script | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [progress, setProgress] = useState<StudentProgress | null>(null)
  const [currentStep, setCurrentStep] = useState<RoadmapStep | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()

      const { data: scriptData } = await supabase
        .from('scripts')
        .select('*')
        .eq('id', scriptId)
        .single()

      if (!scriptData) {
        setLoading(false)
        return
      }
      setScript(scriptData)

      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single()
      setCourse(courseData)

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
          .eq('script_id', scriptId)
          .eq('step_order', progressData?.current_step || 1)
          .single()
        setCurrentStep(stepData)
      }

      setLoading(false)
    }

    fetchData()
  }, [scriptId, slug])

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
          <p className="text-foreground-secondary">Loading audio...</p>
        </div>
      </div>
    )
  }

  if (!script) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Content Not Found</h1>
          <p className="text-foreground-secondary mb-6">Sorry, we could not find this listening content.</p>
          <Link href="/dashboard" className="btn-primary inline-flex">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const isReview = currentStep?.step_type === 'review_script'

  return (
    <div className="min-h-screen pb-12">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 glass border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {isReview ? 'Review Session' : 'Listening Practice'}
            </span>

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
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10 stagger-1">
          <div className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6
            ${isReview
              ? 'bg-warning/10 text-warning border border-warning/20'
              : 'bg-primary/10 text-primary border border-primary/20'
            }
          `}>
            {isReview ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Review Session
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                New Listening
              </>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {script.title}
          </h1>
          <p className="text-foreground-secondary">
            {isReview
              ? 'Reinforce what you learned by listening again.'
              : 'Listen carefully to this dialogue.'}
          </p>
        </div>

        {/* Audio Player Card */}
        <div className="glass rounded-2xl p-8 mb-8 stagger-2">
          {/* Big play button */}
          <div className="flex justify-center mb-8">
            <button className="group relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-light animate-ping opacity-20"></div>
              <svg className="w-12 h-12 text-primary-foreground ml-2 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Type label */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground capitalize mb-1">
              {script.type === 'dialogue' ? 'Dialogue' :
                script.type === 'input' ? 'Comprehensible Input' : 'Practice Audio'}
            </p>
          </div>

          {/* YouTube embed if applicable */}
          {script.audio_url && script.audio_url.includes('youtube') && (
            <div className="aspect-video rounded-xl overflow-hidden bg-background-secondary mb-6">
              <iframe
                src={script.audio_url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Progress bar placeholder */}
          {!script.audio_url?.includes('youtube') && (
            <div className="mb-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-primary to-primary-light"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0:00</span>
                <span>--:--</span>
              </div>
            </div>
          )}

          {/* Transcript toggle */}
          {script.script_text && (
            <div className="border-t border-border pt-6">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors"
              >
                <span className="flex items-center gap-3 text-foreground font-medium">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </span>
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${showTranscript ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showTranscript && (
                <div className="mt-4 p-6 rounded-xl bg-secondary border border-border">
                  <p className="arabic text-2xl leading-loose text-center text-primary">
                    {script.script_text}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tips Card */}
        <div className="glass rounded-xl p-6 mb-8 stagger-3">
          <h3 className="flex items-center gap-2 font-medium text-foreground mb-4">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isReview ? 'Review Tips' : 'Listening Tips'}
          </h3>
          <ul className="space-y-3 text-foreground-secondary text-sm">
            {isReview ? (
              <>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Try to understand without looking at the transcript
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Notice how much more you understand now
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pay attention to words you still find challenging
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Listen to the full audio without pausing first
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Do not worry if you do not understand everything
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Focus on the overall meaning and tone
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Bottom Action */}
        <div className="glass rounded-xl p-6 flex items-center justify-between stagger-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Done listening?</p>
            <p className="text-foreground font-medium">
              Move on to your next step.
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
                Done Listening
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
