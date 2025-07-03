
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Volume2, Star } from "lucide-react";
import { toast } from "sonner";

interface HomeworkResponseProps {
  response: {
    text: string;
    timeEstimate: string;
    tier: string;
    starsEarned?: number;
  };
  onReset: () => void;
}

const HomeworkResponse = ({ response, onReset }: HomeworkResponseProps) => {
  return (
    <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Your Answer
        </h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="w-4 h-4" />
            {response.timeEstimate}
          </Badge>
          <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
            <Volume2 className="w-4 h-4 mr-1" />
            Listen
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-4 border border-purple-200">
        <div className="prose prose-sm max-w-none">
          {response.text.split('\n').map((line: string, index: number) => (
            <p key={index} className="mb-2 whitespace-pre-wrap text-gray-700">
              {line}
            </p>
          ))}
        </div>
      </div>

      {response.starsEarned && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-4 border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-700">
            <Star className="w-5 h-5" />
            <span className="font-semibold">Congratulations! You earned {response.starsEarned} Family Stars!</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={onReset} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Ask Another Question
        </Button>
        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50" onClick={() => toast.success("Answer shared with family!")}>
          Share with Family
        </Button>
      </div>
    </Card>
  );
};

export default HomeworkResponse;
