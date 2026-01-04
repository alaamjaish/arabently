import { NextRequest, NextResponse } from 'next/server'

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

    const modelName = modelType === 'pro' ? TTS_MODELS.pro : TTS_MODELS.flash

    // Create a prompt that instructs Gemini to speak in Saudi dialect
    const prompt = `You are a native Saudi Arabic speaker from Riyadh. 
Read the following text aloud in authentic Saudi Arabian dialect (اللهجة السعودية).
Speak naturally, as a local would speak in everyday conversation.
Use proper Saudi pronunciation and intonation.
Make it sound warm and friendly.

Text to read:
${text}`

    // Call Gemini API directly with REST for better audio handling
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
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
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      return NextResponse.json(
        { error: 'Gemini API error', details: errorData.error?.message || 'Unknown error' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract audio data from response
    const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData

    if (!audioData) {
      console.error('No audio data in response:', JSON.stringify(data, null, 2))
      return NextResponse.json(
        { error: 'No audio generated. The model may not support audio output.' },
        { status: 503 }
      )
    }

    // Log the mime type for debugging
    console.log('Audio MIME type:', audioData.mimeType)

    // Gemini returns audio as base64, decode it
    const audioBuffer = Buffer.from(audioData.data, 'base64')
    
    // Determine the correct MIME type
    // Gemini typically returns audio/L16 (raw PCM) or audio/wav
    let mimeType = audioData.mimeType || 'audio/wav'
    
    // If it's raw PCM, we need to wrap it in a WAV header for browser compatibility
    if (mimeType === 'audio/L16' || mimeType.includes('L16')) {
      // Create WAV header for 24kHz, 16-bit, mono audio (Gemini's typical output)
      const wavBuffer = createWavBuffer(audioBuffer, 24000, 16, 1)
      mimeType = 'audio/wav'
      
      return new NextResponse(wavBuffer, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Length': wavBuffer.length.toString(),
        },
      })
    }

    // Return the audio directly as binary
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': audioBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audio', details: String(error) },
      { status: 500 }
    )
  }
}

// Helper function to create a WAV file from raw PCM data
function createWavBuffer(pcmData: Buffer, sampleRate: number, bitsPerSample: number, numChannels: number): Buffer {
  const byteRate = sampleRate * numChannels * bitsPerSample / 8
  const blockAlign = numChannels * bitsPerSample / 8
  const dataSize = pcmData.length
  const headerSize = 44
  const fileSize = dataSize + headerSize - 8

  const buffer = Buffer.alloc(headerSize + dataSize)

  // RIFF header
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(fileSize, 4)
  buffer.write('WAVE', 8)

  // fmt subchunk
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16) // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20) // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitsPerSample, 34)

  // data subchunk
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataSize, 40)
  pcmData.copy(buffer, 44)

  return buffer
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

