import { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, MapPin, Building, ExternalLink } from 'lucide-react';

/**
 * Discover page component
 * Helps users find hackathons, internships, and job opportunities
 * that match their interests and skills
 */
function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Opportunities' },
    { id: 'hackathon', name: 'Hackathons' },
    { id: 'internship', name: 'Internships' },
    { id: 'job', name: 'Entry-Level Jobs' },
    { id: 'scholarship', name: 'Scholarships' },
    { id: 'program', name: 'Programs' }
  ];
  
  // Locations for filtering
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'remote', name: 'Remote' },
    { id: 'usa', name: 'United States' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'other', name: 'Other Regions' }
  ];

  // Mock opportunities data
  // In a real application, this would come from an API call
  const opportunitiesData = [
    {
      id: 1,
      title: 'Summer Tech Internship',
      company: 'TechGiant Inc.',
      location: 'San Francisco, CA',
      locationType: 'usa',
      date: 'May 15 - Aug 15, 2024',
      category: 'internship',
      tags: ['Software Development', 'Web Dev', 'Mobile'],
      description: 'Join our engineering team for a summer internship working on cutting-edge web and mobile applications.',
      applicationDeadline: 'March 30, 2024',
      logoUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      title: 'Global Hack Challenge',
      company: 'DevFolio',
      location: 'Remote',
      locationType: 'remote',
      date: 'April 10-12, 2024',
      category: 'hackathon',
      tags: ['AI', 'Open Source', 'Data Science'],
      description: 'Build innovative solutions to real-world problems in this 48-hour virtual hackathon.',
      applicationDeadline: 'April 5, 2024',
      logoUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      title: 'Junior Frontend Developer',
      company: 'StartApp',
      location: 'Berlin, Germany',
      locationType: 'europe',
      date: 'Starting ASAP',
      category: 'job',
      tags: ['React', 'JavaScript', 'CSS'],
      description: 'Looking for a motivated junior frontend developer to join our growing team in Berlin.',
      applicationDeadline: 'Open until filled',
      logoUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 4,
      title: 'Women in Tech Scholarship',
      company: 'TechEducate Foundation',
      location: 'Online',
      locationType: 'remote',
      date: 'Fall Semester 2024',
      category: 'scholarship',
      tags: ['Women in Tech', 'Computer Science', 'Education'],
      description: 'Full-tuition scholarship for women pursuing degrees in computer science or related fields.',
      applicationDeadline: 'May 15, 2024',
      logoUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 5,
      title: 'Data Science Bootcamp',
      company: 'AnalyticsAcademy',
      location: 'Singapore',
      locationType: 'asia',
      date: 'July 1 - Sept 30, 2024',
      category: 'program',
      tags: ['Python', 'Machine Learning', 'Data Analysis'],
      description: 'Intensive 3-month program to build practical data science skills with real-world projects.',
      applicationDeadline: 'June 1, 2024',
      logoUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 6,
      title: 'Open Source Mentorship',
      company: 'GitHub Education',
      location: 'Remote',
      locationType: 'remote',
      date: 'Flexible Schedule',
      category: 'program',
      tags: ['Open Source', 'Mentorship', 'Collaboration'],
      description: 'Get paired with experienced open source contributors to guide your journey into open source development.',
      applicationDeadline: 'Rolling admissions',
      logoUrl: 'https://via.placeholder.com/50'
    }
  ];
  
  // Filter opportunities based on search query and selected filters
  const filteredOpportunities = opportunitiesData.filter(opportunity => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = filterCategory === 'all' || opportunity.category === filterCategory;
    
    // Filter by location
    const matchesLocation = filterLocation === 'all' || opportunity.locationType === filterLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  // Get background color for opportunity cards based on category
  const getCategoryColor = (category) => {
    const colors = {
      internship: 'bg-green-50 border-green-200',
      hackathon: 'bg-purple-50 border-purple-200',
      job: 'bg-blue-50 border-blue-200',
      scholarship: 'bg-yellow-50 border-yellow-200',
      program: 'bg-orange-50 border-orange-200'
    };
    
    return colors[category] || 'bg-gray-50 border-gray-200';
  };
  
  // Get tag color based on tag content
  const getTagColor = (tag) => {
    if (tag.toLowerCase().includes('python') || tag.toLowerCase().includes('data')) {
      return 'bg-blue-100 text-blue-800';
    } else if (tag.toLowerCase().includes('javascript') || tag.toLowerCase().includes('react')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (tag.toLowerCase().includes('ai') || tag.toLowerCase().includes('machine')) {
      return 'bg-purple-100 text-purple-800';
    } else if (tag.toLowerCase().includes('women') || tag.toLowerCase().includes('diversity')) {
      return 'bg-pink-100 text-pink-800';
    } else if (tag.toLowerCase().includes('open') || tag.toLowerCase().includes('mentor')) {
      return 'bg-green-100 text-green-800';
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Discover Opportunities</h1>
      <p className="text-gray-600 mb-8">Find hackathons, internships, scholarships, and entry-level positions to jumpstart your career</p>
      
      {/* Search and filter section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Category filter */}
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          {/* Location filter */}
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found <span className="font-semibold">{filteredOpportunities.length}</span> opportunities matching your criteria
        </p>
      </div>
      
      {/* Opportunities list */}
      <div className="space-y-6">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map(opportunity => (
            <div 
              key={opportunity.id} 
              className={`border rounded-lg p-5 shadow-sm ${getCategoryColor(opportunity.category)}`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo area */}
                <div className="md:w-16 mb-4 md:mb-0 flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border">
                    {/* This would be the company logo */}
                    <span className="text-lg font-bold text-blue-600">
                      {opportunity.company.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Content area */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{opportunity.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Building size={16} className="mr-1" />
                        <span className="text-sm">{opportunity.company}</span>
                        <span className="mx-2">•</span>
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{opportunity.location}</span>
                      </div>
                    </div>
                    
                    {/* Date and deadline */}
                    <div className="md:text-right mb-3 md:mb-0">
                      <div className="flex items-center md:justify-end text-gray-600 mb-1">
                        <CalendarIcon size={16} className="mr-1" />
                        <span className="text-sm">{opportunity.date}</span>
                      </div>
                      <div className="text-sm font-medium text-red-600">
                        {opportunity.applicationDeadline.includes('Open') ? (
                          'Open until filled'
                        ) : (
                          `Apply by: ${opportunity.applicationDeadline}`
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 my-3">{opportunity.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      Learn more <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Filter size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-lg text-gray-500 mb-2">No opportunities found</p>
            <p className="text-gray-400">Try adjusting your search filters</p>
          </div>
        )}
      </div>
      
      {/* Subscribe section */}
      <div className="mt-12 bg-blue-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Never Miss an Opportunity</h3>
            <p>Get personalized recommendations and alerts for new opportunities that match your interests.</p>
          </div>
          <div className="md:w-1/3">
            <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors">
              Subscribe to Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;