import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Shield,
  BarChart3,
  Users,
  Bell,
  FileText,
  Award,
  Building2
} from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * 🎉 شاشة الترحيب الاحتفالية - Premium Welcome Screen
 * تظهر بعد التسجيل الناجح
 */
export default function Welcome() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // إخفاء الـ confetti بعد 3 ثواني
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: Building2,
      title: "إكمال معلومات شركتك",
      description: "سنحتاج بعض التفاصيل لتخصيص تجربتك"
    },
    {
      icon: Shield,
      title: "اختيار الأطر التنظيمية",
      description: "حدد الأطر التي تحتاج للامتثال لها (SAMA، CMA، إلخ)"
    },
    {
      icon: Users,
      title: "دعوة فريقك",
      description: "أضف أعضاء فريق الامتثال وحدد صلاحياتهم"
    },
    {
      icon: BarChart3,
      title: "تقييم امتثال سريع",
      description: "سنساعدك على فهم وضعك الحالي في دقائق"
    },
    {
      icon: Award,
      title: "جولة في المنصة",
      description: "تعرّف على الميزات الرئيسية وكيفية استخدامها"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      text: "حماية كاملة من غرامات عدم الامتثال"
    },
    {
      icon: BarChart3,
      text: "تقارير جاهزة للجهات التنظيمية"
    },
    {
      icon: Bell,
      text: "تنبيهات فورية للتحديثات التنظيمية"
    },
    {
      icon: FileText,
      text: "وصول فوري لـ 260+ مادة وضابط"
    }
  ];

  return (
    <div className="min-h-screen night-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Sparkles 
                className="text-primary opacity-60" 
                size={12 + Math.random() * 12}
              />
            </div>
          ))}
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Logo */}
        {APP_LOGO && (
          <img 
            src={APP_LOGO} 
            alt={APP_TITLE} 
            className="h-16 mx-auto mb-8 opacity-90 drop-shadow-lg animate-fade-in"
          />
        )}

        {/* Main Welcome Card */}
        <Card className="premium-card mb-6 animate-scale-in">
          <CardContent className="pt-12 pb-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <CheckCircle2 className="w-14 h-14 text-primary" />
            </div>

            {/* Welcome Message */}
            <h1 className="text-4xl md:text-5xl font-bold legal-heading gold-glow mb-4">
              مرحباً بك، {user?.name || 'عزيزي المستخدم'}! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              تم إنشاء حسابك بنجاح
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أنت الآن جزء من <span className="text-primary font-bold">280+ شركة</span> تستخدم منصتنا لتحقيق الامتثال الكامل
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
              {benefits.map((benefit, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <benefit.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-right">{benefit.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="premium-card animate-slide-up">
          <CardContent className="pt-6 pb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold legal-heading mb-2">
                الخطوات التالية
              </h2>
              <p className="text-muted-foreground">
                سنساعدك على إعداد حسابك في 5 خطوات بسيطة (5 دقائق فقط)
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-3 mb-6">
              {nextSteps.map((step, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm font-bold">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg gap-3 w-full sm:w-auto"
                onClick={() => setLocation("/onboarding")}
              >
                <Sparkles className="w-5 h-5" />
                لنبدأ الإعداد
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 px-10 py-6 text-lg w-full sm:w-auto"
                onClick={() => setLocation("/dashboard")}
              >
                تخطي والانتقال للوحة التحكم
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              💡 يمكنك إكمال الإعداد لاحقاً من الإعدادات
            </p>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          هل تحتاج مساعدة؟{" "}
          <a href="/contact" className="text-primary hover:underline font-bold">
            تواصل معنا
          </a>
          {" "}أو{" "}
          <a href="/help" className="text-primary hover:underline font-bold">
            تصفح مركز المساعدة
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-fade-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}


