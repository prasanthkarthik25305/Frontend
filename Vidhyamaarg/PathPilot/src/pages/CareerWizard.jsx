import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * CareerWizard component for helping users find tailored career paths
 * Includes form for collecting user data and dynamically generated recommendations
 */
function CareerWizard() {
  // Form state
  const [formData, setFormData] = useState({
    year: '',
    interests: [],
    primaryGoal: '',
  });
  
  // Track if recommendations should be shown
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Available options for the form
  const yearOptions = ['First Year', 'Second Year', 'Third Year', 'Final Year', 'Recent Graduate'];
  
  const interestOptions = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
    'Artificial Intelligence', 'Cybersecurity', 'Game Development', 'Cloud Computing',
    'DevOps', 'UI/UX Design', 'Blockchain', 'IoT', 'Robotics', 'AR/VR'
  ];
  
  const goalOptions = [
    'Find Internship', 'Get Entry-Level Job', 'Pursue Higher Education', 
    'Start Freelancing', 'Launch a Startup', 'Contribute to Open Source'
  ];

  // Mock career path recommendations based on user selection
  const getRecommendations = () => {
    const { year, interests, primaryGoal } = formData;
    let recommendations = [];
    
    // Generate personalized recommendations based on form data
    if (interests.includes('Web Development') || interests.includes('UI/UX Design')) {
      recommendations.push({
        title: 'Frontend Developer Path',
        description: 'Focus on HTML, CSS, JavaScript, and popular frontend frameworks like React.',
        resources: ['Udemy Web Dev Bootcamp', 'Frontend Masters', 'Mozilla Developer Network'],
        timeline: year === 'First Year' ? '24-36 months' : year === 'Recent Graduate' ? '6-12 months' : '12-24 months'
      });
    }
    
    if (interests.includes('Data Science') || interests.includes('Machine Learning')) {
      recommendations.push({
        title: 'Data Scientist Path',
        description: 'Learn statistics, Python, data visualization, and machine learning algorithms.',
        resources: ['Kaggle Competitions', 'DataCamp', 'Stanford ML Course'],
        timeline: year === 'First Year' ? '36-48 months' : '12-24 months'
      });
    }
    
    if (interests.includes('Cybersecurity')) {
      recommendations.push({
        title: 'Security Analyst Path',
        description: 'Focus on network security, ethical hacking, and security certifications.',
        resources: ['CompTIA Security+', 'TryHackMe', 'Cybersecurity Courses on Coursera'],
        timeline: year === 'First Year' ? '24-36 months' : '12-18 months'
      });
    }
    
    // If no specific match is found, provide a general recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Exploration Path',
        description: 'Based on your diverse interests, we recommend exploring multiple fields before specializing.',
        resources: ['Codecademy', 'Coursera', 'edX', 'YouTube tutorials'],
        timeline: '6-12 months of exploration'
      });
    }
    
    // Add a goal-specific recommendation
    if (primaryGoal === 'Find Internship') {
      recommendations.push({
        title: 'Internship Preparation',
        description: 'Focus on building a portfolio, preparing for technical interviews, and networking.',
        resources: ['LeetCode', 'HackerRank', 'Internship portals like Internshala'],
        timeline: '3-6 months'
      });
    } else if (primaryGoal === 'Launch a Startup') {
      recommendations.push({
        title: 'Startup Preparation',
        description: 'Learn about business models, MVP development, and fundraising.',
        resources: ['Y Combinator Startup School', 'Lean Startup book', 'Product Hunt'],
        timeline: '12-24 months'
      });
    }
    
    return recommendations;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes for interests
  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(item => item !== interest)
      : [...formData.interests, interest];
    
    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.year) {
      toast.error('Please select your academic year');
      return;
    }
    
    if (formData.interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }
    
    if (!formData.primaryGoal) {
      toast.error('Please select your primary career goal');
      return;
    }
    
    // Show recommendations if validation passes
    setShowRecommendations(true);
    toast.success('Your career recommendations are ready!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" />
      
      <h1 className="text-3xl font-bold text-center mb-10">Career Path Wizard</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Form Section */}
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6">Tell us about yourself</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Academic Year Selection */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">What's your academic standing?</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Interests Selection */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">What are your interests? (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={interest} className="ml-2 text-sm text-gray-700">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Primary Goal Selection */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">What's your primary career goal?</label>
              <select
                name="primaryGoal"
                value={formData.primaryGoal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your primary goal</option>
                {goalOptions.map((goal) => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Generate My Career Path
            </button>
          </form>
        </div>
        
        {/* Recommendations Section */}
        {showRecommendations && (
          <div className="bg-blue-50 p-8 border-t border-blue-100">
            <h2 className="text-2xl font-bold mb-6">Your Personalized Career Path Recommendations</h2>
            
            <div className="space-y-6">
              {getRecommendations().map((recommendation, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{recommendation.title}</h3>
                  <p className="text-gray-600 mb-4">{recommendation.description}</p>
                  
                  <div className="mb-3">
                    <span className="font-medium text-gray-700">Estimated Timeline:</span> {recommendation.timeline}
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Recommended Resources:</span>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {recommendation.resources.map((resource, i) => (
                        <li key={i} className="text-gray-600">{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowRecommendations(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go Back to Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerWizard;