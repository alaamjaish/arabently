'use client'

import { useState, useRef, useEffect } from 'react'

interface InlineTTSPlayerProps {
  text: string
  title?: string
  type?: string
}

export function InlineTTSPlayer({ text, title, type }: InlineTTSPlayerProps) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready' | 'playing' | 'error'>('idle')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const generateAndPlay = async () => {
    // If already have audio, just play/pause
    if (audioUrl && audioRef.current) {
      if (status === 'playing') {
        audioRef.current.pause()
        setStatus('ready')
      } else {
        audioRef.current.play()
        setStatus('playing')
      }
      return
    }

    // Generate new audio
    setStatus('generating')
    setErrorMsg(null)

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
      setStatus('ready')
      
      // Auto-play after generation
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(console.error)
          setStatus('playing')
        }
      }, 100)
    } catch (err) {
      console.error('TTS Error:', err)
      setErrorMsg(err instanceof Error ? err.message : 'Failed to generate audio')
      setStatus('error')
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(currentProgress || 0)
  }

  const getButtonContent = () => {
    switch (status) {
      case 'generating':
        return (
          <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        )
      case 'playing':
        return (
          <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )
    }
  }

  return (
    <div className="glass rounded-xl p-5">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setStatus('playing')}
          onPause={() => setStatus('ready')}
          onEnded={() => {
            setStatus('ready')
            setProgress(0)
          }}
        />
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={generateAndPlay}
          disabled={status === 'generating'}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 
            transition-all shadow-lg
            ${status === 'generating' 
              ? 'bg-gradient-to-br from-primary/70 to-primary-light/70 cursor-wait' 
              : status === 'error'
                ? 'bg-gradient-to-br from-error to-error/80 hover:scale-105'
                : 'bg-gradient-to-br from-primary to-primary-light hover:scale-105'
            }
          `}
        >
          {getButtonContent()}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground truncate">{title}</h3>
            {status === 'generating' && (
              <span className="text-xs text-primary animate-pulse">Generating...</span>
            )}
            {status === 'ready' && audioUrl && (
              <span className="text-xs text-success">✓ Ready</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground capitalize">{type}</p>
          
          {/* Progress bar when playing */}
          {audioUrl && (status === 'playing' || status === 'ready') && (
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {status === 'error' && errorMsg && (
        <div className="mt-3 p-3 rounded-lg bg-error/10 border border-error/20">
          <p className="text-error text-sm">{errorMsg}</p>
          <button 
            onClick={generateAndPlay}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Script text */}
      {text && (
        <div className="mt-4 p-4 rounded-xl bg-secondary border border-border">
          <p className="arabic text-lg text-primary leading-loose text-center">
            {text}
          </p>
        </div>
      )}

      {/* AI badge when audio is ready */}
      {audioUrl && (
        <div className="flex justify-center mt-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
            🤖 AI Saudi Voice
          </span>
        </div>
      )}
    </div>
  )
}

