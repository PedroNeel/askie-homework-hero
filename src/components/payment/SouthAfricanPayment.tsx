
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SouthAfricanPaymentProps {
  amount: number;
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

const SouthAfricanPayment = ({ amount, onSuccess, onCancel }: SouthAfricanPaymentProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'eft' | 'ozow' | 'payfast' | ''>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);

  const paymentMethods = [
    {
      id: 'eft' as const,
      name: 'EFT / Bank Transfer',
      description: 'Instant EFT with major SA banks',
      logo: '🏦',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'ozow' as const,
      name: 'Ozow',
      description: 'Instant EFT payments',
      logo: '💳',
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'payfast' as const,
      name: 'PayFast',
      description: 'Card payments & EFT',
      logo: '🔒',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus('success');
        toast.success("Payment successful! Your wallet has been topped up.");
        onSuccess(amount);
      }, 3000);
    } catch (error) {
      setPaymentStatus('failed');
      toast.error("Payment failed. Please try again.");
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
        <p className="text-gray-600">Something went wrong. Please try again.</p>
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
          <Label className="text-sm font-medium mb-2 block">Choose Payment Method</Label>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedMethod === method.id 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{method.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {paymentStatus === 'pending' && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Processing Payment</p>
              <p className="text-sm text-blue-600">Please wait while we process your payment</p>
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
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Pay R{amount.toFixed(2)}
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default SouthAfricanPayment;
