import { useState, useEffect, useMemo } from 'react';
import { Event, EventFilters } from '../types';
import { mockEvents } from '../data/mockData';

export const useEvents = (filters?: EventFilters) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events (mocked for now)
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Set all events
        setEvents(mockEvents);
        
        // Set featured events
        setFeaturedEvents(mockEvents.filter(event => event.isFeatured));
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Apply filters to events
  const filteredEvents = useMemo(() => {
    if (!filters) return events;
    
    return events.filter(event => {
      // Search by title or description
      if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !event.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.category && event.category !== filters.category) {
        return false;
      }
      
      // Filter by location
      if (filters.location) {
        const locationStr = `${event.location.city}, ${event.location.state}`;
        if (!locationStr.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by date range
      if (filters.startDate && new Date(event.startDate) < new Date(filters.startDate)) {
        return false;
      }
      
      if (filters.endDate && new Date(event.endDate) > new Date(filters.endDate)) {
        return false;
      }
      
      // Filter by price range
      if (filters.priceRange) {
        if (event.price < filters.priceRange.min || event.price > filters.priceRange.max) {
          return false;
        }
      }
      
      return true;
    });
  }, [events, filters]);

  // Get a single event by ID
  const getEventById = (id: string) => {
    return events.find(event => event.id === id) || null;
  };

  return {
    events: filteredEvents,
    featuredEvents,
    isLoading,
    error,
    getEventById,
  };
};