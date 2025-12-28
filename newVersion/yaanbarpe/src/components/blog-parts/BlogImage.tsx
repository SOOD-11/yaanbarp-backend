
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, Download } from 'lucide-react';

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

const BlogImage = ({ imageUrl, title }: BlogImageProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simple working video URLs
  const videoSources = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  ];
  
  const videoSrc = videoSources[0]; // Use the most reliable one
  
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = videoSrc;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '-')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="rounded-2xl overflow-hidden mb-10 relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden bg-gray-900 min-h-96">
        <video 
          className="w-full h-auto object-cover transition-transform duration-300"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          style={{ minHeight: '384px' }}
          onLoadStart={() => console.log('Blog image video loading')}
          onCanPlay={() => console.log('Blog image video ready')}
          onError={(e) => console.log('Blog image video error:', e)}
          onPlay={() => console.log('Blog image video playing')}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Video caption */}
      <div className="bg-[#00555A]/90 text-white text-sm py-3 px-4">
        <p className="font-medium">{title}</p>
      </div>
      
      {/* Hover controls */}
      <div className={cn(
        "absolute top-4 right-4 flex gap-2 transition-opacity duration-300",
        isHovering ? "opacity-100" : "opacity-0"
      )}>
        <button 
          className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
          onClick={togglePlay}
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-[#00555A]" />
          ) : (
            <Play className="h-5 w-5 text-[#00555A]" />
          )}
        </button>
        <button 
          className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
          onClick={handleDownload}
          title="Download video"
        >
          <Download className="h-5 w-5 text-[#00555A]" />
        </button>
      </div>
    </div>
  );
};

export default BlogImage;
