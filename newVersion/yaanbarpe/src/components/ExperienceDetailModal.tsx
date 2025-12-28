
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin } from 'lucide-react';
import React from 'react';

const ExperienceDetailModal = ({
  experience,
  onClose,
  onBook,
}: {
  experience: any;
  onClose: () => void;
  onBook: (id: number) => void;
}) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-2">
    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full relative p-8 animate-fade-in">
      <Button
        variant="ghost"
        className="absolute top-3 right-3 text-black/40"
        onClick={onClose}
      >
        
      </Button>
      <div className="flex flex-col items-start gap-4">
        <img src={experience.image} alt={experience.title} className="w-full h-52 object-cover rounded-xl mb-4" />
        <Badge className="bg-tulu-teal text-white">{experience.category}</Badge>
        <h2 className="text-2xl font-bold mb-2">{experience.title}</h2>
        <p className="text-muted-foreground mb-2">{experience.description}</p>
        <ul className="mb-2">
          {experience.includes.map((item: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 text-tulu-blue">
              <span className="w-2 h-2 bg-tulu-gold rounded-full"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 text-sm mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {experience.location}</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {experience.groupSize}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {experience.duration}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Button
            className="bg-tulu-red hover:bg-tulu-gold text-white w-full font-bold"
            onClick={() => {
              onBook(experience.id);
              onClose();
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default ExperienceDetailModal;
