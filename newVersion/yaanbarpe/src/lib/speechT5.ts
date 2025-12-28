// Free Azure Cognitive Services TTS (0.5M characters/month free)
const AZURE_SUBSCRIPTION_KEY = 'YOUR_AZURE_KEY_HERE'; // Replace with your free Azure key
const AZURE_REGION = 'eastus'; // Replace with your region

export interface AzureTTSOptions {
  text: string;
  voice?: string;
  rate?: string;
  pitch?: string;
}

export async function generateNaturalSpeech(options: AzureTTSOptions): Promise<ArrayBuffer> {
  const {
    text,
    voice = 'en-US-AriaNeural', // Premium neural voice
    rate = '0.9', // Slightly slower for more natural cadence
    pitch = '+2Hz' // Slightly higher for feminine voice
  } = options;

  // Create SSML for more natural speech
  const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="${voice}">
        <prosody rate="${rate}" pitch="${pitch}">
          ${text}
        </prosody>
      </voice>
    </speak>
  `;

  try {
    const response = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_SUBSCRIPTION_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'User-Agent': 'YourAppName'
      },
      body: ssml
    });

    if (!response.ok) {
      throw new Error(`Azure TTS failed: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('Azure TTS error:', error);
    throw error;
  }
}

// Alternative: Use a free TTS proxy service
export async function generateFreeNaturalSpeech(text: string): Promise<string> {
  try {
    // Using a free TTS service (ResponsiveVoice alternative)
    const response = await fetch('https://api.voicerss.org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        key: 'YOUR_VOICERSS_KEY', // Free tier available
        src: text,
        hl: 'en-us',
        v: 'Linda', // Female voice
        c: 'mp3',
        f: '44khz_16bit_stereo'
      })
    });

    if (!response.ok) {
      throw new Error('VoiceRSS TTS failed');
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Free TTS error:', error);
    throw error;
  }
}
