
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Camera, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionInputProps {
  question: string;
  setQuestion: (question: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  onSubmit: (question: string, imageFile: File | null) => void;
}

const QuestionInput = ({ question, setQuestion, imageFile, setImageFile, onSubmit }: QuestionInputProps) => {
  const { t } = useLanguage();
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      toast.success("Image uploaded! Ready to analyze your homework.");
    }
  };

  const handleSubmit = () => {
    if (!question && !imageFile) {
      toast.error("Please enter a question or upload an image");
      return;
    }
    onSubmit(question, imageFile);
  };

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-600" />
        {t('homework.your_question')}
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            placeholder={t('homework.type_question')}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-32 border-2 border-gray-200 focus:border-purple-400 rounded-xl flex-1"
          />
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-3"
            size="lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-2">
              <Camera className="w-12 h-12 mx-auto text-purple-500" />
              <p className="text-gray-700 font-medium">
                {imageFile ? `📷 ${imageFile.name}` : t('homework.upload_photo')}
              </p>
              <p className="text-sm text-gray-500">
                {t('homework.supports_handwritten')}
              </p>
            </div>
          </label>
        </div>
      </div>
    </Card>
  );
};

export default QuestionInput;
