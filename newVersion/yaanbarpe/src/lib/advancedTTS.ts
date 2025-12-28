// Polyfill for Node.js globals in browser environment
if (typeof global === 'undefined') {
  (window as any).global = window;
}

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

export interface TTSVoice {
  name: string;
  shortName: string;
  gender: string;
  locale: string;
  displayName: string;
}

export class AdvancedTTSService {
  private tts: MsEdgeTTS | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isInitialized = false;
  
  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      this.tts = new MsEdgeTTS();
      this.isInitialized = true;
      console.log('✅ Advanced TTS initialized successfully');
    } catch (error) {
      console.warn('⚠️ Advanced TTS initialization failed:', error);
      this.isInitialized = false;
      this.tts = null;
    }
  }

  // Check if TTS is available
  isAvailable(): boolean {
    return this.isInitialized && this.tts !== null;
  }

  // Get available high-quality female voices
  async getAvailableVoices(): Promise<TTSVoice[]> {
    if (!this.isAvailable()) {
      console.warn('⚠️ Advanced TTS not available');
      return [];
    }
    
    try {
      const voices = await this.tts!.getVoices();
      
      // Focus on high-quality neural female voices in English
      const femaleVoices = voices.filter(voice => 
        voice.Locale.startsWith('en-') && 
        voice.Gender === 'Female' &&
        (voice.VoiceType === 'Neural' || voice.Name.includes('Neural'))
      ).map(voice => ({
        name: voice.Name,
        shortName: voice.ShortName,
        gender: voice.Gender,
        locale: voice.Locale,
        displayName: voice.FriendlyName || voice.ShortName
      }));

      // Sort by preference - prioritize US and UK voices
      return femaleVoices.sort((a, b) => {
        const aScore = this.getVoiceScore(a);
        const bScore = this.getVoiceScore(b);
        return bScore - aScore;
      });
    } catch (error) {
      console.error('Failed to get voices:', error);
      return [];
    }
  }

  private getVoiceScore(voice: TTSVoice): number {
    let score = 0;
    
    // Prioritize specific high-quality voices
    const premiumVoices = [
      'aria', 'jenny', 'jane', 'sara', 'libby', 'sonia', 'amber', 'ana', 'emma'
    ];
    
    if (premiumVoices.some(name => voice.shortName.toLowerCase().includes(name))) {
      score += 10;
    }
    
    // Prefer US and UK locales
    if (voice.locale === 'en-US') score += 5;
    if (voice.locale === 'en-GB') score += 4;
    if (voice.locale === 'en-AU') score += 3;
    
    return score;
  }

  // Get the best available female voice
  async getBestFemaleVoice(): Promise<TTSVoice | null> {
    const voices = await this.getAvailableVoices();
    return voices.length > 0 ? voices[0] : null;
  }

  // Generate high-quality speech
  async generateSpeech(text: string, voice?: TTSVoice): Promise<ArrayBuffer> {
    if (!this.isAvailable()) {
      throw new Error('Advanced TTS not available');
    }
    
    try {
      const selectedVoice = voice || await this.getBestFemaleVoice();
      
      if (!selectedVoice) {
        throw new Error('No suitable voice found');
      }

      // Set voice with enhanced parameters for more natural speech
      this.tts!.setVoice(selectedVoice.shortName);
      
      // Use high-quality audio format
      this.tts!.setOutputFormat(OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);

      // Process text with SSML for more natural speech patterns
      const processedText = this.enhanceTextWithSSML(text);
      
      console.log(`🎤 Generating speech with ${selectedVoice.displayName}`);
      
      const audioData = await this.tts!.toArrayBuffer(processedText);
      return audioData;
      
    } catch (error) {
      console.error('Speech generation failed:', error);
      throw error;
    }
  }

  // Enhance text with SSML for more natural speech
  private enhanceTextWithSSML(text: string): string {
    let processedText = text;

    // Add natural pauses and emphasis using SSML
    processedText = processedText
      // Add pauses after sentences
      .replace(/([.!?])\s+/g, '$1<break time="500ms"/> ')
      // Add short pauses after commas
      .replace(/,\s+/g, ',<break time="200ms"/> ')
      // Add emphasis to important words
      .replace(/\b(amazing|wonderful|incredible|beautiful|stunning|magnificent|extraordinary)\b/gi, 
        '<emphasis level="moderate">$1</emphasis>')
      // Add reverent tone for spiritual/religious words
      .replace(/\b(temple|sacred|divine|holy|spiritual|prayer|worship|devotion)\b/gi, 
        '<prosody rate="slow" pitch="+2st">$1</prosody>')
      // Slow down for numbers and dates
      .replace(/\b(\d{1,4})\b/g, '<say-as interpret-as="number">$1</say-as>');

    // Wrap in SSML speak tag with natural voice settings
    return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <prosody rate="0.9" pitch="+3st" volume="90">
        ${processedText}
      </prosody>
    </speak>`;
  }

  // Play the generated speech
  async playText(text: string, voice?: TTSVoice): Promise<void> {
    try {
      // Stop any currently playing audio
      this.stop();

      // Generate high-quality speech
      const audioData = await this.generateSpeech(text, voice);
      
      // Create blob and audio element
      const audioBlob = new Blob([audioData], { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      this.currentAudio = new Audio(audioUrl);
      
      // Play the audio
      await this.currentAudio.play();
      
      // Clean up URL when audio ends
      this.currentAudio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      });
      
    } catch (error) {
      console.error('Failed to play text:', error);
      throw error;
    }
  }

  // Control methods
  pause(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  resume(): void {
    if (this.currentAudio) {
      this.currentAudio.play();
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  // Get current playback state
  isPlaying(): boolean {
    return this.currentAudio ? !this.currentAudio.paused : false;
  }

  isPaused(): boolean {
    return this.currentAudio ? this.currentAudio.paused && this.currentAudio.currentTime > 0 : false;
  }

  // Get progress (0-1)
  getProgress(): number {
    if (!this.currentAudio) return 0;
    return this.currentAudio.currentTime / this.currentAudio.duration || 0;
  }
}

// Create singleton instance
export const advancedTTS = new AdvancedTTSService();
