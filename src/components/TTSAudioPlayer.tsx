'use client'

import { useEffect, useState, useRef } from 'react'

interface TTSAudioPlayerProps {
  text: string
  title?: string
  autoGenerate?: boolean
  className?: string
}

export function TTSAudioPlayer({ 
  text, 
  title,
  autoGenerate = true,
  className = '' 
}: TTSAudioPlayerProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generate audio on mount if autoGenerate is true
  useEffect(() => {
    if (autoGenerate && text && !audioUrl && !isGenerating) {
      generateAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoGenerate])

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const generateAudio = async () => {
    if (!text || isGenerating) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      // Check if response is JSON (error) or binary (audio)
      const contentType = response.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        // It's an error response
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate audio')
      }

      if (!response.ok) {
        throw new Error('Failed to generate audio')
      }

      // Get the audio as a blob directly
      const audioBlob = await response.blob()
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
    } catch (err) {
      console.error('TTS Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate audio')
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(currentProgress || 0)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = percent * duration
  }

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`glass rounded-2xl p-6 sm:p-8 ${className}`}>
      {/* Title */}
      {title && (
        <h3 className="font-medium text-foreground mb-4 text-center">{title}</h3>
      )}

      {/* Status indicator */}
      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light opacity-30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
              <svg className="w-6 h-6 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </div>
          <p className="text-foreground-secondary text-sm">Generating Saudi dialect audio...</p>
          <p className="text-muted-foreground text-xs mt-1">This may take a few seconds</p>
        </div>
      )}

      {/* Error state */}
      {error && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-error text-sm mb-4">{error}</p>
          <button
            onClick={generateAudio}
            className="btn-primary text-sm py-2 px-4"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Audio player */}
      {audioUrl && !isGenerating && !error && (
        <>
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false)
              setProgress(0)
            }}
          />

          {/* Big play button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={togglePlayPause}
              className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? (
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div 
            className="h-2 bg-muted rounded-full overflow-hidden cursor-pointer mb-3"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time display */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* AI Generated badge */}
          <div className="flex justify-center mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              AI-Generated Saudi Dialect
            </span>
          </div>
        </>
      )}

      {/* Generate button if not auto-generating */}
      {!autoGenerate && !audioUrl && !isGenerating && !error && (
        <div className="flex justify-center">
          <button
            onClick={generateAudio}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            Generate Audio
          </button>
        </div>
      )}

      {/* Script text preview */}
      {text && (
        <div className="mt-6 p-4 rounded-xl bg-secondary border border-border">
          <p className="arabic text-lg sm:text-xl text-primary leading-loose text-center">
            {text}
          </p>
        </div>
      )}
    </div>
  )
}

