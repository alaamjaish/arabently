'use client'

import { useState, use } from 'react'
import Link from 'next/link'

// Vocabulary quiz data - Arabic words with English translations
const quizQuestions = [
  {
    id: 1,
    arabic: 'مرحبا',
    transliteration: 'Marhaba',
    correctAnswer: 'Hello',
    options: ['Hello', 'Goodbye', 'Thank you', 'Please']
  },
  {
    id: 2,
    arabic: 'شكراً',
    transliteration: 'Shukran',
    correctAnswer: 'Thank you',
    options: ['Hello', 'Sorry', 'Thank you', 'Yes']
  },
  {
    id: 3,
    arabic: 'كيف حالك؟',
    transliteration: 'Kayf halak?',
    correctAnswer: 'How are you?',
    options: ['What is your name?', 'How are you?', 'Where are you from?', 'How old are you?']
  },
  {
    id: 4,
    arabic: 'ماء',
    transliteration: 'Maa',
    correctAnswer: 'Water',
    options: ['Food', 'Water', 'Coffee', 'Tea']
  },
  {
    id: 5,
    arabic: 'أنا بخير',
    transliteration: 'Ana bikhayr',
    correctAnswer: 'I am fine',
    options: ['I am tired', 'I am hungry', 'I am fine', 'I am lost']
  }
]

interface QuizPageProps {
  params: Promise<{ slug: string }>
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = use(params)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<{ questionId: number; isCorrect: boolean }[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return
    
    const isCorrect = selectedAnswer === question.correctAnswer
    setAnswers([...answers, { questionId: question.id, isCorrect }])
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setQuizCompleted(false)
  }

  // Calculate score
  const correctAnswers = answers.filter(a => a.isCorrect).length
  const totalQuestions = quizQuestions.length
  const scorePercentage = (correctAnswers / totalQuestions) * 100

  if (quizCompleted) {
    return (
      <div className="min-h-screen p-6 lg:p-10">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            href={`/course/${slug}`}
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>

          {/* Results Card */}
          <div className="glass rounded-2xl p-8 text-center stagger-1">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
              <span className="text-5xl">🎉</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2 text-foreground">Quiz Complete!</h1>
            <p className="text-foreground-secondary mb-8">Here&apos;s how you did:</p>

            {/* Score Display */}
            <div className="glass rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-5xl font-bold gradient-text mb-1">{correctAnswers}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="w-px h-16 bg-border"></div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-foreground-secondary mb-1">{totalQuestions}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            {/* Percentage Score - Shows the BUGGY value */}
            <div className="mb-8">
              <p className="text-lg text-foreground-secondary mb-2">Your Score</p>
              <p className="text-6xl font-bold gradient-text">{Math.round(scorePercentage)}%</p>
            </div>

            {/* Progress Bar - Also shows buggy percentage */}
            <div className="w-full h-4 bg-muted rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000"
                style={{ width: `${scorePercentage}%` }}
              />
            </div>

            {/* Message based on score - will be confusing due to bug! */}
            <p className="text-foreground-secondary mb-8">
              {scorePercentage >= 80 
                ? "Excellent work! You're mastering Saudi Arabic! 🌟"
                : scorePercentage >= 60
                  ? "Good progress! Keep practicing! 💪"
                  : scorePercentage >= 40
                    ? "Nice effort! Review the vocabulary and try again! 📚"
                    : "Keep learning! Practice makes perfect! 🎯"
              }
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="btn-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <Link
                href={`/course/${slug}`}
                className="btn-secondary"
              >
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 stagger-1">
          <Link
            href={`/course/${slug}`}
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
          
          {/* Progress indicator - BUG: hardcoded to 1 instead of currentQuestion + 1 🐛 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {1} / {quizQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden stagger-2">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Quiz Card */}
        <div className="glass rounded-2xl overflow-hidden stagger-3">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 p-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">Translate this word:</p>
            <h2 className="text-4xl font-bold arabic text-primary mb-2">{question.arabic}</h2>
            <p className="text-foreground-secondary italic">{question.transliteration}</p>
          </div>

          {/* Answer Options */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswer === option
                const isCorrectAnswer = option === question.correctAnswer
                const showCorrect = showResult && isCorrectAnswer
                const showWrong = showResult && isSelected && !isCorrectAnswer

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showResult}
                    className={`
                      w-full p-4 rounded-xl text-left font-medium transition-all
                      ${isSelected && !showResult ? 'border-2 border-primary bg-primary/10' : 'border-2 border-border'}
                      ${showCorrect ? 'border-success bg-success/10 text-success' : ''}
                      ${showWrong ? 'border-error bg-error/10 text-error' : ''}
                      ${!showResult && !isSelected ? 'hover:border-primary/50 hover:bg-secondary' : ''}
                      ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && (
                        <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {showWrong && (
                        <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Action Button */}
            <div className="mt-6">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className={`
                    w-full py-4 rounded-xl font-semibold transition-all
                    ${selectedAnswer 
                      ? 'btn-primary' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full btn-primary py-4"
                >
                  {isLastQuestion ? 'See Results' : 'Next Question'}
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Current Score Preview */}
        <div className="mt-6 glass rounded-xl p-4 stagger-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Progress</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-success font-bold">{answers.filter(a => a.isCorrect).length}</span>
                <span className="text-muted-foreground text-sm">correct</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-error font-bold">{answers.filter(a => !a.isCorrect).length}</span>
                <span className="text-muted-foreground text-sm">wrong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

