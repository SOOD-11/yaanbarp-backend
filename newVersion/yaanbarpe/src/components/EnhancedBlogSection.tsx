import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, User, Eye, Heart, Share2, BookOpen, Sparkles, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'The Sacred Art of Yakshagana: A Living Heritage',
    excerpt: 'Discover the intricate world of Yakshagana, where mythology meets performance art in spectacular fashion.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: 'Dr. Priya Shetty',
    category: 'Cultural Arts',
    readTime: '8 min read',
    views: 2547,
    likes: 142,
    publishDate: '2024-01-10',
    isFeatured: true,
    isTrending: false,
    tags: ['Yakshagana', 'Performance', 'Heritage']
  },
  {
    id: 2,
    title: 'Temple Architecture: Stories in Stone',
    excerpt: 'Every carving tells a story. Explore the architectural marvels of Udupi\'s ancient temples.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    author: 'Rajesh Kumar',
    category: 'Architecture',
    readTime: '12 min read',
    views: 1832,
    likes: 98,
    publishDate: '2024-01-08',
    isFeatured: false,
    isTrending: true,
    tags: ['Architecture', 'Temples', 'History']
  },
  {
    id: 3,
    title: 'Coastal Cuisine: Flavors of the Sea',
    excerpt: 'From ghee roast to neer dosa, discover the culinary treasures of Tulu Nadu\'s coastal kitchen.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    author: 'Meera Pai',
    category: 'Food & Culture',
    readTime: '6 min read',
    views: 3421,
    likes: 201,
    publishDate: '2024-01-05',
    isFeatured: true,
    isTrending: true,
    tags: ['Food', 'Recipes', 'Culture']
  },
  {
    id: 4,
    title: 'Festival Traditions: Celebrating Life',
    excerpt: 'Experience the vibrant festivals that bring Tulu communities together in joyous celebration.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    author: 'Anil Bhat',
    category: 'Festivals',
    readTime: '10 min read',
    views: 1965,
    likes: 156,
    publishDate: '2024-01-03',
    isFeatured: false,
    isTrending: false,
    tags: ['Festivals', 'Traditions', 'Community']
  }
];

const EnhancedBlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const categories = ['All', 'Cultural Arts', 'Architecture', 'Food & Culture', 'Festivals'];
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/blog/${post.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/blog/${post.id}`);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-tulu-sand/10 to-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-tulu-green to-tulu-blue text-white px-6 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Cultural Stories
          </Badge>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
              Stories That
            </span>{' '}
            <span className="text-tulu-red">Inspire</span>
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Dive deep into the rich tapestry of Tulu culture through expert insights, personal stories, and cultural explorations.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-tulu-blue to-tulu-teal text-white shadow-lg' 
                    : 'hover:bg-tulu-sand/20'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.some(post => post.isFeatured) && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-tulu-gold" />
              <span className="font-bold text-lg">Featured Story</span>
            </div>
            
            {filteredPosts.filter(post => post.isFeatured).slice(0, 1).map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-2xl group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Video */}
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <video 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    >
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Play className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-tulu-gold text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      {post.isTrending && (
                        <Badge className="bg-orange-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4 leading-tight group-hover:text-tulu-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Button 
                        className="bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white group/btn"
                        asChild
                      >
                        <Link to={`/blog/${post.id}`}>
                          Read Full Story
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="group/like"
                        >
                          <Heart className={`w-4 h-4 mr-1 transition-colors ${
                            likedPosts.includes(post.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'group-hover/like:text-red-500'
                          }`} />
                          <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.filter(post => !post.isFeatured).map((post) => (
            <Card key={post.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <video 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                >
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4">
                  {post.isTrending && (
                    <Badge className="bg-orange-500 text-white animate-pulse">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`w-4 h-4 ${
                      likedPosts.includes(post.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    }`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                    onClick={() => handleShare(post)}
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </Button>
                </div>

                {/* Reading Time */}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3 text-xs">
                  {post.category}
                </Badge>
                
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-tulu-blue transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>By {post.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group/btn border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white"
                  asChild
                >
                  <Link to={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-tulu-blue/10 via-tulu-teal/10 to-tulu-green/10 rounded-3xl p-12">
          <BookOpen className="w-16 h-16 text-tulu-blue mx-auto mb-6" />
          <h3 className="font-display text-3xl font-bold mb-4">
            More Stories Await
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Explore our complete collection of cultural insights, travel guides, and authentic stories from the heart of Tulu Nadu.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            asChild
          >
            <Link to="/blog">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore All Stories
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedBlogSection;
