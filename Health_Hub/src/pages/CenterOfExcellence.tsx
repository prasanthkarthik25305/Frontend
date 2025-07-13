
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Brain, Bone, Baby, Shield, Stethoscope } from 'lucide-react';

const centers = [
  {
    id: 1,
    title: 'Cardiology',
    slug: 'cardiology',
    description: 'Comprehensive cardiac care with advanced procedures including angioplasty, bypass surgery, and heart transplants. Our team of expert cardiologists provides 24/7 emergency cardiac services.',
    icon: Heart,
    features: ['Emergency Cardiac Care', 'Interventional Cardiology', 'Heart Surgery', 'Cardiac Rehabilitation'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1631&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Neurology',
    slug: 'neurology',
    description: 'Advanced neurological care covering brain and spine disorders. We offer cutting-edge treatments for stroke, epilepsy, Parkinson\'s disease, and complex neurosurgical procedures.',
    icon: Brain,
    features: ['Stroke Treatment', 'Neurosurgery', 'Epilepsy Care', 'Brain Tumor Treatment'],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1631&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Orthopedics',
    slug: 'orthopedics',
    description: 'Complete orthopedic solutions from joint replacements to sports medicine. Our specialists treat bone, joint, and muscle disorders with minimally invasive techniques.',
    icon: Bone,
    features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Care'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Specialized healthcare for children from newborns to adolescents. Our pediatric team provides comprehensive care in a child-friendly environment with the latest medical technology.',
    icon: Baby,
    features: ['Newborn Care', 'Pediatric Surgery', 'Child Development', 'Vaccination Programs'],
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Oncology',
    slug: 'oncology',
    description: 'Comprehensive cancer care with state-of-the-art treatment options including chemotherapy, radiation therapy, and surgical oncology. We provide personalized treatment plans.',
    icon: Shield,
    features: ['Cancer Surgery', 'Chemotherapy', 'Radiation Therapy', 'Palliative Care'],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Internal Medicine',
    slug: 'internal-medicine',
    description: 'General internal medicine covering prevention, diagnosis, and treatment of adult diseases. Our internists coordinate care for complex medical conditions.',
    icon: Stethoscope,
    features: ['Preventive Care', 'Chronic Disease Management', 'Health Screenings', 'Wellness Programs'],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1470&auto=format&fit=crop'
  }
];

const CenterOfExcellence = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-health-blue/5 to-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 top-20 w-72 h-72 bg-health-blue/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -left-40 -bottom-10 w-80 h-80 bg-health-orange/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Centers of <span className="text-health-blue">Excellence</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                World-class medical care across specialized departments, featuring cutting-edge technology, 
                renowned specialists, and comprehensive treatment programs for every healthcare need.
              </p>
            </div>
          </div>
        </section>

        {/* Centers Grid */}
        <section className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {centers.map((center, index) => (
                <Link key={center.id} to={`/specialty/${center.slug}`}>
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg animate-fade-in opacity-0 cursor-pointer"
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={center.image} 
                        alt={center.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <center.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-health-blue transition-colors">
                        {center.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {center.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Services:</h4>
                        <ul className="space-y-1">
                          {center.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-health-blue rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-2">
                        <AnimatedButton variant="primary" size="sm" className="flex-1">
                          Know More
                        </AnimatedButton>
                        <AnimatedButton 
                          variant="secondary" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = '/book-appointment';
                          }}
                        >
                          Book Now
                        </AnimatedButton>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-health-blue to-health-blue-light">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Specialized Care?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert teams are ready to provide you with the highest quality care. 
              Book an appointment with our specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <AnimatedButton variant="secondary" size="lg">
                  Book Appointment
                </AnimatedButton>
              </Link>
              <AnimatedButton variant="cta" size="lg">
                Emergency Care
              </AnimatedButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CenterOfExcellence;
