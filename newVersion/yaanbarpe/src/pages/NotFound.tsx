
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow flex items-center justify-center py-24 px-4 md:px-8 bg-gradient-to-b from-background to-tulu-sand/20">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-display font-bold mb-4 text-tulu-blue">404</h1>
          <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. The journey may have taken us somewhere unexpected.
          </p>
          <Button 
            className="bg-tulu-red hover:bg-tulu-blue transition-colors"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
