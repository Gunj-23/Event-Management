import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, Edit, Trash2, Save } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { Event } from '../../types';
import { format } from 'date-fns';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function ManageEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, isLoading } = useEvents();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'settings'>('details');
  const [editMode, setEditMode] = useState(false);
  
  // Update document title
  useEffect(() => {
    document.title = 'Manage Event | EventHub';
  }, []);
  
  // Load event details
  useEffect(() => {
    if (id) {
      const eventData = getEventById(id);
      if (eventData) {
        setEvent(eventData);
        document.title = `Manage: ${eventData.title} | EventHub`;
      }
    }
  }, [id, getEventById]);
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-neutral-600 mb-8">
          We couldn't find the event you're looking for.
        </p>
        <Link to="/admin" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/admin" className="text-neutral-600 hover:text-neutral-900 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Manage Event</h1>
              <p className="text-neutral-600">{event.title}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setEditMode(!editMode)}
              className={editMode ? "btn-secondary" : "btn-primary"}
            >
              {editMode ? (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Event
                </>
              )}
            </button>
            
            <button className="btn-outline text-error-600 hover:text-error-700 border-error-300 hover:bg-error-50">
              <Trash2 className="h-5 w-5 mr-2" />
              Cancel Event
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Event Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="h-32 overflow-hidden">
                <img 
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-neutral-700 mb-4">
                  <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-neutral-500">
                      {format(new Date(event.startDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-neutral-700 mb-4">
                  <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-neutral-500">
                      {event.location.city}, {event.location.state}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-neutral-700 mb-4">
                  <Users className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-sm text-neutral-500">
                      {event.attendeeCount} / {event.capacity}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-neutral-700 mb-4">
                  <Ticket className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Ticket Price</p>
                    <p className="text-sm text-neutral-500">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-neutral-100 pt-4 mt-4">
                  <Link 
                    to={`/events/${event.id}`}
                    className="btn-outline w-full text-center"
                  >
                    View Public Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-neutral-200">
                <nav className="flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'details'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    Event Details
                  </button>
                  <button
                    onClick={() => setActiveTab('attendees')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'attendees'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    Attendees
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'settings'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    Settings
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Event Information</h2>
                    
                    {editMode ? (
                      <form className="space-y-6">
                        <div>
                          <label htmlFor="title" className="form-label">
                            Event Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            className="form-input"
                            defaultValue={event.title}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="form-label">
                            Event Description
                          </label>
                          <textarea
                            id="description"
                            rows={6}
                            className="form-input"
                            defaultValue={event.description}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="startDate" className="form-label">
                              Start Date & Time
                            </label>
                            <input
                              type="datetime-local"
                              id="startDate"
                              className="form-input"
                              defaultValue={format(new Date(event.startDate), "yyyy-MM-dd'T'HH:mm")}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="endDate" className="form-label">
                              End Date & Time
                            </label>
                            <input
                              type="datetime-local"
                              id="endDate"
                              className="form-input"
                              defaultValue={format(new Date(event.endDate), "yyyy-MM-dd'T'HH:mm")}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="location" className="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            className="form-input"
                            defaultValue={`${event.location.name}, ${event.location.address}`}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label htmlFor="city" className="form-label">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              className="form-input"
                              defaultValue={event.location.city}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="form-label">
                              State
                            </label>
                            <input
                              type="text"
                              id="state"
                              className="form-input"
                              defaultValue={event.location.state}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="zipCode" className="form-label">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              className="form-input"
                              defaultValue={event.location.zipCode}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="price" className="form-label">
                              Ticket Price ($)
                            </label>
                            <input
                              type="number"
                              id="price"
                              className="form-input"
                              defaultValue={event.price}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="capacity" className="form-label">
                              Capacity
                            </label>
                            <input
                              type="number"
                              id="capacity"
                              className="form-input"
                              defaultValue={event.capacity}
                              min="1"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <button 
                            type="button" 
                            className="btn-outline"
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            type="button" 
                            className="btn-primary"
                            onClick={() => {
                              // In a real app, this would save the changes
                              setEditMode(false);
                              alert('Changes saved!');
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Read-only view of event details
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-500 mb-1">Event Title</h3>
                          <p className="text-lg">{event.title}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-neutral-500 mb-1">Description</h3>
                          <div className="prose max-w-none">
                            {event.description.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-neutral-500 mb-1">Start Date & Time</h3>
                            <p>{format(new Date(event.startDate), 'MMM d, yyyy h:mm a')}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-neutral-500 mb-1">End Date & Time</h3>
                            <p>{format(new Date(event.endDate), 'MMM d, yyyy h:mm a')}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-neutral-500 mb-1">Location</h3>
                          <p>{event.location.name}</p>
                          <p>{event.location.address}</p>
                          <p>{event.location.city}, {event.location.state} {event.location.zipCode}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-neutral-500 mb-1">Ticket Price</h3>
                            <p>{event.price === 0 ? 'Free' : `$${event.price}`}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-neutral-500 mb-1">Capacity</h3>
                            <p>{event.capacity} attendees</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'attendees' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Attendees</h2>
                      <button className="btn-outline">
                        Export List
                      </button>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl mr-6">
                          {event.attendeeCount}
                        </div>
                        <div>
                          <p className="text-lg font-semibold">
                            {event.attendeeCount} / {event.capacity} registered
                          </p>
                          <div className="w-full bg-neutral-200 rounded-full h-2.5 mt-2">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${(event.attendeeCount / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Registration Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Ticket Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          {/* Mock attendee data */}
                          {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 mr-3">
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <span className="font-medium">Attendee {index + 1}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                attendee{index + 1}@example.com
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {format(new Date(2024, 8, 15 - index), 'MMM d, yyyy')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {index % 2 === 0 ? 'Standard' : 'VIP'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                                  Registered
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {event.attendeeCount === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">
                          No attendees yet
                        </h3>
                        <p className="text-neutral-600 mb-6">
                          Your event doesn't have any registrations yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Event Settings</h2>
                    
                    <div className="space-y-8">
                      <div className="border-b border-neutral-200 pb-6">
                        <h3 className="text-lg font-semibold mb-4">Visibility Settings</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Event Visibility</p>
                            <p className="text-sm text-neutral-500">
                              Control who can see your event
                            </p>
                          </div>
                          <select className="form-input w-auto">
                            <option>Public</option>
                            <option>Private</option>
                            <option>Password Protected</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-200 pb-6">
                        <h3 className="text-lg font-semibold mb-4">Registration Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Allow Registration</p>
                              <p className="text-sm text-neutral-500">
                                Enable/disable registration for this event
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                              <span className="inline-block w-5 h-5 transform translate-x-5 bg-white rounded-full shadow-md"></span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Registration Deadline</p>
                              <p className="text-sm text-neutral-500">
                                Last date for registration
                              </p>
                            </div>
                            <input 
                              type="date" 
                              className="form-input w-auto" 
                              defaultValue={format(new Date(event.startDate), 'yyyy-MM-dd')}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Waitlist</p>
                              <p className="text-sm text-neutral-500">
                                Enable waitlist when event is at capacity
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                              <span className="inline-block w-5 h-5 transform translate-x-0 bg-white rounded-full shadow-md"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-200 pb-6">
                        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Registration Confirmation</p>
                              <p className="text-sm text-neutral-500">
                                Send confirmation email to attendees
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                              <span className="inline-block w-5 h-5 transform translate-x-5 bg-white rounded-full shadow-md"></span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Reminder Email</p>
                              <p className="text-sm text-neutral-500">
                                Send reminder before event
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                              <span className="inline-block w-5 h-5 transform translate-x-5 bg-white rounded-full shadow-md"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-200 pb-6">
                        <h3 className="text-lg font-semibold mb-4 text-error-600">Danger Zone</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Cancel Event</p>
                              <p className="text-sm text-neutral-500">
                                Cancel this event and notify all attendees
                              </p>
                            </div>
                            <button className="btn-outline text-error-600 hover:text-error-700 border-error-300 hover:bg-error-50">
                              Cancel Event
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Delete Event</p>
                              <p className="text-sm text-neutral-500">
                                Permanently delete this event and all data
                              </p>
                            </div>
                            <button className="btn-outline text-error-600 hover:text-error-700 border-error-300 hover:bg-error-50">
                              Delete Event
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}