import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { useState } from 'react';
import { useServices } from '@/hooks/useServices';

const Services = () => {
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const { data: services, isLoading } = useServices();

  // Group services by category
  const photographyServices = services?.filter(service => service.category === 'photography') || [];
  const trainingServices = services?.filter(service => service.category === 'training') || [];
  const foodServices = services?.filter(service => service.category === 'food') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onBecomeHost={() => setShowHostPopup(true)}
          onLanguageSelect={() => setShowLanguagePopup(true)}
        />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="space-y-4">
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              Discover Services
            </h1>
            <p className="text-gray-600 text-lg">
              Book unique services from local professionals
            </p>
          </div>

          {/* Photography Services */}
          {photographyServices.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Photography Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photographyServices.slice(0, 3).map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={{
                      id: Number(service.id),
                      title: service.title,
                      location: service.location,
                      price: Number(service.price),
                      rating: Number(service.rating) || 4.5,
                      image: service.images?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
                      category: service.category
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Training Services */}
          {trainingServices.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Fitness & Training
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingServices.slice(0, 3).map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={{
                      id: Number(service.id),
                      title: service.title,
                      location: service.location,
                      price: Number(service.price),
                      rating: Number(service.rating) || 4.5,
                      image: service.images?.[0] || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
                      category: service.category
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Food Services */}
          {foodServices.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Food & Culinary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodServices.slice(0, 3).map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={{
                      id: Number(service.id),
                      title: service.title,
                      location: service.location,
                      price: Number(service.price),
                      rating: Number(service.rating) || 4.5,
                      image: service.images?.[0] || "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
                      category: service.category
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Hosting CTA Section */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What would you like to host?
            </h2>
            <p className="text-gray-600 mb-6">
              Share your skills and earn extra income by hosting your own service
            </p>
            <button 
              onClick={() => setShowHostPopup(true)}
              className="bg-[#FF5A5F] text-white px-8 py-3 rounded-lg hover:bg-[#E04E53] transition-colors font-medium"
            >
              Become a Host
            </button>
          </div>
        </div>
      </main>
      
      <Footer onLanguageSelect={() => setShowLanguagePopup(true)} />
      
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

export default Services;
