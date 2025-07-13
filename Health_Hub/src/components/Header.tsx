
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedButton from './AnimatedButton';
import { MapPin, Loader2 } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Check login status
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');

    // Get initial location from localStorage or set default
    const savedLocation = localStorage.getItem('userLocation');
    setUserLocation(savedLocation || 'Find Location');

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const getUserLocation = async () => {
    setLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use a reverse geocoding service to get location name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            
            const locationName = data.city || data.locality || data.principalSubdivision || 'Near You';
            setUserLocation(locationName);
            localStorage.setItem('userLocation', locationName);
          } catch (error) {
            console.error('Error getting location name:', error);
            setUserLocation('Location Found');
            localStorage.setItem('userLocation', 'Location Found');
          }
          
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation('Location Unavailable');
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setUserLocation('Location Not Supported');
      setLocationLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="relative z-50">
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out backdrop-blur-md",
          scrolled ? "bg-white/90 shadow-sm py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center mr-8">
                <span className="text-2xl font-bold text-health-blue mr-1">Health</span>
                <span className="text-2xl font-bold text-health-orange">Hub</span>
              </Link>
            </div>

            {/* Location Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={getUserLocation}
                disabled={locationLoading}
                className="flex items-center text-sm text-gray-600 hover:text-health-blue transition-colors duration-200 mr-4 px-3 py-2 rounded-lg hover:bg-health-blue/5"
              >
                {locationLoading ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 mr-1" />
                )}
                <span>{locationLoading ? 'Finding...' : userLocation}</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                Home
              </Link>
              <a 
                href="#services"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                Services
              </a>
              <Link 
                to="/centers-of-excellence"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                Centers of Excellence
              </Link>
              <a 
                href="#doctors"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                Doctors
              </a>
              <a 
                href="#about"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                About
              </a>
              <a 
                href="#contact"
                className="text-gray-700 hover:text-health-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out link-hover"
              >
                Contact
              </a>
            </nav>

            {/* Call to Action */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <Link to="/book-appointment">
                    <AnimatedButton 
                      variant="secondary" 
                      size="sm"
                    >
                      Book Appointment
                    </AnimatedButton>
                  </Link>
                  <AnimatedButton 
                    variant="secondary" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </AnimatedButton>
                </>
              ) : (
                <>
                  <Link to="/book-appointment">
                    <AnimatedButton 
                      variant="secondary" 
                      size="sm"
                    >
                      Find a Doctor
                    </AnimatedButton>
                  </Link>
                  <Link to="/signup">
                    <AnimatedButton 
                      variant="secondary" 
                      size="sm"
                    >
                      Sign Up
                    </AnimatedButton>
                  </Link>
                  <Link to="/login">
                    <AnimatedButton 
                      variant="primary" 
                      size="sm"
                    >
                      Login
                    </AnimatedButton>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '60px' }}
      >
        <div className="px-4 pt-4 pb-6 space-y-1">
          {/* Location for mobile */}
          <button
            onClick={getUserLocation}
            disabled={locationLoading}
            className="flex items-center text-sm text-gray-600 px-3 py-2 w-full text-left hover:bg-gray-50 rounded-md"
          >
            {locationLoading ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-1" />
            )}
            <span>{locationLoading ? 'Finding...' : userLocation}</span>
          </button>
          
          <Link
            to="/"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="#services"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </a>
          <Link
            to="/centers-of-excellence"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Centers of Excellence
          </Link>
          <a
            href="#doctors"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Doctors
          </a>
          <a
            href="#about"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="pt-4 space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedButton variant="secondary" className="w-full justify-center">
                    Book Appointment
                  </AnimatedButton>
                </Link>
                <AnimatedButton 
                  variant="secondary" 
                  className="w-full justify-center"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </AnimatedButton>
              </>
            ) : (
              <>
                <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedButton variant="secondary" className="w-full justify-center">
                    Find a Doctor
                  </AnimatedButton>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedButton variant="secondary" className="w-full justify-center">
                    Sign Up
                  </AnimatedButton>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedButton variant="primary" className="w-full justify-center">
                    Login
                  </AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Welcome */}
      <div className="pt-28 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 top-20 w-72 h-72 bg-health-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -left-40 -bottom-10 w-80 h-80 bg-health-orange/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-card shadow-elevation rounded-2xl p-8 md:p-10 max-w-4xl mx-auto text-center animate-scale-in opacity-0" style={{animationDelay: '300ms'}}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Expert Healthcare for <span className="text-health-blue">Everyone</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Providing compassionate, high-quality healthcare services with cutting-edge technology and experienced medical professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                >
                  Book Appointment
                </AnimatedButton>
              </Link>
              <a href="#services">
                <AnimatedButton 
                  variant="secondary" 
                  size="lg"
                >
                  Our Services
                </AnimatedButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
