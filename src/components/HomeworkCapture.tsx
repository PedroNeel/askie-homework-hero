
import { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import QuestionInput from "./homework/QuestionInput";
import AnswerTiers from "./homework/AnswerTiers";
import GamificationLevel from "./homework/GamificationLevel";
import HomeworkResponse from "./homework/HomeworkResponse";

interface HomeworkCaptureProps {
  userBalance: number;
  onBalanceUpdate: (balance: number) => void;
  onStarsEarned: (stars: number) => void;
}

interface AIResponse {
  text: string;
  timeEstimate: string;
  tier: string;
  starsEarned?: number;
}

const HomeworkCapture = ({ userBalance, onBalanceUpdate, onStarsEarned }: HomeworkCaptureProps) => {
  const { user } = useAuth();
  const { wallet, saveHomeworkSession, updateWalletBalance, addTransaction, sessions } = useUserData();
  const [question, setQuestion] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("");

  const currentBalance = wallet?.balance || 0;
  const userLevel = Math.floor((wallet?.total_stars || 0) / 50) + 1;

  const questionTiers = [
    { id: "hint", name: "Quick Hint", price: 2.00 },
    { id: "walkthrough", name: "Full Walkthrough", price: 5.00 },
    { id: "practice", name: "Try It Yourself", price: 8.00 }
  ];

  const handleQuestionSubmit = async (questionText: string, imageFile: File | null) => {
    // This function will be triggered by the send button
  };

  const handleSubmitQuestion = async (tier: string) => {
    if (!question && !imageFile) {
      toast.error("Please enter a question or upload an image");
      return;
    }

    const selectedTierData = questionTiers.find(t => t.id === tier);
    if (!selectedTierData || !user) return;

    if (currentBalance < selectedTierData.price) {
      toast.error("Insufficient balance. Please top up your wallet.");
      return;
    }

    setIsProcessing(true);
    setSelectedTier(tier);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = "uploaded_image_url";
      }

      const { data, error } = await supabase.functions.invoke('ai-homework-help', {
        body: {
          question: question || 'Please help me solve this problem from the image:',
          tier,
          imageUrl,
          userId: user.id
        }
      });

      if (error) throw error;

      const response = {
        text: data.aiResponse,
        timeEstimate: data.timeEstimate,
        tier,
        starsEarned: data.starsEarned
      };

      setAiResponse(response);
      
      const newBalance = currentBalance - selectedTierData.price;
      const starsEarned = response.starsEarned || 0;
      
      await updateWalletBalance(newBalance, starsEarned);
      
      await addTransaction(
        -selectedTierData.price,
        'payment',
        `${selectedTierData.name} - Homework help`
      );
      
      await saveHomeworkSession(
        question || 'Image uploaded',
        tier,
        response.text,
        starsEarned,
        selectedTierData.price,
        imageUrl
      );

      if (user.email) {
        await supabase.functions.invoke('send-notification-email', {
          body: {
            to: user.email,
            subject: 'Homework Question Completed!',
            type: 'homework_completed',
            data: {
              question: question || 'Image question',
              tier: selectedTierData.name,
              starsEarned
            }
          }
        });
      }
      
      if (starsEarned > 0) {
        toast.success(`Amazing! You earned ${starsEarned} Family Stars! 🌟`);
        onStarsEarned(starsEarned);
      }
      
      onBalanceUpdate(newBalance);
      toast.success(`Answer generated! New balance: R${newBalance.toFixed(2)}`);

    } catch (error: any) {
      console.error('Error processing homework:', error);
      toast.error(error.message || "Failed to process homework question");
    } finally {
      setIsProcessing(false);
    }
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Ask Askie Anything!</h1>
        <p className="text-gray-600">Snap a photo or type your homework question</p>
        <Badge variant="outline" className="mt-2">
          Balance: R{currentBalance.toFixed(2)}
        </Badge>
      </div>

      <GamificationLevel 
        userLevel={userLevel}
        totalStars={wallet?.total_stars || 0}
        questionsCompleted={sessions.length}
      />

      {!aiResponse ? (
        <>
          <QuestionInput
            question={question}
            setQuestion={setQuestion}
            imageFile={imageFile}
            setImageFile={setImageFile}
            onSubmit={handleQuestionSubmit}
          />

          <AnswerTiers
            currentBalance={currentBalance}
            onTierSelect={handleSubmitQuestion}
            isProcessing={isProcessing}
            selectedTier={selectedTier}
          />
        </>
      ) : (
        <HomeworkResponse
          response={aiResponse}
          onReset={resetCapture}
        />
      )}
    </div>
  );
};

export default HomeworkCapture;
