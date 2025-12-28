
import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  progress: number;
}

const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  const [showText, setShowText] = useState(false);
  
  // Show percentage text after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 group">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-[#00555A] to-[#CC4E5C] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showText && (
        <div className="absolute -right-2 -bottom-6 bg-[#00555A] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {Math.round(progress)}% read
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;
