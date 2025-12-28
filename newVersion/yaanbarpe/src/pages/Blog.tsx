import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Calendar, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blogData';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  const categories = ["All", "Temple", "Food & Cuisine", "Festivals", "Art Forms", "Beaches"];

  const filteredPosts = blogPosts.filter(post => {
    const matchSearch = debouncedSearch
      ? post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;
    const matchCategory = activeCategory && activeCategory !== "All"
      ? post.category.toLowerCase() === activeCategory.toLowerCase()
      : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      <Helmet>
  <title>Tulunadu Culture Blogs – Kambala, Bhootha Kola, History & More | YaanBarpe</title>
  <meta
    name="description"
    content="Browse culturally rich blogs on Kambala, Bhootha Kola, Yakshagana, cuisine, festivals, and history of Tulu Nadu – curated by YaanBarpe."
  />
  <meta
    name="keywords"
    content="YaanBarpe blogs, Tulunadu stories, Kambala blog, Bhootha Kola blog, Yakshagana blog, Tulu Nadu culture, Karnataka festivals, heritage"
  />
  <meta name="author" content="YaanBarpe Team" />

  {/* Open Graph */}
  <meta property="og:title" content="Tulunadu Culture Blogs – Explore Kambala, Yakshagana & More" />
  <meta
    property="og:description"
    content="Discover the stories of Tulu Nadu through blogs about Kambala, Bhootha Kola, Yakshagana, and more."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.yaanbarpe.in/blogs" />
  <meta property="og:image" content="https://www.yaanbarpe.in/images/blogs-hero.jpg" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Explore Tulunadu Culture – YaanBarpe Blogs" />
  <meta
    name="twitter:description"
    content="Read about Kambala, Yakshagana, Bhootha Kola, and other living traditions from coastal Karnataka."
  />
  <meta name="twitter:image" content="https://www.yaanbarpe.in/images/twitter-card.png" />
  <meta name="twitter:site" content="@yaanbarpe" />

  {/* Canonical */}
  <link rel="canonical" href="https://www.yaanbarpe.in/blogs" />
</Helmet>
      <Navigation />

      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 pt-20 sm:pt-28">
        <div className="container mx-auto py-10 sm:py-16 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-slate-100 text-slate-900 px-4 py-1.5 sm:px-6 sm:py-2 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" /> Cultural Insights & Stories
            </Badge>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Discover Tulu Nadu's{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Living Heritage
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore stories, insights, and cultural experiences that showcase the rich tapestry of Tulu Nadu.
            </p>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Input
                placeholder="Search stories..."
                className="pl-10 pr-14 py-3 sm:py-4 rounded-xl border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 text-base sm:text-lg"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowSuggestions(true);
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg h-9 px-4 text-sm sm:text-base"
              >
                Search <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              {showSuggestions && debouncedSearch.trim() && (
                <ul className="absolute z-20 top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 max-h-64 overflow-y-auto">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.slice(0, 5).map((post) => (
                      <li
                        key={post.id}
                        onClick={() => {
                          setSearchValue(post.title);
                          setShowSuggestions(false);
                        }}
                        className="cursor-pointer px-4 py-3 hover:bg-slate-100 text-slate-800 text-sm"
                      >
                        {post.title}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-slate-500 italic">No results found</li>
                  )}
                </ul>
              )}
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category === "All" ? null : category)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium transition ${
                    activeCategory === category || (category === "All" && !activeCategory)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;