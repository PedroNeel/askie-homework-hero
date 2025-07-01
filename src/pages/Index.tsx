
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageSquare, Wallet, Star, Trophy, BookOpen, Users, Globe, Zap, Heart, Plus } from "lucide-react";
import HomeworkCapture from "@/components/HomeworkCapture";
import PaymentWallet from "@/components/PaymentWallet";
import FamilyDashboard from "@/components/FamilyDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userBalance, setUserBalance] = useState(25.50);
  const [familyStars, setFamilyStars] = useState(47);

  const features = [
    {
      icon: Camera,
      title: "Snap & Solve",
      description: "Take a photo of any homework question and get instant, step-by-step explanations"
    },
    {
      icon: MessageSquare,
      title: "AI Tutor Chat",
      description: "Ask questions in text or voice - supports multiple African languages"
    },
    {
      icon: Wallet,
      title: "Mobile Money",
      description: "Pay seamlessly with M-Pesa, MTN MoMo, or Flutterwave - micro-payments from R2"
    },
    {
      icon: BookOpen,
      title: "Curriculum Aligned",
      description: "Answers tailored to CAPS, WAEC, and local African curricula"
    }
  ];

  const testimonials = [
    {
      name: "Thandi M.",
      location: "Johannesburg, SA",
      text: "My daughter's math grades improved from 60% to 85% in just 2 months! Askie explains things so clearly.",
      stars: 5
    },
    {
      name: "José R.",
      location: "Luanda, Angola", 
      text: "As a working parent, I don't always understand the new curriculum. Askie helps me help my children.",
      stars: 5
    },
    {
      name: "Amina K.",
      location: "Nairobi, Kenya",
      text: "The mobile money integration is perfect. I can top up my balance during lunch break.",
      stars: 5
    }
  ];

  const stats = [
    { value: "160M+", label: "Students Across Africa" },
    { value: "50K+", label: "Questions Answered Daily" },
    { value: "95%", label: "Parent Satisfaction" },
    { value: "30s", label: "Average Response Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Askie</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Button 
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => setActiveTab("home")}
                className={activeTab === "home" ? "bg-gradient-to-r from-purple-600 to-blue-600" : "hover:bg-purple-50"}
              >
                Home
              </Button>
              <Button 
                variant={activeTab === "homework" ? "default" : "ghost"}
                onClick={() => setActiveTab("homework")}
                className={activeTab === "homework" ? "bg-gradient-to-r from-purple-600 to-blue-600" : "hover:bg-purple-50"}
              >
                Ask Question
              </Button>
              <Button 
                variant={activeTab === "wallet" ? "default" : "ghost"}
                onClick={() => setActiveTab("wallet")}
                className={activeTab === "wallet" ? "bg-gradient-to-r from-purple-600 to-blue-600" : "hover:bg-purple-50"}
              >
                Wallet
              </Button>
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveTab("dashboard")}
                className={activeTab === "dashboard" ? "bg-gradient-to-r from-purple-600 to-blue-600" : "hover:bg-purple-50"}
              >
                Family Dashboard
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1 bg-emerald-100 text-emerald-700 border-emerald-200">
                <Star className="w-4 h-4 text-emerald-600" />
                {familyStars} Stars
              </Badge>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="gap-1 border-purple-200 text-purple-700">
                  <Wallet className="w-4 h-4 text-purple-600" />
                  R{userBalance.toFixed(2)}
                </Badge>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                  onClick={() => setActiveTab("wallet")}
                >
                  <Plus className="w-4 h-4 text-purple-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-purple-100">
        <div className="flex">
          {[
            { id: "home", icon: BookOpen, label: "Home" },
            { id: "homework", icon: Camera, label: "Ask" },
            { id: "wallet", icon: Wallet, label: "Wallet" },
            { id: "dashboard", icon: Trophy, label: "Family" }
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="ghost"
              className={`flex-1 flex-col h-16 ${activeTab === id ? 'text-purple-600 bg-purple-50' : 'hover:bg-purple-50'}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-emerald-600/10"></div>
              <div className="container mx-auto px-4 text-center relative">
                <Badge className="mb-6 animate-bounce bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                  🚀 Now Available Across Africa
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Turn Homework Hurdles Into
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">Learning Adventures</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto animate-fade-in">
                  The AI-powered homework assistant built for busy African parents. 
                  Snap a photo, get instant explanations, and support your child's education - 
                  all in under 30 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    onClick={() => setActiveTab("homework")}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Try It Now - Free
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 transition-all hover:scale-105">
                    <Globe className="w-5 h-5 mr-2" />
                    Available in 5 Countries
                  </Button>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white/70 backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center animate-fade-in">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Everything Your Family Needs
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Designed specifically for African families, with local curriculum support and mobile money integration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white/70 backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Loved by Parents Across Africa
                  </h2>
                  <p className="text-xl text-slate-600">
                    Join thousands of families already using Askie
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <div className="flex mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <div className="font-semibold text-slate-800">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.location}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="container mx-auto px-4 text-center relative text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Homework Time?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join over 50,000 families using Askie across Africa
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => setActiveTab("homework")}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Free Trial
                </Button>
              </div>
            </section>
          </>
        )}

        {activeTab === "homework" && (
          <div className="container mx-auto px-4 py-8">
            <HomeworkCapture 
              userBalance={userBalance}
              onBalanceUpdate={setUserBalance}
              onStarsEarned={(stars) => setFamilyStars(prev => prev + stars)}
            />
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="container mx-auto px-4 py-8">
            <PaymentWallet 
              balance={userBalance}
              onBalanceUpdate={setUserBalance}
            />
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="container mx-auto px-4 py-8">
            <FamilyDashboard 
              familyStars={familyStars}
              totalQuestions={156}
              streakDays={12}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
