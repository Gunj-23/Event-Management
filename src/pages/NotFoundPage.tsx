import { Link } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="container-custom max-w-lg text-center">
        <Calendar className="h-16 w-16 text-primary-300 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
          <Link to="/events" className="btn-outline inline-flex items-center justify-center">
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}