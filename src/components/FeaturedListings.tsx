
import { Heart, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const FeaturedListings = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const londonListings = [
    {
      id: 1,
      type: "Apartment",
      location: "London, UK",
      price: 103,
      rating: 4.97,
      image: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    },
    {
      id: 2,
      type: "Room",
      location: "London, UK", 
      price: 87,
      rating: 4.89,
      image: `https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    },
    {
      id: 3,
      type: "Condo",
      location: "London, UK",
      price: 156,
      rating: 4.94,
      image: `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    },
    {
      id: 4,
      type: "Apartment",
      location: "London, UK",
      price: 128,
      rating: 4.91,
      image: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    },
    {
      id: 5,
      type: "Room",
      location: "London, UK",
      price: 94,
      rating: 4.88,
      image: `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    },
    {
      id: 6,
      type: "Apartment",
      location: "London, UK",
      price: 142,
      rating: 4.96,
      image: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop`,
      isGuestFavorite: true
    }
  ];

  const lekkiListings = [
    {
      id: 7,
      type: "Villa",
      location: "Lekki, Nigeria",
      price: 89,
      rating: 4.92,
      image: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    },
    {
      id: 8,
      type: "Apartment",
      location: "Lekki, Nigeria",
      price: 67,
      rating: 4.85,
      image: `https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    },
    {
      id: 9,
      type: "Condo",
      location: "Lekki, Nigeria",
      price: 124,
      rating: 4.89,
      image: `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    }
  ];

  const nairobiListings = [
    {
      id: 10,
      type: "House",
      location: "Nairobi, Kenya",
      price: 76,
      rating: 4.87,
      image: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    },
    {
      id: 11,
      type: "Apartment",
      location: "Nairobi, Kenya",
      price: 54,
      rating: 4.91,
      image: `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    },
    {
      id: 12,
      type: "Villa",
      location: "Nairobi, Kenya",
      price: 98,
      rating: 4.93,
      image: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop`,
      isGuestFavorite: false
    }
  ];

  const ListingCard = ({ listing }: { listing: typeof londonListings[0] }) => (
    <div className="group flex-shrink-0 w-80 cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={listing.image} 
          alt={`${listing.type} in ${listing.location}`}
          className="w-full h-72 object-cover rounded-lg"
        />
        {listing.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
            Guest favorite
          </div>
        )}
        <button 
          onClick={() => toggleFavorite(listing.id)}
          className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-6 h-6 ${
              favorites.includes(listing.id) 
                ? 'fill-red-500 text-red-500' 
                : 'fill-black/20 text-white'
            }`} 
          />
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{listing.type} in {listing.location}</h3>
          <div className="flex items-center">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-medium ml-1">{listing.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">2 guests</p>
        <p className="font-medium">
          <span className="text-gray-900">${listing.price}</span>
          <span className="text-gray-600 font-normal"> for 2 nights</span>
        </p>
      </div>
    </div>
  );

  const ListingSection = ({ 
    title, 
    listings 
  }: { 
    title: string; 
    listings: typeof londonListings 
  }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          {title}
          <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
        </h2>
      </div>
      
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ListingSection title="Popular homes in London" listings={londonListings} />
      <ListingSection title="Stay in Lekki" listings={lekkiListings} />
      <ListingSection title="Available next month in Nairobi" listings={nairobiListings} />
    </div>
  );
};

export default FeaturedListings;
