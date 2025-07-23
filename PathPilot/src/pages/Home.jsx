import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  Search, 
  Award, 
  LucideChevronRight, 
  Lightbulb,
  Code,
  Database,
  Layers,
  Cpu,
  BarChart2
} from 'lucide-react';

/**
 * Home page component
 * Landing page for new users with feature overview and calls to action
 */
function Home() {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "PathPilot completely transformed my learning journey. I went from being overwhelmed by options to having a clear roadmap to follow.",
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "SC"
    },
    {
      id: 2,
      quote: "The career wizard recommendation was spot on! It helped me discover that UX design was the perfect path for me, and now I've landed my dream job.",
      name: "Michael Rodriguez",
      role: "UX Designer",
      avatar: "MR"
    },
    {
      id: 3,
      quote: "As someone switching careers into tech, PathPilot gave me the structure and resources I needed to make the transition smoothly.",
      name: "Jamie Taylor",
      role: "Data Scientist",
      avatar: "JT"
    }
  ];
  
  // Career paths showcase
  const careerPaths = [
    {
      title: "Frontend Development",
      icon: <Code size={28} />,
      color: "bg-blue-100 text-blue-600",
      description: "Build beautiful user interfaces with modern frameworks",
      skills: ["HTML/CSS", "JavaScript", "React", "UI Design"]
    },
    {
      title: "Backend Development",
      icon: <Database size={28} />,
      color: "bg-purple-100 text-purple-600",
      description: "Create powerful server-side applications and APIs",
      skills: ["Python", "Node.js", "Databases", "System Design"]
    },
    {
      title: "Full Stack Development",
      icon: <Layers size={28} />,
      color: "bg-green-100 text-green-600",
      description: "Master both frontend and backend technologies",
      skills: ["JavaScript", "React", "Node.js", "Databases"]
    },
    {
      title: "Data Science",
      icon: <BarChart2 size={28} />,
      color: "bg-yellow-100 text-yellow-600",
      description: "Turn data into insights and build machine learning models",
      skills: ["Python", "Statistics", "Data Analysis", "Machine Learning"]
    },
    {
      title: "AI Engineering",
      icon: <Cpu size={28} />,
      color: "bg-red-100 text-red-600",
      description: "Build intelligent systems and machine learning applications",
      skills: ["Python", "Machine Learning", "Deep Learning", "MLOps"]
    }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How does PathPilot help me choose a career path?",
      answer: "Our Career Wizard uses a combination of your interests, skills, and goals to recommend personalized career paths. We analyze the current job market and trends to ensure our recommendations are relevant and in-demand."
    },
    {
      question: "Are the learning resources free?",
      answer: "PathPilot aggregates both free and paid resources. We clearly mark which resources require payment, but we strive to include plenty of high-quality free options for every career path and skill level."
    },
    {
      question: "Can PathPilot help experienced professionals?",
      answer: "Absolutely! PathPilot is designed for learners at all stages. For experienced professionals, we offer advanced resources and career pivoting guidance to help you specialize further or transition into new areas."
    },
    {
      question: "How often are resources updated?",
      answer: "Our team regularly reviews and updates resources to ensure they remain relevant and accurate. We add new content weekly and perform complete refreshes of our resource catalog quarterly."
    }
  ];
  
  // State for active FAQ
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Toggle FAQ answer visibility
  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };
  
  // Current testimonial index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Go to next testimonial
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  // Go to previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Navigate Your Career Journey with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Discover your ideal tech career path, access curated learning resources, 
              and build your personalized roadmap to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/career-wizard"
                className="px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-medium text-lg shadow-md transition-colors"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/dashboard"
                className="px-8 py-4 bg-transparent hover:bg-blue-700 border-2 border-white rounded-lg font-medium text-lg transition-colors"
              >
                Explore Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L60,64C120,64,240,64,360,64C480,64,600,64,720,74.7C840,85,960,107,1080,101.3C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How PathPilot Guides Your Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Career Wizard</h3>
              <p className="text-gray-600 mb-4">
                Discover your perfect career path based on your interests, skills, and goals with our personalized recommendation engine.
              </p>
              <Link to="/career-wizard" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Find your path <LucideChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-purple-600">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Resources</h3>
              <p className="text-gray-600 mb-4">
                Access the best learning materials, tutorials, courses, and documentation for your specific career path and skill level.
              </p>
              <Link to="/resources" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
                Explore resources <LucideChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Learning Calendar</h3>
              <p className="text-gray-600 mb-4">
                Plan your learning journey with a structured calendar that helps you track progress and maintain consistent growth.
              </p>
              <Link to="/calendar" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                Plan your journey <LucideChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-yellow-600">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Opportunity Finder</h3>
              <p className="text-gray-600 mb-4">
                Discover hackathons, internships, open source projects, and job opportunities aligned with your career goals.
              </p>
              <Link to="/discover" className="text-yellow-600 hover:text-yellow-800 font-medium inline-flex items-center">
                Find opportunities <LucideChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Career Paths Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore Career Paths</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover popular tech career paths and start your learning journey with guidance from industry experts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${path.color}`}>
                  {path.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 mb-2">Core Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/career-wizard" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Explore this path <LucideChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/career-wizard"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Find Your Ideal Path
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
                <div className="text-blue-600 opacity-10">
                  <Lightbulb size={100} />
                </div>
              </div>
              
              <div className="relative">
                <p className="text-xl md:text-2xl text-gray-700 mb-8">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                
                {/* Navigation controls */}
                <div className="absolute right-0 bottom-0 flex space-x-2">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Testimonial indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Have questions about PathPilot? Find quick answers to common queries below.
          </p>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <span className={`transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of tech professionals who have found their ideal career path with PathPilot's personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/career-wizard"
              className="px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-medium text-lg shadow-md transition-colors"
            >
              Take the Career Quiz
            </Link>
            <Link 
              to="/dashboard"
              className="px-8 py-4 bg-transparent hover:bg-blue-700 border-2 border-white rounded-lg font-medium text-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;