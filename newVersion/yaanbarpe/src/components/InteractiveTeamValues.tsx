
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Star, Globe, Award, Zap, Shield, Compass } from 'lucide-react';

const teamValues = [
  {
    id: 1,
    icon: Heart,
    title: 'Authentic Passion',
    subtitle: 'Born from Love',
    description: 'Every experience is crafted with genuine love for Tulu culture, ensuring authenticity in every detail.',
    longDescription: 'Our team consists of local culture enthusiasts who have grown up with these traditions. We share stories passed down through generations, not just tourist attractions.',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    stats: { projects: '50+', years: '10+' }
  },
  {
    id: 2,
    icon: Users,
    title: 'Community First',
    subtitle: 'Supporting Locals',
    description: 'We work directly with local communities, ensuring fair compensation and preserving traditional livelihoods.',
    longDescription: 'Every rupee you spend goes back to the community. We partner with local artisans, guides, and families to create sustainable tourism that benefits everyone.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    stats: { families: '100+', villages: '25+' }
  },
  {
    id: 3,
    icon: Star,
    title: 'Excellence Always',
    subtitle: 'Premium Quality',
    description: 'We maintain the highest standards in every experience, from safety to cultural accuracy.',
    longDescription: 'Our rigorous quality checks, expert guides, and attention to detail ensure you receive world-class experiences that exceed expectations.',
    color: 'from-amber-500 to-orange-500',  
    bgColor: 'bg-amber-50',
    stats: { rating: '4.9/5', reviews: '500+' }
  },
  {
    id: 4,
    icon: Globe,
    title: 'Cultural Bridge',
    subtitle: 'Connecting Worlds',
    description: 'We bridge ancient traditions with modern travelers, creating meaningful cultural exchanges.',
    longDescription: 'Our experiences are designed to create genuine connections between visitors and locals, fostering mutual understanding and respect.',
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
    stats: { countries: '15+', languages: '8+' }
  },
  {
    id: 5,
    icon: Shield,
    title: 'Safe & Secure',
    subtitle: 'Peace of Mind',
    description: 'Your safety is our priority. We maintain strict safety protocols and comprehensive insurance coverage.',
    longDescription: 'From vetted guides to emergency protocols, we ensure every aspect of your journey is safe and secure without compromising the authentic experience.',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    stats: { incidents: '0', coverage: '100%' }
  },
  {
    id: 6,
    icon: Compass,
    title: 'Guided Discovery',
    subtitle: 'Expert Navigation',
    description: 'Our expert local guides reveal hidden gems and share stories you won\'t find in any guidebook.',
    longDescription: 'Each guide is a certified cultural ambassador with deep knowledge of local history, traditions, and hidden spots known only to locals.',
    color: 'from-teal-500 to-blue-500',
    bgColor: 'bg-teal-50',
    stats: { guides: '25+', secrets: 'Countless' }
  }
];

const InteractiveTeamValues = () => {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-tulu-beige/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-tulu-blue to-tulu-teal text-white px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            Our Values
          </Badge>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-tulu-green via-tulu-blue to-tulu-teal bg-clip-text text-transparent">
              What Drives
            </span>{' '}
            <span className="text-tulu-red">Our Mission</span>
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            Built on principles that honor tradition while embracing innovation, creating experiences that transform both travelers and communities.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamValues.map((value, index) => {
            const Icon = value.icon;
            const isActive = activeValue === value.id;
            const isHovered = hoveredValue === value.id;

            return (
              <Card 
                key={value.id}
                className={`group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border-2 overflow-hidden ${
                  isActive 
                    ? 'border-tulu-gold shadow-2xl scale-105' 
                    : 'border-transparent hover:border-tulu-sand/50'
                }`}
                onClick={() => setActiveValue(isActive ? null : value.id)}
                onMouseEnter={() => setHoveredValue(value.id)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 opacity-5 ${value.bgColor} transition-opacity duration-300 ${
                  isHovered ? 'opacity-10' : ''
                }`} />

                <CardContent className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} p-4 mb-6 transform transition-all duration-300 ${
                    isHovered ? 'scale-110 rotate-3' : ''
                  }`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-2 group-hover:text-tulu-blue transition-colors">
                    {value.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <div className={`text-sm font-medium mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                    {value.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {value.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4">
                    {Object.entries(value.stats).map(([key, stat]) => (
                      <div key={key} className="text-center">
                        <div className={`font-bold text-lg bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                          {stat}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expand Indicator */}
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${value.color} transition-all duration-300 ${
                      isActive ? 'w-12' : ''
                    }`} />
                  </div>

                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    isActive ? 'max-h-96 mt-6' : 'max-h-0'
                  }`}>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.longDescription}
                      </p>
                    </div>
                  </div>
                </CardContent>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-5' : ''
                }`} />
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-tulu-blue/10 via-tulu-teal/10 to-tulu-green/10 rounded-3xl p-12">
          <h3 className="font-bold text-2xl mb-4">
            Ready to Experience Our Values in Action?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered authentic Tulu Nadu through our carefully crafted experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-3 bg-white/50 rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-tulu-gold" />
              <span className="font-medium">98% Satisfaction Rate</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-full px-6 py-3">
              <Users className="w-5 h-5 text-tulu-blue" />
              <span className="font-medium">2,500+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-full px-6 py-3">
              <Award className="w-5 h-5 text-tulu-red" />
              <span className="font-medium">Award-Winning Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTeamValues;
