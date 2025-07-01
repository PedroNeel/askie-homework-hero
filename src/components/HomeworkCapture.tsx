
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageSquare, Upload, Zap, BookOpen, Star, Clock, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface HomeworkCaptureProps {
  userBalance: number;
  onBalanceUpdate: (balance: number) => void;
  onStarsEarned: (stars: number) => void;
}

const HomeworkCapture = ({ userBalance, onBalanceUpdate, onStarsEarned }: HomeworkCaptureProps) => {
  const [question, setQuestion] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [selectedTier, setSelectedTier] = useState<string>("");

  const questionTiers = [
    {
      id: "hint",
      name: "Quick Hint",
      price: 2.00,
      icon: Zap,
      description: "Fast pointer in the right direction",
      color: "bg-baobab-100 text-baobab-700"
    },
    {
      id: "walkthrough",
      name: "Full Walkthrough", 
      price: 5.00,
      icon: BookOpen,
      description: "Complete step-by-step solution",
      color: "bg-sunset-100 text-sunset-700"
    },
    {
      id: "practice",
      name: "Try It Yourself",
      price: 8.00,
      icon: Star,
      description: "Solution + similar practice questions",
      color: "bg-savanna-100 text-savanna-700"
    }
  ];

  const sampleResponses = {
    hint: {
      text: "💡 **Quick Hint**: This is a quadratic equation! Try using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. Remember: a=1, b=-5, c=6",
      timeEstimate: "30 seconds"
    },
    walkthrough: {
      text: `📚 **Complete Solution**:

**Step 1**: Identify the quadratic equation
x² - 5x + 6 = 0

**Step 2**: Use the quadratic formula
x = (-b ± √(b²-4ac)) / 2a
Where a=1, b=-5, c=6

**Step 3**: Calculate the discriminant
b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1

**Step 4**: Solve for x
x = (5 ± √1) / 2 = (5 ± 1) / 2

**Step 5**: Find both solutions
x₁ = (5 + 1) / 2 = 3
x₂ = (5 - 1) / 2 = 2

**Answer**: x = 2 or x = 3 ✅`,
      timeEstimate: "2 minutes"
    },
    practice: {
      text: `🎯 **Complete Solution + Practice**:

[Same solution as walkthrough above]

**Now try these similar problems**:
1. x² - 7x + 12 = 0
2. x² - 3x + 2 = 0
3. x² - 8x + 15 = 0

**Study Tip**: Look for two numbers that multiply to give 'c' and add to give 'b'!

🌟 **Well done!** You've earned 2 Family Stars for completing this question!`,
      timeEstimate: "5 minutes",
      starsEarned: 2
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      toast.success("Image uploaded! Ready to analyze your homework.");
    }
  };

  const handleSubmitQuestion = async (tier: string) => {
    if (!question && !imageFile) {
      toast.error("Please enter a question or upload an image");
      return;
    }

    const selectedTierData = questionTiers.find(t => t.id === tier);
    if (!selectedTierData) return;

    if (userBalance < selectedTierData.price) {
      toast.error("Insufficient balance. Please top up your wallet.");
      return;
    }

    setIsProcessing(true);
    setSelectedTier(tier);

    // Simulate AI processing
    setTimeout(() => {
      const response = sampleResponses[tier as keyof typeof sampleResponses];
      setAiResponse({ ...response, tier });
      
      onBalanceUpdate(userBalance - selectedTierData.price);
      
      if (response.starsEarned) {
        onStarsEarned(response.starsEarned);
        toast.success(`Amazing! You earned ${response.starsEarned} Family Stars! 🌟`);
      }
      
      setIsProcessing(false);
      toast.success(`Answer generated! Balance: R${(userBalance - selectedTierData.price).toFixed(2)}`);
    }, 2000);
  };

  const resetCapture = () => {
    setQuestion("");
    setImageFile(null);
    setAiResponse(null);
    setSelectedTier("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Ask Askie Anything!</h1>
        <p className="text-gray-600">Snap a photo or type your homework question</p>
        <Badge variant="outline" className="mt-2">
          Balance: R{userBalance.toFixed(2)}
        </Badge>
      </div>

      {!aiResponse ? (
        <>
          {/* Question Input */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Your Question
            </h2>
            
            <div className="space-y-4">
              <Textarea
                placeholder="Type your homework question here... (supports English, Afrikaans, Swahili, Yoruba, and more!)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-32"
              />
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <Camera className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-gray-600">
                      {imageFile ? `📷 ${imageFile.name}` : "Click to upload homework photo"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Supports handwritten and printed questions
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Answer Tiers */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Choose Your Answer Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {questionTiers.map((tier) => (
                <Card 
                  key={tier.id}
                  className={`p-4 cursor-pointer hover-lift border-2 ${selectedTier === tier.id ? 'border-sunset-300 bg-sunset-50' : 'border-gray-200'}`}
                  onClick={() => handleSubmitQuestion(tier.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <tier.icon className="w-6 h-6 text-sunset-500" />
                    <Badge className={tier.color}>R{tier.price.toFixed(2)}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{tier.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                  <Button 
                    className="w-full" 
                    disabled={userBalance < tier.price || isProcessing}
                    variant={userBalance < tier.price ? "outline" : "default"}
                  >
                    {isProcessing && selectedTier === tier.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      `Get ${tier.name}`
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </>
      ) : (
        /* AI Response */
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sunset-500" />
              Your Answer
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1">
                <Clock className="w-4 h-4" />
                {aiResponse.timeEstimate}
              </Badge>
              <Button size="sm" variant="outline">
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <div className="prose prose-sm max-w-none">
              {aiResponse.text.split('\n').map((line: string, index: number) => (
                <p key={index} className="mb-2 whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {aiResponse.starsEarned && (
            <div className="bg-gradient-to-r from-baobab-50 to-savanna-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-baobab-700">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Congratulations! You earned {aiResponse.starsEarned} Family Stars!</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={resetCapture} className="flex-1">
              Ask Another Question
            </Button>
            <Button variant="outline" onClick={() => toast.success("Answer shared with family!")}>
              Share with Family
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HomeworkCapture;
