
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PropertyDetail = () => {
  const { id } = useParams();
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample property data - in a real app this would come from the API
  const property = {
    id: id,
    title: "Private Double Room near Tower Bridge",
    location: "Room in Greater London, United Kingdom",
    bedInfo: "1 double bed • Shared bathroom",
    rating: 4.97,
    reviewCount: 276,
    host: {
      name: "Shawn",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isVerified: true,
      joinDate: "2019"
    },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    ],
    price: 103,
    isRareFind: true,
    description: "Enjoy a peaceful stay in this comfortable private double room located just minutes from Tower Bridge. The room features a comfortable double bed, workspace, and access to shared facilities. Perfect for solo travelers or couples looking to explore London."
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

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
            <Link to="/properties/london" className="hover:underline">London</Link>
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
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600 ml-1">({property.reviewCount} reviews)</span>
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
                onClick={() => setIsFavorite(!isFavorite)}
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
                {property.images.map((image, index) => (
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
                    src={property.images[0]} 
                    alt="Main property image"
                    className="w-full h-full object-cover rounded-l-lg md:rounded-lg"
                  />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-2">
                  <img 
                    src={property.images[1]} 
                    alt="Property image 2"
                    className="w-full h-full object-cover"
                  />
                  <img 
                    src={property.images[2]} 
                    alt="Property image 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-2">
                  <img 
                    src={property.images[3]} 
                    alt="Property image 4"
                    className="w-full h-full object-cover rounded-tr-lg"
                  />
                  <div className="relative">
                    <img 
                      src={property.images[4]} 
                      alt="Property image 5"
                      className="w-full h-full object-cover rounded-br-lg"
                    />
                    <Button 
                      onClick={() => setShowAllPhotos(true)}
                      className="absolute bottom-4 right-4 bg-white text-black border border-gray-300 hover:bg-gray-50"
                    >
                      Show all photos
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">{property.location}</h2>
                <p className="text-gray-600 mb-4">{property.bedInfo}</p>
                
                {property.isRareFind && (
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
                    src={property.host.avatar} 
                    alt={property.host.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Hosted by {property.host.name}</h3>
                    <p className="text-gray-600 text-sm">Joined in {property.host.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-semibold">${property.price}</span>
                      <span className="text-gray-600 ml-1">night</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-current text-black mr-1" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-gray-600 ml-1">({property.reviewCount})</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 border rounded-lg">
                      <div className="p-3 border-r">
                        <label className="text-xs font-medium text-gray-600 uppercase">Check-in</label>
                        <div className="text-sm">Add date</div>
                      </div>
                      <div className="p-3">
                        <label className="text-xs font-medium text-gray-600 uppercase">Checkout</label>
                        <div className="text-sm">Add date</div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <label className="text-xs font-medium text-gray-600 uppercase">Guests</label>
                      <div className="text-sm">1 guest</div>
                    </div>

                    <Button className="w-full bg-[#FF5A5F] hover:bg-[#e04347] text-white py-3">
                      Reserve
                    </Button>

                    <p className="text-center text-sm text-gray-600">You won't be charged yet</p>
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
