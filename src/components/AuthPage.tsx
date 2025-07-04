
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, BookOpen, Brain, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const AuthPage = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error(t('auth.fill_all_fields'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      toast.success(t('auth.check_email'));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t('auth.fill_all_fields'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success(t('auth.welcome_back'));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-africa flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="text-white space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold">
              {t('auth.welcome_to')} <span className="text-baobab-200">Askie</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200">
              {t('auth.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-baobab-500 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('auth.feature_homework')}</h3>
                <p className="text-gray-300">{t('auth.feature_homework_desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sunset-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('auth.feature_ai')}</h3>
                <p className="text-gray-300">{t('auth.feature_ai_desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-savanna-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('auth.feature_family')}</h3>
                <p className="text-gray-300">{t('auth.feature_family_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <Card className="w-full max-w-md mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">
              {t('auth.get_started')}
            </h2>
            <p className="text-gray-600 mt-2">
              {t('auth.join_community')}
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t('auth.sign_in')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.sign_up')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t('auth.email')}</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={t('auth.email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-200 focus:border-sunset-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.password_placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 border-gray-200 focus:border-sunset-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sunset-500 to-baobab-500 hover:from-sunset-600 hover:to-baobab-600"
                  disabled={loading}
                >
                  {loading ? t('auth.signing_in') : t('auth.sign_in')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t('auth.full_name')}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t('auth.full_name_placeholder')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-2 border-gray-200 focus:border-sunset-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('auth.email')}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t('auth.email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-200 focus:border-sunset-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.password_placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 border-gray-200 focus:border-sunset-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sunset-500 to-baobab-500 hover:from-sunset-600 hover:to-baobab-600"
                  disabled={loading}
                >
                  {loading ? t('auth.creating_account') : t('auth.create_account')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
