
import { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    total_price: number;
    property_title?: string;
    experience_title?: string;
    service_title?: string;
    check_in?: string;
    check_out?: string;
    booking_date?: string;
    guests: number;
  };
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, booking, onPaymentSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      toast({
        title: "Please fill all fields",
        description: "All payment details are required",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          booking_id: booking.id,
          payment_method: paymentMethod,
          card_details: cardDetails
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Payment Successful!",
          description: "Your booking has been confirmed. You'll receive a confirmation email shortly.",
        });
        onPaymentSuccess();
        onClose();
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again with different payment details.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const itemTitle = booking.property_title || booking.experience_title || booking.service_title;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <h2 className="text-xl font-semibold">Complete Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <p className="text-sm text-gray-600 mb-1">{itemTitle}</p>
            {booking.check_in && booking.check_out && (
              <p className="text-sm text-gray-600 mb-1">
                {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
              </p>
            )}
            {booking.booking_date && (
              <p className="text-sm text-gray-600 mb-1">
                Date: {new Date(booking.booking_date).toLocaleDateString()}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-2">{booking.guests} guests</p>
            <p className="font-semibold">Total: ${booking.total_price}</p>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Method
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#FF5A5F]"
                />
                <span>Credit/Debit Card</span>
              </label>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setCardDetails({...cardDetails, number: formatted});
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      const formatted = value.replace(/(\d{2})(?=\d)/, '$1/');
                      setCardDetails({...cardDetails, expiry: formatted});
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                      setCardDetails({...cardDetails, cvv: value});
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            <Lock className="w-4 h-4 text-green-600" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#FF5A5F] hover:bg-[#e04347] text-white py-3 text-lg font-medium"
          >
            {isProcessing ? 'Processing...' : `Pay $${booking.total_price}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
