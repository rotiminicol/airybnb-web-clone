
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, X } from 'lucide-react';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupModal = ({ isOpen, onClose }: LoginSignupModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+234');

  const countryCodes = [
    { code: '+234', country: 'Nigeria' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
    { code: '+81', country: 'Japan' },
  ];

  const handleContinue = () => {
    console.log('Continue with phone:', countryCode + phoneNumber);
    // Handle phone authentication
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
    // Handle social authentication
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-lg font-semibold text-center">
            Log in or sign up
          </DialogTitle>
          <p className="text-2xl font-semibold text-center mt-2">
            Welcome to Airbnb
          </p>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Phone Authentication Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <p className="text-xs text-gray-600 leading-4">
              We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
              <a href="#" className="underline">Privacy Policy</a>
            </p>

            <Button 
              onClick={handleContinue}
              className="w-full bg-[#FF5A5F] hover:bg-[#e04347] text-white font-medium py-3"
            >
              Continue
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Social Authentication */}
          <div className="space-y-3">
            <Button
              onClick={() => handleSocialLogin('google')}
              variant="outline"
              className="w-full justify-start py-3 text-sm font-medium border-gray-300"
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>

            <Button
              onClick={() => handleSocialLogin('apple')}
              variant="outline"
              className="w-full justify-start py-3 text-sm font-medium border-gray-300"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </Button>

            <Button
              onClick={() => handleSocialLogin('facebook')}
              variant="outline"
              className="w-full justify-start py-3 text-sm font-medium border-gray-300"
            >
              <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Button>

            <Button
              onClick={() => handleSocialLogin('email')}
              variant="outline"
              className="w-full justify-start py-3 text-sm font-medium border-gray-300"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continue with email
            </Button>
          </div>
        </div>

        {/* Footer with Sample Listings */}
        <div className="border-t bg-gray-50 p-4">
          <p className="text-xs text-gray-600 mb-3">Popular with guests:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-800">Room in Stockwell Gardens Estate</span>
              <div className="flex items-center">
                <span className="text-gray-800">$103 for 2 nights</span>
                <span className="ml-2">⭐4.97</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-800">Entire condo in Lagos Island</span>
              <div className="flex items-center">
                <span className="text-gray-800">$89 for 2 nights</span>
                <span className="ml-2">⭐4.92</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;
