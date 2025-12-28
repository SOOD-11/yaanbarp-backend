
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdSpaceProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  size?: 'small' | 'medium' | 'large';
}

const AdSpace: React.FC<AdSpaceProps> = ({ position, size = 'medium' }) => {
  const getAdContent = () => {
    switch (position) {
      case 'top':
        return {
          title: "Discover Tulu Nadu with YaanBarpe",
          description: "Book authentic cultural experiences and guided tours",
          cta: "Explore Packages",
          bg: "bg-gradient-to-r from-[#00555A] to-[#CC4E5C]"
        };
      case 'middle':
        return {
          title: "Traditional Yakshagana Workshop",
          description: "Learn the ancient art form from master performers",
          cta: "Register Now",
          bg: "bg-gradient-to-r from-[#CC4E5C] to-[#EDE8D0]"
        };
      case 'bottom':
        return {
          title: "Coastal Karnataka Heritage Tour",
          description: "Experience temples, beaches, and local cuisine",
          cta: "Book Tour",
          bg: "bg-gradient-to-r from-[#EDE8D0] to-[#00555A]"
        };
      case 'sidebar':
        return {
          title: "Cultural Newsletter",
          description: "Weekly insights into Tulu Nadu's heritage",
          cta: "Subscribe",
          bg: "bg-[#00555A]"
        };
    }
  };

  const adContent = getAdContent();
  
  const sizeClasses = {
    small: 'p-4 min-h-[120px]',
    medium: 'p-6 min-h-[160px]',
    large: 'p-8 min-h-[200px]'
  };

  return (
    <div className={`${adContent.bg} text-white rounded-lg ${sizeClasses[size]} flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-20 h-20 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <h3 className="font-display text-lg md:text-xl font-bold mb-2 group-hover:scale-105 transition-transform">
          {adContent.title}
        </h3>
        <p className="text-sm md:text-base text-white/90 mb-4 max-w-sm">
          {adContent.description}
        </p>
        <Link
          
     to={"/packages"}
          className="bg-white p-2 text-[#00555A] hover:bg-white/90 group-hover:scale-105 transition-all"
        >
            
          {adContent.cta}
       
        </Link>
      </div>
      
      {/* Sponsored label */}
      <div className="absolute top-2 left-2 text-xs bg-white/20 px-2 py-1 rounded-full">
        Sponsored
      </div>
    </div>
  );
};

export default AdSpace;
