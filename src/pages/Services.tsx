
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { useState } from 'react';

const Services = () => {
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  const photographyServices = [
    {
      id: 1,
      title: "Stylish vintage car photo shoot Tour",
      location: "Rome, Italy",
      price: 62,
      rating: 4.89,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      category: "Photography"
    },
    {
      id: 2,
      title: "Professional portrait session",
      location: "Paris, France",
      price: 95,
      rating: 4.94,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      category: "Photography"
    },
    {
      id: 3,
      title: "Wedding photography experience",
      location: "Barcelona, Spain",
      price: 180,
      rating: 4.91,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      category: "Photography"
    }
  ];

  const trainingServices = [
    {
      id: 4,
      title: "Total Body Training by Peter",
      location: "Pasadena",
      price: 90,
      rating: 4.87,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      category: "Training"
    },
    {
      id: 5,
      title: "Yoga and meditation session",
      location: "Santa Monica",
      price: 75,
      rating: 4.92,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      category: "Training"
    },
    {
      id: 6,
      title: "Personal strength coaching",
      location: "Venice Beach",
      price: 110,
      rating: 4.88,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      category: "Training"
    }
  ];

  const foodServices = [
    {
      id: 7,
      title: "The Vegan Experience: Plant Based Private Chef",
      location: "Los Angeles",
      price: 50,
      rating: 4.96,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      category: "Food"
    },
    {
      id: 8,
      title: "Italian cooking masterclass",
      location: "San Francisco",
      price: 85,
      rating: 4.93,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      category: "Food"
    },
    {
      id: 9,
      title: "Wine pairing dinner experience",
      location: "Napa Valley",
      price: 125,
      rating: 4.89,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      category: "Food"
    }
  ];

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
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Photography Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographyServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Training Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Training & Fitness
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Food Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Food & Culinary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

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
