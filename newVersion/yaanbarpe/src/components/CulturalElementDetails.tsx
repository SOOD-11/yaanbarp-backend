
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CulturalElementDetailsProps {
  id: number;
  title: string;
  description: string;
  details: string[];
  location: string;
  bestTime: string;
  experience: string;
}

const CulturalElementDetails: React.FC<CulturalElementDetailsProps> = ({
  id,
  title,
  description,
  details,
  location,
  bestTime,
  experience,
}) => {
  return (
    <div className="lg:w-1/2 space-y-8">
      <div>
        <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-tulu-blue">
          {title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {description}
        </p>
      </div>
      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {details.map((detail, idx) => (
          <Card key={idx} className="border-tulu-sand/20 hover:border-tulu-teal/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-tulu-teal rounded-full"></div>
                <span className="text-sm font-medium">{detail}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Info Pills */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
          <MapPin className="w-4 h-4 text-tulu-blue" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4 text-tulu-green" />
          <span className="text-sm font-medium">Best: {bestTime}</span>
        </div>
        <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
          <Star className="w-4 h-4 text-tulu-gold" />
          <span className="text-sm font-medium">{experience}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="bg-tulu-teal hover:bg-tulu-blue text-white group flex-1"
          size="lg"
          asChild
        >
          <Link to="/heritage">
            Explore {title}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </Button>
        <Button 
          variant="outline" 
          className="border-tulu-red text-tulu-red hover:bg-tulu-red hover:text-white flex-1"
          size="lg"
          asChild
        >
          <Link to={`/booking?experience=${id}`}>
            Book Experience
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CulturalElementDetails;
