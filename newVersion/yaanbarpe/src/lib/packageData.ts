
export interface RoutePoint {
  id: string;
  name: string;
  type: 'temple' | 'beach' | 'cultural' | 'culinary' | 'heritage';
  coordinates: [number, number];
  description: string;
  image: string;
  duration: string;
}

export interface PackageRoute {
  id: string;
  name: string;
  description: string;
  points: RoutePoint[];
  mapCenter: [number, number];
  totalDistance: string;
}

export interface Package {
  id: string;
  tier: 'basic' | 'intermediate' | 'semi-emulsive' | 'emulsive' | 'business-executive';
  title: string;
  duration: string;
  price: {
    min: number;
    max: number;
  };
  description: string;
  highlights: string[];
  includes: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
    meals: string[];
  }[];
  routes: string[];
  image: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  groupSize: string;
  bestFor: string[];
  featured?: boolean;
  available?: boolean;
}

export const routes: PackageRoute[] = [
  {
    id: 'temple-circuit',
    name: 'Temple Heritage Circuit',
    description: 'Sacred temples showcasing Tulu Nadu\'s spiritual heritage',
    mapCenter: [13.3409, 74.7421],
    totalDistance: '85 km',
    points: [
      {
        id: 'sri-krishna-temple',
        name: 'Sri Krishna Matha, Udupi',
        type: 'temple',
        coordinates: [13.3409, 74.7421],
        description: 'Ancient temple founded by Saint Madhvacharya',
        image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
        duration: '2 hours'
      },
      {
        id: 'anantheshwara-temple',
        name: 'Anantheshwara Temple',
        type: 'temple',
        coordinates: [13.3500, 74.7450],
        description: 'Oldest temple in Udupi with unique architecture',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
        duration: '1.5 hours'
      }
    ]
  },
  {
    id: 'coastal-explorer',
    name: 'Coastal Heritage Trail',
    description: 'Pristine beaches and maritime heritage of Tulu Nadu',
    mapCenter: [13.2127, 74.7421],
    totalDistance: '120 km',
    points: [
      {
        id: 'st-marys-islands',
        name: "St. Mary's Islands",
        type: 'beach',
        coordinates: [13.2127, 74.7421],
        description: 'Unique hexagonal basalt rock formations',
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
        duration: '4 hours'
      },
      {
        id: 'malpe-beach',
        name: 'Malpe Beach',
        type: 'beach',
        coordinates: [13.2100, 74.7400],
        description: 'Popular beach with fishing harbor',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'food-trail',
    name: 'Culinary Heritage Trail',
    description: 'Traditional Tulu Nadu cuisine and cooking experiences',
    mapCenter: [13.3409, 74.7421],
    totalDistance: '95 km',
    points: [
      {
        id: 'udupi-cuisine',
        name: 'Traditional Udupi Kitchen',
        type: 'culinary',
        coordinates: [13.3409, 74.7421],
        description: 'Learn authentic Udupi cooking techniques',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
        duration: '3 hours'
      },
      {
        id: 'coastal-seafood',
        name: 'Coastal Seafood Experience',
        type: 'culinary',
        coordinates: [13.2100, 74.7400],
        description: 'Fresh coastal delicacies and fishing culture',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        duration: '2 hours'
      }
    ]
  }
];

export const packages: Package[] = [
  // BASIC PACKAGE (Entry Level) - 6 Hour Packages
  {
    id: 'udupi-basic-6h',
    tier: 'basic',
    title: 'Udupi Spiritual Discovery',
    duration: '6 hours',
    price: { min: 2500, max: 3000 },
    description: 'Drive + immersive zone entry to experience the spiritual heart of Tulu Nadu',
    highlights: ['Sri Krishna Temple complex', 'Traditional Udupi cuisine', 'Local market exploration', 'Cultural briefing'],
    includes: ['Transportation', 'Temple guide', 'Traditional lunch', 'Cultural orientation'],
    itinerary: [
      {
        day: 1,
        title: 'Udupi Spiritual & Culinary Journey',
        activities: ['Temple complex tour', 'Traditional cooking demo', 'Local market exploration', 'Cultural briefing'],
        meals: ['Traditional Udupi lunch']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600',
    difficulty: 'easy',
    groupSize: '2-15 people',
    bestFor: ['First-time visitors', 'Spiritual seekers', 'Cultural enthusiasts'],
    featured: true,
    available: true
  },
  {
    id: 'mangalore-basic-6h',
    tier: 'basic',
    title: 'Mangalore Heritage Explorer',
    duration: '6 hours',
    price: { min: 2800, max: 3300 },
    description: 'Discover Mangalore\'s rich heritage through temples, spice markets, and traditional crafts',
    highlights: ['Historic temples', 'Spice market tour', 'Traditional crafts', 'Coastal culture'],
    includes: ['Transportation', 'Local guide', 'Refreshments', 'Craft demonstration'],
    itinerary: [
      {
        day: 1,
        title: 'Mangalore Cultural Discovery',
        activities: ['Temple visits', 'Spice market exploration', 'Traditional craft workshop', 'Coastal walk'],
        meals: ['Local snacks and refreshments']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600',
    difficulty: 'easy',
    groupSize: '2-15 people',
    bestFor: ['History enthusiasts', 'Culture lovers', 'Shopping enthusiasts'],
    available: true
  },
  {
    id: 'kundapura-basic-6h',
    tier: 'basic',
    title: 'Kundapura Coastal Experience',
    duration: '6 hours',
    price: { min: 2700, max: 3200 },
    description: 'Explore the fishing heritage and coastal beauty of Kundapura',
    highlights: ['Fishing harbor visit', 'Beach exploration', 'Coastal cuisine', 'Maritime culture'],
    includes: ['Transportation', 'Local guide', 'Seafood lunch', 'Boat ride'],
    itinerary: [
      {
        day: 1,
        title: 'Kundapura Maritime Journey',
        activities: ['Fishing harbor tour', 'Beach activities', 'Boat ride', 'Coastal cuisine tasting'],
        meals: ['Fresh seafood lunch']
      }
    ],
    routes: ['coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
    difficulty: 'easy',
    groupSize: '2-12 people',
    bestFor: ['Nature lovers', 'Seafood enthusiasts', 'Photography lovers'],
    available: true
  },
  {
    id: 'karkala-basic-6h',
    tier: 'basic',
    title: 'Karkala Heritage Trail',
    duration: '6 hours',
    price: { min: 2600, max: 3100 },
    description: 'Discover the historical significance and architectural marvels of Karkala',
    highlights: ['Gomateshwara statue', 'Ancient temples', 'Historical monuments', 'Local culture'],
    includes: ['Transportation', 'Guide', 'Traditional lunch', 'Monument entry'],
    itinerary: [
      {
        day: 1,
        title: 'Karkala Historical Journey',
        activities: ['Gomateshwara statue visit', 'Ancient temple tour', 'Historical walk', 'Cultural interaction'],
        meals: ['Traditional lunch']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600',
    difficulty: 'moderate',
    groupSize: '2-15 people',
    bestFor: ['History buffs', 'Architecture enthusiasts', 'Spiritual seekers'],
    available: true
  },

  // 1-Day Package
  {
    id: 'tulunadu-complete-1day',
    tier: 'basic',
    title: 'Complete Tulu Nadu Discovery',
    duration: '1 day',
    price: { min: 4500, max: 5500 },
    description: 'Comprehensive one-day exploration including beaches, temples, and geography of Tulu Nadu',
    highlights: ['Beaches and coastline', 'Temple architecture', 'Geographic diversity', 'Cultural immersion'],
    includes: ['Transportation', 'All meals', 'Guide', 'Entry fees', 'Cultural activities'],
    itinerary: [
      {
        day: 1,
        title: 'Complete Tulu Nadu Experience',
        activities: ['Morning temple visits', 'Coastal exploration', 'Traditional lunch', 'Cultural activities', 'Sunset viewing'],
        meals: ['Traditional breakfast', 'Coastal lunch', 'Evening refreshments']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600',
    difficulty: 'moderate',
    groupSize: '2-12 people',
    bestFor: ['Comprehensive explorers', 'Time-conscious travelers', 'Cultural enthusiasts'],
    featured: true,
    available: true
  },

  // Business Executive Package
  {
    id: 'business-executive-mahe',
    tier: 'business-executive',
    title: 'Executive Cultural Brief - Mahe',
    duration: '4 hours',
    price: { min: 8000, max: 10000 },
    description: 'Curated cultural snapshot designed for busy executives - Mahe + Culture combination',
    highlights: ['VIP temple access', 'Executive networking', 'Cultural briefing', 'Premium dining'],
    includes: ['Private transportation', 'Personal guide', 'Premium lunch', 'Cultural portfolio', 'Business networking'],
    itinerary: [
      {
        day: 1,
        title: 'Executive Cultural Immersion',
        activities: ['Private temple tour', 'Cultural briefing session', 'Traditional arts preview', 'Networking opportunity'],
        meals: ['Premium traditional lunch']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
    difficulty: 'easy',
    groupSize: '1-6 people',
    bestFor: ['Business executives', 'Time-conscious professionals', 'Premium experience seekers'],
    available: true
  },

  // INTERMEDIATE PACKAGE (2-Day Plan)
  {
    id: 'udupi-mangalore-2day',
    tier: 'intermediate',
    title: 'Udupi-Mangalore Cultural Journey',
    duration: '2 days',
    price: { min: 12000, max: 15000 },
    description: 'Two-day exploration with deeper cultural immersion than Basic packages',
    highlights: ['Both cities covered', 'Cultural workshops', 'Local family interactions', 'Traditional performances'],
    includes: ['Accommodation', 'All meals', 'Transportation', 'Workshops', 'Cultural shows', 'Local guide'],
    itinerary: [
      {
        day: 1,
        title: 'Udupi Deep Dive',
        activities: ['Temple complex exploration', 'Cooking workshop', 'Cultural center visit', 'Local family interaction'],
        meals: ['Traditional breakfast', 'Udupi lunch', 'Local dinner']
      },
      {
        day: 2,
        title: 'Mangalore Extended Cultural Route',
        activities: ['Heritage walk', 'Spice plantation visit', 'Traditional craft workshop', 'Cultural performance'],
        meals: ['Coastal breakfast', 'Seafood lunch', 'Cultural dinner']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer', 'food-trail'],
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=600',
    difficulty: 'moderate',
    groupSize: '2-10 people',
    bestFor: ['Cultural enthusiasts', 'Weekend travelers', 'Deep learning seekers'],
    available: true
  },

  // SEMI-EMULSIVE PACKAGE (4-Day Plan)
  {
    id: 'semi-emulsive-4day',
    tier: 'semi-emulsive',
    title: 'Tulu Nadu Cultural Immersion',
    duration: '4 days',
    price: { min: 25000, max: 32000 },
    description: 'Covers major Tulu Nadu elements - temples, local food, culture, rituals. Wide exposure ideal for short vacations',
    highlights: ['Major temple complexes', 'Traditional food experiences', 'Cultural rituals participation', 'Local community interaction'],
    includes: ['Premium accommodation', 'All meals', 'Cultural workshops', 'Ritual participation', 'Local transportation', 'Expert guides'],
    itinerary: [
      {
        day: 1,
        title: 'Spiritual Foundation',
        activities: ['Major temple visits', 'Spiritual rituals', 'Cultural orientation', 'Traditional dress experience'],
        meals: ['Temple breakfast', 'Traditional lunch', 'Community dinner']
      },
      {
        day: 2,
        title: 'Culinary Heritage',
        activities: ['Cooking workshops', 'Local food trails', 'Spice plantation tour', 'Family dining experience'],
        meals: ['Traditional breakfast', 'Cooking class lunch', 'Local family dinner']
      },
      {
        day: 3,
        title: 'Cultural Arts & Rituals',
        activities: ['Traditional art forms', 'Cultural performances', 'Ritual ceremonies', 'Community festivals'],
        meals: ['Cultural breakfast', 'Festival lunch', 'Celebration dinner']
      },
      {
        day: 4,
        title: 'Nature & Heritage Integration',
        activities: ['Coastal exploration', 'Heritage sites', 'Cultural synthesis', 'Farewell ceremony'],
        meals: ['Coastal breakfast', 'Heritage lunch']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer', 'food-trail'],
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600',
    difficulty: 'moderate',
    groupSize: '4-8 people',
    bestFor: ['Cultural immersion seekers', 'Short vacation travelers', 'Comprehensive explorers'],
    featured: true,
    available: true
  },

  // EMULSIVE PACKAGE (7-9 Day Premium)
  {
    id: 'emulsive-premium-7to9day',
    tier: 'emulsive',
    title: 'Complete Tulu Nadu Emulsive Experience',
    duration: '7-9 days',
    price: { min: 50000, max: 75000 },
    description: 'Fully immersive, tailored experience with workshops, practitioner sessions, traditional food & rituals, and in-depth storytelling of Tulu Nadu',
    highlights: ['Master craftsman workshops', 'Practitioner sessions', 'Complete cultural immersion', 'Personal storytelling', 'Custom itinerary'],
    includes: ['Luxury accommodation', 'All meals & beverages', 'Master workshops', 'Practitioner sessions', 'Personal guide', 'Custom experiences', 'Documentation kit'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Cultural Orientation',
        activities: ['Welcome ceremony', 'Cultural briefing', 'Personal mentor assignment', 'Traditional welcome ritual'],
        meals: ['Welcome feast with cultural family']
      },
      {
        day: 2,
        title: 'Master Craftsman Workshop Day 1',
        activities: ['Traditional art forms training', 'Master craftsman sessions', 'Hands-on workshops', 'Cultural documentation'],
        meals: ['Artisan breakfast', 'Workshop lunch', 'Master dinner']
      },
      {
        day: 3,
        title: 'Spiritual & Ritual Deep Dive',
        activities: ['Advanced temple practices', 'Ritual participation', 'Spiritual mentorship', 'Sacred geography'],
        meals: ['Temple breakfast', 'Sacred lunch', 'Spiritual dinner']
      },
      {
        day: 4,
        title: 'Culinary Mastery & Food Culture',
        activities: ['Advanced cooking workshops', 'Traditional food preparation', 'Local family integration', 'Culinary storytelling'],
        meals: ['Cooking class breakfast', 'Family preparation lunch', 'Community feast']
      },
      {
        day: 5,
        title: 'Practitioner Sessions & Advanced Arts',
        activities: ['Traditional medicine practices', 'Advanced cultural arts', 'Practitioner mentorship', 'Cultural healing'],
        meals: ['Healing breakfast', 'Practitioner lunch', 'Wellness dinner']
      },
      {
        day: 6,
        title: 'Community Integration & Storytelling',
        activities: ['Community living experience', 'In-depth storytelling sessions', 'Cultural preservation activities', 'Personal documentation'],
        meals: ['Community breakfast', 'Storytelling lunch', 'Integration dinner']
      },
      {
        day: 7,
        title: 'Cultural Synthesis & Personal Journey',
        activities: ['Personal cultural project', 'Synthesis workshops', 'Cultural mentorship', 'Preparation for departure'],
        meals: ['Synthesis breakfast', 'Project lunch', 'Farewell ceremony dinner']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer', 'food-trail'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    difficulty: 'challenging',
    groupSize: '2-6 people',
    bestFor: ['Deep cultural transformation seekers', 'Serious cultural learners', 'Personal growth enthusiasts'],
    available: true
  }
];

export const packageTiers = {
  basic: {
    name: 'Basic Package',
    color: 'bg-green-100 text-green-800',
    description: 'Entry level - Easy accessibility',
    icon: '🌱',
    level: 'Entry Level'
  },
  'business-executive': {
    name: 'Business Executive',
    color: 'bg-blue-100 text-blue-800',
    description: 'Curated for professionals',
    icon: '💼',
    level: 'Professional'
  },
  intermediate: {
    name: 'Intermediate Package',
    color: 'bg-yellow-100 text-yellow-800',
    description: '2-Day deeper cultural exploration',
    icon: '🎭',
    level: 'Intermediate'
  },
  'semi-emulsive': {
    name: 'Semi-Emulsive Package',
    color: 'bg-orange-100 text-orange-800',
    description: '4-Day wide exposure experience',
    icon: '🎨',
    level: 'Semi-Immersive'
  },
  emulsive: {
    name: 'Emulsive Package',
    color: 'bg-purple-100 text-purple-800',
    description: '7-9 Day premium immersive experience',
    icon: '🏛️',
    level: 'Fully Immersive'
  }
};
