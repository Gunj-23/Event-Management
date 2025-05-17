import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Plus, Image, X } from 'lucide-react';
import { eventCategories } from '../../data/mockData';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    locationName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    capacity: '',
  });
  
  // For demonstration - would be replaced with actual image upload
  const [imageUrl, setImageUrl] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  // Update document title
  useEffect(() => {
    document.title = 'Create Event | EventHub';
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file uploads
    // For now, just use a placeholder URL if a file is selected
    if (e.target.files && e.target.files[0]) {
      setImageUrl('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, submit the form data to the server
    console.log('Form data:', formData);
    alert('Event created successfully!');
  };
  
  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl">
        <div className="mb-8 flex items-center">
          <Link to="/admin" className="text-neutral-600 hover:text-neutral-900 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Create New Event</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Event Details</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="btn-outline"
              >
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary"
              >
                Create Event
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Event Basics */}
                <section>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="title" className="form-label">
                        Event Title <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        placeholder="e.g., Tech Conference 2025"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="shortDescription" className="form-label">
                        Short Description <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="shortDescription"
                        name="shortDescription"
                        className="form-input"
                        placeholder="Brief summary of your event (max 120 characters)"
                        maxLength={120}
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        This appears in event cards and search results
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="form-label">
                        Full Description <span className="text-error-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={6}
                        className="form-input"
                        placeholder="Provide a detailed description of your event..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="form-label">
                        Category <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-input"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a category</option>
                        {eventCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">
                        Event Image <span className="text-error-500">*</span>
                      </label>
                      {!imageUrl ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <Image className="mx-auto h-12 w-12 text-neutral-400" />
                            <div className="flex text-sm text-neutral-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                <span>Upload a file</span>
                                <input 
                                  id="file-upload" 
                                  name="file-upload" 
                                  type="file" 
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  required
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-neutral-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 relative rounded-md overflow-hidden h-48">
                          <img 
                            src={imageUrl} 
                            alt="Event preview" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-neutral-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                
                {/* Date and Time */}
                <section>
                  <h3 className="text-lg font-semibold mb-4">Date and Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="startDate" className="form-label">
                        Start Date <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-input"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="startTime" className="form-label">
                        Start Time <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        className="form-input"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="form-label">
                        End Date <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-input"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endTime" className="form-label">
                        End Time <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        className="form-input"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </section>
                
                {/* Location */}
                <section>
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="locationName" className="form-label">
                        Venue Name <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="locationName"
                        name="locationName"
                        className="form-input"
                        placeholder="e.g., Convention Center"
                        value={formData.locationName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="form-label">
                        Street Address <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-input"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="form-label">
                          City <span className="text-error-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-input"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="form-label">
                          State <span className="text-error-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="form-input"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="form-label">
                          ZIP Code <span className="text-error-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          className="form-input"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Tickets */}
                <section>
                  <h3 className="text-lg font-semibold mb-4">Tickets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="price" className="form-label">
                        Ticket Price ($) <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-input"
                        placeholder="0 for free events"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="capacity" className="form-label">
                        Capacity <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        className="form-input"
                        placeholder="Maximum number of attendees"
                        min="1"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </section>
                
                {/* Additional Sections could be added like:
                - Speakers/Presenters
                - Sponsors
                - Event Schedule
                - Custom Registration Fields
                */}
                
                <div className="flex justify-end space-x-4">
                  <Link to="/admin" className="btn-outline">
                    Cancel
                  </Link>
                  <button type="submit" className="btn-primary">
                    Create Event
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}