
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import CenterOfExcellence from '@/components/CenterOfExcellence';
import DoctorsCare from '@/components/DoctorsCare';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import AnimatedButton from '@/components/AnimatedButton';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section when hash changes or on load
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    window.addEventListener('load', scrollToSection);
    window.addEventListener('hashchange', scrollToSection);

    return () => {
      window.removeEventListener('load', scrollToSection);
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <CenterOfExcellence />
        <DoctorsCare />
        
        {/* Additional Quality Care Section */}
        <section id="about" className="py-20 bg-white relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,#f7fbff,transparent)]"></div>
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionTitle 
              title="Excellence in Healthcare" 
              subtitle="We combine the highest standards of care with innovative treatments to ensure the best outcomes for our patients."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Modern Facilities',
                  description: 'Our hospitals are equipped with state-of-the-art facilities and the latest medical technology.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <line x1="3" x2="21" y1="9" y2="9"></line>
                      <line x1="9" x2="9" y1="21" y2="9"></line>
                    </svg>
                  )
                },
                {
                  title: 'Expert Team',
                  description: 'Our dedicated team of healthcare professionals is committed to delivering exceptional care.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )
                },
                {
                  title: 'Patient-Centered Care',
                  description: 'We prioritize the needs and well-being of our patients in every aspect of our service.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-elevation p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in opacity-0"
                  style={{animationDelay: `${300 + (index * 150)}ms`}}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-health-blue/10 text-health-blue mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <AnimatedButton variant="secondary" size="lg">
                Learn More About Us
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in opacity-0" style={{animationDelay: '100ms'}}>
              <SectionTitle 
                title="Get in Touch" 
                subtitle="Have questions or need to schedule an appointment? Our team is here to help."
                highlightColor="bg-health-blue/10"
              />
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Call Us',
                    content: '+1 (800) 123-4567',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Email Us',
                    content: 'info@healthhub.com',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Visit Us',
                    content: 'Find a location',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md animate-fade-in opacity-0"
                    style={{animationDelay: `${200 + (index * 100)}ms`}}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-health-blue/10 text-health-blue mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <AnimatedButton variant="cta" size="lg">
                  Book an Appointment
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
