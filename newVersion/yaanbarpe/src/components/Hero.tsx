
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const heroImages = [
    'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    
    
    return () => clearInterval(interval);
  }, []);

  const scrollToExperiences = () => {
    const experiencesSection = document.getElementById('explore');
    if (experiencesSection) {
      experiencesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image}
            alt={`Tulu Nadu Heritage ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-tulu-gold" />
          <span className="text-tulu-beige font-medium">Authentic Cultural Experiences in Tulu Nadu</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          Discover the Soul of{' '}
          <span className="text-gradient bg-gradient-to-r from-tulu-gold via-tulu-red to-tulu-teal bg-clip-text text-transparent animate-gradient">
            Tulu Nadu
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-tulu-beige font-light max-w-4xl mx-auto leading-relaxed">
          Immerse yourself in centuries-old traditions, vibrant festivals, and sacred heritage 
          through authentic cultural experiences crafted by local experts.
        </p>
        
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1,2,3,4,5].map((star) => (
            <Star key={star} className="w-5 h-5 text-tulu-gold fill-current" />
          ))}
          <span className="text-tulu-beige ml-2">Rated 4.9/5 by 500+ travelers</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg"
            className="bg-tulu-red hover:bg-tulu-blue text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-tulu-red/25 transition-all duration-300 group"
            onClick={scrollToExperiences}
          >
            Explore Experiences
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-tulu-blue text-lg px-8 py-4 rounded-full backdrop-blur-sm bg-white/10"
            asChild
          >
            <Link to="/booking?experience=1">
              <Play className="mr-2" size={20} />
              Book Experience
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-tulu-gold mb-2">500+</div>
            <div className="text-tulu-beige">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-tulu-gold mb-2">15+</div>
            <div className="text-tulu-beige">Unique Experiences</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-tulu-gold mb-2">10+</div>
            <div className="text-tulu-beige">Years of Expertise</div>
          </div>
        </div>
      </div>
      
      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-tulu-gold scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
