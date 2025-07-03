
import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface WalletBalanceProps {
  balance: number;
}

const WalletBalance = ({ balance }: WalletBalanceProps) => {
  return (
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
  );
};

export default WalletBalance;
