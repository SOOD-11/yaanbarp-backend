
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Calendar, Star, Heart, ArrowRight, Bookmark, Share2, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ExperienceProps {
  experience: any;
  isBookmarked: boolean;
  onBookmark: (id: number) => void;
  onShare: (experience: any) => void;
  onOpenDetail: (exp: any) => void;
  onBook: (id: number) => void;
  hovered: boolean;
  setHovered: (hover: boolean) => void;
}

const ExperienceCard: React.FC<ExperienceProps> = ({
  experience,
  isBookmarked,
  onBookmark,
  onShare,
  onOpenDetail,
  onBook,
  hovered,
  setHovered,
}) => (
  <Card
    className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm relative"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    <div className="relative h-64 overflow-hidden">
      {/* Image */}
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {experience.isPopular && (
          <Badge className="bg-orange-500 text-white animate-pulse">
            🔥 Popular
          </Badge>
        )}
        {experience.isFeatured && (
          <Badge className="bg-tulu-gold text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
          onClick={() => onBookmark(experience.id)}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-tulu-gold text-tulu-gold' : 'text-white'}`} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
          onClick={() => onShare(experience)}
        >
          <Share2 className="w-4 h-4 text-white" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/90 hover:bg-tulu-teal text-tulu-blue hover:text-white border-tulu-blue/60"
          onClick={() => onOpenDetail(experience)}
          aria-label="Show Details"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>
      {/* Spots Left Indicator */}
      {experience.spotsLeft <= 5 && (
        <div className="absolute bottom-4 left-4">
          <Badge className={`${experience.spotsLeft <= 3 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'} text-white`}>
            Only {experience.spotsLeft} spots left!
          </Badge>
        </div>
      )}
      {/* Price */}
      <div className="absolute bottom-4 right-4 text-right">
        <div className="text-white font-bold text-lg">₹{experience.price.toLocaleString()}</div>
        <div className="text-white/60 text-sm line-through">₹{experience.originalPrice.toLocaleString()}</div>
      </div>
    </div>
    <CardContent className="p-6">
      {/* Category & Rating */}
      <div className="flex justify-between items-center mb-3">
        <Badge variant="secondary" className="text-xs">
          {experience.category}
        </Badge>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-tulu-gold fill-current" />
          <span className="text-sm font-medium">{experience.rating}</span>
          <span className="text-xs text-muted-foreground">({experience.reviews})</span>
        </div>
      </div>
      {/* Title & Description */}
      <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-tulu-blue transition-colors">
        {experience.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {experience.description}
      </p>
      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-tulu-blue" />
          <span>{experience.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-tulu-green" />
          <span>{experience.groupSize}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-tulu-red" />
          <span className="truncate">{experience.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-tulu-teal" />
          <span>{new Date(experience.nextDate).toLocaleDateString()}</span>
        </div>
      </div>
      {/* Action Button */}
      <Button
        className="w-full bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white rounded-xl transition-all duration-300 group/btn"
        onClick={() => onBook(experience.id)}
        data-testid="book-experience"
      >
        <Zap className="w-4 h-4 mr-2" />
        Book Experience
        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </CardContent>
    {/* Hover Details Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-b from-tulu-blue/95 to-tulu-teal/95 p-6 flex flex-col justify-center transition-all duration-500
      ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <h4 className="text-white font-bold text-xl mb-4">What's Included:</h4>
      <ul className="space-y-2 text-white/90">
        {experience.includes.map((item: string, idx: number) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tulu-gold rounded-full"></span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-white text-sm">
          <span>Difficulty: {experience.difficulty}</span>
          <span className="font-semibold">{experience.spotsLeft} spots left</span>
        </div>
      </div>
    </div>
  </Card>
);

export default ExperienceCard;
