import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventCategories } from '../../data/mockData';

// Category icons (using Lucide React icons)
const categoryIcons = {
  Technology: '💻',
  Music: '🎵',
  Business: '💼',
  'Health & Wellness': '🧘',
  'Food & Drink': '🍽️',
  Marketing: '📊',
  Sports: '🏆',
  Education: '🎓',
  'Art & Culture': '🎨',
  Community: '👥',
};

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Events by Category</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Explore events based on your interests and discover new experiences
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {eventCategories.map(category => (
            <Link
              key={category}
              to={`/events?category=${encodeURIComponent(category)}`}
              className="flex flex-col items-center p-4 rounded-lg bg-neutral-50 hover:bg-primary-50 border border-neutral-100 transition-colors group"
            >
              <span className="text-4xl mb-3" aria-hidden="true">
                {categoryIcons[category as keyof typeof categoryIcons] || '📅'}
              </span>
              <h3 className="text-lg font-medium text-center text-neutral-800 group-hover:text-primary-700">
                {category}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/events" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}