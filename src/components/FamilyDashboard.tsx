
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  BookOpen, 
  Award,
  Flame,
  Gift
} from "lucide-react";

interface FamilyDashboardProps {
  familyStars: number;
  totalQuestions: number;
  streakDays: number;
}

const FamilyDashboard = ({ familyStars, totalQuestions, streakDays }: FamilyDashboardProps) => {
  const achievements = [
    { 
      id: 1, 
      title: "Math Master", 
      description: "Solved 50 math problems", 
      icon: Target, 
      unlocked: true,
      progress: 100
    },
    { 
      id: 2, 
      title: "Science Explorer", 
      description: "Asked 25 science questions", 
      icon: BookOpen, 
      unlocked: true,
      progress: 100
    },
    { 
      id: 3, 
      title: "Streak Champion", 
      description: "7-day learning streak", 
      icon: Flame, 
      unlocked: true,
      progress: 100
    },
    { 
      id: 4, 
      title: "Curiosity King", 
      description: "Ask 100 questions (78/100)", 
      icon: Award, 
      unlocked: false,
      progress: 78
    }
  ];

  const weeklyProgress = [
    { day: "Mon", questions: 5, stars: 12 },
    { day: "Tue", questions: 3, stars: 8 },
    { day: "Wed", questions: 7, stars: 15 },
    { day: "Thu", questions: 4, stars: 10 },
    { day: "Fri", questions: 6, stars: 14 },
    { day: "Sat", questions: 2, stars: 5 },
    { day: "Sun", questions: 8, stars: 18 }
  ];

  const subjects = [
    { name: "Mathematics", questions: 45, improvement: "+15%", color: "bg-sunset-100 text-sunset-700" },
    { name: "Science", questions: 32, improvement: "+22%", color: "bg-savanna-100 text-savanna-700" },
    { name: "English", questions: 28, improvement: "+9%", color: "bg-baobab-100 text-baobab-700" },
    { name: "History", questions: 18, improvement: "+31%", color: "bg-purple-100 text-purple-700" }
  ];

  const rewards = [
    { stars: 50, reward: "Extra screen time", unlocked: familyStars >= 50 },
    { stars: 100, reward: "Weekend outing", unlocked: familyStars >= 100 },
    { stars: 150, reward: "New book", unlocked: familyStars >= 150 },
    { stars: 200, reward: "Toy of choice", unlocked: familyStars >= 200 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Family Learning Dashboard</h1>
        <p className="text-gray-600">Track progress, celebrate achievements, and stay motivated together!</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-sunset-500 to-sunset-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sunset-100 text-sm">Family Stars</p>
              <p className="text-2xl font-bold">{familyStars}</p>
            </div>
            <Star className="w-8 h-8 text-sunset-200" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-savanna-500 to-savanna-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-savanna-100 text-sm">Questions Asked</p>
              <p className="text-2xl font-bold">{totalQuestions}</p>
            </div>
            <BookOpen className="w-8 h-8 text-savanna-200" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-baobab-500 to-baobab-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-baobab-100 text-sm">Learning Streak</p>
              <p className="text-2xl font-bold">{streakDays} days</p>
            </div>
            <Flame className="w-8 h-8 text-baobab-200" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">This Week</p>
              <p className="text-2xl font-bold">35</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          This Week's Progress
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
              <div className="bg-gradient-to-t from-sunset-200 to-sunset-100 rounded-lg p-3">
                <div className="text-lg font-bold text-sunset-700">{day.questions}</div>
                <div className="text-xs text-sunset-600">questions</div>
                <div className="flex items-center justify-center mt-1">
                  <Star className="w-3 h-3 text-baobab-500 mr-1" />
                  <span className="text-xs text-baobab-700">{day.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Subject Performance
          </h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{subject.name}</div>
                  <div className="text-sm text-gray-600">{subject.questions} questions</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={subject.color}>
                    {subject.improvement}
                  </Badge>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-3 rounded-lg border ${
                achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <achievement.icon className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                    {!achievement.unlocked && (
                      <Progress value={achievement.progress} className="mt-2 h-2" />
                    )}
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-100 text-green-700">Unlocked!</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Rewards System */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Family Rewards ({familyStars} stars earned)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, index) => (
            <Card key={index} className={`p-4 ${
              reward.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  reward.unlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Gift className={`w-6 h-6 ${
                    reward.unlocked ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="font-medium mb-1">{reward.reward}</div>
                <div className="text-sm text-gray-600 mb-2">{reward.stars} stars</div>
                <Button 
                  size="sm" 
                  variant={reward.unlocked ? "default" : "outline"}
                  disabled={!reward.unlocked}
                  className="w-full"
                >
                  {reward.unlocked ? "Claim Reward" : "Locked"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Motivation Section */}
      <Card className="p-6 bg-gradient-africa text-white">
        <div className="text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-semibold mb-2">Amazing Progress!</h3>
          <p className="mb-4 opacity-90">
            You're doing great! Keep asking questions and learning together. 
            Just {Math.max(0, 200 - familyStars)} more stars to unlock your next big reward!
          </p>
          <Button className="bg-white text-sunset-600 hover:bg-gray-50">
            <Users className="w-4 h-4 mr-2" />
            Share Progress with Family
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FamilyDashboard;
