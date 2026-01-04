'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function PendingPage() {
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkApproval = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_approved')
        .eq('id', user.id)
        .single()

      if (profile?.is_approved) {
        router.push('/dashboard')
        return
      }

      setChecking(false)
    }

    checkApproval()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light opacity-30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-background"></div>
          </div>
          <p className="text-foreground-secondary">Checking status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="fixed inset-0 pattern-arabic pointer-events-none" />

      <div className="min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 stagger-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg font-display">ع</span>
              </div>
              <span className="text-foreground font-semibold text-lg">Arabently</span>
            </Link>
          </div>
        </header>

        {/* Pending Message */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md text-center stagger-2">
            <div className="glass rounded-2xl p-8">
              {/* Clock icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-warning/10 border border-warning/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-bold mb-3 text-foreground">Account Pending Approval</h1>
              <p className="text-foreground-secondary mb-6 leading-relaxed">
                Thank you for signing up! Your account is currently awaiting admin approval.
                You will receive access once approved.
              </p>

              <div className="p-4 rounded-xl bg-secondary border border-border mb-6">
                <p className="text-sm text-muted-foreground">
                  This usually takes less than 24 hours. If you have any questions,
                  please contact support.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full btn-primary justify-center"
                >
                  Check Status
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full btn-secondary"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                ← Back to home
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
