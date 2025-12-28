
import React, { useEffect, useRef } from "react";

interface AreaGalleryProps {
  images: { src: string; alt: string }[];
}

const AreaGallery: React.FC<AreaGalleryProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const scrollWidth = scrollEl.scrollWidth - scrollEl.clientWidth;
    let direction = 1;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const delta = 0.09 * direction; // pixels per ms

      if (
        (direction > 0 && scrollEl.scrollLeft + delta >= scrollWidth) ||
        (direction < 0 && scrollEl.scrollLeft + delta <= 0)
      ) {
        direction *= -1;
      }
      scrollEl.scrollLeft += delta;

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-20 bg-slate-100">
      <h2 className="font-display text-3xl md:text-4xl text-tulu-blue font-bold mb-8 text-center">
        Area Gallery
      </h2>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap px-6 pb-4"
        style={{ scrollBehavior: "smooth" , WebkitOverflowScrolling: "touch"}}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="min-w-[320px] max-w-xs flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-white mr-4"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AreaGallery;
