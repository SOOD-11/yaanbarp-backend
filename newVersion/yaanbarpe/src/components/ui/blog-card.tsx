import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  commentCount?: number;
  featured?: boolean;
  className?: string;
}

export const BlogCard = ({
  id,
  title,
  excerpt,
  image,
  date,
  readTime,
  author,
  category,
  commentCount = 0,
  featured = false,
  className
}: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <Badge variant="secondary">{category}</Badge>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {readTime}
          </div>
        </div>

        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              {commentCount}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild>
            <Link to={`/blog/${id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};