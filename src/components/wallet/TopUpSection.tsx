
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";

interface TopUpSectionProps {
  balance: number;
  onTopUpClick: (amount: string) => void;
  isProcessing: boolean;
}

const TopUpSection = ({ balance, onTopUpClick, isProcessing }: TopUpSectionProps) => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const quickAmounts = [20, 50, 100, 200];

  const handleTopUpClick = () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount < 10) {
      toast.error("Minimum top-up amount is R10");
      return;
    }
    onTopUpClick(topUpAmount);
  };

  return (
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

      <Button 
        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl" 
        size="lg"
        onClick={handleTopUpClick}
        disabled={!topUpAmount || isProcessing}
      >
        <Smartphone className="w-5 h-5 mr-2" />
        Top Up with Mobile Money
      </Button>
    </Card>
  );
};

export default TopUpSection;
