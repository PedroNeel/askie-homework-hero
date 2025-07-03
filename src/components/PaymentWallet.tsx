
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, History } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import WalletBalance from "./wallet/WalletBalance";
import TopUpSection from "./wallet/TopUpSection";
import TransactionHistory from "./wallet/TransactionHistory";
import MobileMoneyPayment from "./MobileMoneyPayment";
import SouthAfricanPayment from "./payment/SouthAfricanPayment";

interface PaymentWalletProps {
  balance: number;
  onBalanceUpdate: (balance: number) => void;
}

const PaymentWallet = ({ balance, onBalanceUpdate }: PaymentWalletProps) => {
  const { wallet, addTransaction, updateWalletBalance } = useUserData();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'sa'>('mobile');
  const [topUpAmount, setTopUpAmount] = useState("");

  const currentBalance = wallet?.balance || 0;

  const handleTopUpClick = (amount: string) => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount < 10) {
      toast.error("Minimum top-up amount is R10");
      return;
    }
    setTopUpAmount(amount);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (amount: number) => {
    try {
      const newBalance = currentBalance + amount;
      
      await updateWalletBalance(newBalance);
      
      await addTransaction(
        amount,
        'top_up',
        `${paymentMethod === 'mobile' ? 'Mobile Money' : 'South African Payment'} top-up`
      );
      
      onBalanceUpdate(newBalance);
      setTopUpAmount("");
      setShowPayment(false);
      
      toast.success(`Successfully topped up R${amount.toFixed(2)}!`);
    } catch (error) {
      toast.error("Failed to update wallet balance");
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setPaymentMethod('mobile')}
            className={`px-4 py-2 rounded-lg ${paymentMethod === 'mobile' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Mobile Money
          </button>
          <button
            onClick={() => setPaymentMethod('sa')}
            className={`px-4 py-2 rounded-lg ${paymentMethod === 'sa' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            SA Banking
          </button>
        </div>
        
        {paymentMethod === 'mobile' ? (
          <MobileMoneyPayment
            amount={parseFloat(topUpAmount)}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        ) : (
          <SouthAfricanPayment
            amount={parseFloat(topUpAmount)}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Your Askie Wallet</h1>
        <p className="text-slate-600">Manage your balance and payment methods</p>
      </div>

      <WalletBalance balance={currentBalance} />

      <Tabs defaultValue="topup" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="topup" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Plus className="w-4 h-4" />
            Top Up
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topup" className="space-y-6">
          <TopUpSection 
            balance={currentBalance}
            onTopUpClick={handleTopUpClick}
            isProcessing={false}
          />
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentWallet;
