import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  layout?: 'grid' | 'list';
}

export function EventCard({ event, layout = 'grid' }: EventCardProps) {
  if (layout === 'list') {
    return (
      <Link 
        to={`/events/${event.id}`}
        className="card card-hover overflow-hidden flex flex-col md:flex-row"
      >
        {/* Event Image */}
        <div className="h-48 md:h-auto md:w-1/3 flex-shrink-0 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Event Details */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-2 flex items-center">
            <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-xs font-medium">
              {event.category}
            </span>
            <span className="mx-2 text-neutral-300">•</span>
            <span className="text-sm text-neutral-500">
              {format(new Date(event.startDate), 'MMM d, yyyy')}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-neutral-600 mb-4 line-clamp-2 flex-grow">{event.shortDescription}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
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
          
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold text-primary-600">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
            <button className="btn-primary">
              View Details
            </button>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
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
        <div className="absolute top-4 right-4 bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-xs font-medium">
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
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}