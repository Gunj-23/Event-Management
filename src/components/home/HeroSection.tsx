import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <section className="relative pt-20 pb-24 bg-gradient-to-br from-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIvPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover & Create <span className="text-accent-400">Unforgettable</span> Events
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Find your next experience or organize your own. From tech conferences to music festivals, we've got you covered.
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="bg-white/10 backdrop-blur-md p-2 rounded-lg max-w-xl mx-auto mb-8 flex"
          >
            <div className="flex-grow relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for events, venues, or categories..."
                className="w-full bg-transparent border-0 pl-10 pr-3 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="bg-white text-primary-700 font-medium px-6 py-3 rounded-md hover:bg-white/90 transition-colors flex-shrink-0"
            >
              Search
            </button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/events" className="btn-accent">
              Browse Events
            </Link>
            <Link to="/register" className="border border-white hover:bg-white/10 text-white font-medium px-6 py-2 rounded-md transition-colors">
              Create Account
            </Link>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transition-transform hover:transform hover:scale-105">
            <div className="bg-accent-400/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-accent-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Events</h3>
            <p className="text-white/70">
              Discover events based on your interests, location and availability
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transition-transform hover:transform hover:scale-105">
            <div className="bg-secondary-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Events</h3>
            <p className="text-white/70">
              Organize and manage your own events with our intuitive tools
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transition-transform hover:transform hover:scale-105">
            <div className="bg-primary-300/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Registrations</h3>
            <p className="text-white/70">
              Easily manage attendees and track event registrations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}