import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Available TTS models
const TTS_MODELS = {
  pro: 'gemini-2.5-pro-preview-tts',
  flash: 'gemini-2.5-flash-preview-tts',
}

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'Kore', model: modelType = 'flash' } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
    }

    // Use Gemini 2.5 Flash Preview TTS (faster and cheaper) or Pro
    const modelName = modelType === 'pro' ? TTS_MODELS.pro : TTS_MODELS.flash
    const model = genAI.getGenerativeModel({
      model: modelName,
    })

    // Create a prompt that instructs Gemini to speak in Saudi dialect
    const prompt = `You are a native Saudi Arabic speaker from Riyadh. 
Read the following text aloud in authentic Saudi Arabian dialect (اللهجة السعودية).
Speak naturally, as a local would speak in everyday conversation.
Use proper Saudi pronunciation and intonation.
Make it sound warm and friendly.

Text to read:
${text}`

    // Generate content with speech
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice,
            },
          },
        },
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const response = result.response
    
    // Extract audio data from response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioData = (response as any).candidates?.[0]?.content?.parts?.[0]?.inlineData

    if (!audioData) {
      // Fallback: If no audio, return an error
      return NextResponse.json(
        { error: 'Audio generation not available. Try again.' },
        { status: 503 }
      )
    }

    // Return the audio as base64
    return NextResponse.json({
      audio: audioData.data,
      mimeType: audioData.mimeType || 'audio/mp3',
      model: modelName,
    })
  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audio', details: String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint to check if TTS is available
export async function GET() {
  const isConfigured = !!process.env.GEMINI_API_KEY
  return NextResponse.json({
    available: isConfigured,
    models: TTS_MODELS,
    voices: ['Kore', 'Puck', 'Charon', 'Fenrir', 'Aoede'],
    description: 'Gemini 2.5 TTS - Native Saudi Arabic dialect speech generation',
  })
}

