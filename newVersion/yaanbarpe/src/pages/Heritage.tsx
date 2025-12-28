
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CulturalShowcase from '@/components/CulturalShowcase';
import Footer from '@/components/Footer';

const Heritage = () => {
  useEffect(() => {
    // Initialize scroll reveal animation
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
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full pt-20">
        <CulturalShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Heritage;
