
import { Calendar, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import React from 'react';

interface BlogHeaderProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  audioAvailable: boolean;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const BlogHeader = ({
  category,
  title,
  date,
  readTime,
  author,
  authorImage,
  audioAvailable,
  isAudioPlaying,
  onToggleAudio
}: BlogHeaderProps) => {
  return (
    <div className="mb-8">
      <span className="bg-[#00555A] text-white text-sm font-medium px-3 py-1 rounded-full">
        {category}
      </span>
      
      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold my-6 text-[#00555A]">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <span>•</span>
        <span>{readTime}</span>
        <span>•</span>
        <div className="flex items-center">
          <span>{author}</span>
        </div>
        {audioAvailable && (
          <>
            <span>•</span>
            <Button
              onClick={onToggleAudio}
              variant={isAudioPlaying ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAudioPlaying ? "Pause Audio" : "Play Audio"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogHeader;
