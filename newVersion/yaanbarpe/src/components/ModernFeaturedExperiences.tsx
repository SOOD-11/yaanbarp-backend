import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Award, Star, Heart, ArrowRight } from 'lucide-react';

import ExperienceCard from './ExperienceCard';
import ExperienceDetailModal from './ExperienceDetailModal';
import ExperienceFilters from './ExperienceFilters';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Masterclass',
    description: 'Learn from legendary performers in an immersive workshop combining theory, practice, and live performance.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2500,
    originalPrice: 3500,
    duration: '6 hours',
    groupSize: '8-12',
    location: 'Udupi Heritage Center',
    rating: 4.9,
    reviews: 234,
    category: 'Cultural Arts',
    difficulty: 'Beginner Friendly',
    includes: ['Traditional costume', 'Expert instruction', 'Performance opportunity', 'Certificate'],
    nextDate: '2024-01-15',
    spotsLeft: 3,
    isPopular: true,
    isFeatured: true
  },
  {
    id: 2,
    title: 'Sacred Temple Circuit',
    description: 'Journey through ancient temples with archaeological insights and spiritual traditions.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1800,
    originalPrice: 2200,
    duration: '8 hours',
    groupSize: '12-20',
    location: 'Udupi & Surroundings',
    rating: 4.8,
    reviews: 456,
    category: 'Spiritual Heritage',
    difficulty: 'Easy',
    includes: ['Expert guide', 'Temple entries', 'Traditional lunch', 'Prayer kit'],
    nextDate: '2024-01-12',
    spotsLeft: 8,
    isPopular: false,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Coastal Adventure & Culture',
    description: 'Combine beach exploration with fishing village culture and traditional cuisine.',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 3200,
    originalPrice: 4000,
    duration: 'Full day',
    groupSize: '6-10',
    location: "St. Mary's Islands",
    rating: 4.7,
    reviews: 189,
    category: 'Nature & Culture',
    difficulty: 'Moderate',
    includes: ['Boat transfers', 'Fresh seafood lunch', 'Snorkeling gear', 'Cultural guide'],
    nextDate: '2024-01-20',
    spotsLeft: 2,
    isPopular: true,
    isFeatured: false
  },
  {
    id: 4,
    title: 'Tulu Cuisine Secrets',
    description: 'Master authentic recipes with local grandmothers in traditional kitchens.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2200,
    originalPrice: 2800,
    duration: '5 hours',
    groupSize: '4-8',
    location: 'Traditional Home',
    rating: 4.9,
    reviews: 167,
    category: 'Culinary Arts',
    difficulty: 'All Levels',
    includes: ['Ingredients', 'Recipe book', 'Market tour', 'Family lunch'],
    nextDate: '2024-01-18',
    spotsLeft: 5,
    isPopular: true,
    isFeatured: true
  }
];

const categories = ['All', 'Cultural Arts', 'Spiritual Heritage', 'Nature & Culture', 'Culinary Arts'];

const ModernFeaturedExperiences = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [detailModal, setDetailModal] = useState<{ open: boolean; experience: any | null }>({ open: false, experience: null });
  const navigate = useNavigate();

  const filteredExperiences = activeFilter === 'All'
    ? experiences
    : experiences.filter(exp => exp.category === activeFilter);

  const handleBookmark = (id: number) => {
    setBookmarked(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    toast({
      title: bookmarked.includes(id) ? "Removed from bookmarks" : "Added to bookmarks",
      description: "Find your saved experiences in your profile",
      duration: 2000,
    });
  };

  const handleShare = (experience: any) => {
    if (navigator.share) {
      navigator.share({
        title: experience.title,
        text: experience.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this amazing experience with friends",
        duration: 2000,
      });
    }
  };

  const openDetailModal = (exp: any) => setDetailModal({ open: true, experience: exp });
  const closeDetailModal = () => setDetailModal({ open: false, experience: null });
  const handleBookExperience = (id: number) => {
    navigate(`/booking?experience=${id}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-tulu-sand/10 to-tulu-beige/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-tulu-red to-tulu-gold text-white px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            Handpicked Experiences
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
              Extraordinary
            </span>{' '}
            <span className="text-tulu-red">Adventures</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Dive deep into Tulu Nadu's soul through carefully curated experiences that blend ancient wisdom with modern comfort.
          </p>
          <ExperienceFilters
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isBookmarked={bookmarked.includes(experience.id)}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onOpenDetail={openDetailModal}
              onBook={handleBookExperience}
              hovered={hoveredCard === index}
              setHovered={(hover: boolean) => setHoveredCard(hover ? index : null)}
            />
          ))}
        </div>
        {detailModal.open && detailModal.experience && (
          <ExperienceDetailModal
            experience={detailModal.experience}
            onClose={closeDetailModal}
            onBook={handleBookExperience}
          />
        )}
        <div className="text-center">
          <Link to="/experiences">
            <button
              className="bg-gradient-to-r from-tulu-red via-tulu-gold to-tulu-teal hover:from-tulu-teal hover:to-tulu-red text-white px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Heart className="w-5 h-5 mr-2 animate-pulse" />
              Explore All Adventures
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturedExperiences;
