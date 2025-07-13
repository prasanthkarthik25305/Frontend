import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';
import { Heart, Brain, Bone, Baby, Shield, Stethoscope, Activity, Users, Calendar } from 'lucide-react';

const specialties = [
  { id: 1, name: 'Cardiac Sciences', icon: Heart, slug: 'cardiology' },
  { id: 2, name: 'Neuro Sciences', icon: Brain, slug: 'neurology' },
  { id: 3, name: 'Orthopedic', icon: Bone, slug: 'orthopedics' },
  { id: 4, name: 'Pediatrics', icon: Baby, slug: 'pediatrics' },
  { id: 5, name: 'Gynecology', icon: Users, slug: 'gynecology' },
  { id: 6, name: 'Surgical Services', icon: Activity, slug: 'surgical-services' },
  { id: 7, name: 'Gastroenterology', icon: Stethoscope, slug: 'gastroenterology' }, 
  { id: 8, name: 'Pulmonology', icon: Activity, slug: 'pulmonology' },
  { id: 9, name: 'Urology', icon: Calendar, slug: 'urology' }
];

const services = [
  {
    id: 1,
    title: "Emergency Care",
    description: "24/7 emergency medical services with rapid response teams and state-of-the-art trauma facilities for immediate medical attention.",
    icon: Activity,
    features: ["24/7 Availability", "Rapid Response", "Advanced Life Support", "Trauma Care"]
  },
  {
    id: 2,
    title: "Diagnostic Services",
    description: "Comprehensive diagnostic imaging and laboratory services including MRI, CT scans, X-rays, and advanced blood testing facilities.",
    icon: Stethoscope,
    features: ["MRI & CT Scans", "Digital X-Ray", "Laboratory Tests", "Cardiac Testing"]
  },
  {
    id: 3,
    title: "Surgical Procedures",
    description: "Advanced surgical services with minimally invasive techniques, robotic surgery, and comprehensive pre and post-operative care.",
    icon: Users,
    features: ["Minimally Invasive", "Robotic Surgery", "Day Surgery", "Specialist Teams"]
  },
  {
    id: 4,
    title: "Wellness Programs",
    description: "Preventive healthcare programs focusing on health maintenance, disease prevention, and lifestyle modification for optimal wellness.",
    icon: Heart,
    features: ["Health Screenings", "Vaccination", "Nutrition Counseling", "Fitness Programs"]
  }
];

const CenterOfExcellence = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1672&auto=format&fit=crop';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,#f0f7ff,transparent)]"></div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle 
          title="Centers of Excellence" 
          subtitle="Our specialized departments offer cutting-edge treatments and exceptional care across a wide range of medical fields."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <div 
              className={cn(
                "relative rounded-2xl overflow-hidden shadow-elevation transition-opacity duration-700",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-health-blue/20 to-transparent mix-blend-overlay"></div>
              
              {!imageLoaded && (
                <div className="aspect-[4/5] w-full bg-gray-200 animate-pulse"></div>
              )}
              
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1672&auto=format&fit=crop"
                alt="Doctor with holographic medical display" 
                className="w-full aspect-[4/5] object-cover"
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-medium text-lg">Advanced Medical Technology</p>
                <p className="text-white/80 text-sm">State-of-the-art diagnostics and treatments</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col justify-center animate-fade-in opacity-0" style={{animationDelay: '200ms'}}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specialties.map((specialty, index) => (
                <div 
                  key={specialty.id} 
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${200 + (index * 100)}ms` }}
                >
                  <Link to={`/specialty/${specialty.slug}`} className="block">
                    <AnimatedButton 
                      variant="specialty"
                      className="w-full h-full min-h-[80px] specialty-button-grid-item flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-transform duration-200"
                    >
                      <specialty.icon className="w-5 h-5" />
                      <span className="text-xs">{specialty.name}</span>
                    </AnimatedButton>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center animate-fade-in opacity-0" style={{animationDelay: '1100ms'}}>
              <Link to="/centers-of-excellence">
                <AnimatedButton variant="cta" size="lg">
                  View All Specialties
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="mt-20">
          <SectionTitle 
            title="Our Services" 
            subtitle="Comprehensive healthcare services designed to meet all your medical needs with excellence and compassion."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0"
                style={{animationDelay: `${300 + (index * 150)}ms`}}
              >
                <div className="w-12 h-12 bg-health-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-health-blue" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                
                <div className="mb-4">
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-health-blue rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <AnimatedButton variant="primary" size="sm" className="flex-1 text-xs">
                    Learn More
                  </AnimatedButton>
                  <Link to="/book-appointment" className="flex-1">
                    <AnimatedButton variant="secondary" size="sm" className="w-full text-xs">
                      Book Now
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CenterOfExcellence;
