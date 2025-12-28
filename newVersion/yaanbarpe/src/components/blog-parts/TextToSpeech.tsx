
import React, { useState, useRef, useEffect } from 'react';

// Remove scrollbar styles
const hideScrollbarStyle = {
  overflow: 'hidden',
};
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  title: string;
  id: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, title, id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Clean text by removing HTML tags and properly extract all content
  const cleanText = (htmlText: string) => {
    // Remove HTML tags while preserving text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    
    // Extract text from all elements including paragraphs, headings, lists, etc.
    const allTextNodes: string[] = [];
    
    // Walk through all text nodes
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent?.trim();
      if (text && text.length > 0) {
        allTextNodes.push(text);
      }
    }
    
    // Join all text content
    let fullText = allTextNodes.join(' ');
    
    // Clean up extra whitespace and normalize
    fullText = fullText
      .replace(/\s+/g, ' ')     // Replace multiple whitespace with single space
      .replace(/\n+/g, ' ')     // Replace line breaks with spaces
      .replace(/\t+/g, ' ')     // Replace tabs with spaces
      .replace(/\r+/g, ' ')     // Replace carriage returns with spaces
      .trim();                  // Remove leading/trailing whitespace
    
    // Add proper punctuation if missing
    if (fullText && !fullText.match(/[.!?]$/)) {
      fullText += '.';
    }
    
    console.log('🎙️ Original HTML length:', htmlText.length);
    console.log('🎙️ Extracted text preview:', fullText.substring(0, 300) + '...');
    console.log('🎙️ Full extracted text length:', fullText.length);
    console.log('🎙️ Word count:', fullText.split(' ').length);
    
    return fullText;
  };
  
  // Add natural pauses and emotional inflection for more human-like speech
  const addNaturalPausesAndProsody = (text: string) => {
    // Add longer pauses after periods for dramatic effect
// Use longer pauses represented by multiple spaces for more natural speech
    let enhancedText = text.replace(/\. /g, '.     ');
    // Add medium pauses after commas for natural breathing
    enhancedText = enhancedText.replace(/, /g, ',   ');
    // Add expressive pauses after question marks
    enhancedText = enhancedText.replace(/\? /g, '?     ');
    // Add enthusiastic pauses after exclamation marks
    enhancedText = enhancedText.replace(/! /g, '!     ');
    // Add thoughtful pauses after semicolons and colons
    enhancedText = enhancedText.replace(/; /g, ';    ');
    enhancedText = enhancedText.replace(/: /g, ':   ');
    enhancedText = enhancedText.replace(/: /g, ':   ');
    
    // Add natural pauses at paragraph breaks
    enhancedText = enhancedText.replace(/\n\s*\n/g, '.      ');
    
    // Add slight pauses around quoted text
    enhancedText = enhancedText.replace(/"(.*?)"/g, '  "$1"  ');
    
    // Add emphasis to important words by surrounding with subtle pauses
    enhancedText = enhancedText.replace(/\b(important|significant|remarkable|beautiful|amazing|wonderful|incredible|stunning|magnificent|extraordinary)\b/gi, ' $1 ');
    
    // Add natural breathing pauses before conjunctions
    enhancedText = enhancedText.replace(/\b(and|but|however|therefore|moreover|furthermore)\b/gi, '  $1');
    
    // Clean up excessive spaces but preserve intentional pauses
    enhancedText = enhancedText.replace(/\s{4,}/g, '   ');
    enhancedText = enhancedText.replace(/\s{2}([a-z])/g, ' $1'); // Don't over-pause mid-sentence
    
    return enhancedText;
  };

  // Add emotional context and vary speech patterns based on content
  const addEmotionalInflection = (text: string) => {
    // Detect emotional keywords and add natural speech variations
    const emotionalPatterns = {
      excitement: /\b(amazing|wonderful|incredible|fantastic|extraordinary|magnificent|stunning|breathtaking)\b/gi,
      reverence: /\b(temple|sacred|divine|holy|spiritual|worship|prayer|devotion)\b/gi,
      historical: /\b(ancient|centuries|historical|heritage|tradition|legendary|mythology)\b/gi,
      descriptive: /\b(beautiful|elegant|intricate|ornate|carved|decorated|adorned)\b/gi
    };

    let processedText = text;
    
    // Add slight emphasis to emotional words by spacing
    Object.entries(emotionalPatterns).forEach(([emotion, pattern]) => {
      processedText = processedText.replace(pattern, (match) => ` ${match} `);
    });
    
    // Add natural sentence flow variations
    processedText = processedText.replace(/\b(The|This|That|These|Those)\s+([A-Z][a-z]+)/g, '$1 $2');
    
    return processedText.replace(/\s+/g, ' ').trim();
  };

  useEffect(() => {
    // Cleanup when component unmounts or changes
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [id]); // Reset when blog post changes

  const audioRef = useRef<HTMLAudioElement | null>(null);

const startReading = async () => {
    if (!isPlaying && !isPaused) {
      await startSpeaking();
    } else if (isPaused) {
      resumeReading();
    } else {
      pauseReading();
    }
  };
  
  // Start speaking with Web Speech API
const startSpeaking = async () => {
    try {
      const cleanedText = addNaturalPausesAndProsody(cleanText(text));
      console.log("🎙️ Using Web Speech API for natural narration");

      // Cancel any existing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utteranceRef.current = utterance;

      const voices = window.speechSynthesis.getVoices();
      const bestVoice = findBestVoice(voices);
      
      if (bestVoice) {
        console.log(`🎙️ Selected voice: ${bestVoice.name} (${bestVoice.lang})`);
        utterance.voice = bestVoice;
      }

      // Enhanced settings for more natural female speech with chunked delivery
      utterance.rate = 0.7;      // Even slower for more natural cadence
      utterance.pitch = 1.15;    // Balanced pitch for feminine voice
      utterance.volume = 0.9;    // Slightly lower volume
      
      // Add more dramatic pitch variation for expressiveness
      const randomPitchVariation = Math.random() * 0.15 - 0.075;
      utterance.pitch += randomPitchVariation;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };
    
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPosition(0);

        toast({
          title: "✅ Reading Complete",
          description: "Finished reading with Web Speech API",
          duration: 2000,
        });
      };

utterance.onerror = (event) => {
       console.debug(`Error during speech synthesis: ${event.error}`, event);
console.error('TTS Error:', event.error, event);
        setIsPlaying(false);
        setIsPaused(false);
        toast({
          title: "❌ Audio Error",
          description: "Unable to read the article. Please try again.",
          duration: 3000,
        });
      };

      // Play the speech
      window.speechSynthesis.speak(utterance);

      toast({
        title: "🎤 Web Speech API Started",
        description: `Reading with Web Speech API: ${title}`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Web Speech API failed, falling back to browser TTS:', error);

      toast({
        title: "⚠️ Falling back to browser voice",
        description: "Web Speech API unavailable, using system voice",
        duration: 3000,
      });

      // Fallback to basic browser TTS
      startBasicTTS();
    }
  };

  const startBasicTTS = () => {
    const cleanedText = addNaturalPausesAndProsody(cleanText(text));
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser.",
        duration: 3000,
      });
      return;
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    // Wait for voices to load
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      if (voices.length === 0) {
        // Voices not loaded yet, wait a bit
        setTimeout(loadVoices, 100);
        return;
      }

      console.log('🎤 Available voices:', voices.map(v => `${v.name} (${v.lang})`));

      // Find the best available voice
      const bestVoice = findBestVoice(voices);
      
      if (bestVoice) {
        console.log(`🎙️ Selected voice: ${bestVoice.name} (${bestVoice.lang})`);
      }

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      
      // Enhanced settings for more natural female speech
      utterance.rate = 0.75;     // Slower rate for more natural female cadence
      utterance.pitch = 1.1;     // Balanced pitch for feminine voice
      utterance.volume = 0.9;    // Slightly lower volume
      
      // Add subtle variations to make speech less robotic and more expressive
      const randomPitchVariation = Math.random() * 0.08 - 0.04; // More pitch variation for expressiveness
      utterance.pitch += randomPitchVariation;  // Add random variation to pitch
      
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        const words = cleanedText.split(' ');
        setDuration(words.length);
        
        // Update progress
        intervalRef.current = setInterval(() => {
          setCurrentPosition(prev => {
            if (prev >= words.length - 1) {
              clearInterval(intervalRef.current!);
              return words.length;
            }
            return prev + 1;
          });
        }, 200);
        
        toast({
          title: "🎧 Enhanced Audio Started",
          description: `Reading with ${bestVoice?.name || 'system voice'}: ${title}`,
          duration: 3000,
        });
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPosition(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        toast({
          title: "✅ Reading Complete",
          description: "Enhanced voice narration finished",
          duration: 2000,
        });
      };
      
      utterance.onerror = (event) => {
        console.error('TTS Error:', event);
        setIsPlaying(false);
        setIsPaused(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        toast({
          title: "❌ Audio Error",
          description: "Unable to read the article. Please try again.",
          duration: 3000,
        });
      };
      
      window.speechSynthesis.speak(utterance);
    };

    // Start voice loading
    loadVoices();
  };

  const findBestVoice = (voices: SpeechSynthesisVoice[]) => {
    // Priority order for better female voices - focus on natural, warm sounding voices
    const femaleVoicePriorities = [
      // Google's premium female voices (most natural)
      'Google UK English Female',
      'Google US English Female',
      'Google Australian English Female',
      // Microsoft premium female voices
      'Microsoft Zira Desktop',
      'Microsoft Hazel Desktop', 
      'Microsoft Eva Desktop',
      'Microsoft Aria Desktop',
      // Apple's premium voices
      'Samantha',     // Apple's warm female voice
      'Victoria',     // British female voice
      'Allison',      // Natural US female voice
      'Ava',          // Enhanced female voice
      'Susan',        // Clear female voice
      // Other high-quality female voices
      'Karen',        // Australian female
      'Veena',        // Indian English female
      'Tessa',        // South African female
      'Moira',        // Irish female
      'Fiona',        // Scottish female
      'Serena',       // English female
      // Browser-specific female voices
      'Helena',       // Female voice
      'Linda',        // Female voice
      'Paulina',      // Spanish accent female
      'Kate',         // Female voice
    ];

    // Find first available high-priority female voice
    for (const priorityName of femaleVoicePriorities) {
      const voice = voices.find(v => v.name.includes(priorityName) || v.name === priorityName);
      if (voice) {
        console.log(`🎤 Found prioritized female voice: ${voice.name}`);
        return voice;
      }
    }

    // Fallback: find any English voice
    const englishVoices = voices.filter(v => 
      v.lang.startsWith('en-') && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('woman') ||
       v.name.toLowerCase().includes('zira') ||
       v.name.toLowerCase().includes('hazel'))
    );
    
    if (englishVoices.length > 0) {
      return englishVoices[0];
    }

    // Last resort: any English voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0];
  };
  
  const startBrowserTTS = (cleanedText: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any existing speech
      window.speechSynthesis.cancel();
      
      // Apply natural pauses and prosody enhancements
      const enhancedText = addNaturalPausesAndProsody(cleanedText);
      
      // Wait for voices to load
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length === 0) {
          // Voices not loaded yet, wait a bit
          setTimeout(loadVoices, 100);
          return;
        }

        console.log('🎤 Available voices:', voices.map(v => `${v.name} (${v.lang})`));

        // Find the best available voice
        const bestVoice = findBestVoice(voices);
        
        if (bestVoice) {
          console.log(`🎙️ Selected voice: ${bestVoice.name} (${bestVoice.lang})`);
        }

        const utterance = new SpeechSynthesisUtterance(enhancedText);
        
        // Enhanced settings for more human-like speech
        utterance.rate = 0.88;     // Balanced rate for natural cadence
        utterance.pitch = 1.0;     // Neutral pitch (more natural)
        utterance.volume = 1.0;    // Full volume
        
        // Add subtle variations to make speech less robotic
        const randomFactor = Math.random() * 0.04 - 0.02; // Small random adjustment between -0.02 and 0.02
        utterance.pitch += randomFactor;  // Add slight random variation to pitch
        
        if (bestVoice) {
          utterance.voice = bestVoice;
        }
        
        utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        const words = cleanedText.split(' ');
        setDuration(words.length);
        
        // Update progress
        intervalRef.current = setInterval(() => {
          setCurrentPosition(prev => {
            if (prev >= words.length - 1) {
              clearInterval(intervalRef.current!);
              return words.length;
            }
            return prev + 1;
          });
        }, 200);
        
        toast({
          title: "🎧 Audio Started",
          description: "Now reading (fallback mode): " + title,
          duration: 3000,
        });
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPosition(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        toast({
          title: "✅ Reading Complete",
          description: "Finished reading the article",
          duration: 2000,
        });
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        toast({
          title: "❌ Audio Error",
          description: "Unable to read the article. Please try again.",
          duration: 3000,
        });
      };
      
      window.speechSynthesis.speak(utterance);
    };

    // Start voice loading
    loadVoices();
  } else {
    toast({
      title: "Not Supported",
      description: "Text-to-speech is not supported in your browser.",
      duration: 3000,
    });
  }
};

  const pauseReading = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const resumeReading = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
    setIsPlaying(true);
  };

  const stopReading = () => {
    // Cancel speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPosition(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restartReading = () => {
    stopReading();
    setTimeout(() => startReading(), 100);
  };

  const progress = duration > 0 ? (currentPosition / duration) * 100 : 0;

  // Test ResponsiveVoice with enhanced natural speech patterns
  const testResponsiveVoice = () => {
    console.log('Testing ResponsiveVoice with enhanced natural speech...', window.responsiveVoice);
    if (window.responsiveVoice) {
      // Test text with natural pauses and inflection
      const testText = addNaturalPausesAndProsody('Hello! This is a test of the improved voice system. Does this sound more natural and human-like? I hope so. The voice should have better inflection, rhythm, and natural pauses.');
      
      // Use enhanced voice parameters
      const enhancedParams = {
        pitch: 1.02,    // More natural pitch
        rate: 0.9,      // Slightly slower rate for clarity
        volume: 1.0,    // Full volume
        // Add subtle random variation to make it less robotic
        pitch_increment: 0.01,  // Subtle pitch variation
        onstart: () => console.log('Enhanced voice test started'),
        onend: () => console.log('Enhanced voice test completed')
      };
      
      window.responsiveVoice.speak(testText, 'UK English Female', enhancedParams);
    } else {
      console.log('ResponsiveVoice not available');
      // Fallback to browser TTS with enhanced parameters
      if ('speechSynthesis' in window) {
        const testText = addNaturalPausesAndProsody('This is a test of the improved browser speech synthesis. Does this sound more natural?');
        const utterance = new SpeechSynthesisUtterance(testText);
        
        // Enhanced parameters
        utterance.rate = 0.88;
        utterance.pitch = 1.0 + (Math.random() * 0.04 - 0.02); // Add slight random variation
        utterance.volume = 1.0;
        
        // Find best voice
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = findBestVoice(voices);
        if (bestVoice) utterance.voice = bestVoice;
        
        window.speechSynthesis.speak(utterance);
      }
    }
  };


  return (
    <div style={hideScrollbarStyle} className="bg-[#00555A]/10 rounded-lg p-4 mb-8 border border-[#00555A]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Volume2 className="h-5 w-5 text-[#00555A]" />
          <div>
            <h3 className="font-medium text-[#00555A]">Listen to this article</h3>
            <p className="text-sm text-muted-foreground">Enhanced natural-sounding voice narration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Debug test button - remove in production */}
          <Button
            onClick={testResponsiveVoice}
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-[#00555A]"
            title="Test ResponsiveVoice"
          >
            🧪 Test
          </Button>
          
          {!isPlaying ? (
            <Button
              onClick={startReading}
              className="bg-[#00555A] hover:bg-[#CC4E5C] text-white"
              size="sm"
            >
              <Play className="h-4 w-4 mr-1" />
              Play
            </Button>
          ) : (
            <>
              {!isPaused ? (
                <Button
                  onClick={pauseReading}
                  variant="outline"
                  size="sm"
                  className="border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={resumeReading}
                  className="bg-[#00555A] hover:bg-[#CC4E5C] text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Resume
                </Button>
              )}
              
              <Button
                onClick={restartReading}
                variant="outline"
                size="sm"
                className="border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={stopReading}
                variant="destructive"
                size="sm"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00555A] to-[#CC4E5C] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{Math.round(progress)}% complete</span>
            <span>{isPaused ? 'Paused' : 'Playing'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
