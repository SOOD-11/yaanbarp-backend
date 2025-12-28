import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Calendar, Clock, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ReactGA from 'react-ga4';

interface BlogPostProps {
  id?: string;
  postId?: string;
  title: string;
  excerpt: string;
  image?: string;
  video?: string; // ✅ New prop
  category: string;
  author: string;
  readTime: string;
  date: string;
  audioAvailable?: boolean;
}

export const BlogPost = ({
  id,
  postId,
  title,
  excerpt,
  image,
  video, 
  category,
  author,
  readTime,
  date,
  audioAvailable = false,
}: BlogPostProps) => {
  const linkId = postId || id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-black text-white shadow-md max-w-sm mx-auto aspect-[9/16]"
      )}
    >
      <div className="relative w-full h-full overflow-hidden">

        {/* ✅ Show video if available, otherwise fallback to image */}
        {video ? (
          <video
            className="object-cover w-full h-full"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            poster={image}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          image && (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          )
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        
     

        {/* Metadata */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <p className="text-sm bg-pink-600 px-2 py-0.5 inline-block rounded-full mb-2">
            {category}
          </p>
          <h3 className="text-lg font-bold leading-tight line-clamp-2">{title}</h3>
          <p className="text-xs text-white/80 mt-1 line-clamp-2">{excerpt}</p>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-white/70">
            <span>{author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
            {audioAvailable && (
              <span className="flex items-center gap-1">
                <Headphones className="h-3 w-3" />
                Audio
              </span>
            )}
          </div>

          {/* Read More button */}
          <div className="mt-3">
            <Link to={`/culturalheritage/${linkId}`} onClick={() =>
    ReactGA.event({
      category: 'Navigation',
      action: 'Click',
      label: 'blog read link',
    })}>
              <Button size="sm" variant="secondary" className="text-white bg-red-500 hover:bg-white/20">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;