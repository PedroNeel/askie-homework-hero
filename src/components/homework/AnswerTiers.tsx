
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, BookOpen, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnswerTiersProps {
  currentBalance: number;
  onTierSelect: (tier: string) => void;
  isProcessing: boolean;
  selectedTier: string;
}

const AnswerTiers = ({ currentBalance, onTierSelect, isProcessing, selectedTier }: AnswerTiersProps) => {
  const { t } = useLanguage();
  
  const questionTiers = [
    {
      id: "hint",
      name: t('homework.quick_hint'),
      price: 2.00,
      icon: Zap,
      description: t('homework.quick_hint_desc'),
      color: "bg-purple-100 text-purple-700",
      buttonText: t('homework.get_hint')
    },
    {
      id: "walkthrough",
      name: t('homework.full_walkthrough'), 
      price: 5.00,
      icon: BookOpen,
      description: t('homework.full_walkthrough_desc'),
      color: "bg-blue-100 text-blue-700",
      buttonText: t('homework.get_walkthrough')
    },
    {
      id: "practice",
      name: t('homework.try_yourself'),
      price: 8.00,
      icon: Star,
      description: t('homework.try_yourself_desc'),
      color: "bg-emerald-100 text-emerald-700",
      buttonText: t('homework.get_practice')
    }
  ];

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4">{t('homework.choose_level')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questionTiers.map((tier) => (
          <Card 
            key={tier.id}
            className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${selectedTier === tier.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
            onClick={() => onTierSelect(tier.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <tier.icon className="w-6 h-6 text-purple-600" />
              <Badge className={tier.color}>R{tier.price.toFixed(2)}</Badge>
            </div>
            <h3 className="font-semibold mb-1">{tier.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
              disabled={currentBalance < tier.price || isProcessing}
              variant={currentBalance < tier.price ? "outline" : "default"}
            >
              {isProcessing && selectedTier === tier.id ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('homework.processing')}
                </div>
              ) : (
                tier.buttonText
              )}
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AnswerTiers;
