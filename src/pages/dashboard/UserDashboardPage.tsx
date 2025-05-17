import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockRegistrations, mockEvents } from '../../data/mockData';
import { EventRegistration, Event } from '../../types';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<(EventRegistration & { event: Event })[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Update document title
  useEffect(() => {
    document.title = 'My Dashboard | EventHub';
  }, []);
  
  // Load user registrations
  useEffect(() => {
    const fetchUserRegistrations = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Get user registrations and combine with event data
        const userRegs = mockRegistrations.filter(reg => reg.userId === user?.id);
        
        const regsWithEventData = userRegs.map(reg => {
          const eventData = mockEvents.find(e => e.id === reg.eventId);
          return {
            ...reg,
            event: eventData!
          };
        });
        
        setRegistrations(regsWithEventData);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);
  
  // Filter registrations based on active tab
  const filteredRegistrations = registrations.filter(reg => {
    const eventDate = new Date(reg.event.startDate);
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return eventDate >= now;
    } else {
      return eventDate < now;
    }
  });
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-neutral-600">
            Manage your event registrations and account settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">{user?.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-neutral-500 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <a 
                  href="#" 
                  className="block px-4 py-2 rounded-md bg-primary-50 text-primary-700 font-medium"
                >
                  My Registrations
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Account Settings
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Payment Methods
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Notifications
                </a>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-neutral-200">
                <nav className="flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'upcoming'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    Upcoming Events
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'past'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    Past Events
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {filteredRegistrations.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                      No {activeTab} events
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {activeTab === 'upcoming' 
                        ? "You haven't registered for any upcoming events yet." 
                        : "You don't have any past event registrations."}
                    </p>
                    <a 
                      href="/events" 
                      className="btn-primary"
                    >
                      Browse Events
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRegistrations.map(reg => (
                      <div 
                        key={reg.id} 
                        className="border border-neutral-200 rounded-lg p-4 flex flex-col md:flex-row"
                      >
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <img 
                            src={reg.event.imageUrl} 
                            alt={reg.event.title} 
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </div>
                        <div className="md:w-3/4 md:pl-6 flex flex-col">
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-1">
                              {reg.event.title}
                            </h3>
                            <div className="flex items-center text-neutral-500 mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">
                                {format(new Date(reg.event.startDate), 'EEEE, MMMM d, yyyy')} at {format(new Date(reg.event.startDate), 'h:mm a')}
                              </span>
                            </div>
                            <div className="flex items-center text-neutral-500 mb-4">
                              <span className="text-sm">
                                {reg.ticketCount} {reg.ticketCount > 1 ? 'tickets' : 'ticket'} • {reg.ticketType}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                reg.status === 'registered' 
                                  ? 'bg-success-100 text-success-700'
                                  : reg.status === 'attended'
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-neutral-100 text-neutral-700'
                              }`}>
                                {reg.status === 'registered' && (
                                  <div className="flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    <span>Registered</span>
                                  </div>
                                )}
                                {reg.status === 'attended' && 'Attended'}
                                {reg.status === 'cancelled' && 'Cancelled'}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <a 
                                href={`/events/${reg.event.id}`} 
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                View Details
                              </a>
                              
                              {activeTab === 'upcoming' && (
                                <button className="text-error-600 hover:text-error-700 text-sm font-medium flex items-center">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span>Cancel</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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