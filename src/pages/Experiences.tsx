import Header from '../components/Header';
import Footer from '../components/Footer';
import ExperienceCard from '../components/ExperienceCard';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useExperiences } from '@/hooks/useExperiences';

const Experiences = () => {
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const { data: experiences, isLoading } = useExperiences();

  // Group experiences by location
  const londonExperiences = experiences?.filter(exp => exp.city.toLowerCase() === 'london') || [];
  const capeTownExperiences = experiences?.filter(exp => exp.city.toLowerCase() === 'cape town') || [];
  const featuredExperiences = experiences?.filter(exp => exp.category === 'culture' || exp.category === 'food') || [];

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
                  <div className="flex space-x-6 overflow-hidden">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex-shrink-0 w-80">
                        <div className="h-64 bg-gray-200 rounded-lg mb-3"></div>
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
              Popular with travelers from your area
            </h1>
          </div>

          {/* London Experiences */}
          {londonExperiences.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  Experiences in London
                  <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
                </h2>
              </div>
              
              <div className="flex space-x-6 overflow-x-auto pb-4">
                {londonExperiences.slice(0, 3).map(experience => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={{
                      id: Number(experience.id),
                      title: experience.title,
                      price: Number(experience.price_per_person),
                      rating: Number(experience.rating) || 4.5,
                      image: experience.images?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
                      location: experience.location
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Cape Town Experiences */}
          {capeTownExperiences.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  Experiences in Cape Town
                  <ChevronRight className="w-6 h-6 ml-2 text-gray-600" />
                </h2>
              </div>
              
              <div className="flex space-x-6 overflow-x-auto pb-4">
                {capeTownExperiences.slice(0, 3).map(experience => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={{
                      id: Number(experience.id),
                      title: experience.title,
                      price: Number(experience.price_per_person),
                      rating: Number(experience.rating) || 4.5,
                      image: experience.images?.[0] || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
                      location: experience.location
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Featured Experiences */}
          {featuredExperiences.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Featured Experiences
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredExperiences.slice(0, 2).map(experience => (
                  <div key={experience.id} className="group cursor-pointer">
                    <div className="relative mb-4">
                      <img 
                        src={experience.images?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop"}
                        alt={experience.title}
                        className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
                        Featured
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{experience.title}</h3>
                      <p className="text-gray-600 text-sm">{experience.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">
                          <span className="text-gray-900">From ${experience.price_per_person}</span>
                          <span className="text-gray-600 font-normal"> / guest</span>
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm">⭐</span>
                          <span className="text-sm font-medium ml-1">{experience.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
