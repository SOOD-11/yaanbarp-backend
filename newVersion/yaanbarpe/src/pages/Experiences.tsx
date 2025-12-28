import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { useUserContext } from '@/contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingContext } from '@/contexts/BookingContext';
import LoadingLogo from "@/components/LoadingLogo";

const MIN_LOADING_TIME = 1200; // milliseconds

const storytellingByLevel: Record<string, string> = {
  Immersive: "For those seeking deep, premium cultural immersion with exclusive experiences crafted by experts.",
  "Semi-Immersive": "Wide exposure to cultural highlights with balance between exploration and comfort.",
  Intermediate: "Discover deeper layers of culture through hands-on activities and local interaction.",
  Basic: "Entry-level cultural escapes perfect for first-timers and casual explorers."
};



const Experiences = () => {
  const { user } = useUserContext();
  const navigate = useNavigate()
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
const { selectedPackage, setSelectedPackage } = useBookingContext();


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchPackages = async () => {
      setLoading(true);
      const start = Date.now();
      try {
        const response = await axiosInstance.get('/package/');
        setPackages(response.data.packages);
      } catch (err) {
        setError('Failed to load packages. Please try again later.');
      } finally {
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_TIME - elapsed;
        timeoutId = setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };
    fetchPackages();
    return () => clearTimeout(timeoutId);
  }, []);
const handleBookNow = async(pkg: any) => {


  if (!user) {
    // Not logged in → redirect to login
    navigate("/login", { state: { from: `/packages/${pkg._id}` } });
  } else {
    // Logged in → go to traveller details page

   
navigate(`/booking/${pkg._id}`);
  }

};
const handleLevelChange = (level: string) => {
  setSelectedLevel(level);
  setLoading(true);
  let timeoutId: NodeJS.Timeout;
  const fetchFilteredPackages = async () => {
    const start = Date.now();
    try {
      // If you fetch from backend based on level, do it here
      // const response = await axiosInstance.get(`/package?level=${level}`);
      // setPackages(response.data.packages);
      // If filtering locally, just setLoading(false) after timeout
    } catch (err) {
      setError('Failed to load packages. Please try again later.');
    } finally {
      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      timeoutId = setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
    }
  };
  fetchFilteredPackages();
  return () => clearTimeout(timeoutId);
};

// Extract unique pyramid levels dynamically
const pyramidLevels = Array.from(new Set(packages.map(pkg => pkg.pyramidlevel)));
pyramidLevels.sort((a, b) => {
  // Define custom sort order or alphabetical fallback
  const order = ['Immersive', 'Semi-Immersive', 'Intermediate', 'Basic'];
  return order.indexOf(a) - order.indexOf(b);
});

const filteredPackages = selectedLevel === 'All' 
  ? packages 
  : packages.filter(pkg => pkg.pyramidlevel === selectedLevel);

const formatDuration = (dur: any) => `${dur.days} Days, ${dur.nights} Nights`;

return (
  <div className="min-h-screen flex flex-col">
  
    <div className="bg-gradient-to-b from-tulu-sand/20 to-background">
      <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-tulu-green">YaanBarpe</span>: Shaping a New Cultural Travel Movement
          </h1>
          <p className="text-muted-foreground text-lg">
            We're crafting immersive Indian travel experiences based on deep culture and authentic connection. Find your perfect journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedLevel === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('All')}
            className={selectedLevel === 'All' ? 'bg-tulu-blue text-white' : ''}
          >
            All
          </Button>
          {pyramidLevels.map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              onClick={() => setSelectedLevel(level)}
              className={selectedLevel === level ? 'bg-tulu-blue text-white' : ''}
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Storytelling */}
        {selectedLevel !== 'All' && storytellingByLevel[selectedLevel] && (
          <div className="bg-tulu-blue/10 rounded-lg p-6 mb-12 text-center text-tulu-blue font-semibold">
            {storytellingByLevel[selectedLevel]}
          </div>
        )}

        {/* Loading and Error */}
        {loading && <LoadingLogo />}
        {error && <div className="text-center text-red-600 py-20">{error}</div>}

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {!loading && !error && filteredPackages.map(pkg => (
            <Card key={pkg._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                <p className="text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-tulu-blue" />
                    <span>{formatDuration(pkg.duration)}</span>
                  </div>
                  <div className="flex items-center font-semibold text-tulu-green text-lg">
                    ₹{pkg.price.toLocaleString()}
                  </div>
                </div>
                <Button 
                  className="w-full bg-tulu-blue hover:bg-tulu-green"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Details Modal */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{selectedPackage.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedPackage.description}</p>
                <div className="mb-6">
                  <strong>Duration:</strong> {formatDuration(selectedPackage.duration)}
                </div>
                <div className="mb-6">
                  <strong>Price:</strong> ₹{selectedPackage.price.toLocaleString()}
                </div>

                {/* TODO: Add booking button and link login/booking flow */}

                <Button
                  className="w-full bg-tulu-red hover:bg-tulu-blue text-white"
                  onClick={() => {
                    // Placeholder: Integrate login check and booking navigation here
                    handleBookNow(selectedPackage)
                  }}
                >
                  Book Now
                </Button>

                <button 
                  onClick={() => setSelectedPackage(null)}
                  className="mt-4 underline text-center w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
 
  </div>
);
};

export default Experiences;
