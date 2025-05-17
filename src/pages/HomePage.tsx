import { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedEventsSection } from '../components/home/FeaturedEventsSection';
import { CategorySection } from '../components/home/CategorySection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { CallToActionSection } from '../components/home/CallToActionSection';
import { useEvents } from '../hooks/useEvents';

export default function HomePage() {
  const { featuredEvents, isLoading } = useEvents();
  
  // Update document title
  useEffect(() => {
    document.title = 'EventHub - Discover & Create Amazing Events';
  }, []);
  
  return (
    <div>
      <HeroSection />
      <FeaturedEventsSection events={featuredEvents} isLoading={isLoading} />
      <CategorySection />
      <TestimonialSection />
      <CallToActionSection />
    </div>
  );
}