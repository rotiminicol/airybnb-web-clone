
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedListings from '../components/FeaturedListings';
import InspirationSection from '../components/InspirationSection';
import BecomeHostPopup from '../components/BecomeHostPopup';
import LanguagePopup from '../components/LanguagePopup';
import { useState } from 'react';

const Index = () => {
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onBecomeHost={() => setShowHostPopup(true)}
        onLanguageSelect={() => setShowLanguagePopup(true)}
      />
      
      <main className="pt-20">
        <FeaturedListings />
        <InspirationSection />
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

export default Index;
