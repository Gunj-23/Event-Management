import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center text-2xl font-bold text-primary-600"
          >
            <Calendar className="mr-2 h-8 w-8" />
            <span>EventHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `transition-colors duration-200 font-medium ${
                  isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800 hover:text-primary-600' : 'text-neutral-800 hover:text-primary-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/events" 
              className={({ isActive }) => 
                `transition-colors duration-200 font-medium ${
                  isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800 hover:text-primary-600' : 'text-neutral-800 hover:text-primary-600'
                }`
              }
            >
              Events
            </NavLink>
            
            {/* Auth links based on user state */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span>{user.name}</span>
                </button>
                
                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    <Link 
                      to={user.role === 'admin' || user.role === 'organizer' ? "/admin" : "/dashboard"} 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <div className="flex items-center text-error-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="font-medium text-neutral-800 hover:text-primary-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-neutral-800"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `py-2 px-4 rounded-md ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-800 hover:bg-neutral-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/events"
              className={({ isActive }) => 
                `py-2 px-4 rounded-md ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-800 hover:bg-neutral-50'
                }`
              }
            >
              Events
            </NavLink>
            
            {user ? (
              <>
                <NavLink 
                  to={user.role === 'admin' || user.role === 'organizer' ? "/admin" : "/dashboard"}
                  className={({ isActive }) => 
                    `py-2 px-4 rounded-md ${
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-800 hover:bg-neutral-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button 
                  onClick={logout}
                  className="py-2 px-4 rounded-md text-left text-error-600 hover:bg-error-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login"
                  className={({ isActive }) => 
                    `py-2 px-4 rounded-md ${
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-800 hover:bg-neutral-50'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register"
                  className="btn-primary text-center"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}