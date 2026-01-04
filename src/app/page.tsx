import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="fixed inset-0 pattern-arabic pointer-events-none" />

      <div className="min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className="p-6 md:p-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 stagger-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl font-display">ع</span>
              </div>
              <span className="text-foreground font-semibold text-lg">Arabently</span>
            </div>
            <div className="flex items-center gap-4 stagger-2">
              <ThemeToggle />
              <Link
                href="/login"
                className="btn-ghost hidden sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-16">
          {/* Badge */}
          <div className="stagger-1 mb-8">
            <span className="badge badge-primary">
              ✨ Powered by the Next Step System
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="stagger-2 text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Learn </span>
            <span className="gradient-text font-display">العربية</span>
            <br />
            <span className="text-foreground">The Smart Way</span>
          </h1>

          {/* Subheadline */}
          <p className="stagger-3 text-foreground-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Stop guessing what to study next. Our guided learning system takes you step by step
            from complete beginner to conversational fluency in Saudi Arabic.
          </p>

          {/* CTA Buttons */}
          <div className="stagger-3 flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="btn-primary glow-pulse">
              <span>Start Learning Free</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="#features" className="btn-secondary">
              See How It Works
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="stagger-4 flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-14 text-sm">
            <div className="flex items-center gap-2 text-foreground-secondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>10 Units, 50 Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-foreground-secondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Spaced Repetition</span>
            </div>
            <div className="flex items-center gap-2 text-foreground-secondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Saudi Dialect</span>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                How It Works
              </h2>
              <p className="text-foreground-secondary max-w-xl mx-auto">
                A simple, effective system designed for real progress
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="feature-card stagger-3">
                <div className="feature-icon w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">Watch Video Lessons</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  Professional video content teaches you vocabulary, grammar, and cultural context.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="feature-card stagger-4">
                <div className="feature-icon w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent-light/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">Practice Listening</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  Listen to native speakers. We remind you when to re-listen for optimal retention.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="feature-card stagger-5">
                <div className="feature-icon w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">Follow the Next Step</h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  Never wonder what to do. Just follow your personalized next step each session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Arabic Preview Section */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                What You&apos;ll Learn
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary-hover transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-medium">Greetings & Introductions</h3>
                    <p className="text-foreground-secondary text-sm">
                      Master common phrases like <span className="arabic text-primary font-medium">مرحبا</span> (hello) and <span className="arabic text-primary font-medium">كيفك؟</span> (how are you?)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary-hover transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-medium">Daily Conversations</h3>
                    <p className="text-foreground-secondary text-sm">
                      Talk about family, work, food with phrases like <span className="arabic text-accent font-medium">وش شغلك؟</span> (what do you do?)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary-hover transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="gradient-text font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-medium">Real Saudi Dialect</h3>
                    <p className="text-foreground-secondary text-sm">
                      Not textbook Arabic. Learn how Saudis actually speak: <span className="arabic text-primary font-medium">يلا نروح</span> (let&apos;s go)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="divider-ornate mb-8">
              <span>❖</span>
            </div>
            <blockquote className="text-xl md:text-2xl text-foreground font-display italic leading-relaxed mb-6">
              &ldquo;Finally a course that teaches REAL Saudi Arabic! After 3 months, I can chat with my Saudi colleagues naturally.&rdquo;
            </blockquote>
            <p className="text-foreground-secondary">
              — Sarah M., <span className="text-primary">USA</span>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Join thousands of learners mastering conversational Arabic.
            </p>
            <Link href="/signup" className="btn-primary text-lg px-10 py-4 glow-pulse inline-flex">
              <span>Start Your Journey</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              No credit card required. Start learning in under a minute.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm font-display">ع</span>
              </div>
              <span className="text-foreground font-medium">Arabently</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Arabently. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

