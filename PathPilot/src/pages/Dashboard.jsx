import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Award, 
  CheckCircle, 
  Bell, 
  BarChart3,
  FileText,
  ExternalLink,
  MapPin
} from 'lucide-react';

/**
 * Dashboard page component
 * Central hub that integrates saved recommendations, learning progress,
 * upcoming events, and resources
 */
function Dashboard() {
  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    lastLogin: 'Yesterday at 2:30 PM',
    learningStreak: 5,
    progress: 65,
    interests: ['Web Development', 'Data Science', 'UI/UX Design']
  };

  // Mock career recommendations based on user interests
  const recommendations = [
    {
      id: 1,
      title: 'Frontend Developer',
      match: '92%',
      description: 'Create user interfaces and experiences for web applications',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX']
    },
    {
      id: 2,
      title: 'Data Analyst',
      match: '85%',
      description: 'Analyze data to extract insights and support decision-making',
      skills: ['SQL', 'Python', 'Data Visualization', 'Statistics']
    },
    {
      id: 3,
      title: 'UX Researcher',
      match: '78%',
      description: 'Study user behavior to improve product design and usability',
      skills: ['User Testing', 'Design Thinking', 'Interview Skills', 'Analytics']
    }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      type: 'study',
      date: 'Today',
      time: '4:00 PM',
      isCompleted: false
    },
    {
      id: 2,
      title: 'React Project Deadline',
      type: 'deadline',
      date: 'Tomorrow',
      time: '11:59 PM',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Tech Career Fair',
      type: 'event',
      date: 'July 25, 2024',
      time: '10:00 AM',
      isCompleted: false
    }
  ];

  // Mock learning resources
  const learningResources = [
    {
      id: 1,
      title: 'React Crash Course',
      type: 'video',
      source: 'YouTube',
      duration: '1h 30m'
    },
    {
      id: 2,
      title: 'Introduction to Data Science',
      type: 'course',
      source: 'Coursera',
      duration: '4 weeks'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      type: 'article',
      source: 'Medium',
      duration: '15 min'
    }
  ];

  // Mock job opportunities
  const jobOpportunities = [
    {
      id: 1,
      title: 'Junior Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      company: 'DataInsights Inc.',
      location: 'New York, NY',
      postedDate: '1 week ago'
    }
  ];

  // Toggle event completion
  const [completedEvents, setCompletedEvents] = useState([]);
  
  const toggleEventCompletion = (eventId) => {
    if (completedEvents.includes(eventId)) {
      setCompletedEvents(completedEvents.filter(id => id !== eventId));
    } else {
      setCompletedEvents([...completedEvents, eventId]);
    }
  };

  // Get event type style
  const getEventTypeStyle = (type) => {
    switch (type) {
      case 'study':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
        <p className="text-gray-600">
          Last login: {userData.lastLogin} | Current streak: {userData.learningStreak} days
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Career Journey</h2>
              <Link to="/career-wizard" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                Take assessment again
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Progress chart */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-32 w-32">
                  {/* This would be a real progress chart in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{userData.progress}%</span>
                  </div>
                  <svg className="h-32 w-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E6E6E6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${userData.progress}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-600">Path Completion</p>
              </div>
              
              {/* Interests and recommended actions */}
              <div className="flex-grow">
                <h3 className="font-medium text-gray-700 mb-2">Your Interests</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-medium text-gray-700 mb-2">Recommended Next Steps</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Complete your "JavaScript Fundamentals" learning task</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Update your skills profile with recent projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Explore job opportunities in Web Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Career Matches */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Top Career Matches</h2>
            
            <div className="space-y-4">
              {recommendations.map(career => (
                <div key={career.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{career.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                      {career.match} Match
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{career.description}</p>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Link
                to="/career-wizard"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                View all career paths <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Link 
                to="/calendar"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <button
                    onClick={() => toggleEventCompletion(event.id)}
                    className="mr-3 flex-shrink-0"
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                      ${completedEvents.includes(event.id) 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300'
                      }`}
                    >
                      {completedEvents.includes(event.id) && (
                        <CheckCircle size={14} />
                      )}
                    </div>
                  </button>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className={`font-medium ${completedEvents.includes(event.id) ? 'line-through text-gray-400' : ''}`}>
                        {event.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${getEventTypeStyle(event.type)}`}>
                        {event.type === 'study' ? 'Study' : 
                         event.type === 'deadline' ? 'Deadline' : 'Event'}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <CalendarIcon size={12} className="mr-1" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              to="/calendar"
              className="block mt-4 text-center py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm transition-colors"
            >
              Add New Event
            </Link>
          </div>
          
          {/* Learning Resources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recommended Resources</h2>
              <Link 
                to="/resources"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {learningResources.map(resource => (
                <Link key={resource.id} to="/resources" className="block p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {resource.type === 'video' ? (
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <BookOpen size={16} className="text-red-500" />
                        </div>
                      ) : resource.type === 'course' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Award size={16} className="text-green-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText size={16} className="text-blue-500" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm">{resource.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{resource.source}</span>
                        <span className="mx-1">•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Job Opportunities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Opportunities</h2>
              <Link 
                to="/discover"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {jobOpportunities.map(job => (
                <Link key={job.id} to="/discover" className="block p-3 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium text-sm">{job.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{job.company}</span>
                    <span className="mx-1">•</span>
                    <MapPin size={12} className="mr-0.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Posted {job.postedDate}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;