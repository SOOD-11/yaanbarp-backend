
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  pointValue: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Updated with reliable images
const recommendedPosts: BlogPost[] = [
  {
    id: 1,
    title: "Traditional Fishing Methods in Coastal Tulu Nadu",
    image: "https://images.pexels.com/photos/2223082/pexels-photo-2223082.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Livelihood",
    date: "May 15, 2025",
    readTime: "8 min read",
    pointValue: 6,
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "The Ritual of Bhuta Kola: Connecting with Guardian Spirits",
    image: "https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Spiritual Traditions",
    date: "May 12, 2025",
    readTime: "11 min read",
    pointValue: 9,
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Tulu Folk Tales: Stories That Shaped Cultural Identity",
    image: "https://images.pexels.com/photos/3760778/pexels-photo-3760778.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Culture",
    date: "May 8, 2025",
    readTime: "7 min read",
    pointValue: 5,
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "The Ancient Irrigation Systems of Tulu Nadu",
    image: "https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Agriculture",
    date: "May 3, 2025",
    readTime: "9 min read",
    pointValue: 7,
    difficulty: "Intermediate"
  }
];

const BlogRecommendations = () => {
  const [userLevel, setUserLevel] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(recommendedPosts);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Load user level from localStorage
    const storedLevel = localStorage.getItem('tuluLevel');
    if (storedLevel) {
      setUserLevel(parseInt(storedLevel));
    }
    
    // Filter posts based on selected categories
    if (selectedCategories.length > 0) {
      setFilteredPosts(recommendedPosts.filter(post => 
        selectedCategories.includes(post.category)
      ));
    } else {
      setFilteredPosts(recommendedPosts);
    }
  }, [selectedCategories]);
  
  // Simplified category toggling
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        // Add points for using filters - simplified
        if (prev.length === 0) {
          // First filter used
          addPoints(2, "Using filters to find content");
        }
        return [...prev, category];
      }
    });
  };
  
  const handlePostHover = (id: number | null) => {
    setHoveredPost(id);
  };
  
  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  // Simplified points system
  const addPoints = (amount: number, message: string) => {
    // Update global points in localStorage
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    localStorage.setItem('tuluPoints', (currentPoints + amount).toString());
    
    // Show toast
    toast({
      title: `+${amount} points`,
      description: message,
      duration: 2000,
    });
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-500/80';
      case 'Intermediate': return 'bg-yellow-500/80';
      case 'Advanced': return 'bg-red-500/80';
      default: return 'bg-blue-500/80';
    }
  };
  
  // Get all unique categories
  const categories = [...new Set(recommendedPosts.map(post => post.category))];
  
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Recommended for <span className="text-tulu-red">You</span>
            </h2>
            <p className="text-muted-foreground">
              Articles curated based on your reading preferences
            </p>
          </div>
          
          {/* Simplified level indicator */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Your Level:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-6 rounded-sm ${i < userLevel ? 'bg-tulu-teal' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Simplified category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium pt-1">Filter by:</span>
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                selectedCategories.includes(category) 
                  ? "bg-tulu-teal text-white" 
                  : "bg-transparent text-tulu-teal"
              )}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={() => handlePostHover(null)}
              onClick={() => addPoints(post.pointValue, `Selected ${post.title}`)}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Loading placeholder */}
                {!imagesLoaded[post.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400">Loading image...</span>
                  </div>
                )}
                
                <img 
                  src={post.image}
                  alt={post.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    hoveredPost === post.id ? "scale-110" : "scale-100",
                    imagesLoaded[post.id] ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(post.id)}
                  onError={(e) => {
                    // Reliable fallback image
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=800";
                    handleImageLoad(post.id);
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-tulu-teal/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <span className={`${getDifficultyColor(post.difficulty)} text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm`}>
                    {post.difficulty}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-tulu-red/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    +{post.pointValue} pts
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs bg-tulu-beige/50 px-2 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className={cn(
                  "font-medium text-lg mt-2 line-clamp-2 transition-colors duration-300 min-h-[3.5rem]",
                  hoveredPost === post.id ? "text-tulu-red" : "text-tulu-teal"
                )}>
                  {post.title}
                </h3>
                
                <div className={cn(
                  "h-0.5 bg-tulu-red mt-3 transition-all duration-300",
                  hoveredPost === post.id ? "w-1/3" : "w-0"
                )} />
                
                <Button 
                  variant="ghost" 
                  className="text-tulu-teal p-0 h-auto mt-3 flex items-center group"
                >
                  Read Article
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogRecommendations;
