import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { addPoints, updateStreak } from '@/lib/gamification';
import { FactCard } from '@/components/ui/fact-card';
import { CommentSection } from '@/components/comments/CommentSection';
import { Separator } from '@/components/ui/separator';
import BlogHeader from './blog-parts/BlogHeader';
import ReadingProgress from './blog-parts/ReadingProgress';
import BlogStats from './blog-parts/BlogStats';
import KnowledgeQuiz from './blog-parts/KnowledgeQuiz';
import RelatedArticles from './blog-parts/RelatedArticles';
import AuthorInfo from './blog-parts/AuthorInfo';
import ReactionBar from './blog-parts/ReactionBar';
import AdSpace from './blog-parts/AdSpace';
import MusicStyleAudioPlayer from './blog-parts/MusicStyleAudioPlayer';
import TextToSpeech from './blog-parts/TextToSpeech';
import { Button } from '@/components/ui/button';

interface DetailedBlogPostProps {
  title: string;
  contentParts: string[];
  image?: string | string[];
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
  audioAvailable?: boolean;
  id?: string;
}

const DetailedBlogPost = ({
  title,
  contentParts = [],
  image,
  date,
  readTime,
  author,
  authorImage = "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category,
  tags,
  audioAvailable = false,
  id
}: DetailedBlogPostProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingPoints, setReadingPoints] = useState(0);
  const [streakDays, setStreakDays] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const images = Array.isArray(image) ? image : (image ? [image] : []);

  useEffect(() => {
    // Always scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'auto' });
  
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const scrolled = window.scrollY / fullHeight;
      const progressPercent = Math.min(scrolled * 100, 100);
      setScrollProgress(progressPercent);
  
      if (scrolled > 0.9 && !hasReachedEnd) {
        setHasReachedEnd(true);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedEnd]);

  useEffect(() => {
    const currentStreak = updateStreak();
    setStreakDays(currentStreak);
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  {/*const addReadingPoints = (points: number, message: string, showLevelUp: boolean = false) => {
    setReadingPoints(prev => prev + points);
    const levelUp = addPoints(points, message);
    window.dispatchEvent(new Event('pointsUpdated'));
    if (showLevelUp && levelUp > 0) {
      toast({
        title: `🎉 Level Up! You're now level ${levelUp}`,
        description: `Article completed! +${points} points`,
        duration: 4000,
      });
    } else {
      toast({
        title: `+${points} points`,
        description: message,
        duration: 2000,
      });
    }
  }; */}

  const handleTextToSpeech = () => {
    // Check if contentParts array exists and has elements
    if (!contentParts || contentParts.length === 0) {
      console.error("No content parts available for text-to-speech");
      toast({
        title: "Error",
        description: "No content available for text-to-speech",
        duration: 3000,
      });
      return;
    }
    
    // Create a temporary div to parse HTML content properly
    const parseHtmlContent = (htmlContent: string) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Get all text content, including nested elements
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      // Clean up extra whitespace and line breaks
      const cleanedText = textContent
        .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
        .replace(/\n+/g, ' ')  // Replace line breaks with spaces
        .trim();               // Remove leading/trailing whitespace
      
      return cleanedText;
    };
    
    // Always include the introduction (first part)
    let introText = parseHtmlContent(contentParts[0]);
    console.log("Extracted text from introduction:", introText);
    
    // If we're not on the first slide, add the current slide's content
    let text = "";
    if (currentPartIndex > 0 && currentPartIndex < contentParts.length) {
      // Include both introduction and current part
      const currentPartText = parseHtmlContent(contentParts[currentPartIndex]);
      console.log("Extracted text from current part:", currentPartText);
      text = `${introText}. ${currentPartText}`;
    } else {
      // Just use the introduction if we're on the first slide
      text = introText;
    }
    
    // Log the final text to be spoken
    console.log("Final text to be spoken:", text);
    
    if (!isPlaying) {
      // Try ResponsiveVoice first with improved voice parameters
      if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
        setIsPlaying(true);
        
        console.log("🎙️ Using ResponsiveVoice in DetailedBlogPost");
        
        // Use the global parameters if available, or set our own enhanced parameters
        const voiceParams = window.responsiveVoiceParams || {
          rate: 0.9,      // Slightly slower rate for clarity
          pitch: 1.02,    // More natural pitch (closer to human speech)
          volume: 1.0,    // Full volume
          onstart: () => {
            console.log("ResponsiveVoice started for detailed blog");
          },
          onend: () => {
            setIsPlaying(false);
            speechRef.current = null;
          },
          onerror: () => {
            console.log("ResponsiveVoice error in detailed blog, falling back");
            setIsPlaying(false);
            // Fallback to browser TTS
            handleBrowserTTS(text);
          }
        };
        
        // Use UK English Female voice for more natural sound
        window.responsiveVoice.speak(text, "UK English Female", voiceParams);
      } else {
        // Fallback to browser TTS
        handleBrowserTTS(text);
      }
    } else {
      // Stop audio
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    }
  };
  
  // Add natural pauses and speech prosody to make speech more human-like
  const addNaturalPauses = (text: string) => {
    // Replace periods with periods followed by pause
    let enhancedText = text.replace(/\. /g, '. <break time="500ms"/> ');
    // Replace commas with commas followed by shorter pause
    enhancedText = enhancedText.replace(/, /g, ', <break time="200ms"/> ');
    // Add slight pause after question marks
    enhancedText = enhancedText.replace(/\? /g, '? <break time="400ms"/> ');
    // Add slight pause after exclamation marks
    enhancedText = enhancedText.replace(/! /g, '! <break time="400ms"/> ');
    // Add slight pause after semicolons
    enhancedText = enhancedText.replace(/; /g, '; <break time="300ms"/> ');
    // Add slight pause after colons
    enhancedText = enhancedText.replace(/: /g, ': <break time="300ms"/> ');
    
    // Add prosody (intonation and emphasis) for more natural speech
    // Emphasize important words (common in natural speech)
    enhancedText = enhancedText.replace(/\b(important|significant|critical|essential|key|major|crucial|vital)\b/gi, 
      '<emphasis level="moderate">$1</emphasis>');
    
    // Add rising intonation for questions
    enhancedText = enhancedText.replace(/([^\?]+\?)/g, '<prosody pitch="high">$1</prosody>');
    
    // Add slight emphasis to quoted text
    enhancedText = enhancedText.replace(/"([^"]+)"/g, '"<prosody rate="95%" pitch="105%">$1</prosody>"');
    
    // Add slight variation to long sentences to avoid monotony
    enhancedText = enhancedText.replace(/([^\.\?\!]+)(\.)/g, function(match, sentence, punctuation) {
      if (sentence.length > 80) { // Only for longer sentences
        return '<prosody rate="98%">' + sentence + '</prosody>' + punctuation;
      }
      return match;
    });
    
    return enhancedText;
  };

  const handleBrowserTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Add natural pauses to make speech more human-like
      const enhancedText = addNaturalPauses(text);
      
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      // Enhanced parameters for more natural speech
      utterance.rate = 0.88;    // Balanced rate for natural cadence
      utterance.pitch = 1.0;    // Neutral pitch (more natural)
      utterance.volume = 1.0;   // Full volume
      
      // Add subtle variations to make speech less robotic
      const randomFactor = Math.random() * 0.04 - 0.02; // Small random adjustment between -0.02 and 0.02
      utterance.pitch += randomFactor;  // Add slight random variation to pitch
      
      // Find the best available voice
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = findBestVoice(voices);
      
      if (bestVoice) {
        console.log(`🎙️ Selected voice: ${bestVoice.name} (${bestVoice.lang})`);
        utterance.voice = bestVoice;
      }
      
      utterance.onstart = () => {
        setIsPlaying(true);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;
      };
      
      utterance.onerror = (event) => {
        console.error('TTS Error:', event);
        setIsPlaying(false);
        toast({
          title: "❌ Audio Error",
          description: "Unable to read the article. Please try again.",
          duration: 3000,
        });
      };
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({ title: "Not Supported", description: "Text-to-speech is not supported in your browser.", duration: 3000 });
    }
  };
  
  // Helper function to find the best voice
  const findBestVoice = (voices: SpeechSynthesisVoice[]) => {
    // Priority order for better voices - refined for more natural sound
    const voicePriorities = [
      // Premium natural-sounding female voices
      'Google UK English Female', // One of the most natural-sounding voices
      'Microsoft Zira Desktop',
      'Samantha',  // Apple's high-quality voice
      'Microsoft Hazel Desktop',
      'Alex',       // Apple's high-quality voice
      'Victoria',   // High-quality British voice
      'Zoe',        // Australian voice (sounds natural)
      'Fiona',      // Irish voice (sounds natural)
      // Premium natural-sounding male voices
      'Google UK English Male',
      'Microsoft David Desktop',
      'Daniel',     // British male voice
      'Tom',        // American male voice
      // Fallback to any English voice
      ...voices.filter(v => v.lang.startsWith('en')).map(v => v.name)
    ];

    // Find first available high-priority voice
    for (const priorityName of voicePriorities) {
      const voice = voices.find(v => v.name.includes(priorityName) || v.name === priorityName);
      if (voice) {
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

  const handleNext = () => {
    if (currentPartIndex < contentParts.length - 1) {
      // Stop any currently playing audio when changing slides
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
      setIsPlaying(false);
      
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };
  const handleShare = () => {
    const shareData = {
      title,
      text: `Check out this article: ${title}`,
      url: window.location.href,
    };
  
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          toast({ title: "Shared successfully!" });
        })
        .catch((error) => {
          toast({ title: "Share canceled", description: error.message });
        });
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: "🔗 Link copied!",
        description: "You can now paste it anywhere to share the blog.",
      });
    }
  };
  const handlePrev = () => {
    if (currentPartIndex > 0) {
      // Stop any currently playing audio when changing slides
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
      setIsPlaying(false);
      
      setCurrentPartIndex(currentPartIndex - 1);
    }
  };
  
  return (
    <div className="max-w-4xl  space-y-4 w-full">
      <AdSpace position="top" size="large" />
      <BlogHeader category={category} title={title} date={date} readTime={readTime} author={author} authorImage={authorImage} audioAvailable={audioAvailable} isAudioPlaying={isPlaying} onToggleAudio={handleTextToSpeech} />
      {images.length >= 0 && (
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-md">
          <AnimatePresence mode="wait">
            <motion.img key={images[slideshowIndex]} src={images[slideshowIndex].trim()} alt={title} className="object-cover w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
          </AnimatePresence>
        </div>
      )}
      {contentParts && contentParts.length > 0 && (
        <TextToSpeech 
          text={contentParts[currentPartIndex]} 
          title={`${currentPartIndex === 0 ? 'Introduction' : `Slide ${currentPartIndex + 1}`} - ${title}`} 
          id={`${id || 'blog-post'}-slide-${currentPartIndex}`} 
        />
      )}
      <FactCard />
      <div className="bg-white rounded-lg p-2 w-full h-auto shadow-sm border relative">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentPartIndex}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="prose prose-base sm:prose-lg max-w-none leading-relaxed text-gray-700 space-y-6 pb-24"
    >
      <div dangerouslySetInnerHTML={{ __html: contentParts[currentPartIndex] }} />
    </motion.div>
  </AnimatePresence>

  {/* Sticky Slide Navigation (inside card only) */}
  <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-10">

        <Button
          onClick={handlePrev}
          disabled={currentPartIndex === 0}
          variant="outline"
          className="w-1/3 sm:w-auto"
        >
          Previous
        </Button>

    <span className="text-sm text-muted-foreground mx-2 whitespace-nowrap">
      Slide {currentPartIndex + 1} of {contentParts.length}
    </span>

    <Button
      onClick={handleNext}
      disabled={currentPartIndex === contentParts.length - 1}
      className="w-1/3 sm:w-auto"
    >
      Next
    </Button>
  </div>
</div>
  { /*   <AdSpace position="middle" size="medium" />*/}
      <KnowledgeQuiz blogTitle={title} onQuizComplete={() =>{} } />
      <ReactionBar onInteraction={() => {}} />
      
      { /*  <AdSpace position="bottom" size="medium" /> */}
      <div className="py-8">
       {/* <CommentSection postTitle={title} /> */}
      </div>

     
      
    </div>
  );
};

export default DetailedBlogPost;