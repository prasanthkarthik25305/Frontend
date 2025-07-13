
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/AnimatedButton';
import { Heart, Brain, Bone, Baby, Shield, Stethoscope, Activity, Users, Calendar } from 'lucide-react';

const specialtyData = {
  cardiology: {
    title: 'Cardiology',
    icon: Heart,
    description: 'Our Cardiology department provides comprehensive cardiac care with state-of-the-art technology and expert cardiologists. We specialize in diagnosing and treating heart conditions, from routine check-ups to complex cardiac surgeries.',
    services: [
      'Cardiac Catheterization',
      'Angioplasty and Stenting',
      'Heart Surgery',
      'Pacemaker Implantation',
      'Heart Rhythm Disorders',
      'Preventive Cardiology'
    ],
    doctors: [
      { name: 'Dr. Sarah Johnson', experience: '15+ years' },
      { name: 'Dr. Michael Heart', experience: '20+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1631&auto=format&fit=crop'
  },
  neurology: {
    title: 'Neurology',
    icon: Brain,
    description: 'Our Neurology department offers comprehensive care for disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. We use advanced diagnostic tools and treatment methods.',
    services: [
      'Stroke Treatment',
      'Epilepsy Management',
      'Brain Tumor Treatment',
      'Movement Disorders',
      'Memory Disorders',
      'Neurosurgical Procedures'
    ],
    doctors: [
      { name: 'Dr. Michael Chen', experience: '12+ years' },
      { name: 'Dr. Lisa Brain', experience: '18+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1631&auto=format&fit=crop'
  },
  orthopedics: {
    title: 'Orthopedics',
    icon: Bone,
    description: 'Our Orthopedic department specializes in the treatment of musculoskeletal conditions, including bones, joints, ligaments, tendons, and muscles. We offer both surgical and non-surgical treatments.',
    services: [
      'Joint Replacement Surgery',
      'Sports Medicine',
      'Spine Surgery',
      'Fracture Treatment',
      'Arthritis Management',
      'Physical Therapy'
    ],
    doctors: [
      { name: 'Dr. Robert Wilson', experience: '18+ years' },
      { name: 'Dr. Amy Bone', experience: '14+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1470&auto=format&fit=crop'
  },
  pediatrics: {
    title: 'Pediatrics',
    icon: Baby,
    description: 'Our Pediatrics department provides comprehensive healthcare for infants, children, and adolescents. We focus on preventive care, early detection, and treatment of childhood illnesses.',
    services: [
      'Well-Child Visits',
      'Immunizations',
      'Growth and Development',
      'Pediatric Surgery',
      'Adolescent Medicine',
      'Emergency Pediatric Care'
    ],
    doctors: [
      { name: 'Dr. Emily Rodriguez', experience: '10+ years' },
      { name: 'Dr. David Child', experience: '16+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1470&auto=format&fit=crop'
  },
  gynecology: {
    title: 'Gynecology',
    icon: Users,
    description: 'Our Gynecology department provides comprehensive women\'s healthcare services, from routine check-ups to complex surgical procedures. We focus on women\'s reproductive health and wellness.',
    services: [
      'Routine Gynecological Exams',
      'Prenatal Care',
      'Family Planning',
      'Minimally Invasive Surgery',
      'Menopause Management',
      'Reproductive Health'
    ],
    doctors: [
      { name: 'Dr. Maria Santos', experience: '14+ years' },
      { name: 'Dr. Jennifer Women', experience: '12+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop'
  },
  'surgical-services': {
    title: 'Surgical Services',
    icon: Activity,
    description: 'Our Surgical Services department offers comprehensive surgical care using the latest minimally invasive techniques and advanced technology for optimal patient outcomes.',
    services: [
      'Minimally Invasive Surgery',
      'Robotic Surgery',
      'General Surgery',
      'Emergency Surgery',
      'Day Surgery',
      'Post-operative Care'
    ],
    doctors: [
      { name: 'Dr. James Surgery', experience: '20+ years' },
      { name: 'Dr. Rachel Scalpel', experience: '15+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1470&auto=format&fit=crop'
  },
  gastroenterology: {
    title: 'Gastroenterology',
    icon: Stethoscope,
    description: 'Our Gastroenterology department specializes in digestive system disorders, providing comprehensive care for conditions affecting the stomach, intestines, liver, and related organs.',
    services: [
      'Endoscopic Procedures',
      'Colonoscopy Screening',
      'Liver Disease Treatment',
      'IBD Management',
      'GERD Treatment',
      'Digestive Health'
    ],
    doctors: [
      { name: 'Dr. Alex Gastro', experience: '16+ years' },
      { name: 'Dr. Patricia Digest', experience: '13+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1470&auto=format&fit=crop'
  },
  pulmonology: {
    title: 'Pulmonology',
    icon: Activity,
    description: 'Our Pulmonology department focuses on respiratory system health, treating conditions affecting the lungs and breathing. We provide comprehensive pulmonary care and respiratory therapy.',
    services: [
      'Lung Function Testing',
      'Asthma Management',
      'COPD Treatment',
      'Sleep Studies',
      'Bronchoscopy',
      'Respiratory Therapy'
    ],
    doctors: [
      { name: 'Dr. Mark Lungs', experience: '17+ years' },
      { name: 'Dr. Susan Breath', experience: '11+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1631&auto=format&fit=crop'
  },
  urology: {
    title: 'Urology',
    icon: Calendar,
    description: 'Our Urology department provides comprehensive care for urinary tract and male reproductive system disorders, using advanced diagnostic and treatment techniques.',
    services: [
      'Kidney Stone Treatment',
      'Prostate Care',
      'Bladder Disorders',
      'Urinary Incontinence',
      'Male Fertility',
      'Minimally Invasive Procedures'
    ],
    doctors: [
      { name: 'Dr. Kevin Kidney', experience: '19+ years' },
      { name: 'Dr. Laura Urethra', experience: '14+ years' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop'
  }
};

const SpecialtyDetail = () => {
  const { specialty } = useParams<{ specialty: string }>();
  const data = specialty ? specialtyData[specialty as keyof typeof specialtyData] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Specialty Not Found</h1>
            <Link to="/centers-of-excellence">
              <AnimatedButton variant="primary">Back to Centers of Excellence</AnimatedButton>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-health-blue/5 to-white relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-health-blue/10 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-8 h-8 text-health-blue" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{data.title}</h1>
                </div>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{data.description}</p>
                <div className="flex gap-4">
                  <Link to="/book-appointment">
                    <AnimatedButton variant="primary" size="lg">
                      Book Appointment
                    </AnimatedButton>
                  </Link>
                  <AnimatedButton variant="secondary" size="lg">
                    Contact Department
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={data.image} 
                  alt={data.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.services.map((service, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-health-blue/5 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-health-blue rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium">{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Specialists</h2>
                <div className="space-y-4">
                  {data.doctors.map((doctor, index) => (
                    <div 
                      key={index}
                      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{doctor.name}</h3>
                      <p className="text-health-blue font-medium mb-3">{data.title} Specialist</p>
                      <p className="text-gray-600 text-sm mb-4">Experience: {doctor.experience}</p>
                      <div className="flex gap-2">
                        <AnimatedButton variant="primary" size="sm" className="flex-1">
                          View Profile
                        </AnimatedButton>
                        <Link to="/book-appointment" className="flex-1">
                          <AnimatedButton variant="secondary" size="sm" className="w-full">
                            Book Appointment
                          </AnimatedButton>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialtyDetail;
