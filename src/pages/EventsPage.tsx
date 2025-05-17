import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventFiltersPanel } from '../components/events/EventFiltersPanel';
import { EventList } from '../components/events/EventList';
import { EventFilters } from '../types';
import { useEvents } from '../hooks/useEvents';

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<EventFilters>({});
  
  // Get filters from URL params on initial load
  useEffect(() => {
    const initialFilters: EventFilters = {};
    
    if (searchParams.has('search')) {
      initialFilters.search = searchParams.get('search') || undefined;
    }
    
    if (searchParams.has('category')) {
      initialFilters.category = searchParams.get('category') || undefined;
    }
    
    if (searchParams.has('location')) {
      initialFilters.location = searchParams.get('location') || undefined;
    }
    
    if (searchParams.has('startDate')) {
      initialFilters.startDate = searchParams.get('startDate') || undefined;
    }
    
    if (searchParams.has('endDate')) {
      initialFilters.endDate = searchParams.get('endDate') || undefined;
    }
    
    setFilters(initialFilters);
  }, [searchParams]);
  
  // Get filtered events
  const { events, isLoading, error } = useEvents(filters);
  
  // Update document title
  useEffect(() => {
    document.title = 'Browse Events | EventHub';
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
    
    // Update URL search params
    const params = new URLSearchParams();
    
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }
    
    if (newFilters.category) {
      params.set('category', newFilters.category);
    }
    
    if (newFilters.location) {
      params.set('location', newFilters.location);
    }
    
    if (newFilters.startDate) {
      params.set('startDate', newFilters.startDate);
    }
    
    if (newFilters.endDate) {
      params.set('endDate', newFilters.endDate);
    }
    
    setSearchParams(params);
  };
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Events</h1>
          <p className="text-neutral-600">
            Discover events that match your interests and schedule
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters panel - 1/4 width on large screens */}
          <div className="w-full lg:w-1/4">
            <EventFiltersPanel 
              onFilterChange={handleFilterChange} 
              initialFilters={filters}
            />
          </div>
          
          {/* Event listing - 3/4 width on large screens */}
          <div className="w-full lg:w-3/4">
            <EventList 
              events={events} 
              isLoading={isLoading} 
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}