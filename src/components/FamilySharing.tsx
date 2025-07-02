
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Star, BookOpen, Trophy, Share2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";

const FamilySharing = () => {
  const { user } = useAuth();
  const { wallet, sessions } = useUserData();
  const [familyStats, setFamilyStats] = useState({
    questionsThisWeek: 0,
    starsEarned: 0,
    favoriteSubject: 'Mathematics',
    streak: 3
  });

  useEffect(() => {
    if (sessions.length > 0) {
      const thisWeek = sessions.filter(session => {
        const sessionDate = new Date(session.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sessionDate >= weekAgo;
      });

      setFamilyStats({
        questionsThisWeek: thisWeek.length,
        starsEarned: thisWeek.reduce((sum, session) => sum + (session.stars_earned || 0), 0),
        favoriteSubject: 'Mathematics', // Could be calculated from session data
        streak: Math.min(thisWeek.length, 7)
      });
    }
  }, [sessions]);

  const shareProgress = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Askie Progress',
          text: `I've earned ${wallet?.total_stars || 0} stars and asked ${familyStats.questionsThisWeek} questions this week on Askie! 🌟`,
          url: window.location.origin
        });
      } else {
        // Fallback: copy to clipboard
        const text = `I've earned ${wallet?.total_stars || 0} stars and asked ${familyStats.questionsThisWeek} questions this week on Askie! 🌟 ${window.location.origin}`;
        await navigator.clipboard.writeText(text);
        toast.success("Progress shared to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share progress");
    }
  };

  const sendFamilyUpdate = async () => {
    if (!user) return;

    try {
      await supabase.functions.invoke('send-notification-email', {
        body: {
          to: user.email,
          subject: 'Weekly Askie Progress Update',
          type: 'family_update',
          data: {
            studentName: user.user_metadata?.full_name || 'Your child',
            questionsCount: familyStats.questionsThisWeek,
            starsEarned: familyStats.starsEarned,
            lastActivity: sessions[0]?.created_at ? new Date(sessions[0].created_at).toLocaleDateString() : 'N/A'
          }
        }
      });

      toast.success("Family update sent!");
    } catch (error) {
      toast.error("Failed to send family update");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Family Dashboard
        </h1>
        <p className="text-slate-600">Share your learning journey with family</p>
      </div>

      {/* Student Profile Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-purple-600 text-white text-xl">
              {user?.user_metadata?.full_name?.charAt(0) || 'S'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'Student'}</h2>
            <p className="text-slate-600">Learning Champion</p>
          </div>
          <div className="ml-auto text-right">
            <div className="flex items-center gap-1 text-2xl font-bold text-purple-600">
              <Star className="w-6 h-6" />
              {wallet?.total_stars || 0}
            </div>
            <p className="text-sm text-slate-600">Total Stars</p>
          </div>
        </div>
      </Card>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <BookOpen className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <div className="text-2xl font-bold">{familyStats.questionsThisWeek}</div>
          <p className="text-sm text-slate-600">Questions This Week</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
          <div className="text-2xl font-bold">{familyStats.starsEarned}</div>
          <p className="text-sm text-slate-600">Stars This Week</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto text-orange-500 mb-2" />
          <div className="text-2xl font-bold">{familyStats.streak}</div>
          <p className="text-sm text-slate-600">Day Streak</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <div className="text-lg font-bold">Math</div>
          <p className="text-sm text-slate-600">Favorite Subject</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Recent Learning Activity
        </h3>
        <div className="space-y-3">
          {sessions.slice(0, 5).map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{session.question.substring(0, 80)}...</p>
                <p className="text-xs text-slate-500">
                  {new Date(session.created_at).toLocaleDateString()} • {session.tier}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {session.stars_earned && session.stars_earned > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{session.stars_earned} ⭐
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  R{session.cost}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sharing Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Share Your Progress</h3>
        <div className="flex gap-3">
          <Button onClick={shareProgress} className="flex-1" variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Progress
          </Button>
          <Button onClick={sendFamilyUpdate} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
            <Mail className="w-4 h-4 mr-2" />
            Email Family Update
          </Button>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
            <Trophy className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <p className="font-semibold">First Question</p>
            <p className="text-xs text-slate-600">Asked your first question</p>
          </div>
          
          {wallet && wallet.total_stars >= 10 && (
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
              <Star className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <p className="font-semibold">Star Collector</p>
              <p className="text-xs text-slate-600">Earned 10+ stars</p>
            </div>
          )}
          
          {familyStats.questionsThisWeek >= 5 && (
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
              <BookOpen className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="font-semibold">Active Learner</p>
              <p className="text-xs text-slate-600">5+ questions this week</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FamilySharing;
