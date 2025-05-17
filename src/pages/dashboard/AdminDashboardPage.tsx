import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Plus, Trash2, Users, Calendar, TrendingUp, DollarSign, BarChart2, List } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockEvents } from '../../data/mockData';
import { Event } from '../../types';
import { format } from 'date-fns';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    upcomingEvents: 0,
    totalRevenue: 0,
  });
  
  // Update document title
  useEffect(() => {
    document.title = 'Admin Dashboard | EventHub';
  }, []);
  
  // Load organizer events
  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Get events created by this organizer
        let organizerEvents;
        if (user?.role === 'admin') {
          // Admin can see all events
          organizerEvents = mockEvents;
        } else {
          // Organizers see only their own events
          organizerEvents = mockEvents.filter(event => event.organizer.id === user?.id);
        }
        
        setEvents(organizerEvents);
        
        // Calculate stats
        const now = new Date();
        const upcomingEventsCount = organizerEvents.filter(event => new Date(event.startDate) > now).length;
        const totalAttendees = organizerEvents.reduce((sum, event) => sum + event.attendeeCount, 0);
        const totalRevenue = organizerEvents.reduce((sum, event) => sum + (event.price * event.attendeeCount), 0);
        
        setStats({
          totalEvents: organizerEvents.length,
          totalAttendees,
          upcomingEvents: upcomingEventsCount,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchOrganizerEvents();
    }
  }, [user]);
  
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">
              Manage your events and track your performance
            </p>
          </div>
          
          <Link to="/admin/events/create" className="btn-primary">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Total Events</p>
                <h3 className="text-2xl font-bold">{stats.totalEvents}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-secondary-100 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-secondary-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Total Attendees</p>
                <h3 className="text-2xl font-bold">{stats.totalAttendees}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-accent-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-accent-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Upcoming Events</p>
                <h3 className="text-2xl font-bold">{stats.upcomingEvents}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-success-100 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-success-700" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Events</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="form-input mr-2 w-64"
                />
                <button className="btn-outline px-3 py-2">
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button className="btn-outline px-3 py-2 ml-2">
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {events.map(event => {
                  const eventDate = new Date(event.startDate);
                  const now = new Date();
                  let status;
                  
                  if (eventDate < now) {
                    status = 'Completed';
                  } else if (eventDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
                    status = 'Upcoming';
                  } else {
                    status = 'Scheduled';
                  }
                  
                  return (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <img 
                              src={event.imageUrl} 
                              alt={event.title} 
                              className="h-10 w-10 rounded object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-neutral-900 truncate max-w-xs">
                              {event.title}
                            </div>
                            <div className="text-neutral-500 text-sm truncate max-w-xs">
                              {event.location.city}, {event.location.state}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {format(new Date(event.startDate), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {event.attendeeCount} / {event.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        ${(event.price * event.attendeeCount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            status === 'Completed' 
                              ? 'bg-neutral-100 text-neutral-800'
                              : status === 'Upcoming'
                              ? 'bg-accent-100 text-accent-800'
                              : 'bg-primary-100 text-primary-800'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/admin/events/${event.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button className="text-error-600 hover:text-error-900">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No events found
              </h3>
              <p className="text-neutral-600 mb-6">
                You haven't created any events yet. Click the button below to get started.
              </p>
              <Link 
                to="/admin/events/create" 
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}