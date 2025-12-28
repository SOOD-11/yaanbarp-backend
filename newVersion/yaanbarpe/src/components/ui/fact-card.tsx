
import { useState, useEffect } from 'react';
import { Lightbulb, X, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { addPoints } from '@/lib/gamification';

interface FactCardProps {
  className?: string;
}

export const FactCard = ({ className }: FactCardProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  const tuluFacts = [
    "The Tulu language, spoken in Tulu Nadu, has no official script today, but historically used the Tigalari script, which is now being revived.",
    "Kambala, the traditional buffalo race of Tulu Nadu, dates back over 800 years and was originally a royal sport conducted for farmers' entertainment.",
    "Yakshagana performances traditionally last all night, from dusk to dawn, with performers wearing costumes weighing up to 15 kg during the entire performance.",
    "The famous Udupi cuisine originated from the Krishna Temple kitchens and has spread globally, known for its strictly vegetarian dishes prepared without onion or garlic.",
    "The ancient banking system of Tulu Nadu is one of the oldest in India, with the region's merchants establishing banks in coastal regions as early as the 16th century.",
    "Bhuta Kola, the ritual spirit worship of Tulu Nadu, involves elaborate face painting that can take up to 5 hours to complete for a single performer.",
    "Tiger Dance (Pili Vesha) performers train for months to perfect acrobatic jumps that can reach heights of over 6 feet during festival performances.",
    "St. Mary's Island near Udupi is one of the few places in the world with hexagonal basalt rock formations, formed by volcanic activity millions of years ago.",
    "The unique Tulu calendar 'Paggu' is still used for astrological calculations and to determine auspicious days for ceremonies in Tulu Nadu.",
    "Beary cuisine, from the Muslim community of Tulu Nadu, uniquely blends Arab, Persian, and local flavors into dishes like Erchi (smoked meat) and Kadubu (steamed rice dumplings)."
  ];
  
  useEffect(() => {
    // Set a random fact when component mounts
    setFactIndex(Math.floor(Math.random() * tuluFacts.length));
  }, []);
  
  const handleDismiss = () => {
    setDismissed(true);
  };
  
  const handleLike = () => {
    if (!liked && !disliked) {
      setLiked(true);
      addPoints(2, "Liked a cultural fact");
      toast({
        title: "+2 points",
        description: "Thanks for engaging with cultural facts!",
        duration: 2000
      });
    }
  };
  
  const handleDislike = () => {
    if (!liked && !disliked) {
      setDisliked(true);
      setFactIndex((prev) => (prev + 1) % tuluFacts.length);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
  };
  
  const handleShare = () => {
    // Simulate sharing functionality
    navigator.clipboard.writeText(`Did you know? ${tuluFacts[factIndex]} #TuluNadu #YaanBarpe`);
    addPoints(5, "Shared a cultural fact");
    toast({
      title: "Fact copied to clipboard!",
      description: "Share it with your friends. +5 points!",
      duration: 2000
    });
  };
  
  if (dismissed) {
    return null;
  }

  return (
    <div className={cn(
      "mb-10 bg-[#EDE8D0]/30 border border-[#EDE8D0] rounded-lg p-4 shadow-sm relative overflow-hidden",
      animate && "animate-pulse",
      className
    )}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-[#00555A] rounded-full p-2 shrink-0">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-2 text-[#00555A]">Did you know?</h4>
          <p className="text-muted-foreground">{tuluFacts[factIndex]}</p>
          
          <div className="flex mt-4 justify-end gap-2">
            <button 
              onClick={handleLike}
              className={cn(
                "p-1 rounded-full transition-colors",
                liked ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-600"
              )}
              disabled={liked || disliked}
              title="I like this fact"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button 
              onClick={handleDislike}
              className={cn(
                "p-1 rounded-full transition-colors",
                disliked ? "bg-red-100 text-red-600" : "text-gray-400 hover:text-gray-600"
              )}
              disabled={liked || disliked}
              title="Show me another fact"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
            <button 
              onClick={handleShare}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              title="Share this fact"
            >
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactCard;
