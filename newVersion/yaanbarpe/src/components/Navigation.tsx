import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/contexts/UserContext';
import ProfileSidebar from './ProfileSideBar';


//const GOOGLE_FORM_LINK = "https://forms.gle/6HxmgaacowCPBFJt6"; 
// 
// Replace with your actual form link


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const location = useLocation();
const {user}=useUserContext();
console.log(user);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8 ',
        isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className=" justify-center  relative z-10">
  <div className="relative py-3">
    <img
      src="/logos/Screenshot_2025-05-30_at_6.22.00_PM-removebg-preview-2.png"
      alt="YaanBarpe"
      className="h-16 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-16 object-contain transition-all duration-300"
    />
  </div>
</Link>
 <
  ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-1 items-center">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/culturalheritage", label: "Cultural Heritage" },
            { to: "/packages", label: "Packages" },
           
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "group inline-flex h-3 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
                isActive(to)
                  ? "bg-tulu-blue/10 text-tulu-blue"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground",
                to === "/contact" && "ml-2"
              )}
            >
              {label}
            </Link>
          ))}

          {/* Google Form Button for Desktop */}
        {user ? (
  <button
            onClick={() => setSidebarOpen(true)}
            className="bg-tulu-blue text-white px-4 py-2 rounded-md"
          >
            
    {typeof user.Fullname === "string"
      ? user.Fullname
      : (user.Fullname && typeof user.Fullname.firstname === "string"
          ? user.Fullname.firstname
          : "My Account")}
  </button>
) : (
  <Link
    to="/login"
    className="ml-4 bg-tulu-red text-white px-4 py-2 rounded-md"
  >
    Login
  </Link>
  
)}
</div>
        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden text-foreground p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md w-screen h-screen pt-20 overflow-y-auto">
          <div className="flex flex-col space-y-6 px-6 pb-10">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/culturalheritage", label: "Cultural Heritage" },
             
              { to: "/packages", label: "Packages" },
             
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Google Form Button for Mobile */}
             {user ? (
  <Link
    to="/profile"
    className="ml-4 bg-tulu-blue text-white px-4 py-2 rounded-md"
  >
    {typeof user.Fullname === "string"
      ? user.Fullname
      : (user.Fullname && typeof user.Fullname.firstname === "string"
          ? user.Fullname.firstname
          : "My Account")}
  </Link>
) : (
  <Link
    to="/login"
    className="ml-4 bg-tulu-red text-white px-4 py-2 rounded-md"
  >
    Login
  </Link>
)}
       
           
          </div>
        </div>
      )}
    </nav>
    
    );
  };
  


export default Navigation;