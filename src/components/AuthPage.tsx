
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setShowEmailVerification(true);
        toast.error('Please verify your email address first');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Welcome back!');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (error) {
      if (error.message.includes('User already registered')) {
        toast.error('An account with this email already exists. Please sign in instead.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success(t('auth.account_created'));
      // Clear form and switch to sign in tab
      setFormData({
        email: formData.email, // Keep email for convenience
        password: '',
        fullName: '',
        confirmPassword: ''
      });
      setActiveTab('signin');
      setShowEmailVerification(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {t('auth.welcome')}
          </h1>
          <p className="text-gray-600">{t('auth.ai_assistant')}</p>
        </div>

        {/* Email Verification Alert */}
        {showEmailVerification && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium mb-1">Email Verification Required</p>
                <p>{t('auth.verify_email')}</p>
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">{t('auth.sign_in')}</TabsTrigger>
            <TabsTrigger value="signup">{t('auth.sign_up')}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder={t('auth.password')}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={loading}
              >
                {loading ? t('auth.signing_in') : t('auth.sign_in')}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('auth.full_name')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder={t('auth.confirm_password')}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={loading}
              >
                {loading ? t('auth.creating_account') : t('auth.create_account')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">{t('auth.getting_started')}</p>
              <p>{t('auth.sign_up_benefits')}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
