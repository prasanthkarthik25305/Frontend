import { useState } from 'react';
import { CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';



export default function CareerWizard() {
  const [formData, setFormData] = useState({
    year: '',
    interests: [],
    goal: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newInterests = checked
      ? [...formData.interests, value]
      : formData.interests.filter((item) => item !== value);
    setFormData({ ...formData, interests: newInterests });
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form Data:', formData);

  const baseSuggestions = {
    'Web Development': [
      'Frontend Roadmap from roadmap.sh',
      'Build a Portfolio Website',
      'Follow freeCodeCamp React Course',
    ],
    'AI/ML': [
      'Learn Python & NumPy',
      'Stanford Machine Learning Course',
      'Explore FastAI and Kaggle',
    ],
    'Cybersecurity': [
      'Learn Linux and Networking Basics',
      'Try Hack The Box challenges',
      'OWASP Top 10 and Bug Bounty resources',
    ],
    'Open Source': [
      'Explore First Contributions repo on GitHub',
      'Contribute to beginner-friendly issues',
    ],
    'App Development': [
      'Learn React Native or Flutter',
      'Clone apps like Spotify or Instagram',
    ],
    'Cloud/DevOps': [
      'AWS Cloud Practitioner Guide',
      'Build CI/CD pipeline on GitHub',
    ]
  };

  const selectedInterests = formData.interests;
  const compiled = selectedInterests.flatMap((interest) => baseSuggestions[interest] || []);
  
  setRecommendations(compiled);
};


  const interestOptions = [
    'Web Development',
    'AI/ML',
    'Cybersecurity',
    'Open Source',
    'App Development',
    'Cloud/DevOps',
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-12">
      <div className="flex items-center mb-6">
        <CheckCircle className="text-indigo-600 w-8 h-8 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Discover Your Career Path</h2>
      </div>

      {/* Progress Bar (Placeholder for multi-step) */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '33%' }} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Year Selection */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Current Year
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            required
          >
            <option value="" disabled>Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">Final Year</option>
          </select>
          {formData.year && (
          <p className="mt-2 text-sm text-indigo-600 font-medium">
            Selected Year: {formData.year === '1' ? '1st Year'
              : formData.year === '2' ? '2nd Year'
              : formData.year === '3' ? '3rd Year'
              : 'Final Year'}
          </p>
        )}

        </div>
        
        {/* Interests Grid */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Interests
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interestOptions.map((item) => (
              <label
                key={item}
                className={`flex items-center p-3 border rounded-lg cursor-pointer
                  ${formData.interests.includes(item)
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={formData.interests.includes(item)}
                  onChange={handleCheckboxChange}
                  className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-800 font-medium">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Career Goal */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Primary Goal
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            required
          >
            <option value="" disabled>Select goal</option>
            <option value="job">Job Placement</option>
            <option value="internship">Internship</option>
            <option value="startup">Startup Building</option>
            <option value="research">Research / Higher Studies</option>
          </select>
          {formData.goal && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            Goal Selected: {
              formData.goal === 'job' ? 'Job Placement'
              : formData.goal === 'internship' ? 'Internship'
              : formData.goal === 'startup' ? 'Startup Building'
              : 'Research / Higher Studies'
            }
          </p>
        )}

        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Show Career Paths
            <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
          </button>
        </div>
      </form>
      
      {recommendations.length > 0 && (
  <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">
      🎯 Recommended Pathways & Resources
    </h3>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      {recommendations.map((rec, index) => (
        <li key={index} className="hover:underline cursor-pointer">{rec}</li>
      ))}
    </ul>
  </div>
)}

      {/* Placeholder for Results Panel */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner hidden lg:block">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recommended Pathways
        </h3>
        <p className="text-gray-600">Select your options above and click "Show Career Paths" to see personalized recommendations here.</p>
      </div>
    </div>
  );
}
