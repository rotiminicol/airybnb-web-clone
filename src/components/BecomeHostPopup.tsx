
import { X } from 'lucide-react';

interface BecomeHostPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const BecomeHostPopup = ({ isOpen, onClose }: BecomeHostPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏠</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              It's easy to start hosting and earn extra income.
            </h2>
          </div>
          
          <div className="space-y-4">
            <button className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg hover:bg-[#E04E53] transition-colors font-medium">
              Refer a Host
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Find a co-host
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Log in or sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostPopup;
