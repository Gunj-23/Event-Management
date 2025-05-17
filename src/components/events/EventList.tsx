import { useState } from 'react';
import { Event, EventFilters } from '../../types';
import { EventCard } from './EventCard';
import { LayoutGrid, List } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  onFilterChange?: (filters: EventFilters) => void;
}

export function EventList({ events, isLoading, error }: EventListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error-600 mb-4">{error}</p>
        <button className="btn-primary">Try Again</button>
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">No events found</h3>
        <p className="text-neutral-600 mb-6">
          Try adjusting your filters or search to find events that match your criteria.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="bg-white rounded-md border border-neutral-200 inline-flex">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${
              viewMode === 'grid'
                ? 'bg-primary-50 text-primary-600'
                : 'bg-white text-neutral-500 hover:text-neutral-700'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${
              viewMode === 'list'
                ? 'bg-primary-50 text-primary-600'
                : 'bg-white text-neutral-500 hover:text-neutral-700'
            }`}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Events */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}