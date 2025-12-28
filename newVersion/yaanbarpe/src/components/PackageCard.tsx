
import { Button } from '@/components/ui/button';
import { Headphones, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  featured?: boolean;
  audioPreview?: boolean;
}

const PackageCard = ({
  title,
  description,
  price,
  duration,
  image,
  features,
  featured = false,
  audioPreview = false
}: PackageCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!hasRevealed) {
      setHasRevealed(true);
    }
  };
  
  const startInteraction = () => {
    setIsInteracting(true);
  };
  
  const endInteraction = () => {
    setIsInteracting(false);
  };
  
  return (
    <div 
      className={cn(
        "perspective-1000 h-full",
        isFlipped ? "cursor-pointer" : ""
      )}
      onClick={flipCard}
      onMouseEnter={startInteraction}
      onMouseLeave={endInteraction}
    >
      <div className={cn(
        "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Front of card */}
        <div className={cn(
          "overflow-hidden rounded-xl shadow-lg border transition-all hover:-translate-y-1 hover:shadow-xl scroll-reveal absolute w-full h-full backface-hidden",
          featured ? "border-tulu-blue/30" : "border-border/30",
          isInteracting && !isFlipped ? "shadow-xl" : ""
        )}>
          {featured && (
            <div className="absolute top-4 right-4 z-10 bg-tulu-blue text-white text-xs font-medium px-3 py-1 rounded-full animate-pulse">
              Popular Choice
            </div>
          )}
          
          <div className="relative h-48 overflow-hidden image-shine">
            <img 
              src={`https://source.unsplash.com/${image}`}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                isInteracting && !isFlipped ? "scale-110" : ""
              )}
            />
            
            {/* Overlay with hint to flip */}
            <div className={cn(
              "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
              isInteracting && !isFlipped ? "opacity-100" : "opacity-0"
            )}>
              <p className="text-white text-center px-4">
                <span className="block text-2xl mb-2">🔄</span>
                Click to see package details
              </p>
            </div>
          </div>
          
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-tulu-green font-semibold text-xl">{price}</span>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{duration}</span>
              </div>
            </div>
            
            <h3 className="font-display text-xl font-bold mb-3 text-tulu-blue">{title}</h3>
            <p className="text-muted-foreground text-sm mb-5">{description}</p>
            
            <Button 
              className={cn(
                "w-full",
                featured ? "bg-tulu-blue hover:bg-tulu-green animate-pulse" : "bg-tulu-green hover:bg-tulu-blue" 
              )}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Enquire Now
            </Button>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={cn(
          "overflow-hidden rounded-xl shadow-lg border transition-all scroll-reveal absolute w-full h-full backface-hidden rotate-y-180 bg-white",
          featured ? "border-tulu-blue" : "border-tulu-green"
        )}>
          <div className="p-6 h-full flex flex-col">
            <h3 className="font-display text-xl font-bold mb-4 text-tulu-blue">{title} - Details</h3>
            
            <div className="mb-6 flex-1">
              <h4 className="font-medium mb-3 text-sm">Package Includes:</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-tulu-green mr-2 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className={cn(
                  "flex-1",
                  featured ? "bg-tulu-blue hover:bg-tulu-green" : "bg-tulu-green hover:bg-tulu-blue" 
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Book Now
              </Button>
              
              {audioPreview && (
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-tulu-gold border-tulu-gold hover:bg-tulu-gold/10"
                  title="Listen to audio preview"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Headphones className="w-5 h-5" />
                </Button>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <button 
                className="text-tulu-blue text-sm hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                ↩ Back to package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
