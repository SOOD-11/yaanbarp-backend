import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-tulu-blue/5 pt-1 pb-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Flex Container for all columns */}
        <div className="flex flex-wrap justify-between items-start gap-10 mb-12">
          
          {/* Logo + Description + Socials */}
          <div className="flex flex-col items-start">
  <Link to="/" className="inline-block">
    <img
      src="/logos/Screenshot_2025-05-30_at_6.22.00_PM-removebg-preview-2.png"
      alt="YaanBarpe"
      className="h-20 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-20 object-contain transition-all duration-300" 
    />
  </Link>
  <p className="text-muted-foreground my-4 max-w-xs">
    Unveiling Tulu Nadu's rich cultural heritage through immersive experiences and educational content.
  </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/yaanbarpe/" className="text-muted-foreground hover:text-tulu-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/yaanbarpe/about/" className="text-muted-foreground hover:text-tulu-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/about" className="hover:text-tulu-blue transition-colors">Our Mission</a></li>
              <li><a href="/about" className="hover:text-tulu-blue transition-colors">Our Team</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-tulu-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Udupi, Karnataka, India</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-tulu-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:yaanbarpe@gmail.com" className="hover:text-tulu-blue transition-colors">yaanbarpe@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} YaanBarpe (YBiee). All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-tulu-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-tulu-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-tulu-blue transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;