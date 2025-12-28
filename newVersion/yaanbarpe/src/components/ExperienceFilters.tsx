
import { Button } from '@/components/ui/button';
import React from 'react';

const ExperienceFilters = ({
  categories,
  activeFilter,
  setActiveFilter,
}: {
  categories: string[];
  activeFilter: string;
  setActiveFilter: (category: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-3">
    {categories.map((category) => (
      <Button
        key={category}
        variant={activeFilter === category ? "default" : "outline"}
        onClick={() => setActiveFilter(category)}
        className={`rounded-full transition-all duration-300 ${activeFilter === category ? 'bg-gradient-to-r from-tulu-blue to-tulu-teal text-white shadow-lg' : 'hover:bg-tulu-sand/20'}`}
      >
        {category}
      </Button>
    ))}
  </div>
);

export default ExperienceFilters;
