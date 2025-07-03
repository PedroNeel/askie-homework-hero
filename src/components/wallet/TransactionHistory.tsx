
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const TransactionHistory = () => {
  const transactionHistory = [
    { id: 1, type: "topup", amount: 50, provider: "M-Pesa", date: "2025-01-15", status: "completed" },
    { id: 2, type: "payment", amount: -5, description: "Math homework help", date: "2025-01-15", status: "completed" },
    { id: 3, type: "payment", amount: -8, description: "Science practice questions", date: "2025-01-14", status: "completed" },
    { id: 4, type: "topup", amount: 30, provider: "MTN MoMo", date: "2025-01-13", status: "completed" },
    { id: 5, type: "payment", amount: -2, description: "Quick math hint", date: "2025-01-13", status: "completed" }
  ];

  return (
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
  );
};

export default TransactionHistory;
