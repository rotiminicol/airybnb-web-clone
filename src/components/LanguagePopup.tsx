
import { X } from 'lucide-react';
import { useState } from 'react';

interface LanguagePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguagePopup = ({ isOpen, onClose }: LanguagePopupProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (United Kingdom)');

  const languages = [
    'English (United Kingdom)',
    'English (United States)',
    'Español (Argentina)',
    'Español (España)',
    'Français (France)',
    'Deutsch (Deutschland)',
    'Italiano (Italia)',
    '中文 (中国)',
    '日本語 (日本)',
    'Português (Brasil)',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 z-10 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Choose a language and region
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="max-h-80 overflow-y-auto mb-6">
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedLanguage === language 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg hover:bg-[#E04E53] transition-colors font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;
