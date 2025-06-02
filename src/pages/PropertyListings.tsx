
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Map, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/useProperties';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';

const PropertyListings = () => {
  const { location } = useParams();
  const { user } = useAuth();
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  const { data: allProperties, isLoading } = useProperties();
  const { favorites, toggleFavorite } = useFavorites();

  // Filter properties by location
  const properties = allProperties?.filter(property => 
    property.city.toLowerCase() === location?.toLowerCase()
  ) || [];

  const getLocationTitle = () => {
    if (location === 'london') return 'Popular homes in London';
    if (location === 'lekki') return 'Stay in Lekki';
    if (location === 'nairobi') return 'Available next month in Nairobi';
    return `Properties in ${location}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onBecomeHost={() => setShowHostPopup(true)}
          onLanguageSelect={() => setShowLanguagePopup(true)}
        />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onBecomeHost={() => setShowHostPopup(true)}
        onLanguageSelect={() => setShowLanguagePopup(true)}
      />
      
      <main className="pt-20">
        {/* Search Bar */}
        <div className="border-b border-gray-200 bg-white sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center bg-white border border-gray-300 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow flex-1 max-w-2xl">
                <span className="text-sm text-gray-700">Homes in {location || 'London'}</span>
                <div className="w-px h-6 bg-gray-300 mx-3"></div>
                <span className="text-sm text-gray-700">Any weekend</span>
                <div className="w-px h-6 bg-gray-300 mx-3"></div>
                <span className="text-sm text-gray-700">Add guests</span>
                <div className="ml-auto bg-[#FF5A5F] rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center ml-4 space-x-4">
                <Button 
                  variant="outline" 
                  className="hidden sm:flex items-center"
                >
                  Filters
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center"
                >
                  <Map className="w-4 h-4 mr-2" />
                  {showMap ? 'Show list' : 'Show map'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{getLocationTitle()}</h1>
              <p className="text-gray-600 mt-1">{properties.length} places in {location || 'this area'}</p>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Link 
                key={property.id} 
                to={`/property/${property.id}`}
                className="group cursor-pointer"
              >
                <div className="relative mb-3">
                  <img 
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"} 
                    alt={property.title}
                    className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                  {property.is_guest_favorite && (
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
                      Guest favorite
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (user) {
                        toggleFavorite({ propertyId: property.id });
                      }
                    }}
                    className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`w-6 h-6 ${
                        favorites.some(f => f.property_id === property.id)
                          ? 'fill-red-500 text-red-500' 
                          : 'fill-black/20 text-white'
                      }`} 
                    />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 group-hover:underline">{property.title}</h3>
                    <div className="flex items-center">
                      <span className="text-sm">⭐</span>
                      <span className="text-sm font-medium ml-1">{property.rating || 4.5}</span>
                      <span className="text-sm text-gray-500 ml-1">({property.review_count || 0})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{property.property_type} • {property.max_guests} guests</p>
                  <p className="font-medium">
                    <span className="text-gray-900">${property.price_per_night}</span>
                    <span className="text-gray-600 font-normal"> night</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <BecomeHostPopup 
        isOpen={showHostPopup} 
        onClose={() => setShowHostPopup(false)} 
      />
      
      <LanguagePopup 
        isOpen={showLanguagePopup} 
        onClose={() => setShowLanguagePopup(false)} 
      />
    </div>
  );
};

export default PropertyListings;
