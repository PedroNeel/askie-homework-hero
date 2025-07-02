
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MobileMoneyPaymentProps {
  amount: number;
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

const MobileMoneyPayment = ({ amount, onSuccess, onCancel }: MobileMoneyPaymentProps) => {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<'mpesa' | 'mtn_momo' | ''>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);

  const providers = [
    {
      id: 'mpesa' as const,
      name: 'M-Pesa',
      country: 'Kenya',
      logo: '🇰🇪',
      color: 'bg-emerald-100 text-emerald-700',
      format: 'e.g., 254712345678'
    },
    {
      id: 'mtn_momo' as const,
      name: 'MTN MoMo',
      country: 'Ghana/Uganda',
      logo: '🇬🇭',
      color: 'bg-amber-100 text-amber-700',
      format: 'e.g., 233241234567'
    }
  ];

  const handlePayment = async () => {
    if (!user || !selectedProvider || !phoneNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      const { data, error } = await supabase.functions.invoke('mobile-money-payment', {
        body: {
          amount,
          phoneNumber,
          provider: selectedProvider,
          userId: user.id
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(data.message);
        
        // Simulate payment confirmation after a delay
        setTimeout(() => {
          setPaymentStatus('success');
          toast.success("Payment confirmed! Your wallet has been topped up.");
          onSuccess(amount);
        }, 10000); // 10 seconds simulation
      } else {
        setPaymentStatus('failed');
        toast.error(data.message || "Payment failed");
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      toast.error(error.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="p-6 text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
        <h3 className="text-xl font-semibold">Payment Successful!</h3>
        <p className="text-gray-600">Your wallet has been topped up with R{amount.toFixed(2)}</p>
        <Button onClick={() => onSuccess(amount)} className="w-full">
          Continue
        </Button>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="p-6 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h3 className="text-xl font-semibold">Payment Failed</h3>
        <p className="text-gray-600">Something went wrong with your payment. Please try again.</p>
        <div className="flex gap-2">
          <Button onClick={() => setPaymentStatus(null)} variant="outline" className="flex-1">
            Try Again
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Complete Payment</h3>
        <Badge variant="outline" className="text-lg px-3 py-1">
          R{amount.toFixed(2)}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Choose Payment Provider</Label>
          <div className="grid grid-cols-1 gap-3">
            {providers.map((provider) => (
              <Card
                key={provider.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedProvider === provider.id 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{provider.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-sm text-gray-600">{provider.country}</p>
                  </div>
                  {selectedProvider === provider.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={
              selectedProvider 
                ? providers.find(p => p.id === selectedProvider)?.format 
                : "Select provider first"
            }
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include country code (e.g., 254 for Kenya, 233 for Ghana)
          </p>
        </div>
      </div>

      {paymentStatus === 'pending' && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Payment Request Sent</p>
              <p className="text-sm text-blue-600">Check your phone and enter your PIN to complete payment</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={onCancel} 
          variant="outline" 
          className="flex-1"
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          onClick={handlePayment} 
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600" 
          disabled={!selectedProvider || !phoneNumber || isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Pay R{amount.toFixed(2)}
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default MobileMoneyPayment;
