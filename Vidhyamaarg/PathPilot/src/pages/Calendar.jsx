import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Clock, Calendar as CalendarIcon, CheckSquare, Plus, X } from 'lucide-react';

/**
 * Calendar page component
 * Interactive calendar for planning learning journey and career-related events
 */
function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'study',
    description: '',
    startTime: '',
    endTime: ''
  });
  
  // Event types with color coding
  const eventTypes = [
    { id: 'study', label: 'Study Session', color: 'bg-blue-500' },
    { id: 'deadline', label: 'Assignment/Project Deadline', color: 'bg-red-500' },
    { id: 'interview', label: 'Interview/Application', color: 'bg-green-500' },
    { id: 'event', label: 'Workshop/Webinar', color: 'bg-purple-500' },
    { id: 'milestone', label: 'Learning Milestone', color: 'bg-yellow-500' }
  ];

  // Handle calendar date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Add a new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newEvent.title.trim()) {
      toast.error('Event title is required');
      return;
    }
    
    if (!newEvent.startTime) {
      toast.error('Start time is required');
      return;
    }
    
    // Create event object
    const eventToAdd = {
      id: Date.now(),
      date: selectedDate,
      ...newEvent
    };
    
    // Add to events array
    setEvents([...events, eventToAdd]);
    
    // Reset form
    setNewEvent({
      title: '',
      type: 'study',
      description: '',
      startTime: '',
      endTime: ''
    });
    
    // Close form
    setShowEventForm(false);
    
    // Show success message
    toast.success('Event added successfully!');
  };

  // Delete an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast.info('Event removed');
  };

  // Filter events for selected date
  const getEventsForSelectedDate = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  // Get event color by type
  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'bg-gray-500';
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" />
      
      <h1 className="text-3xl font-bold mb-2">Learning Calendar</h1>
      <p className="text-gray-600 mb-8">Plan your career journey with our interactive calendar</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <ReactCalendar
              onChange={handleDateChange}
              value={selectedDate}
              className="w-full border-0"
              tileClassName={({ date }) => {
                // Check if this date has events
                const hasEvents = events.some(event => {
                  const eventDate = new Date(event.date);
                  return (
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  );
                });
                
                return hasEvents ? 'has-events' : null;
              }}
            />
          </div>
          
          {/* Calendar legend */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-gray-800 mb-3">Event Types</h3>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map(type => (
                <div key={type.id} className="flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-2 ${type.color}`}></span>
                  <span className="text-sm text-gray-700">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Events for Selected Date */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <CalendarIcon className="mr-2" size={20} /> 
                {formatDate(selectedDate)}
              </h2>
              <button
                onClick={() => setShowEventForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center"
              >
                <Plus size={16} className="mr-1" /> Add Event
              </button>
            </div>
            
            {/* Event list */}
            {getEventsForSelectedDate().length > 0 ? (
              <div className="space-y-3">
                {getEventsForSelectedDate().map(event => (
                  <div 
                    key={event.id} 
                    className="border-l-4 pl-3 py-3 bg-gray-50 rounded-r-lg relative"
                    style={{ borderLeftColor: getEventTypeColor(event.type).replace('bg-', '') }}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Delete event"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                    )}
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}</span>
                      
                      <span className={`ml-3 px-2 py-1 rounded-full text-white text-xs ${getEventTypeColor(event.type)}`}>
                        {eventTypes.find(t => t.id === event.type)?.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckSquare className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500">No events scheduled for this date</p>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="mt-3 text-blue-600 hover:text-blue-800"
                >
                  + Add your first event
                </button>
              </div>
            )}
            
            {/* Add Event Form */}
            {showEventForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add New Event</h3>
                    <button 
                      onClick={() => setShowEventForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleAddEvent}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Event Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Study React Hooks"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Event Type</label>
                      <select
                        name="type"
                        value={newEvent.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {eventTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Description (Optional)</label>
                      <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add details about this event"
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Start Time*</label>
                        <input
                          type="time"
                          name="startTime"
                          value={newEvent.startTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">End Time</label>
                        <input
                          type="time"
                          name="endTime"
                          value={newEvent.endTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowEventForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Tips */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Planning Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1 pl-5 list-disc">
              <li>Break down learning goals into smaller, manageable tasks</li>
              <li>Schedule regular review sessions for better retention</li>
              <li>Include breaks between study sessions to prevent burnout</li>
              <li>Set deadlines for projects to track your progress</li>
              <li>Balance technical learning with soft skills development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;