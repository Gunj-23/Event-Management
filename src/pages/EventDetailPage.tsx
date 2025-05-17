import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Ticket, Share2, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Event } from '../types';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, isLoading, error } = useEvents();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  
  // Fetch event details
  useEffect(() => {
    if (id) {
      const eventData = getEventById(id);
      if (eventData) {
        setEvent(eventData);
        document.title = `${eventData.title} | EventHub`;
      }
    }
  }, [id, getEventById]);
  
  const handleRegister = () => {
    if (!user) {
      // Redirect to login with return path
      navigate(`/login?returnTo=/events/${id}`);
      return;
    }
    
    // Here we would handle the actual registration
    // For now, just show an alert
    alert(`You have registered for ${ticketCount} ticket(s) to "${event?.title}"`);
  };
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center items-center min-h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-neutral-600 mb-8">
          We couldn't find the event you're looking for. It may have been removed or you might have followed an incorrect link.
        </p>
        <Link to="/events" className="btn-primary">
          Browse All Events
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Event Banner Image */}
      <div className="h-72 md:h-96 w-full bg-neutral-800 relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-md text-white px-3 py-2 rounded-full flex items-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>
      </div>
      
      <div className="container-custom -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Event Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    {format(new Date(event.startDate), 'MMMM d, yyyy')}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg text-neutral-600">
                  {event.shortDescription}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                  <Share2 className="h-5 w-5 text-neutral-700" />
                </button>
                <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                  <Heart className="h-5 w-5 text-neutral-700" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Description */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <div className="prose max-w-none text-neutral-700">
                    {event.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {/* Speakers Section (if available) */}
                {event.speakers && event.speakers.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Speakers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.speakers.map(speaker => (
                        <div key={speaker.id} className="flex bg-neutral-50 p-4 rounded-lg">
                          {speaker.imageUrl && (
                            <img 
                              src={speaker.imageUrl} 
                              alt={speaker.name} 
                              className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-lg">{speaker.name}</h3>
                            {speaker.position && speaker.company && (
                              <p className="text-neutral-600 text-sm mb-1">
                                {speaker.position}, {speaker.company}
                              </p>
                            )}
                            <p className="text-neutral-700 text-sm">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Location Map (Placeholder) */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Location</h2>
                  <div className="bg-neutral-100 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-lg mb-1">{event.location.name}</h3>
                    <p className="text-neutral-700">
                      {event.location.address}, {event.location.city}, {event.location.state} {event.location.zipCode}
                    </p>
                  </div>
                  <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden relative">
                    {/* In a real app, we would integrate with Google Maps or similar here */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${event.location.address}, ${event.location.city}, ${event.location.state} ${event.location.zipCode}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white px-4 py-2 rounded-md shadow-md flex items-center text-primary-700 hover:bg-primary-50 transition-colors"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Google Maps
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Registration Card */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-6 sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-primary-600">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {event.attendeeCount} / {event.capacity} registered
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-neutral-600">
                          {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-neutral-600">
                          {format(new Date(event.startDate), 'h:mm a')} - 
                          {format(new Date(event.endDate), ' h:mm a')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-neutral-600">
                          {event.location.name}
                        </p>
                        <p className="text-neutral-600">
                          {event.location.city}, {event.location.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Ticket className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Ticket Quantity</p>
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                            className="bg-neutral-100 px-3 py-1 rounded-l-md text-neutral-700 hover:bg-neutral-200"
                            disabled={ticketCount <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-white border-t border-b border-neutral-200">
                            {ticketCount}
                          </span>
                          <button 
                            onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                            className="bg-neutral-100 px-3 py-1 rounded-r-md text-neutral-700 hover:bg-neutral-200"
                            disabled={ticketCount >= 10}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <button 
                      onClick={handleRegister}
                      className="btn-primary w-full py-3"
                    >
                      {event.price === 0 ? 'Register Now' : 'Buy Tickets'}
                    </button>
                  </div>
                  
                  <p className="text-xs text-neutral-500 text-center">
                    By registering, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}