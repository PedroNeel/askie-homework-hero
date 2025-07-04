import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, BookOpen, Users, Brain, LogOut, Wallet, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeworkCapture from "@/components/HomeworkCapture";
import FamilyDashboard from "@/components/FamilyDashboard";
import AuthPage from "@/components/AuthPage";
import { toast } from "sonner";
import MiniLanguageTab from "@/components/MiniLanguageTab";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");

  const { data: wallet } = useQuery({
    queryKey: ['wallet', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching wallet:', error);
        return null;
      }

      return data;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Askie</h1>
            </div>

            <div className="flex items-center gap-4">
              <MiniLanguageTab />
              <Badge variant="secondary" className="gap-1 bg-sky-100 text-sky-700 border-sky-200 px-3 py-1">
                <Star className="w-4 h-4 text-sky-600" />
                {wallet?.total_stars || 0} {t('wallet.stars')}
              </Badge>
              <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                <Wallet className="w-4 h-4 text-blue-600" />
                ${(wallet?.balance || 0).toFixed(2)}
              </Badge>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="gap-2 border-gray-200 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-sky-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: "home", label: t('nav.home'), icon: Sparkles },
              { id: "homework", label: "Homework Help", icon: BookOpen },
              { id: "family", label: t('nav.family'), icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`gap-2 px-6 py-3 rounded-xl font-medium ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8 space-y-12">
          {activeTab === "home" && (
            <>
              {/* Hero Section */}
              <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    Welcome back, {user.user_metadata?.full_name || "Student"}!
                  </h2>
                  <p className="text-xl text-gray-600">
                    Ready to tackle your homework with AI assistance?
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card className="p-6 bg-gradient-to-br from-sky-50 to-white border-sky-100 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-sky-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">Homework Help</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Get instant help with any homework question using our AI tutor.</p>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">Smart AI Tutor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">AI that adapts to your learning style and provides personalized help.</p>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-100 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-cyan-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">Family Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Track your progress and share achievements with your family.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeTab === "homework" && <HomeworkCapture />}
          {activeTab === "family" && <FamilyDashboard />}
        </div>
      </main>
    </div>
  );
};

export default Index;
