'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Redirect to pending approval page
      router.push('/pending')
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
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

        {/* Signup Form */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md stagger-2">
            <div className="glass rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
                Create your account
              </h1>
              <p className="text-foreground-secondary text-center mb-8">
                Start your Arabic learning journey
              </p>

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-foreground-secondary">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="input"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground-secondary">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground-secondary">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-foreground-secondary">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="input"
                    placeholder="Confirm your password"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-error/10 border border-error/20 text-error rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Creating account...
                    </span>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-foreground-secondary">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
                  Sign in
                </Link>
              </p>
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
