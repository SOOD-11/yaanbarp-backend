
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DetailedBlogPost from '@/components/DetailedBlogPost';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { addPoints } from '@/lib/gamification';
import { toast } from '@/hooks/use-toast';
import { getBlogPostById } from '@/lib/blogData';
import { Helmet } from 'react-helmet-async';

const BlogPostPage = () => {
  const { postId } = useParams();
  
  // Initialize scroll reveal animation
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
    
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Track page view for analytics
    const pageLoadTime = new Date();
    
    return () => {
      observer.disconnect();
      
      // Calculate reading time when leaving the page
      const timeSpent = Math.floor((new Date().getTime() - pageLoadTime.getTime()) / 1000);
      if (timeSpent > 120) { // Only award points if they spent at least 2 minutes
        const pointsToAward = Math.min(25, Math.floor(timeSpent / 60) * 5);
        addPoints(pointsToAward, `Completed reading article: ${timeSpent} seconds`);
        
        // Show toast if enough points earned
        if (pointsToAward >= 10) {
          toast({
            title: `🎉 Article Completed! +${pointsToAward} points!`,
            description: "You've finished reading this article. Great job!",
            duration: 4000
          });
        }
      }
    };
  }, []);

  // Get the blog post by ID or default to first post
  const currentPost = getBlogPostById(postId || 'yakshagana-legacy') || {
    id: 'default',
    title: 'Welcome to Tulu Nadu Heritage',
    contentParts: ['<p>Explore the rich cultural heritage of Tulu Nadu...</p>'],
    image: 'https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg',

    readTime: '5 min read',
    author: 'YaanBarpe Team',
    authorImage: 'https://i.pravatar.cc/150?img=1',
    category: 'Cultural Heritage',
    tags: ['Culture', 'Heritage', 'Tulu Nadu'],
    excerpt: 'Discover the vibrant culture of Tulu Nadu',
    audioAvailable: true
  };

  return (
    <div className="min-h-screen flex flex-col">
   <Helmet>
  <title>{currentPost.title} | YaanBarpe</title>
  <meta name="description" content={currentPost.excerpt} />
  <meta name="author" content="YaanBarpe Team" />
  <meta name="keywords" content={`Tulunadu, ${currentPost.title}, yaanbarpe, ybiee, culture, blog`} />

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={currentPost.title} />
  <meta property="og:description" content={currentPost.excerpt} />
  <meta property="og:url" content={`https://www.yaanbarpe.in/culturalheritage/${currentPost.id}`} />
  <meta property="og:image" content={Array.isArray(currentPost.image) ? currentPost.image[0] : currentPost.image} />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={currentPost.title} />
  <meta name="twitter:description" content={currentPost.excerpt} />
  <meta name="twitter:image" content={Array.isArray(currentPost.image) ? currentPost.image[0] : currentPost.image} />
  <meta name="twitter:site" content="@yaanbarpe" />

  {/* Canonical URL */}
  <link rel="canonical" href={`https://www.yaanbarpe.in/culturalheritage/${currentPost.id}`} />

  {/* Structured Data: JSON-LD */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": currentPost.title,
      "description": currentPost.excerpt,
      "image": Array.isArray(currentPost.image) ? currentPost.image[0] : currentPost.image,
      "author": {
        "@type": "Person",
        "name": currentPost.author || "YaanBarpe Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YaanBarpe",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.yaanbarpe.in/favicon.png" // better use PNG or SVG if available
        }
      },
     
      "url": `https://www.yaanbarpe.in/culturalheritage/${currentPost.id}`
    })}
  </script>
</Helmet>
      <Navigation />
      <div className="py-12 px-4 md:px-8 flex-grow bg-gray-50/30">
        <div className=" container px-9 mx-auto max-w-4xl">
       
            <Link to='/culturalheritage' className='flex flex-row'>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
           <h3>Back to articles</h3>
            </Link>
     
          
          <DetailedBlogPost 
            title={currentPost.title}
            contentParts={currentPost.contentParts}
            image={currentPost.image}
            date={currentPost.date}
            readTime={currentPost.readTime}
            author={currentPost.author}
            authorImage={currentPost.authorImage}
            category={currentPost.category}
            tags={currentPost.tags}
            audioAvailable={currentPost.audioAvailable}
            id={currentPost.id}
          />
          
          {/* Enhanced feedback section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
