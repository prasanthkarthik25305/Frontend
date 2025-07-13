
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: '15+ years',
    qualifications: 'MD, FACC',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop',
    description: 'Specialized in interventional cardiology and heart disease prevention. Expert in minimally invasive cardiac procedures.'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: '12+ years',
    qualifications: 'MD, PhD',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop',
    description: 'Leading expert in neurological disorders, stroke treatment, and brain surgery with extensive research background.'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    experience: '10+ years',
    qualifications: 'MD, FAAP',
    image: 'https://images.unsplash.com/photo-1594824846898-ceeeed99bae8?q=80&w=1470&auto=format&fit=crop',
    description: 'Dedicated pediatrician focusing on child development, immunizations, and adolescent medicine.'
  },
  {
    id: 4,
    name: 'Dr. Robert Wilson',
    specialty: 'Orthopedics',
    experience: '18+ years',
    qualifications: 'MD, FAAOS',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1470&auto=format&fit=crop',
    description: 'Orthopedic surgeon specializing in joint replacement, sports medicine, and minimally invasive procedures.'
  },
  {
    id: 5,
    name: 'Dr. Amanda Thompson',
    specialty: 'Oncology',
    experience: '14+ years',
    qualifications: 'MD, FASCO',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1470&auto=format&fit=crop',
    description: 'Medical oncologist with expertise in cancer treatment, chemotherapy, and personalized cancer care.'
  },
  {
    id: 6,
    name: 'Dr. James Park',
    specialty: 'Internal Medicine',
    experience: '16+ years',
    qualifications: 'MD, FACP',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1470&auto=format&fit=crop',
    description: 'Internal medicine physician focusing on preventive care, chronic disease management, and wellness programs.'
  }
];

const DoctorsCare = () => {
  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,#f0f7ff,transparent)]"></div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle 
          title="Our Expert Doctors" 
          subtitle="Meet our highly qualified medical professionals dedicated to providing exceptional healthcare with compassion and expertise."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {doctors.map((doctor, index) => (
            <div 
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in opacity-0"
              style={{animationDelay: `${300 + (index * 150)}ms`}}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">{doctor.qualifications}</p>
                  <p className="text-xs opacity-90">{doctor.experience}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-health-blue font-semibold mb-3">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{doctor.description}</p>
                
                <div className="flex gap-2">
                  <AnimatedButton variant="primary" size="sm" className="flex-1 text-xs">
                    View Profile
                  </AnimatedButton>
                  <Link to="/book-appointment" className="flex-1">
                    <AnimatedButton variant="secondary" size="sm" className="w-full text-xs">
                      Book Appointment
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in opacity-0" style={{animationDelay: '1200ms'}}>
          <Link to="/book-appointment">
            <AnimatedButton variant="cta" size="lg">
              Book an Appointment with Our Doctors
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsCare;
