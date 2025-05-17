import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Own Event?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl">
              From conferences to workshops, concerts to fundraisers, our platform gives you everything you need to create successful events and connect with your audience.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Powerful Event Management</h3>
                  <p className="text-white/80">
                    Create, customize, and manage every aspect of your event with our intuitive tools
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Attendee Engagement</h3>
                  <p className="text-white/80">
                    Communicate with your audience and provide them with a seamless registration experience
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-accent">
                Get Started
              </Link>
              <Link to="/events" className="border border-white hover:bg-white/10 text-white font-medium px-6 py-2 rounded-md transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="lg:pr-6">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7648513/pexels-photo-7648513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Event planning" 
                className="w-full h-64 object-cover"
              />
              <div className="p-8 bg-white text-neutral-800">
                <h3 className="text-2xl font-semibold mb-4">Create Your First Event</h3>
                <p className="text-neutral-600 mb-6">
                  Join thousands of successful event organizers who trust our platform to manage their events.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6L5.5 8L8.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>No setup or hidden fees</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6L5.5 8L8.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Seamless attendee management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6L5.5 8L8.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Detailed analytics and reporting</span>
                  </li>
                </ul>
                <Link to="/register" className="btn-primary w-full">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}