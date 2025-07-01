
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, Smartphone, Plus, History, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { toast } from "sonner";

interface PaymentWalletProps {
  balance: number;
  onBalanceUpdate: (balance: number) => void;
}

const PaymentWallet = ({ balance, onBalanceUpdate }: PaymentWalletProps) => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentProviders = [
    {
      id: "mpesa",
      name: "M-Pesa",
      country: "Kenya",
      logo: "🇰🇪",
      color: "bg-emerald-100 text-emerald-700",
      minAmount: 10
    },
    {
      id: "mtn-momo",
      name: "MTN MoMo",
      country: "Ghana/Uganda",
      logo: "🇬🇭",
      color: "bg-amber-100 text-amber-700",
      minAmount: 15
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      country: "Nigeria/Multi",
      logo: "🇳🇬",
      color: "bg-orange-100 text-orange-700",
      minAmount: 20
    },
    {
      id: "snapscan",
      name: "SnapScan",
      country: "South Africa",
      logo: "🇿🇦",
      color: "bg-blue-100 text-blue-700",
      minAmount: 12
    }
  ];

  const quickAmounts = [20, 50, 100, 200];

  const transactionHistory = [
    { id: 1, type: "topup", amount: 50, provider: "M-Pesa", date: "2025-01-15", status: "completed" },
    { id: 2, type: "payment", amount: -5, description: "Math homework help", date: "2025-01-15", status: "completed" },
    { id: 3, type: "payment", amount: -8, description: "Science practice questions", date: "2025-01-14", status: "completed" },
    { id: 4, type: "topup", amount: 30, provider: "MTN MoMo", date: "2025-01-13", status: "completed" },
    { id: 5, type: "payment", amount: -2, description: "Quick math hint", date: "2025-01-13", status: "completed" }
  ];

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount < 10) {
      toast.error("Minimum top-up amount is R10");
      return;
    }

    if (!selectedProvider) {
      toast.error("Please select a payment provider");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      onBalanceUpdate(balance + amount);
      setTopUpAmount("");
      setSelectedProvider("");
      setIsProcessing(false);
      
      toast.success(`Successfully topped up R${amount.toFixed(2)} via ${paymentProviders.find(p => p.id === selectedProvider)?.name}!`);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Your Askie Wallet</h1>
        <p className="text-slate-600">Manage your balance and payment methods</p>
      </div>

      {/* Balance Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 mb-1">Available Balance</p>
            <p className="text-3xl font-bold">R{balance.toFixed(2)}</p>
            <p className="text-purple-200 text-sm">≈ {Math.floor(balance / 2.5)} questions</p>
          </div>
          <div className="text-6xl opacity-20">
            <Wallet />
          </div>
        </div>
      </Card>

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
          {/* Quick Amounts */}
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Quick Top-Up</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="h-12 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all hover:scale-105"
                  onClick={() => setTopUpAmount(amount.toString())}
                >
                  R{amount}
                </Button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-700">Custom Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount (min R10)"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="text-lg border-purple-200 focus:border-purple-400 rounded-xl"
                />
              </div>
            </div>
          </Card>

          {/* Payment Providers */}
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Choose Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
                    selectedProvider === provider.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{provider.logo}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{provider.name}</h4>
                      <p className="text-sm text-slate-600">{provider.country}</p>
                    </div>
                    <Badge className={provider.color}>
                      Min R{provider.minAmount}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl" 
              size="lg"
              onClick={handleTopUp}
              disabled={!topUpAmount || !selectedProvider || isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Top Up R{topUpAmount || "0"}
                </>
              )}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Transaction History</h3>
            <div className="space-y-3">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl border border-purple-100 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'topup' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'topup' ? (
                        <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {transaction.type === 'topup' ? 
                          `Top-up via ${transaction.provider}` : 
                          transaction.description
                        }
                      </p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentWallet;
