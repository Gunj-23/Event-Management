export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'attendee';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  organizer: {
    id: string;
    name: string;
    email?: string;
  };
  category: string;
  imageUrl: string;
  price: number;
  capacity: number;
  attendeeCount: number;
  speakers?: Speaker[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  company?: string;
  position?: string;
  imageUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'registered' | 'attended' | 'cancelled';
  ticketType?: string;
  ticketCount: number;
  totalPrice: number;
  createdAt: string;
}

export interface EventFilters {
  search?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};