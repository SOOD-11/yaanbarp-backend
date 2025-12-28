
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Headphones, VolumeX, Volume2 } from 'lucide-react';

const AudioGuideDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="mt-20 scroll-reveal">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-tulu-blue to-tulu-green text-white">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Experience Our Audio Guides
            </h2>
            <p className="mb-6 text-white/90">
              Our immersive audio guides bring Tulu Nadu's stories to life through detailed narrations, ambient sounds, and expert insights. Available in multiple languages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-tulu-blue hover:bg-white/90 group" 
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <>
                    Pause Demo
                    <Headphones className="ml-2" size={18} />
                  </>
                ) : (
                  <>
                    Play Demo
                    <Play className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="mr-2" size={18} />
                    Unmute
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2" size={18} />
                    Mute
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-8 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm">
                <span className="font-medium">Featured audio:</span> "The Legend of Babbuswami - Tulu Nadu's Guardian Deity" narrated by Dinakar Shetty
              </p>
            </div>
          </div>
          
          <div className="bg-tulu-blue h-full">
            <div className="relative h-full min-h-[300px]">
              <img 
                src="https://source.unsplash.com/photo-1466442929976-97f336a657be" 
                alt="Temple with audio guide" 
                className="w-full h-full object-cover opacity-60"
              />
              
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Headphones className="text-tulu-blue" size={20} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-white/80 text-xs mb-1">Now playing:</span>
                    <span className="block text-white font-medium">Temple Architecture & Rituals</span>
                  </div>
                  
                  {isPlaying && (
                    <div className="flex gap-1">
                      <div className="w-1 h-8 bg-white/70 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1 h-8 bg-white/70 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1 h-8 bg-white/70 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-1 h-8 bg-white/70 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ animationDelay: "450ms" }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioGuideDemo;
