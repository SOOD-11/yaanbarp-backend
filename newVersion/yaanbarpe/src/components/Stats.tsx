
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    id: 1,
    figure: '73%',
    description: 'of the region\'s cultural assets remain non-commercialized',
    color: 'bg-tulu-blue',
  },
  {
    id: 2,
    figure: '41%',
    description: 'surge in demand for experiential travel post-2022',
    color: 'bg-tulu-red',
  },
  {
    id: 3,
    figure: '6.8M',
    description: 'pilgrims visit Sri Krishna Matha annually',
    color: 'bg-tulu-gold',
  },
  {
    id: 4,
    figure: '₹4.1L Cr',
    description: 'value of Karnataka\'s thriving tourism sector',
    color: 'bg-tulu-green',
  }
];

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [counters, setCounters] = useState<string[]>(Array(stats.length).fill('0'));

  // Animate counter for percentage and numbers
  const animateCounter = (index: number, target: string) => {
    let current = 0;
    let isCurrency = target.includes('₹');
    let isPercentage = target.includes('%');
    let finalNumber = 0;
    
    if (isCurrency) {
      finalNumber = parseFloat(target.replace(/[^\d.]/g, ''));
    } else if (isPercentage) {
      finalNumber = parseInt(target.replace(/[^\d]/g, ''));
    } else if (target.includes('M')) {
      finalNumber = parseFloat(target.replace(/[^\d.]/g, '')) * 100;
    } else {
      finalNumber = parseInt(target.replace(/[^\d]/g, ''));
    }
    
    const step = Math.max(1, Math.floor(finalNumber / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= finalNumber) {
        current = finalNumber;
        clearInterval(interval);
      }
      
      const updatedCounters = [...counters];
      if (isCurrency) {
        updatedCounters[index] = `₹${(current/100).toFixed(1)}L Cr`;
      } else if (isPercentage) {
        updatedCounters[index] = `${current}%`;
      } else if (target.includes('M')) {
        updatedCounters[index] = `${(current/100).toFixed(1)}M`;
      } else {
        updatedCounters[index] = current.toString();
      }
      
      setCounters(updatedCounters);
    }, 30);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a stat item, start counter animation
            const index = statsRef.current.findIndex(el => el === entry.target);
            if (index !== -1) {
              animateCounter(index, stats[index].figure);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    statsRef.current.forEach((stat) => {
      if (stat) observer.observe(stat);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-tulu-sand/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-tulu-earth">Discover</span> Tulu Nadu
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            The coastal belt of Karnataka offers incredible potential for cultural tourism, with vast untapped resources and growing interest in authentic experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => (statsRef.current[index] = el)}
              className="scroll-reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col items-center justify-center text-center" style={{ borderColor: `var(--${stat.color.replace('bg-', '')})` }}>
                <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mb-6`}>
                  <span className="text-white text-xl font-bold">{stat.id}</span>
                </div>
                <h3 className="text-4xl font-bold mb-3 font-display gradient-text">
                  {counters[index]}
                </h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
