
import { Award, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlogStatsProps {
  readingPoints: number;
  streakDays: number;
}

const BlogStats = ({ readingPoints, streakDays }: BlogStatsProps) => {
  const [animate, setAnimate] = useState(false);
  const [prevPoints, setPrevPoints] = useState(readingPoints);
  
  // Animate when points increase
  useEffect(() => {
    if (readingPoints > prevPoints) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    setPrevPoints(readingPoints);
  }, [readingPoints, prevPoints]);

  return (
    <>
      {/* Points display */}
      <div className="fixed top-4 right-4 bg-[#00555A] text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <span className={cn(
          "text-[#EDE8D0] font-bold transition-all",
          animate && "text-white scale-125"
        )}>
          {readingPoints}
        </span>
        <span>Points</span>
        <Award className={cn(
          "h-4 w-4 ml-1 opacity-0",
          animate && "animate-bounce opacity-100"
        )} />
      </div>
      
      {/* Reading streak */}
      <div className="fixed top-4 left-4 bg-[#CC4E5C] text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <span className="text-white font-bold">{streakDays}</span>
        <span>Day Streak</span>
        <Flame className="h-4 w-4 ml-1 text-yellow-300 animate-pulse" />
      </div>
    </>
  );
};

export default BlogStats;
