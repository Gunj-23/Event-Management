import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../../types';

interface FeaturedEventsSectionProps {
  events: Event[];
  isLoading: boolean;
}

export function FeaturedEventsSection({ events, isLoading }: FeaturedEventsSectionProps) {
  const [visibleEvents, setVisibleEvents] = useState(3);
  
  const handleLoadMore = () => {
    setVisibleEvents(prev => Math.min(prev + 3, events.length));
  };
  
  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-neutral-200 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-neutral-200 rounded-md"></div>
                  <div className="h-4 bg-neutral-200 rounded-md"></div>
                  <div className="h-4 bg-neutral-200 rounded-md w-3/4"></div>
                  <div className="flex space-x-4">
                    <div className="h-8 bg-neutral-200 rounded-md w-1/2"></div>
                    <div className="h-8 bg-neutral-200 rounded-md w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Discover our handpicked selection of unmissable events happening soon
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, visibleEvents).map(event => (
            <Link 
              key={event.id} 
              to={`/events/${event.id}`}
              className="card card-hover overflow-hidden transform transition duration-300 hover:-translate-y-1"
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                  {event.category}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-2">{event.shortDescription}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-neutral-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {format(new Date(event.startDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center text-neutral-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {event.location.city}, {event.location.state}
                    </span>
                  </div>
                  <div className="flex items-center text-neutral-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {event.attendeeCount} attending
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-600">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {visibleEvents < events.length && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="btn-outline"
            >
              Load More Events
            </button>
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link to="/events" className="btn-primary">
            Browse All Events
          </Link>
        </div>
      </div>
    </section>
  );
}