
import { Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserPoints, getUserLevel, getBadgeCount } from "@/lib/gamification";

export function PointsDisplay() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState(0);
  
  useEffect(() => {
    setPoints(getUserPoints());
    setLevel(getUserLevel());
    setBadges(getBadgeCount());
    
    // Set up event listener for point changes
    const handleStorage = () => {
      setPoints(getUserPoints());
      setLevel(getUserLevel());
      setBadges(getBadgeCount());
    };
    
    window.addEventListener('storage', handleStorage);
    
    // Custom event for point updates
    window.addEventListener('pointsUpdated', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pointsUpdated', handleStorage);
    };
  }, []);
  
  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Star className="text-[#E5B31B] w-4 h-4 fill-[#E5B31B]" />
        <span className="text-[#00555A] font-bold">{points}</span>
        <span className="text-sm text-muted-foreground">points</span>
      </div>
      
      <span className="text-[#CC4E5C] font-bold">Level {level}</span>
      
      <div className="flex items-center gap-1">
        <Trophy className="text-[#E5B31B] w-4 h-4" />
        <span>{badges}</span>
      </div>
    </div>
  );
}
