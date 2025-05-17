import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    role: 'Event Organizer',
    company: 'Tech Innovations',
    quote: 'EventHub has transformed how we manage our conferences. The dashboard is intuitive, and the registration process is seamless for our attendees. Our ticket sales increased by 40% after switching to this platform!',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Michael T.',
    role: 'Marketing Director',
    company: 'Global Summit',
    quote: 'We\'ve used several event platforms, but none compare to EventHub. The analytics, user experience, and customer support are outstanding. It\'s helped us scale our annual conference from 500 to 2,000 attendees.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Jennifer K.',
    role: 'Frequent Attendee',
    company: '',
    quote: 'I love how easy it is to find events that match my interests. The filters are incredibly helpful, and the event pages provide all the information I need. I\'ve discovered so many amazing experiences through this platform!',
    image: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex(current => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Discover why event organizers and attendees love our platform
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
              <Quote className="h-12 w-12 text-primary-200" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              
              <div>
                <blockquote className="text-lg md:text-xl text-neutral-700 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonials[currentIndex].name}</div>
                    <div className="text-neutral-500">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].company && (
                        <>, {testimonials[currentIndex].company}</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-neutral-300'
                } transition-colors`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-neutral-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-neutral-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}