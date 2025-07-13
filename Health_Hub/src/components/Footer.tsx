
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedButton from './AnimatedButton';

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div className="animate-fade-in opacity-0" style={{animationDelay: '300ms'}}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="text-gray-600 hover:text-health-blue transition-colors duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ name, href }: { name: string; href: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    youtube: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
        <path d="m10 15 5-3-5-3z"></path>
      </svg>
    ),
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  };

  return (
    <a 
      href={href}
      className="bg-gray-100 text-gray-600 hover:text-health-blue hover:bg-gray-200 p-2 rounded-full transition-colors duration-200"
      aria-label={name}
    >
      {iconMap[name.toLowerCase()]}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Address Column */}
          <div className="animate-fade-in opacity-0" style={{animationDelay: '100ms'}}>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-health-blue mr-1">Health</span>
              <span className="text-2xl font-bold text-health-orange">Hub</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">Registered Office:</p>
              <address className="not-italic text-gray-500">
                123 Medical Center Drive<br />
                Healthcare District<br />
                Wellness City, WC 54321<br />
                United States
              </address>
              
              <div>
                <p className="text-gray-600 font-medium">Contact:</p>
                <div className="flex flex-col space-y-1 text-gray-500">
                  <a href="tel:+18001234567" className="hover:text-health-blue transition-colors">
                    +1 (800) 123-4567
                  </a>
                  <a href="mailto:info@healthhub.com" className="hover:text-health-blue transition-colors">
                    info@healthhub.com
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 font-medium">CIN:</p>
                <p className="text-gray-500">U85110TG2023PLC123456</p>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <SocialIcon name="YouTube" href="#" />
                <SocialIcon name="Facebook" href="#" />
                <SocialIcon name="Instagram" href="#" />
                <SocialIcon name="LinkedIn" href="#" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <FooterLinkGroup 
              title="Quick Links" 
              links={[
                'Hospitals & Directions',
                'Specialties & Treatment',
                'Our Doctors',
                'International Patient Services',
                'News & Media'
              ]} 
            />
            
            <div className="mt-8 animate-fade-in opacity-0" style={{animationDelay: '350ms'}}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tariff</h3>
              <div className="flex space-x-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors">
                  Stent Pricing
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors">
                  Implant Pricing
                </button>
              </div>
            </div>
          </div>
          
          {/* Patient Actions */}
          <div className="animate-fade-in opacity-0" style={{animationDelay: '400ms'}}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Contact Us',
                'Book an Appointment',
                'Pay Online',
                'Feedback',
                'Lab Reports',
                'Video Consultation'
              ].map((action, index) => (
                <a 
                  key={index} 
                  href="#"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center text-center"
                >
                  {action}
                </a>
              ))}
            </div>
          </div>
          
          {/* Centers of Excellence */}
          <div className="md:col-span-3 lg:col-span-1 animate-fade-in opacity-0" style={{animationDelay: '500ms'}}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Centers of Excellence</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[
                'Gastro Sciences',
                'Nephrology',
                'Neurosciences',
                'Oncology',
                'Pulmonology',
                'Orthopedics',
                'Pediatrics',
                'Cardiology'
              ].map((center, index) => (
                <a 
                  key={index} 
                  href="#"
                  className="text-gray-600 hover:text-health-blue transition-colors flex items-center"
                >
                  <svg className="w-3 h-3 mr-2 text-health-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  {center}
                </a>
              ))}
            </div>
            
            <div className="mt-6">
              <AnimatedButton variant="primary" size="sm">
                Find a Location Near You
              </AnimatedButton>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              Copyright © {new Date().getFullYear()} Health Hub Hospitals - All Rights Reserved
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              {[
                'Kakinada',
                'Rajahmundry',
                'Amalapuram',
                'Guntur',
                'Vishakhapatnam',
                'Vijayawada'
              ].map((city, index) => (
                <span key={index}>
                  {city}
                  {index < 5 && <span className="ml-4 text-gray-300 hidden md:inline">|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
