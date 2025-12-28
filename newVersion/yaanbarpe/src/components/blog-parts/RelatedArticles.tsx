
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RelatedArticlesProps {
  onArticleClick: () => void;
}

const RelatedArticles = ({ onArticleClick }: RelatedArticlesProps) => {
  return (
    <div className="mt-16">
      <h3 className="font-display text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            title: "The Annual Tiger Dance Festival of Mangaluru",
            date: "April 22, 2025",
            image: "/blog-images/tiger-dance.jpg",
            readTime: "8 min read",
            points: 7
          },
          {
            title: "Exploring the Temple Architecture of Udupi",
            date: "May 1, 2025",
            image: "/blog-images/udupi-temple.jpg",
            readTime: "10 min read",
            points: 8
          }
        ].map((article, i) => (
          <div 
            key={i} 
            className="border rounded-lg overflow-hidden hover:shadow-md transition-all group cursor-pointer"
            onClick={onArticleClick}
          >
            <div className="h-40 overflow-hidden relative">
              <img 
                src={article.image}
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback image if the custom one fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-${i === 0 ? '1517022812141-23620dba5c23' : '1466442929976-97f336a657be'}?w=800&q=80`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 bg-[#00555A]/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                +{article.points} pts
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{article.date}</span>
                <span className="text-xs bg-[#EDE8D0]/50 px-2 py-1 rounded-full">
                  {article.readTime}
                </span>
              </div>
              <h4 className="font-medium mt-1 mb-3">{article.title}</h4>
              <Button 
                variant="link" 
                className="text-[#00555A] p-0 h-auto flex items-center group"
              >
                Read Article
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
