import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { addPoints, getUserPoints, getUserLevel } from '@/lib/gamification';

// Updated posts with working video URLs
const recentPosts = [
  {
    id: 1,
    title: "The Lost Coins of Vijayanagara: Archaeological Discoveries in Tulu Nadu",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    date: "May 5, 2025",
    category: "History",
    pointValue: 5,
    level: "Beginner"
  },
  {
    id: 2,
    title: "Preserving Tulu Language: Digital Initiatives for Cultural Conservation",
    video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    date: "May 2, 2025",
    category: "Language & Culture",
    pointValue: 7,
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Environmental Conservation Efforts Along the Netravati River Basin",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    date: "April 28, 2025",
    category: "Environment",
    pointValue: 6,
    level: "Advanced"
  }
];

const RecentPosts = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBadge, setShowBadge] = useState<number | null>(null);
  
  useEffect(() => {
    // Check for stored points and level
    setUserPoints(getUserPoints());
    setUserLevel(getUserLevel());
    
    // Listen for points updates
    const handlePointsUpdate = () => {
      setUserPoints(getUserPoints());
      setUserLevel(getUserLevel());
    };
    
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handlePointsUpdate);
    
    return () => {
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handlePointsUpdate);
    };
  }, []);
  
  const handlePostHover = (id: number | null) => {
    setHoveredPost(id);
  };
  
  const handleVideoInteraction = async (e: React.MouseEvent<HTMLVideoElement>, play: boolean) => {
    const video = e.currentTarget;
    try {
      if (play) {
        video.currentTime = 0;
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.log('Recent post video interaction failed:', error);
    }
  };
  
  const handlePostClick = (post: typeof recentPosts[0]) => {
    const levelUp = addPoints(post.pointValue, `Selected ${post.title}`);
    
    if (levelUp > 0) {
      setUserLevel(levelUp);
      setShowLevelUp(true);
      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
    }
    
    handleShowBadge(post.id);
    
    // Update points display
    setUserPoints(getUserPoints());
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('pointsUpdated'));
  };

  const handleShowBadge = (id: number) => {
    setShowBadge(id);
    setTimeout(() => {
      setShowBadge(null);
    }, 2000);
  };

  return (
    <div className="bg-[#EDE8D0]/30 py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Latest from our <span className="text-[#CC4E5C]">Blog</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Stay updated with our newest stories, insights, and discoveries from Tulu Nadu
            </p>
          </div>
          
          {/* Simple points display */}
          <div className="mt-4 md:mt-0 bg-white rounded-lg px-4 py-2 shadow-sm flex items-center gap-3">
            <Star className="text-[#E5B31B] w-4 h-4 fill-[#E5B31B]" />
            <span className="text-[#00555A] font-bold">{userPoints}</span>
            <span className="text-sm text-muted-foreground">points</span>
            <span className="text-[#CC4E5C] font-bold">Level {userLevel}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer scroll-reveal group"
              style={{ animationDelay: `${(post.id - 1) * 100}ms` }}
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={() => handlePostHover(null)}
              onClick={() => handlePostClick(post)}
            >
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <video 
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    hoveredPost === post.id ? "scale-110" : "scale-100"
                  )}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  onLoadStart={() => console.log(`Recent post ${post.id} video loading`)}
                  onCanPlay={() => console.log(`Recent post ${post.id} video ready`)}
                  onError={(e) => console.log(`Recent post ${post.id} video error:`, e)}
                  onPlay={() => console.log(`Recent post ${post.id} video playing`)}
                >
                  <source src={post.video} type="video/mp4" />
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#00555A]/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-[#CC4E5C]/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    +{post.pointValue} pts
                  </span>
                </div>
                
                {/* Simple badge popup */}
                {showBadge === post.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 animate-fade-in">
                    <div className="bg-white rounded-lg p-4 shadow-lg animate-bounce-once">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🏆</div>
                        <p className="font-bold text-[#00555A]">Article Selected!</p>
                        <p className="text-sm text-[#CC4E5C]">+{post.pointValue} points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-5 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <span className="text-xs bg-[#EDE8D0]/50 px-2 py-1 rounded-full">
                    {Math.floor(Math.random() * 10) + 5} min read
                  </span>
                </div>
                <h3 className={cn(
                  "font-display text-lg font-medium mt-2 line-clamp-2 transition-colors duration-300",
                  hoveredPost === post.id ? "text-[#CC4E5C]" : "text-[#00555A]"
                )}>
                  {post.title}
                </h3>
                <div className={cn(
                  "h-0.5 bg-[#CC4E5C] mt-3 transition-all duration-300",
                  hoveredPost === post.id ? "w-1/3" : "w-0"
                )} />
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs text-muted-foreground">Active Discussion</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#00555A] h-8 px-2">
                    Read now
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Simplified level up notification */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/80 text-white px-8 py-6 rounded-xl backdrop-blur-sm animate-scale-in text-center">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-3xl font-bold text-[#CC4E5C] mb-1">Level Up!</h2>
            <p className="text-xl">You're now level {userLevel}</p>
            <p className="text-sm mt-2 text-[#EDE8D0]">New articles unlocked!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
