import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, MapPin, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Experience',
    description: 'Immerse yourself in the colorful world of Yakshagana, a traditional theatre form that combines dance, music, dialogue, costume, and stage techniques.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹2,500',
    originalPrice: '₹3,000',
    duration: '4 hours',
    groupSize: '10-15',
    location: 'Udupi',
    rating: 4.8,
    tags: ['Cultural', 'Performance', 'Interactive'],
    points: 25,
    availability: 'Limited seats',
    discount: '17% OFF'
  },
  {
    id: 2,
    title: 'Sri Krishna Temple Tour',
    description: 'Visit the famous Sri Krishna Matha temple in Udupi and learn about its rich history, architecture, and spiritual significance from expert guides.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹1,800',
    originalPrice: '₹2,200',
    duration: '3 hours',
    groupSize: '15-20',
    location: 'Udupi',
    rating: 4.9,
    tags: ['Spiritual', 'Historical', 'Architecture'],
    points: 20,
    availability: 'Available',
    discount: '18% OFF'
  },
  {
    id: 3,
    title: "St. Mary's Islands Adventure",
    description: "Explore the geological wonder of St. Mary's Islands with its unique hexagonal basalt rock formations and pristine beaches.",
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹3,200',
    originalPrice: '₹3,800',
    duration: 'Full day',
    groupSize: '8-12',
    location: 'Malpe',
    rating: 4.7,
    tags: ['Nature', 'Adventure', 'Photography'],
    points: 30,
    availability: 'Filling fast',
    discount: '16% OFF'
  },
  {
    id: 4,
    title: 'Tulu Cuisine Workshop',
    description: 'Learn the art of authentic Tulu cuisine through hands-on cooking classes with local experts using traditional techniques and ingredients.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹2,200',
    originalPrice: '₹2,500',
    duration: '5 hours',
    groupSize: '6-10',
    location: 'Mangalore',
    rating: 4.6,
    tags: ['Food', 'Cooking', 'Cultural'],
    points: 15,
    availability: 'Available',
    discount: '12% OFF'
  }
];

const FeaturedExperiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    setUnlocked([1, 2]);
    
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      const userPoints = parseInt(storedPoints);
      setPoints(userPoints);
      
      if (userPoints >= 10) {
        setUnlocked([1, 2, 3]);
      }
      if (userPoints >= 20) {
        setUnlocked([1, 2, 3, 4]);
      }
    }
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  const handleExperienceClick = (experiencePoints: number) => {
    setPoints(prev => prev + experiencePoints);
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    localStorage.setItem('tuluPoints', (currentPoints + experiencePoints).toString());
    
    toast({
      title: `+${experiencePoints} points earned!`,
      description: "Keep exploring to unlock more experiences!",
      duration: 2000,
    });
  };
  
  return (
    <div 
      id="explore"
      ref={sectionRef} 
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background via-tulu-beige/10 to-background"
    >
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-tulu-red rounded-full"></div>
              <span className="text-tulu-red font-medium uppercase tracking-wider text-sm">
                Handpicked Experiences
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
              <span className="text-tulu-red">Featured</span> Experiences
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Immerse yourself in authentic cultural experiences carefully curated to showcase the true essence and heritage of Tulu Nadu. Each experience is designed to create lasting memories.
            </p>
          </div>
          
          <div className="mt-8 lg:mt-0 flex flex-col items-end gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-tulu-teal/10 to-tulu-red/10 px-6 py-3 rounded-full border border-tulu-teal/20">
              <Star className="w-5 h-5 text-tulu-gold" />
              <span className="text-tulu-teal font-medium">Experience Points:</span>
              <span className="text-tulu-red font-bold text-2xl">{points}</span>
            </div>
            
            <Button 
              className="bg-tulu-teal hover:bg-tulu-red text-white group hidden lg:flex shadow-lg"
              asChild
            >
              <Link to="/experiences">
                View All Experiences
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => {
            const isUnlocked = unlocked.includes(experience.id);
            
            return (
              <div
                key={experience.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`scroll-reveal group ${isUnlocked ? '' : 'opacity-70'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`overflow-hidden border-none shadow-lg h-full transition-all duration-500 relative ${
                  !isUnlocked ? 'grayscale' : 'hover:shadow-2xl hover:-translate-y-2'
                }`}>
                  <div className="relative h-72 overflow-hidden">
                    {/* Discount badge */}
                    {isUnlocked && experience.discount && (
                      <div className="absolute top-4 left-4 bg-tulu-red text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                        {experience.discount}
                      </div>
                    )}
                    
                    {/* Availability status */}
                    <div className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full z-10 ${
                      experience.availability === 'Limited seats' ? 'bg-orange-500 text-white animate-pulse' :
                      experience.availability === 'Filling fast' ? 'bg-yellow-500 text-black' :
                      'bg-green-500 text-white'
                    }`}>
                      {experience.availability}
                    </div>

                    {!imagesLoaded[experience.id] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-400">Loading...</span>
                      </div>
                    )}
                    
                    <img 
                      src={experience.image}
                      alt={experience.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCard === index && isUnlocked ? 'scale-110' : 'scale-100'
                      } ${imagesLoaded[experience.id] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(experience.id)}
                    />
                    
                    {/* Price overlay with progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-bold text-lg">{experience.price}</span>
                            <span className="text-white/60 text-sm line-through">{experience.originalPrice}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-xs">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {experience.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {experience.groupSize}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-medium">{experience.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white/60">
                            <MapPin className="w-3 h-3" />
                            {experience.location}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover progress bar */}
                      <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className={`h-full bg-tulu-beige transition-all duration-1000 ${
                          hoveredCard === index ? 'w-full' : 'w-0'
                        }`}></div>
                      </div>
                    </div>
                    
                    {/* Points indicator */}
                    <div className="absolute bottom-4 right-4 bg-tulu-red text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      +{experience.points} pts
                    </div>
                    
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <div className="text-6xl mb-4">🔒</div>
                          <p className="font-bold text-lg mb-2">Experience Locked</p>
                          <p className="text-sm mb-4">
                            {experience.id === 3 ? "Earn 10+ points to unlock" : "Earn 20+ points to unlock"}
                          </p>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white/20"
                            onClick={() => {
                              toast({
                                title: "How to unlock",
                                description: "Explore our blog and interact with content to earn points!",
                                duration: 3000,
                              });
                            }}
                          >
                            How to unlock?
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced hover overlay */}
                    {isUnlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-b from-tulu-teal/80 to-tulu-red/80 flex items-center justify-center p-6 transition-all duration-500 ${
                        hoveredCard === index ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
                      }`}>
                        <div className="text-center transform transition-transform duration-500">
                          <h4 className="text-white font-display text-xl mb-4 font-bold">Experience Features</h4>
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {experience.tags.map((tag) => (
                              <span key={tag} className="bg-white/25 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button 
                            size="sm"
                            className="bg-white text-tulu-teal hover:bg-tulu-beige font-bold"
                            onClick={() => handleExperienceClick(experience.points)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold mb-3 line-clamp-1">{experience.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{experience.description}</p>
                    <Button 
                      variant="outline" 
                      className={`w-full transition-all duration-300 ${
                        isUnlocked 
                          ? "border-tulu-teal text-tulu-teal hover:text-white hover:bg-tulu-teal" 
                          : "border-gray-400 text-gray-400 cursor-not-allowed"
                      }`}
                      asChild={isUnlocked}
                      disabled={!isUnlocked}
                    >
                      {isUnlocked ? (
                        <Link to={`/booking?experience=${experience.id}`}>
                          Book Experience
                        </Link>
                      ) : (
                        <span>🔒 Locked</span>
                      )}
                    </Button>
                  </CardContent>
                  
                  {/* Popular/New badges */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg animate-pulse z-20">
                      POPULAR
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg z-20">
                      NEW
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 flex justify-center lg:hidden">
          <Button 
            className="bg-tulu-teal hover:bg-tulu-red text-white group shadow-lg"
            asChild
          >
            <Link to="/experiences">
              View All Experiences
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedExperiences;
