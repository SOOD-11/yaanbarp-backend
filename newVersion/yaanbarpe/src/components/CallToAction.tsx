
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-tulu-blue text-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tNS04YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnptLTEyLTJjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIvPjwvZz48L2c+PC9zdmc+')]" />
      
      <div className="max-w-7xl mx-auto relative scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Begin Your Journey Through <span className="text-tulu-gold">Tulu Nadu</span>
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Discover authentic experiences that connect you with our rich heritage. Join us in exploring the hidden treasures of Karnataka's coastal belt.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-white text-tulu-blue hover:bg-tulu-gold hover:text-white transition-colors group px-6 py-6 text-lg"
                size="lg"
              >
                Book an Experience
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button 
                className="bg-transparent border border-white hover:bg-white/10 transition-colors px-6 py-6 text-lg"
                variant="outline"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-tulu-gold/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-tulu-red/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="font-display text-2xl font-bold mb-4">Our Promise</h3>
              <p className="italic mb-6 text-white/80">
                "YaanBarpe (YBiee) - where every Atithi (guest) finds a home, and every journey calls you back."
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-tulu-gold/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Authentic Cultural Immersion</h4>
                    <p className="text-white/70 text-sm">Experience genuine traditions preserved for generations</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-tulu-gold/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Expert Local Guides</h4>
                    <p className="text-white/70 text-sm">Learn from passionate storytellers with deep regional knowledge</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-tulu-gold/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Cultural Preservation</h4>
                    <p className="text-white/70 text-sm">Your visit supports our mission to document and preserve Tulu Nadu's heritage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
