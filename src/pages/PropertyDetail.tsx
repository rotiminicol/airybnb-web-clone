import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProperty } from '@/hooks/useProperties';
import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';
import { useCreateBooking } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const { data: property, isLoading } = useProperty(id || '');
  const { data: favorites } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { mutate: createBooking, isPending: isBooking } = useCreateBooking();

  const isFavorite = favorites?.some(f => f.property_id === id);

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to make a booking.",
        variant: "destructive",
      });
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: "Please select dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * Number(property?.price_per_night || 0);

    createBooking({
      property_id: id,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      total_price: totalPrice,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onBecomeHost={() => setShowHostPopup(true)}
          onLanguageSelect={() => setShowLanguagePopup(true)}
        />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onBecomeHost={() => setShowHostPopup(true)}
          onLanguageSelect={() => setShowLanguagePopup(true)}
        />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Property not found</h1>
              <Link to="/" className="text-[#FF5A5F] hover:underline">
                Return to homepage
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const images = property.images || ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop"];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onBecomeHost={() => setShowHostPopup(true)}
        onLanguageSelect={() => setShowLanguagePopup(true)}
      />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to={`/properties/${property.city.toLowerCase()}`} className="hover:underline">{property.city}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Property</span>
          </div>
        </div>

        {/* Property Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-current text-black mr-1" />
                  <span className="font-medium">{property.rating || 4.5}</span>
                  <span className="text-gray-600 ml-1">({property.review_count || 0} reviews)</span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600 underline">{property.location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button variant="ghost" className="flex items-center">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => user && toggleFavorite({ property_id: property.id })}
                className="flex items-center"
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                Save
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            {showAllPhotos ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Property image ${index + 1}`}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                ))}
                <Button 
                  onClick={() => setShowAllPhotos(false)}
                  className="md:col-span-2 mt-4"
                  variant="outline"
                >
                  Show less
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-64 md:h-96">
                <div className="md:col-span-2 relative">
                  <img 
                    src={images[0]} 
                    alt="Main property image"
                    className="w-full h-full object-cover rounded-l-lg md:rounded-lg"
                  />
                </div>
                {images.length > 1 && (
                  <>
                    <div className="hidden md:grid grid-rows-2 gap-2">
                      {images[1] && (
                        <img 
                          src={images[1]} 
                          alt="Property image 2"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {images[2] && (
                        <img 
                          src={images[2]} 
                          alt="Property image 3"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="hidden md:grid grid-rows-2 gap-2">
                      {images[3] && (
                        <img 
                          src={images[3]} 
                          alt="Property image 4"
                          className="w-full h-full object-cover rounded-tr-lg"
                        />
                      )}
                      <div className="relative">
                        {images[4] && (
                          <img 
                            src={images[4]} 
                            alt="Property image 5"
                            className="w-full h-full object-cover rounded-br-lg"
                          />
                        )}
                        {images.length > 4 && (
                          <Button 
                            onClick={() => setShowAllPhotos(true)}
                            className="absolute bottom-4 right-4 bg-white text-black border border-gray-300 hover:bg-gray-50"
                          >
                            Show all photos
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">{property.property_type} in {property.location}</h2>
                <p className="text-gray-600 mb-4">{property.max_guests} guests • {property.bedrooms} bedrooms • {property.bathrooms} bathrooms</p>
                
                {property.is_guest_favorite && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs">✨</span>
                      </div>
                      <span className="font-medium">Rare find!</span>
                    </div>
                    <span className="text-gray-600">This place is usually booked.</span>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={property.profiles?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`} 
                    alt={`${property.profiles?.first_name} ${property.profiles?.last_name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Hosted by {property.profiles?.first_name} {property.profiles?.last_name}</h3>
                    <p className="text-gray-600 text-sm">Superhost</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-semibold">${property.price_per_night}</span>
                      <span className="text-gray-600 ml-1">night</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-current text-black mr-1" />
                      <span className="font-medium">{property.rating || 4.5}</span>
                      <span className="text-gray-600 ml-1">({property.review_count || 0})</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 border rounded-lg">
                      <div className="p-3 border-r">
                        <label className="text-xs font-medium text-gray-600 uppercase">Check-in</label>
                        <input 
                          type="date" 
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="text-sm w-full border-none outline-none"
                        />
                      </div>
                      <div className="p-3">
                        <label className="text-xs font-medium text-gray-600 uppercase">Checkout</label>
                        <input 
                          type="date" 
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="text-sm w-full border-none outline-none"
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <label className="text-xs font-medium text-gray-600 uppercase">Guests</label>
                      <select 
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="text-sm w-full border-none outline-none"
                      >
                        {Array.from({ length: property.max_guests }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <Button 
                      onClick={handleBooking}
                      disabled={isBooking}
                      className="w-full bg-[#FF5A5F] hover:bg-[#e04347] text-white py-3"
                    >
                      {isBooking ? 'Booking...' : 'Reserve'}
                    </Button>

                    <p className="text-center text-sm text-gray-600">You won't be charged yet</p>

                    {checkIn && checkOut && (
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>${property.price_per_night} x {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                          <span>${Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) * Number(property.price_per_night)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) * Number(property.price_per_night)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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

export default PropertyDetail;
