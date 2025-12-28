
import React from 'react';

interface CulturalElementMediaProps {
  image: string;
  video: string;
  title: string;
  fact: string;
}

const CulturalElementMedia: React.FC<CulturalElementMediaProps> = ({
  image,
  video,
  title,
  fact,
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-video bg-black">
      {/* Fallback Image as background */}
      <img 
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{objectFit: 'cover'}}
      />
      {/* Overlay video if present */}
      <video 
        src={video}
        className="w-full h-[500px] object-cover relative z-10"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        style={{background: "transparent"}}
      />
      {/* Amazing Fact overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20">
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <span className="text-tulu-beige text-sm font-semibold uppercase tracking-wide">Amazing Fact</span>
            <p className="text-white text-lg font-medium mt-2">{fact}</p>
          </div>
        </div>
      </div>
      {/* Corner badge */}
      <div className="absolute top-4 right-4 bg-tulu-red text-white px-4 py-2 rounded-full text-sm font-bold z-30">
        Heritage Site
      </div>
    </div>
  );
};

export default CulturalElementMedia;
