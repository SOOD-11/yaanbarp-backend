

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The Yakshagana experience was absolutely magical! Our guide brought the ancient stories to life with such passion. I learned so much about Tulu culture and traditions. Highly recommend!",
    experience: "Yakshagana Experience"
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Mumbai, India",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "YaanBarpe provided an authentic glimpse into Tulu Nadu's rich heritage. The temple tour was incredibly insightful, and the local cuisine workshop was a delightful surprise!",
    experience: "Temple & Cuisine Tour"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "St. Mary's Islands were breathtaking! The geological formations are unique, and our guide explained everything beautifully. Perfect day trip with stunning photography opportunities.",
    experience: "St. Mary's Islands Adventure"
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The cultural festival immersion was beyond my expectations. Being part of the Bhuta Kola ceremony was a once-in-a-lifetime experience. Truly transformative!",
    experience: "Cultural Festival"
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The heritage village walk opened my eyes to rural Tulu life. Meeting local artisans and learning traditional crafts was incredibly enriching. Excellent organization!",
    experience: "Heritage Village Walk"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "California, USA",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "Outstanding cultural experience! The team at YaanBarpe really knows how to showcase the best of Tulu Nadu. Professional, knowledgeable, and passionate guides.",
    experience: "Complete Cultural Package"
  }
];

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const Testimonials = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Infinite horizontal scroll
  useEffect(() => {
    const container = carouselRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!container) return;
      scrollAmount += 1; // speed
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);

  // Duplicate testimonials to create seamless loop
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-24 px-4 md:px-8 bg-gradient-to-b from-tulu-sand/10 via-background to-tulu-beige/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-tulu-green rounded-full"></div>
            <span className="text-tulu-green font-medium uppercase tracking-wider text-sm">
              Traveler Experiences
            </span>
            <div className="w-12 h-1 bg-tulu-green rounded-full"></div>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-tulu-teal">Travelers Worldwide</span>
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Rated <span className="font-bold text-tulu-gold">4.9/5</span> by over <span className="font-bold">500 verified travelers</span> — authentic journeys that showcase the soul of Tulu Nadu.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div 
          ref={carouselRef} 
          className="flex overflow-x-hidden space-x-6 scrollbar-hide"
        >
          {loopedTestimonials.map((t, index) => (
            <Card 
              key={index} 
              className="min-w-[320px] max-w-sm flex-shrink-0 border-tulu-sand/20 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-tulu-teal mb-3" />
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-tulu-gold fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-tulu-teal/20"
                    />
                    <div>
                      <h4 className="font-semibold text-tulu-blue flex items-center gap-1">
                        {t.name}
                        <ShieldCheck className="w-4 h-4 text-tulu-green" title="Verified Traveler" />
                      </h4>
                      <p className="text-sm text-muted-foreground">{t.location}</p>
                      <p className="text-xs text-tulu-teal font-medium">{t.experience}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          As featured in <span className="font-semibold">Travel+Leisure</span>, <span className="font-semibold">Lonely Planet</span>, and <span className="font-semibold">National Geographic</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
