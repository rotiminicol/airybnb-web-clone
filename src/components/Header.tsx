
import { useState } from 'react';
import { Heart, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SearchPopup from './SearchPopup';
import LoginSignupModal from './LoginSignupModal';
import { useAuth } from '../contexts/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  onBecomeHost: () => void;
  onLanguageSelect: () => void;
}

const Header = ({ onBecomeHost, onLanguageSelect }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const { user, profile, isAuthenticated, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleUserDropdownToggle = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    signOut();
    setShowUserDropdown(false);
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
    }
    if (profile?.first_name) {
      return profile.first_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <svg width="102" height="32" className="text-[#FF5A5F]" fill="currentColor" viewBox="0 0 102 32">
                <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm0 29c-7.18 0-13-5.82-13-13S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13z"/>
                <path d="M16 8c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
              <span className="ml-2 text-2xl font-bold text-[#FF5A5F]">airbnb</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-gray-900 font-medium transition-colors ${
                  isActive('/') ? 'border-b-2 border-gray-900 pb-1' : ''
                }`}
              >
                Homes
              </Link>
              <Link 
                to="/experiences" 
                className={`text-gray-700 hover:text-gray-900 font-medium transition-colors ${
                  isActive('/experiences') ? 'border-b-2 border-gray-900 pb-1' : ''
                }`}
              >
                Experiences
              </Link>
              <Link 
                to="/services" 
                className={`text-gray-700 hover:text-gray-900 font-medium transition-colors ${
                  isActive('/services') ? 'border-b-2 border-gray-900 pb-1' : ''
                }`}
              >
                Services
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => setShowSearch(true)}
                className="flex items-center bg-white border border-gray-300 rounded-full px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm text-gray-700">Where</span>
                <div className="w-px h-6 bg-gray-300 mx-3"></div>
                <span className="text-sm text-gray-700">Date</span>
                <div className="w-px h-6 bg-gray-300 mx-3"></div>
                <span className="text-sm text-gray-700">Who</span>
                <div className="ml-3 bg-[#FF5A5F] rounded-full p-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBecomeHost}
                className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Become a Host
              </button>
              
              <button 
                onClick={onLanguageSelect}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-700">
                  <path fill="currentColor" d="M8 0.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 13.8A6.3 6.3 0 1 1 8 1.7a6.3 6.3 0 0 1 0 12.6z"/>
                  <path fill="currentColor" d="M8 3.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm2.8 4.2H9.2v1.8H8.8V7.7H7.2v1.8H6.8V7.7H5.2v-.6h1.6V5.3h.6v1.8h1.6V5.3h.6v1.8h1.6v.6z"/>
                </svg>
              </button>

              {/* User Authentication Section */}
              {isAuthenticated ? (
                <Popover open={showUserDropdown} onOpenChange={setShowUserDropdown}>
                  <PopoverTrigger asChild>
                    <button 
                      onClick={handleUserDropdownToggle}
                      className="flex items-center bg-white border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow"
                    >
                      <svg className="w-4 h-4 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={profile?.avatar_url || ''} alt={getDisplayName()} />
                        <AvatarFallback className="bg-gray-400 text-white text-sm">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-0 mr-4" align="end">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-900">{getDisplayName()}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Account
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Your reservations
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Wishlists
                      </button>
                      <button 
                        onClick={onBecomeHost}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        Become a Host
                      </button>
                      <hr className="my-1" />
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Help
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center bg-white border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow"
                >
                  <svg className="w-4 h-4 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchPopup isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <LoginSignupModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;
