import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { EventFilters } from '../../types';
import { eventCategories, eventLocations } from '../../data/mockData';

interface EventFiltersPanelProps {
  onFilterChange: (filters: EventFilters) => void;
  initialFilters?: EventFilters;
}

export function EventFiltersPanel({ onFilterChange, initialFilters }: EventFiltersPanelProps) {
  const [filters, setFilters] = useState<EventFilters>(initialFilters || {});
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Update filters when initialFilters changes
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCategoryChange = (category: string) => {
    const newFilters = { 
      ...filters, 
      category: filters.category === category ? undefined : category 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = e.target.value === '' ? undefined : e.target.value;
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    const newFilters = { ...filters, [type]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleClearFilters = () => {
    const newFilters = { search: filters.search };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const hasActiveFilters = !!(
    filters.category || 
    filters.location || 
    filters.startDate || 
    filters.endDate ||
    (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 1000))
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          placeholder="Search events..."
          className="form-input pl-10"
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-2 border border-neutral-200 rounded-md bg-neutral-50 text-neutral-700"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>{isExpanded ? 'Hide Filters' : 'Show Filters'}</span>
          </div>
          {hasActiveFilters && (
            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
      </div>
      
      {/* Filters - responsive */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </button>
          )}
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {eventCategories.slice(0, 8).map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.category === category
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Location */}
        <div className="mb-6">
          <label htmlFor="location" className="text-sm font-medium text-neutral-700 mb-2 block">
            Location
          </label>
          <select
            id="location"
            className="form-input"
            value={filters.location || ''}
            onChange={handleLocationChange}
          >
            <option value="">All Locations</option>
            {eventLocations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Date Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="text-sm text-neutral-500 block mb-1">
                From
              </label>
              <input
                type="date"
                id="startDate"
                className="form-input"
                value={filters.startDate || ''}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="text-sm text-neutral-500 block mb-1">
                To
              </label>
              <input
                type="date"
                id="endDate"
                className="form-input"
                value={filters.endDate || ''}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Price Range - We could add a slider here */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Price Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minPrice" className="text-sm text-neutral-500 block mb-1">
                Min ($)
              </label>
              <input
                type="number"
                id="minPrice"
                min="0"
                className="form-input"
                value={filters.priceRange?.min || ''}
                onChange={(e) => {
                  const min = parseInt(e.target.value) || 0;
                  const max = filters.priceRange?.max || 1000;
                  setFilters({
                    ...filters,
                    priceRange: { min, max },
                  });
                  onFilterChange({
                    ...filters,
                    priceRange: { min, max },
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="text-sm text-neutral-500 block mb-1">
                Max ($)
              </label>
              <input
                type="number"
                id="maxPrice"
                min="0"
                className="form-input"
                value={filters.priceRange?.max || ''}
                onChange={(e) => {
                  const max = parseInt(e.target.value) || 1000;
                  const min = filters.priceRange?.min || 0;
                  setFilters({
                    ...filters,
                    priceRange: { min, max },
                  });
                  onFilterChange({
                    ...filters,
                    priceRange: { min, max },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}