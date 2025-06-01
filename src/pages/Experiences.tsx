
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExperienceCard from '../components/ExperienceCard';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Experiences = () => {
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  const londonExperiences = [
    {
      id: 1,
      title: "London sightseeing walking tour",
      price: 26,
      rating: 4.96,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      location: "London"
    },
    {
      id: 2,
      title: "Private photography session in London",
      price: 85,
      rating: 4.91,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      location: "London"
    },
    {
      id: 3,
      title: "Thames river cruise with local guide",
      price: 42,
      rating: 4.88,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      location: "London"
    }
  ];

  const capeTownExperiences = [
    {
      id: 4,
      title: "Table Mountain sunset hike",
      price: 38,
      rating: 4.94,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      location: "Cape Town"
    },
    {
      id: 5,
      title: "Wine tasting in Stellenbosch",
      price: 67,
      rating: 4.89,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      location: "Cape Town"
    },
    {
      id: 6,
      title: "Penguin colony visit",
      price: 45,
      rating: 4.92,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      location: "Cape Town"
    }
  ];

  const airbnbOriginals = [
    {
      id: 7,
      title: "Hike in the Alps with Olympian Omar Visintin",
      price: 120,
      rating: 4.98,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      location: "Switzerland",
      isOriginal: true,
      description: "Experience the thrill of alpine hiking with Olympic snowboarder Omar Visintin as your guide through the stunning Swiss Alps."
    },
    {
      id: 8,
      title: "Cook with a Michelin-starred chef in Paris",
      price: 185,
      rating: 4.95,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
      location: "Paris",
      isOriginal: true,
      description: "Master French culinary techniques in an intimate cooking class with a renowned Michelin-starred chef."
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
              Popular with travelers from your area
            </h1>
          </div>

          {/* London Experiences */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                Experiences in London
                <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
              </h2>
            </div>
            
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {londonExperiences.map(experience => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>

          {/* Cape Town Experiences */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                Experiences in Cape Town
                <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
              </h2>
            </div>
            
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {capeTownExperiences.map(experience => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>

          {/* Airbnb Originals */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Airbnb Originals
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {airbnbOriginals.map(experience => (
                <div key={experience.id} className="group cursor-pointer">
                  <div className="relative mb-4">
                    <img 
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
                      Original
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{experience.title}</h3>
                    <p className="text-gray-600 text-sm">{experience.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">
                        <span className="text-gray-900">From ${experience.price}</span>
                        <span className="text-gray-600 font-normal"> / guest</span>
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm">⭐</span>
                        <span className="text-sm font-medium ml-1">{experience.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default Experiences;
