
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Gift, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface RewardsSystemProps {
  userLevel: number;
  totalStars: number;
  questionsCompleted: number;
}

const RewardsSystem = ({ userLevel, totalStars, questionsCompleted }: RewardsSystemProps) => {
  const rewards = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first question",
      requirement: 1,
      type: "questions",
      stars: 5,
      unlocked: questionsCompleted >= 1,
      claimed: false,
      icon: Trophy,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      id: 2,
      title: "Rising Star",
      description: "Earn 25 family stars",
      requirement: 25,
      type: "stars",
      stars: 10,
      unlocked: totalStars >= 25,
      claimed: false,
      icon: Star,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 3,
      title: "Grade Champion",
      description: "Reach Grade 3",
      requirement: 3,
      type: "level",
      stars: 15,
      unlocked: userLevel >= 3,
      claimed: false,
      icon: Trophy,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 4,
      title: "Curious Mind",
      description: "Ask 10 questions",
      requirement: 10,
      type: "questions",
      stars: 20,
      unlocked: questionsCompleted >= 10,
      claimed: false,
      icon: Gift,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 5,
      title: "Star Collector",
      description: "Earn 100 family stars",
      requirement: 100,
      type: "stars",
      stars: 30,
      unlocked: totalStars >= 100,
      claimed: false,
      icon: Star,
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: 6,
      title: "Senior Scholar",
      description: "Reach Grade 8",
      requirement: 8,
      type: "level",
      stars: 50,
      unlocked: userLevel >= 8,
      claimed: false,
      icon: Trophy,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      id: 7,
      title: "Question Master",
      description: "Ask 50 questions",
      requirement: 50,
      type: "questions",
      stars: 75,
      unlocked: questionsCompleted >= 50,
      claimed: false,
      icon: Gift,
      color: "bg-pink-100 text-pink-700"
    },
    {
      id: 8,
      title: "Matric Legend",
      description: "Reach Grade 12",
      requirement: 12,
      type: "level",
      stars: 100,
      unlocked: userLevel >= 12,
      claimed: false,
      icon: Trophy,
      color: "bg-red-100 text-red-700"
    }
  ];

  const handleClaimReward = (reward: any) => {
    if (reward.unlocked && !reward.claimed) {
      toast.success(`🎉 Congratulations! You've claimed the "${reward.title}" reward and earned ${reward.stars} bonus stars!`);
      // Here you would typically update the user's stars and mark the reward as claimed
    }
  };

  const getProgressValue = (reward: any) => {
    switch (reward.type) {
      case 'stars':
        return Math.min((totalStars / reward.requirement) * 100, 100);
      case 'questions':
        return Math.min((questionsCompleted / reward.requirement) * 100, 100);
      case 'level':
        return Math.min((userLevel / reward.requirement) * 100, 100);
      default:
        return 0;
    }
  };

  const getCurrentValue = (reward: any) => {
    switch (reward.type) {
      case 'stars':
        return totalStars;
      case 'questions':
        return questionsCompleted;
      case 'level':
        return userLevel;
      default:
        return 0;
    }
  };

  return (
    <Card className="p-6 border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Rewards Center</h3>
          <p className="text-sm text-gray-600">Unlock rewards as you learn and grow!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <Card key={reward.id} className={`p-4 transition-all duration-300 hover:scale-105 ${
            reward.unlocked 
              ? 'bg-white border-green-200 shadow-md' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  reward.unlocked ? reward.color : 'bg-gray-100'
                }`}>
                  {reward.unlocked ? (
                    <reward.icon className="w-5 h-5" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{reward.title}</h4>
                  <p className="text-xs text-gray-600">{reward.description}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                +{reward.stars} ⭐
              </Badge>
            </div>

            {!reward.unlocked && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{getCurrentValue(reward)}/{reward.requirement}</span>
                </div>
                <Progress value={getProgressValue(reward)} className="h-2" />
              </div>
            )}

            <Button
              size="sm"
              className={`w-full ${
                reward.unlocked
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => handleClaimReward(reward)}
              disabled={!reward.unlocked || reward.claimed}
            >
              {reward.claimed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Claimed
                </>
              ) : reward.unlocked ? (
                <>
                  <Gift className="w-4 h-4 mr-2" />
                  Claim Reward
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Locked
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <h4 className="font-semibold text-yellow-800">Bonus Rewards Coming Soon!</h4>
        </div>
        <p className="text-sm text-yellow-700">
          Keep learning to unlock special seasonal rewards, family challenges, and exclusive badges!
        </p>
      </div>
    </Card>
  );
};

export default RewardsSystem;
