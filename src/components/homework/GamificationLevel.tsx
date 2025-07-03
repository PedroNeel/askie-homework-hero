
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, BookOpen, Target } from "lucide-react";

interface GamificationLevelProps {
  userLevel: number;
  totalStars: number;
  questionsCompleted: number;
}

const GamificationLevel = ({ userLevel, totalStars, questionsCompleted }: GamificationLevelProps) => {
  const getGradeInfo = (level: number) => {
    if (level <= 3) return { grade: "Foundation", color: "bg-green-100 text-green-700", icon: BookOpen };
    if (level <= 7) return { grade: "Intermediate", color: "bg-blue-100 text-blue-700", icon: Target };
    if (level <= 9) return { grade: "Senior", color: "bg-purple-100 text-purple-700", icon: Trophy };
    return { grade: "Matric", color: "bg-emerald-100 text-emerald-700", icon: Star };
  };

  const gradeInfo = getGradeInfo(userLevel);
  const nextLevelStars = (userLevel + 1) * 50;
  const progressPercentage = (totalStars / nextLevelStars) * 100;

  return (
    <Card className="p-4 border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <gradeInfo.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <Badge className={gradeInfo.color}>Grade {userLevel} - {gradeInfo.grade}</Badge>
            <p className="text-sm text-slate-600 mt-1">
              {totalStars} stars • {questionsCompleted} questions completed
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Next Level</p>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">{nextLevelStars - totalStars} stars to go</p>
        </div>
      </div>
    </Card>
  );
};

export default GamificationLevel;
