
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, Mail, Phone } from 'lucide-react';

const BookingSuccess = () => {
  useEffect(() => {
    // Add confetti animation
    const colors = ['#E5B31B', '#dc2626', '#059669', '#0891b2'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, i * 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full pt-20">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-tulu-green mx-auto mb-6 animate-bounce-once" />
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="text-tulu-green">Booking</span> <span className="text-tulu-blue">Confirmed!</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thank you for choosing YaanBarpe! Your cultural experience has been successfully booked. 
                Get ready for an amazing journey through Tulu Nadu's heritage.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-tulu-blue">What's Next?</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-tulu-teal mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Confirmation Email</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a detailed confirmation email within the next few minutes with your booking details and meeting instructions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-tulu-green mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Contact from Our Team</h3>
                      <p className="text-sm text-muted-foreground">
                        Our local guide will call you 24 hours before your experience to confirm timing and answer any questions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-tulu-red mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Day of Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Arrive at the meeting point 15 minutes early. Bring comfortable walking shoes and your camera!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-tulu-blue hover:bg-tulu-teal">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" className="border-tulu-red text-tulu-red hover:bg-tulu-red hover:text-white">
                <Link to="/experiences">Book Another Experience</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-tulu-sand/20 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-tulu-blue">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions or need to make changes to your booking, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <span>📞 +91 9876543210</span>
                <span>✉️ bookings@yaanbarpe.com</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
