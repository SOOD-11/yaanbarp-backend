
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MusicStyleAudioPlayerProps {
  id: string;
  title: string;
}

const MusicStyleAudioPlayer = ({
  id,
  title
}: MusicStyleAudioPlayerProps) => {
const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`/assets/audio/${id}.mp3`);
      
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      
      audioRef.current.ontimeupdate = () => {
        setCurrentPosition(audioRef.current?.currentTime || 0);
        setProgress(((audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1)) * 100);
      };

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentPosition(0);
        setProgress(0);
      };

      audioRef.current.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "❌ Audio Error",
          description: "An error occurred while playing the audio.",
          duration: 3000
        });
      };
    }
  }, [id]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => {
          console.error('Playback error:', e);
          toast({
            title: "❌ Playback Error",
            description: "Unable to play audio.",
            duration: 3000
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(Math.max(0, (audioRef.current.currentTime || 0) + seconds), (audioRef.current.duration || 0));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="top-20 z-40 mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-[#00555A]/20 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-[#00555A] rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-[#00555A]">🎧 Audio Article</span>
      </div>

      <h4 className="font-semibold text-lg text-[#00555A] mb-6 line-clamp-2">{title}</h4>

      {/* Main Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#00555A] hover:text-[#CC4E5C] hover:bg-[#00555A]/10"
            onClick={() => skipSeconds(-15)}
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="bg-[#00555A] hover:bg-[#CC4E5C] text-white w-14 h-14 rounded-full shadow-lg"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-0.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#00555A] hover:text-[#CC4E5C] hover:bg-[#00555A]/10"
            onClick={() => skipSeconds(15)}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="h-2 bg-gray-200 rounded-full mb-3 cursor-pointer overflow-hidden"
        onClick={(e) => {
          if (audioRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * (audioRef.current.duration || 0);
            audioRef.current.currentTime = newTime;
          }
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#00555A] to-[#CC4E5C] rounded-full transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-[#00555A]"></div>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentPosition)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {isPlaying && (
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#00555A] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#CC4E5C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#00555A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-sm text-[#00555A] ml-2">Now Playing</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicStyleAudioPlayer;
