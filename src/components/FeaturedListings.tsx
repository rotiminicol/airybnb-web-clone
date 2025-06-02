
import { Heart, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';

const FeaturedListings = () => {
  const { user } = useAuth();
  const { data: properties, isLoading } = useProperties();
  const { favorites, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="flex space-x-6 overflow-hidden">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex-shrink-0 w-80">
                    <div className="h-72 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Group properties by location
  const londonProperties = properties?.filter(p => p.city.toLowerCase() === 'london') || [];
  const lekkiProperties = properties?.filter(p => p.city.toLowerCase() === 'lekki') || [];
  const nairobiProperties = properties?.filter(p => p.city.toLowerCase() === 'nairobi') || [];

  const ListingCard = ({ property }: { property: any }) => (
    <Link to={`/property/${property.id}`} className="group flex-shrink-0 w-80 cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={property.images?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"} 
          alt={property.title}
          className="w-full h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
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
          </div>
        </div>
        <p className="text-gray-600 text-sm">{property.max_guests} guests</p>
        <p className="font-medium">
          <span className="text-gray-900">${property.price_per_night}</span>
          <span className="text-gray-600 font-normal"> night</span>
        </p>
      </div>
    </Link>
  );

  const ListingSection = ({ 
    title, 
    properties,
    linkTo 
  }: { 
    title: string; 
    properties: any[];
    linkTo: string;
  }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <Link to={linkTo} className="group">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center group-hover:underline">
            {title}
            <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
          </h2>
        </Link>
      </div>
      
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {properties.slice(0, 6).map(property => (
          <ListingCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {londonProperties.length > 0 && (
        <ListingSection 
          title="Popular homes in London" 
          properties={londonProperties} 
          linkTo="/properties/london"
        />
      )}
      {lekkiProperties.length > 0 && (
        <ListingSection 
          title="Stay in Lekki" 
          properties={lekkiProperties} 
          linkTo="/properties/lekki"
        />
      )}
      {nairobiProperties.length > 0 && (
        <ListingSection 
          title="Available next month in Nairobi" 
          properties={nairobiProperties} 
          linkTo="/properties/nairobi"
        />
      )}
    </div>
  );
};

export default FeaturedListings;
