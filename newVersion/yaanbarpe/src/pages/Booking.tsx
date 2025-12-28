
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useBookingContext } from '@/contexts/BookingContext';
import axiosInstance from '@/utils/axiosInstance';
import { useUserContext } from '@/contexts/UserContext';

const Booking = () => {
const { packageId } = useParams();
const {createBooking}=useBookingContext();
const {user}=useUserContext();
  const [searchParams] = useSearchParams();
  const {selectedPackage,setSelectedPackage}=useBookingContext();
  const [travellers, setTravellers] = useState<{name: string, age: string, gender: string}[]>([]);

// Whenever guests count changes, update travellers array

const handleTravellerChange = (index: number, field: string, value: string) => {
  setTravellers(prev => {
    const updated = [...prev];
    updated[index][field as keyof typeof updated[0]] = value;
    return updated;
  });
};
  const navigate = useNavigate();
    useEffect(() => {
    const fetchPackage = async () => {
      if (!packageId) return;

      // If context already has the correct package, skip fetch
      if (selectedPackage?._id === packageId) return;

      try {
        const res = await axiosInstance.get(`package/${packageId}`);
        setSelectedPackage(res.data.pkg);
      } catch (err) {
        console.error("Error fetching package:", err);
      }
    };

    fetchPackage();
  }, [packageId, selectedPackage, setSelectedPackage]);

  
  const [bookingData, setBookingData] = useState({
    name:user.Fullname?.firstname+user.Fullname?.lastname,
    email: user?.email,
    phone: '',
  date: '',
    guests: '',
   requests: ''
  });

useEffect(() => {
  const guests = parseInt(bookingData.guests) || 0;
  setTravellers(prev => {
    const newTravellers = [...prev];
    // Add empty traveller objects if guests increased
    while (newTravellers.length < guests) newTravellers.push({name: '', age: '', gender: ''});
    // Trim array if guests decreased
    return newTravellers.slice(0, guests);
  });
}, [bookingData.guests]);
console.log(selectedPackage);
  const totalPrice = selectedPackage.price * parseInt(bookingData.guests);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
 try {
    createBooking({ 
      packageId, 
      travellers: travellers.map(t => ({ ...t, age: Number(t.age) })), 
      totalPrice,
      travelDate: bookingData.date ? new Date(bookingData.date) : undefined,
      specialRequests:bookingData.requests
    });
    
 } catch (error) {
  console.log(error);
  
 }
  };

  const handleChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background ">
      <Navigation />
      <main className="w-full pt-20">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl font-bold mb-4">
                <span className="text-tulu-blue">Book Your</span> <span className="text-tulu-red">Experience</span>
              </h1>
              <p className="text-muted-foreground">Complete your booking for an authentic Tulu Nadu experience</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-tulu-blue">Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Experience</label>
                      <Input value={selectedPackage.title} disabled />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          value={bookingData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <Input
                          value={bookingData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                        <Input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Guests *</label>
                        <Select value={bookingData.guests} onValueChange={(value) => handleChange('guests', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
       {travellers.map((traveller, idx) => (
  <Card key={idx} className="border-l-4 border-tulu-blue mb-4 p-4">
    <CardHeader>
      <CardTitle className="text-lg text-tulu-blue">
        Traveller {idx + 1} Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Full Name */}
      <Input
        placeholder="Full Name"
        value={traveller.name}
        onChange={(e) => handleTravellerChange(idx, "name", e.target.value)}
      />

   
      

      {/* Age */}
      <Input
        type="number"
        min="1"
        max="120"
        placeholder="Age"
        value={traveller.age}
        onChange={(e) => handleTravellerChange(idx, "age", e.target.value)}
      />

      {/* Gender */}
      <select
        value={traveller.gender || ""}
        onChange={(e) => handleTravellerChange(idx, "gender", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-tulu-blue"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </CardContent>
  </Card>
))}
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests</label>
                      <Input
                        value={bookingData.requests}
                        onChange={(e) => handleChange('requests', e.target.value)}
                        placeholder="Any special requirements or requests..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-tulu-red hover:bg-tulu-blue text-white"
                      size="lg"
                    >
                      <CreditCard className="mr-2 w-5 h-5" />
                      Pay ₹{totalPrice.toLocaleString()} & Confirm Booking
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-tulu-teal">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-medium">{selectedPackage.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per person:</span>
                      <span>₹{selectedPackage.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of guests:</span>
                      <span>{bookingData.guests}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-tulu-green">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-tulu-green">✓</span>
                        Expert local guide
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-tulu-green">✓</span>
                        All entry fees included
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-tulu-green">✓</span>
                        Traditional refreshments
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-tulu-green">✓</span>
                        Photography assistance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-tulu-green">✓</span>
                        Cultural insights & stories
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
