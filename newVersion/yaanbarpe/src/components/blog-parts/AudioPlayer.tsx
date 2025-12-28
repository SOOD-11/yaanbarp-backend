import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AudioPlayerProps {
  progress: number;
  setProgress: (progress: number) => void;
  readTime: string;
  onToggleAudio: () => void;
  isPlaying: boolean;
}

const AudioPlayer = ({
  progress,
  setProgress,
  readTime,
  onToggleAudio,
  isPlaying
}: AudioPlayerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(progress);
  const location = useLocation();

  // Keep latest progress synced
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // STOP AUDIO and INTERVAL
  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (isPlaying) {
      onToggleAudio(); // Flip the play state to false
    }
  };

  // 👇 Route change cleanup
  useEffect(() => {
    stopPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 👇 Start or stop simulated audio based on isPlaying
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const newProgress = progressRef.current + 1;

        if (newProgress >= 100) {
          setProgress(100);
          stopPlayback(); // auto stop
        } else {
          setProgress(newProgress);
          progressRef.current = newProgress;
        }
      }, 300);
    } else {
      stopPlayback();
    }

    return () => stopPlayback(); // cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Clear audio on route change
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (isPlaying) {
      onToggleAudio(); // force pause
    }
  }, [location.pathname]); // route changed

  // Handle simulated audio progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const newProgress = progressRef.current + 1;

        if (newProgress >= 100) {
          setProgress(100);
          onToggleAudio(); // stop playback
          clearInterval(intervalRef.current!);
        } else {
          setProgress(newProgress);
          progressRef.current = newProgress;
        }
      }, 300);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // Format time helper
  const formatTime = (minutes: number) => {
    const totalSeconds = Math.floor(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalMinutes = parseInt(readTime.split(' ')[0]);
  const currentMinutes = (progress / 100) * totalMinutes;
  const currentTime = formatTime(currentMinutes);
  const totalTime = formatTime(totalMinutes);

  const [isHovering, setIsHovering] = useState(false);
  const [volume] = useState(80);

  return (
    <div
      className="mb-8 p-4 bg-[#00555A]/5 rounded-lg border border-[#00555A]/20 animate-fade-in shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className={`text-[#00555A] hover:text-[#CC4E5C] transition-transform duration-300 ${
            isHovering ? 'scale-110' : ''
          }`}
          onClick={onToggleAudio}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00555A] to-[#00555A]/70 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div
            className={`flex justify-between text-xs text-muted-foreground mt-1 transition-opacity ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="w-16 h-1.5 bg-gray-200 rounded-full hidden md:block">
            <div
              className="h-full bg-[#00555A] rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>

        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {currentTime} / {totalTime}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;