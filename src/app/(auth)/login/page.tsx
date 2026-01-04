'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Check if user is approved
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_approved')
        .single()

      if (!profile?.is_approved) {
        router.push('/pending')
        return
      }

      router.push('/dashboard')
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

        {/* Login Form */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md stagger-2">
            <div className="glass rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
                Welcome back
              </h1>
              <p className="text-foreground-secondary text-center mb-8">
                Sign in to continue learning Arabic
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
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
                    placeholder="Enter your password"
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
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-foreground-secondary">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
                  Sign up
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
