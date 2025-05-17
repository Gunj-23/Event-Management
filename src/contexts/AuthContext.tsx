import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing user session on component mount
    const storedUser = localStorage.getItem('eventHub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('eventHub_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function (to be replaced with actual API call)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || password !== 'password') { // Simple mock check
        throw new Error('Invalid email or password');
      }
      
      // Store user in localStorage for persistence
      localStorage.setItem('eventHub_user', JSON.stringify(foundUser));
      setUser(foundUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function (to be replaced with actual API call)
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (normally done by backend)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'attendee',
      };
      
      // Store user (in a real app, this would be handled by backend)
      localStorage.setItem('eventHub_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('eventHub_user');
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}