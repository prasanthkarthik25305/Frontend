import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Calendar, Edit2, Save, Plus, X, Github, Linkedin, Globe
} from 'lucide-react';

/**
 * Profile page component
 * User profile with personal information, skills, experiences, and account settings
 */
function Profile() {
  // Mock user profile data
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer focused on frontend technologies and UX design. Currently learning React and exploring career opportunities in web development.',
    skills: [
      { id: 1, name: 'HTML/CSS', level: 'Advanced' },
      { id: 2, name: 'JavaScript', level: 'Intermediate' },
      { id: 3, name: 'React', level: 'Intermediate' },
      { id: 4, name: 'UI/UX Design', level: 'Beginner' },
      { id: 5, name: 'Python', level: 'Beginner' }
    ],
    education: [
      { 
        id: 1, 
        institution: 'University of California', 
        degree: 'BS in Computer Science',
        year: '2020-2024'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Tech Internship Co.',
        position: 'Frontend Developer Intern',
        duration: 'Summer 2023',
        description: 'Worked on the development of responsive web applications using React and Tailwind CSS.'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Personal Portfolio Website',
        description: 'Designed and developed a personal portfolio showcasing my projects and skills.',
        technologies: ['React', 'Tailwind CSS', 'Netlify']
      }
    ],
    socials: {
      github: 'github.com/alexjohnson',
      linkedin: 'linkedin.com/in/alexjohnson',
      website: 'alexjohnson.dev'
    }
  });
  
  // State for form editing
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(profile.bio);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    year: ''
  });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: ''
  });
  
  // Skill levels for dropdown
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  
  // Handle bio save
  const handleSaveBio = () => {
    setProfile({ ...profile, bio: editedBio });
    setIsEditingBio(false);
  };
  
  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.name.trim() === '') return;
    
    const skill = {
      id: Date.now(),
      name: newSkill.name,
      level: newSkill.level
    };
    
    setProfile({
      ...profile,
      skills: [...profile.skills, skill]
    });
    
    setNewSkill({ name: '', level: 'Beginner' });
    setIsAddingSkill(false);
  };
  
  // Handle removing a skill
  const handleRemoveSkill = (skillId) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill.id !== skillId)
    });
  };
  
  // Handle adding new experience
  const handleAddExperience = () => {
    if (newExperience.company.trim() === '' || newExperience.position.trim() === '') return;
    
    const experience = {
      id: Date.now(),
      ...newExperience
    };
    
    setProfile({
      ...profile,
      experience: [...profile.experience, experience]
    });
    
    setNewExperience({
      company: '',
      position: '',
      duration: '',
      description: ''
    });
    
    setIsAddingExperience(false);
  };
  
  // Handle removing an experience
  const handleRemoveExperience = (experienceId) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter(exp => exp.id !== experienceId)
    });
  };
  
  // Handle adding new education
  const handleAddEducation = () => {
    if (newEducation.institution.trim() === '' || newEducation.degree.trim() === '') return;
    
    const education = {
      id: Date.now(),
      ...newEducation
    };
    
    setProfile({
      ...profile,
      education: [...profile.education, education]
    });
    
    setNewEducation({
      institution: '',
      degree: '',
      year: ''
    });
    
    setIsAddingEducation(false);
  };
  
  // Handle removing education
  const handleRemoveEducation = (educationId) => {
    setProfile({
      ...profile,
      education: profile.education.filter(edu => edu.id !== educationId)
    });
  };
  
  // Handle adding new project
  const handleAddProject = () => {
    if (newProject.title.trim() === '') return;
    
    const project = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(tech => tech.trim())
    };
    
    setProfile({
      ...profile,
      projects: [...profile.projects, project]
    });
    
    setNewProject({
      title: '',
      description: '',
      technologies: ''
    });
    
    setIsAddingProject(false);
  };
  
  // Handle removing a project
  const handleRemoveProject = (projectId) => {
    setProfile({
      ...profile,
      projects: profile.projects.filter(project => project.id !== projectId)
    });
  };
  
  // Get skill level color
  const getSkillLevelColor = (level) => {
    switch(level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      case 'Expert':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User size={40} />
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{profile.location}</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-4">
                <a 
                  href={`https://${profile.socials.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={`https://${profile.socials.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={`https://${profile.socials.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">About Me</h3>
            
            {!isEditingBio ? (
              <button
                onClick={() => {
                  setIsEditingBio(true);
                  setEditedBio(profile.bio);
                }}
                className="text-gray-500 hover:text-blue-600"
                aria-label="Edit bio"
              >
                <Edit2 size={16} />
              </button>
            ) : (
              <button
                onClick={handleSaveBio}
                className="text-gray-500 hover:text-green-600"
                aria-label="Save bio"
              >
                <Save size={16} />
              </button>
            )}
          </div>
          
          {!isEditingBio ? (
            <p className="text-gray-700">{profile.bio}</p>
          ) : (
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          )}
        </div>
        
        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            
            <button
              onClick={() => setIsAddingSkill(true)}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" /> Add Skill
            </button>
          </div>
          
          {/* Skills List */}
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.map(skill => (
              <div 
                key={skill.id} 
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span>{skill.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getSkillLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
                <button
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="text-gray-400 hover:text-red-500 ml-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Add Skill Form */}
          {isAddingSkill && (
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="Skill name"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end mt-3 space-x-2">
                <button
                  onClick={() => setIsAddingSkill(false)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            
            <button
              onClick={() => setIsAddingExperience(true)}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" /> Add Experience
            </button>
          </div>
          
          {/* Experience List */}
          <div className="space-y-4">
            {profile.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4 py-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">{exp.position}</h4>
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="text-gray-600">{exp.company}</div>
                <div className="text-gray-500 text-sm">{exp.duration}</div>
                {exp.description && <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>}
              </div>
            ))}
            
            {profile.experience.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No experience added yet
              </div>
            )}
          </div>
          
          {/* Add Experience Form */}
          {isAddingExperience && (
            <div className="border rounded-md p-4 bg-gray-50 mt-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={newExperience.position}
                    onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Tech Company Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newExperience.duration}
                    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. June 2020 - Present"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Brief description of your responsibilities"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsAddingExperience(false)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education</h3>
            
            <button
              onClick={() => setIsAddingEducation(true)}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" /> Add Education
            </button>
          </div>
          
          {/* Education List */}
          <div className="space-y-4">
            {profile.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <GraduationCap size={18} className="mr-2 text-gray-500" />
                    <h4 className="font-medium">{edu.institution}</h4>
                  </div>
                  <div className="text-gray-600 ml-7">{edu.degree}</div>
                  <div className="text-gray-500 text-sm ml-7">{edu.year}</div>
                </div>
                <button
                  onClick={() => handleRemoveEducation(edu.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Add Education Form */}
          {isAddingEducation && (
            <div className="border rounded-md p-4 bg-gray-50 mt-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. University of Technology"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={newEducation.year}
                    onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 2019-2023"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsAddingEducation(false)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEducation}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Projects</h3>
            
            <button
              onClick={() => setIsAddingProject(true)}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" /> Add Project
            </button>
          </div>
          
          {/* Projects List */}
          <div className="space-y-4">
            {profile.projects.map(project => (
              <div key={project.id} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">{project.title}</h4>
                  <button
                    onClick={() => handleRemoveProject(project.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-gray-700 my-2 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {profile.projects.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No projects added yet
              </div>
            )}
          </div>
          
          {/* Add Project Form */}
          {isAddingProject && (
            <div className="border rounded-md p-4 bg-gray-50 mt-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. E-commerce Website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Brief description of your project"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. React, Node.js, MongoDB"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsAddingProject(false)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;