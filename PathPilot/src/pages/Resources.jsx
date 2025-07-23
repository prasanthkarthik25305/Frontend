import { useState, useEffect } from 'react';

/**
 * Resources page component
 * Displays curated YouTube tutorials, GitHub repositories, and other learning resources
 * based on different tech categories
 */
function Resources() {
  const [activeTab, setActiveTab] = useState('tutorials');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categories for filtering resources
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'webdev', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'machinelearning', name: 'Machine Learning' },
    { id: 'career', name: 'Career Development' }
  ];
  
  // Mock YouTube tutorials data
  // In a real application, this would come from an API call
  const youtubeTutorials = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      creator: 'Tech Academy',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '10:45:30',
      views: '1.2M',
      category: 'webdev',
      description: 'Learn HTML, CSS, JavaScript, React and Node.js in this comprehensive web development course.'
    },
    {
      id: 2,
      title: 'Machine Learning for Beginners',
      creator: 'AI Explained',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '8:20:15',
      views: '950K',
      category: 'machinelearning',
      description: 'Start your journey in machine learning with Python, scikit-learn, and TensorFlow.'
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      creator: 'Data Pro',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '6:15:45',
      views: '780K',
      category: 'datascience',
      description: 'Master data analysis, visualization, and interpretation using Python and Pandas.'
    },
    {
      id: 4,
      title: 'Flutter Mobile App Development',
      creator: 'App Dev Master',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '7:30:20',
      views: '650K',
      category: 'mobile',
      description: 'Create beautiful cross-platform mobile applications using Flutter and Dart.'
    },
    {
      id: 5,
      title: 'How to Prepare for Technical Interviews',
      creator: 'Career Coach',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '2:45:10',
      views: '1.5M',
      category: 'career',
      description: 'Strategies and tips to excel in technical interviews at top tech companies.'
    }
  ];
  
  // Mock GitHub repositories data
  const githubRepos = [
    {
      id: 1,
      name: 'awesome-react',
      owner: 'enaqx',
      stars: '47.5K',
      forks: '5.8K',
      description: 'A collection of awesome things regarding the React ecosystem',
      url: 'https://github.com/enaqx/awesome-react',
      category: 'webdev'
    },
    {
      id: 2,
      name: 'tensorflow',
      owner: 'tensorflow',
      stars: '172K',
      forks: '87.3K',
      description: 'An open-source machine learning framework for everyone',
      url: 'https://github.com/tensorflow/tensorflow',
      category: 'machinelearning'
    },
    {
      id: 3,
      name: 'data-science-ipython-notebooks',
      owner: 'donnemartin',
      stars: '24.2K',
      forks: '7.9K',
      description: 'Data science Python notebooks: Deep learning, scikit-learn, Kaggle competitions, and more',
      url: 'https://github.com/donnemartin/data-science-ipython-notebooks',
      category: 'datascience'
    },
    {
      id: 4,
      name: 'flutter',
      owner: 'flutter',
      stars: '152K',
      forks: '26.1K',
      description: 'Flutter makes it easy to build beautiful apps for mobile and beyond',
      url: 'https://github.com/flutter/flutter',
      category: 'mobile'
    },
    {
      id: 5,
      name: 'coding-interview-university',
      owner: 'jwasham',
      stars: '253K',
      forks: '65.8K',
      description: 'A complete computer science study plan to become a software engineer',
      url: 'https://github.com/jwasham/coding-interview-university',
      category: 'career'
    }
  ];
  
  // Mock online courses data
  const onlineCourses = [
    {
      id: 1,
      title: 'The Complete 2023 Web Development Bootcamp',
      platform: 'Udemy',
      instructor: 'Dr. Angela Yu',
      rating: 4.7,
      students: '250K+',
      price: '$19.99',
      category: 'webdev',
      description: 'Become a full-stack web developer with just one course.'
    },
    {
      id: 2,
      title: 'Machine Learning A-Z™: AI, Python & R',
      platform: 'Udemy',
      instructor: 'Kirill Eremenko',
      rating: 4.5,
      students: '150K+',
      price: '$19.99',
      category: 'machinelearning',
      description: 'Learn to create Machine Learning Algorithms in Python and R.'
    },
    {
      id: 3,
      title: 'Python for Data Science and Machine Learning Bootcamp',
      platform: 'Udemy',
      instructor: 'Jose Portilla',
      rating: 4.6,
      students: '130K+',
      price: '$19.99',
      category: 'datascience',
      description: 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, and more!'
    },
    {
      id: 4,
      title: 'Flutter & Dart - The Complete Guide',
      platform: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.6,
      students: '100K+',
      price: '$19.99',
      category: 'mobile',
      description: 'A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps'
    },
    {
      id: 5,
      title: 'Master the Coding Interview: Data Structures + Algorithms',
      platform: 'Udemy',
      instructor: 'Andrei Neagoie',
      rating: 4.8,
      students: '120K+',
      price: '$19.99',
      category: 'career',
      description: 'Master the coding interview by learning data structures and algorithms.'
    }
  ];

  // Filter resources based on selected category
  const filteredTutorials = selectedCategory === 'all' 
    ? youtubeTutorials 
    : youtubeTutorials.filter(tutorial => tutorial.category === selectedCategory);
    
  const filteredRepos = selectedCategory === 'all'
    ? githubRepos
    : githubRepos.filter(repo => repo.category === selectedCategory);
    
  const filteredCourses = selectedCategory === 'all'
    ? onlineCourses
    : onlineCourses.filter(course => course.category === selectedCategory);
  
  // Determine which resources to display based on active tab
  const getDisplayedResources = () => {
    switch (activeTab) {
      case 'tutorials':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map(tutorial => (
              <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-gray-200 relative">
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">{tutorial.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{tutorial.creator}</p>
                  <p className="text-gray-500 text-sm mb-3">{tutorial.views} views</p>
                  <p className="text-gray-700">{tutorial.description}</p>
                  <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                    Watch on YouTube
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'github':
        return (
          <div className="space-y-4">
            {filteredRepos.map(repo => (
              <div key={repo.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-blue-700">{repo.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">by {repo.owner}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div>⭐ {repo.stars} stars</div>
                    <div>🍴 {repo.forks} forks</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{repo.description}</p>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
                >
                  View Repository →
                </a>
              </div>
            ))}
          </div>
        );
      case 'courses':
        return (
          <div className="space-y-4">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded mb-2">
                      {course.platform}
                    </span>
                    <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm">Instructor: {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-700">{course.price}</div>
                    <div className="text-sm text-yellow-600">★ {course.rating} ({course.students} students)</div>
                  </div>
                </div>
                <p className="text-gray-700 my-4">{course.description}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
      <p className="text-gray-600 mb-8">Find the best tutorials, GitHub repositories, and courses to advance your career</p>
      
      {/* Category filter */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Filter by Category:</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Resource type tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'tutorials'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            YouTube Tutorials
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'github'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            GitHub Repositories
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Online Courses
          </button>
        </div>
      </div>
      
      {/* Resource list */}
      <div>
        {getDisplayedResources()}
      </div>
    </div>
  );
}

export default Resources;