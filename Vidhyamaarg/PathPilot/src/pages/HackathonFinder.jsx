import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * HackathonFinder component
 * Displays and filters upcoming hackathons from various platforms
 */
function HackathonFinder() {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    time: 'all',
  });
  
  // Sample hackathon data - would be fetched from real APIs in production
  const mockHackathonData = [
    {
      id: 1,
      title: "Code for Change Hackathon",
      organizer: "Unstop",
      startDate: "2025-08-15",
      endDate: "2025-08-17",
      location: "Online",
      type: "Team",
      prizes: "$5,000",
      description: "Build solutions to address climate change challenges using technology.",
      registrationUrl: "https://example.com/hackathon/1",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Climate Tech", "AI", "Sustainability"]
    },
    {
      id: 2,
      title: "HealthTech Innovation Challenge",
      organizer: "Google",
      startDate: "2025-09-10",
      endDate: "2025-09-12",
      location: "Hybrid",
      type: "Individual",
      prizes: "$10,000",
      description: "Developing innovative solutions to improve healthcare accessibility worldwide.",
      registrationUrl: "https://example.com/hackathon/2",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Healthcare", "Machine Learning", "IoT"]
    },
    {
      id: 3,
      title: "Fintech Revolution",
      organizer: "Devpost",
      startDate: "2025-08-01",
      endDate: "2025-08-02",
      location: "In-Person",
      type: "Team",
      prizes: "$7,500",
      description: "Create innovative financial technology solutions to empower underserved communities.",
      registrationUrl: "https://example.com/hackathon/3",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Fintech", "Blockchain", "Financial Inclusion"]
    },
    {
      id: 4,
      title: "AI for Education Summit",
      organizer: "Microsoft",
      startDate: "2025-10-05",
      endDate: "2025-10-07",
      location: "Online",
      type: "Team",
      prizes: "$12,000",
      description: "Leveraging AI to revolutionize education and make learning more accessible.",
      registrationUrl: "https://example.com/hackathon/4",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["EdTech", "AI", "Machine Learning"]
    },
    {
      id: 5,
      title: "Blockchain Builders Hackathon",
      organizer: "Unstop",
      startDate: "2025-08-25",
      endDate: "2025-08-27",
      location: "In-Person",
      type: "Individual",
      prizes: "$15,000",
      description: "Building the next generation of decentralized applications.",
      registrationUrl: "https://example.com/hackathon/5",
      imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Blockchain", "Web3", "DeFi"]
    },
    {
      id: 6,
      title: "Smart City Challenge",
      organizer: "Google",
      startDate: "2025-09-20",
      endDate: "2025-09-22",
      location: "Hybrid",
      type: "Team",
      prizes: "$8,000",
      description: "Developing innovative solutions for smart and sustainable cities.",
      registrationUrl: "https://example.com/hackathon/6",
      imageUrl: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Smart City", "IoT", "Sustainability"]
    }
  ];

  // Fetch hackathon data on component mount
  useEffect(() => {
    fetchHackathons();
  }, []);
  
  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [filters, hackathons]);
  
  /**
   * Fetch hackathon data from API or use mock data
   */
  const fetchHackathons = async () => {
    setIsLoading(true);
    try {
      // In production, this would be an actual API call:
      // const response = await fetch('https://api.example.com/hackathons');
      // const data = await response.json();
      
      // Using mock data for demonstration
      setTimeout(() => {
        setHackathons(mockHackathonData);
        setFilteredHackathons(mockHackathonData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      setError('Failed to load hackathons. Please try again later.');
      setIsLoading(false);
      toast.error('Error loading hackathon data');
    }
  };
  
  /**
   * Handle filter changes
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  /**
   * Apply selected filters to hackathon data
   */
  const applyFilters = () => {
    let filtered = [...hackathons];
    
    // Filter by location
    if (filters.location !== 'all') {
      filtered = filtered.filter(hackathon => hackathon.location === filters.location);
    }
    
    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(hackathon => hackathon.type === filters.type);
    }
    
    // Filter by time
    if (filters.time !== 'all') {
      const currentDate = new Date();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(currentDate.getMonth() + 1);
      
      if (filters.time === 'upcoming') {
        filtered = filtered.filter(hackathon => {
          const startDate = new Date(hackathon.startDate);
          return startDate > currentDate && startDate <= oneMonthLater;
        });
      } else if (filters.time === 'future') {
        filtered = filtered.filter(hackathon => {
          const startDate = new Date(hackathon.startDate);
          return startDate > oneMonthLater;
        });
      }
    }
    
    setFilteredHackathons(filtered);
  };

  /**
   * Format date to readable string
   */
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const options = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
  };
  
  /**
   * Save hackathon to favorites
   */
  const saveHackathon = (hackathonId) => {
    // In production, save to user's profile in database
    const savedHackathons = JSON.parse(localStorage.getItem('savedHackathons') || '[]');
    if (!savedHackathons.includes(hackathonId)) {
      savedHackathons.push(hackathonId);
      localStorage.setItem('savedHackathons', JSON.stringify(savedHackathons));
      toast.success('Hackathon saved to your favorites!');
    } else {
      toast.info('Hackathon is already in your favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Hackathon Finder
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover upcoming hackathons from platforms like Unstop, Devpost, MLH, and more. 
            Filter by location, type, and date to find the perfect hackathon for your skills.
          </p>
        </div>
        
        {/* Filter section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Hackathons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            
            {/* Type filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Participation Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Team">Team</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            
            {/* Time filter */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                When
              </label>
              <select
                id="time"
                value={filters.time}
                onChange={(e) => handleFilterChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time Periods</option>
                <option value="upcoming">Next Month</option>
                <option value="future">Future Events</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Loading and error states */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-700 text-center">
            {error}
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredHackathons.length} {filteredHackathons.length === 1 ? 'hackathon' : 'hackathons'}
              </p>
            </div>
            
            {/* Hackathon cards */}
            {filteredHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHackathons.map(hackathon => (
                  <div key={hackathon.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Card image */}
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={hackathon.imageUrl} 
                        alt={hackathon.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {hackathon.type}
                      </div>
                    </div>
                    
                    {/* Card content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {hackathon.title}
                        </h3>
                        <button 
                          onClick={() => saveHackathon(hackathon.id)}
                          className="text-gray-400 hover:text-blue-600"
                          title="Save to favorites"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3">
                        <span className="font-medium">Organized by:</span> {hackathon.organizer}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDateRange(hackathon.startDate, hackathon.endDate)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {hackathon.location}
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {hackathon.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {hackathon.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          <span>Prize Pool:</span> <span className="text-green-600">{hackathon.prizes}</span>
                        </div>
                        
                        <a
                          href={hackathon.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
                        >
                          Register
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or check back later for new hackathons.
                </p>
                <button
                  onClick={() => setFilters({ location: 'all', type: 'all', time: 'all' })}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HackathonFinder;