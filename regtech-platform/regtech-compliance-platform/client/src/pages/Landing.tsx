import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle2, 
  Scale, 
  Award, 
  BarChart3,
  Bell,
  FileText,
  Users,
  Zap,
  TrendingUp,
  Lock,
  Globe,
  Building2,
  ArrowRight,
  Check,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { ComplianceQuiz } from "@/components/ComplianceQuiz";
import { MegaMenu } from "@/components/MegaMenu";
import { OptimizedImage } from "@/components/OptimizedImage";

/**
 * 🏛️ صفحة الهبوط الفاخرة - Premium Landing Page
 * تصميم راقٍ يليق بمنصة 100,000 ريال سنوياً
 */
export default function Landing() {
  const { data: frameworks, isLoading: frameworksLoading } = trpc.frameworks.list.useQuery();
  const { data: controlsData, isLoading: controlsLoading } = trpc.controls.list.useQuery({ page: 1, limit: 10 });
  const { data: articlesData, isLoading: articlesLoading } = trpc.articles.list.useQuery({ page: 1, limit: 10 });

  const totalControls = controlsData?.pagination?.total || 378;
  const totalArticles = articlesData?.pagination?.total || 43;
  const totalItems = totalControls + totalArticles;
  const isLoading = frameworksLoading || controlsLoading || articlesLoading;

  return (
    <div className="min-h-screen night-gradient">
      {/* Mega Menu */}
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            {APP_LOGO && (
              <img 
                src={APP_LOGO} 
                alt={APP_TITLE} 
                className="h-24 mx-auto opacity-90 drop-shadow-2xl animate-fade-in"
              />
            )}

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold legal-heading gold-glow leading-tight">
                منصة الامتثال القانوني والتقني
              </h1>
              <p className="text-2xl md:text-3xl text-primary/90 font-semibold">
                الحل الشامل للسوق السعودي
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                نساعد <span className="text-primary font-bold">280+ شركة فينتك</span> على تحقيق الامتثال الكامل لـ <span className="text-primary font-bold">SAMA، CMA، SDAIA، وZATCA</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: "أطر تنظيمية", value: frameworks?.length || 7, icon: Scale },
                { label: "ضابط", value: totalControls, icon: FileText },
                { label: "شركة فينتك", value: "280+", icon: Building2 },
                { label: "امتثال مضمون", value: "100%", icon: CheckCircle2 }
              ].map((stat, i) => (
                <div key={i} className="premium-card p-4 text-center space-y-2">
                  <stat.icon className="w-8 h-8 text-primary mx-auto" />
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Hero Mockup */}
            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <OptimizedImage 
                src="/hero-dashboard-mockup.png" 
                alt="لوحة تحكم منصة الامتثال" 
                className="rounded-xl shadow-2xl border border-primary/20 w-full max-w-4xl mx-auto"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl gap-3 shadow-2xl"
              >
                <Link href="/contact">
                  <Sparkles className="w-6 h-6" />
                  احجز عرضاً توضيحياً
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 px-10 py-7 text-xl gap-3"
              >
                <Link href="/signup">
                  جرّب مجاناً 14 يوماً
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✨ لا حاجة لبطاقة ائتمانية • إلغاء في أي وقت
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              التحديات
            </Badge>
            <h2 className="text-4xl font-bold legal-heading mb-4">
              المشاكل التي نحلها
            </h2>
            <p className="text-lg text-muted-foreground">
              نفهم التحديات التي تواجهها شركات الفينتك في السعودية
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Scale,
                title: "تعقيد الامتثال متعدد الجهات",
                description: "التعامل مع SAMA + CMA + SDAIA + ZATCA في نفس الوقت يستهلك الوقت والموارد"
              },
              {
                icon: TrendingUp,
                title: "تكلفة الامتثال العالية",
                description: "توظيف فرق امتثال كبيرة واستشارات قانونية مكلفة وغرامات عدم الامتثال"
              },
              {
                icon: Bell,
                title: "صعوبة متابعة التحديثات",
                description: "التحديثات التنظيمية المستمرة من جهات متعددة يصعب متابعتها يدوياً"
              },
              {
                icon: Zap,
                title: "نقص الأتمتة",
                description: "معظم العمليات يدوية ومكلفة مع احتمالية عالية للأخطاء البشرية"
              }
            ].map((problem, i) => (
              <Card key={i} className="premium-card border-chart-5/20">
                <CardHeader>
                  <problem.icon className="w-12 h-12 text-chart-5 mb-3" />
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              الحلول
            </Badge>
            <h2 className="text-4xl font-bold legal-heading mb-4">
              الميزات الرئيسية
            </h2>
            <p className="text-lg text-muted-foreground">
              منصة شاملة تجمع كل ما تحتاجه لتحقيق الامتثال الكامل
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BarChart3,
                title: "لوحة تحكم شاملة",
                description: "نظرة عامة على مستوى امتثالك عبر جميع الأطر التنظيمية في مكان واحد"
              },
              {
                icon: Zap,
                title: "أتمتة ذكية بالذكاء الاصطناعي",
                description: "أتمتة KYC/AML والتقارير والمراقبة بتقنيات الذكاء الاصطناعي المتقدمة"
              },
              {
                icon: FileText,
                title: "تقارير جاهزة للجهات التنظيمية",
                description: "إنشاء تقارير احترافية جاهزة للتقديم لـ SAMA وCMA وغيرها بنقرة واحدة"
              },
              {
                icon: Bell,
                title: "تنبيهات فورية للتحديثات",
                description: "تلقي إشعارات فورية عند صدور تعاميم أو تحديثات تنظيمية جديدة"
              },
              {
                icon: Users,
                title: "إدارة الفريق والصلاحيات",
                description: "نظام RBAC متقدم لإدارة أعضاء الفريق والصلاحيات بدقة"
              },
              {
                icon: Lock,
                title: "أمان وخصوصية عالية",
                description: "تشفير شامل وامتثال كامل لـ PDPL وأعلى معايير الأمن السيبراني"
              }
            ].map((feature, i) => (
              <Card key={i} className="premium-card hover:scale-105 transition-transform">
                <CardHeader>
                  <feature.icon className="w-14 h-14 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              تقييم فوري
            </Badge>
            <h2 className="text-4xl font-bold legal-heading mb-4">
              كم أنت ملتزم؟
            </h2>
            <p className="text-lg text-muted-foreground">
              اختبر جاهزيتك التنظيمية في دقيقتين فقط
            </p>
          </div>
          <ComplianceQuiz />
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              التغطية الشاملة
            </Badge>
            <h2 className="text-4xl font-bold legal-heading mb-4">
              الأطر التنظيمية السعودية
            </h2>
            <p className="text-lg text-muted-foreground">
              تغطية كاملة لجميع الأنظمة واللوائح ذات العلاقة بالفينتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {frameworks?.map((framework) => (
              <Card key={framework.id} className="premium-card">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {framework.code}
                    </Badge>
                    <Scale className="w-6 h-6 text-primary/60" />
                  </div>
                  <CardTitle className="text-lg legal-heading">{framework.name}</CardTitle>
                  {framework.authority && (
                    <CardDescription className="text-sm">{framework.authority}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {framework.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {framework.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-chart-2" />
                      <span>متاح في المنصة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              كيف يعمل
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold legal-heading">4 خطوات من الحيرة إلى القرار</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              عملية بسيطة وواضحة لتحقيق الامتثال الكامل
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: FileText,
                title: "حمّل ملفاتك",
                description: "ارفع سياساتك، نماذجك المالية، واتفاقياتك (PDF, DOCX, XLSX)"
              },
              {
                step: "2",
                icon: Sparkles,
                title: "تحليل ذكي",
                description: "وكيلان ماليان يحللان ملفاتك مقابل 7 أطر تنظيمية في دقائق"
              },
              {
                step: "3",
                icon: BarChart3,
                title: "مقارنة واضحة",
                description: "مقارنة شاملة بين SAMA، CMA، SDAIA مع نسبة التوافق لكل جهة"
              },
              {
                step: "4",
                icon: Award,
                title: "قرار واثق",
                description: "تقرير شامل + شهادة PDF + خطة عمل مفصلة لتحقيق الامتثال"
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="premium-card p-8 text-center space-y-4 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Arrow (except last) */}
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              شهادات العملاء
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold legal-heading">ماذا يقول عملاؤنا؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              280+ شركة فينتك تثق بمنصتنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "أحمد المالكي",
                role: "الرئيس التنفيذي، شركة تمويل رقمية",
                content: "وفرت علينا 6 أشهر من العمل اليدوي! التحليل الذكي حدد لنا الفجوات بدقة وساعدنا في الحصول على ترخيص SAMA في وقت قياسي.",
                rating: 5
              },
              {
                name: "سارة العتيبي",
                role: "مديرة الامتثال، منصة مدفوعات",
                content: "المقارنة بين الجهات التنظيمية كانت game-changer! اكتشفنا أن CMA أنسب لنا من SAMA، وهذا وفر علينا تكاليف كبيرة.",
                rating: 5
              },
              {
                name: "خالد الشمري",
                role: "مؤسس، شركة تقنية مالية ناشئة",
                content: "الوكيلان الماليان أعطونا تحليل اقتصادي دقيق جداً. عرفنا بالضبط كم نحتاج رأس مال وكم راح تكلفنا رحلة الامتثال.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="premium-card p-8 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Sparkles key={j} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-lg leading-relaxed text-foreground/90">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="border-t border-border pt-6">
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              الباقات
            </Badge>
            <h2 className="text-4xl font-bold legal-heading mb-4">
              اختر الباقة المناسبة لك
            </h2>
            <p className="text-lg text-muted-foreground">
              باقات مرنة تناسب جميع أحجام الشركات
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "50,000",
                period: "سنوياً",
                description: "للشركات الناشئة",
                features: [
                  "حتى 10 مستخدمين",
                  "3 أطر تنظيمية",
                  "تقارير أساسية",
                  "دعم عبر البريد",
                  "تحديثات شهرية"
                ],
                cta: "ابدأ تجربة مجانية",
                variant: "outline" as const
              },
              {
                name: "Growth",
                price: "150,000",
                period: "سنوياً",
                description: "الأكثر شعبية",
                badge: "موصى به",
                features: [
                  "حتى 50 مستخدم",
                  "7 أطر (الكل)",
                  "تقارير متقدمة",
                  "دعم أولوية",
                  "AI Automation كامل",
                  "API Access"
                ],
                cta: "احجز عرضاً",
                variant: "default" as const,
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "500,000+",
                period: "سنوياً",
                description: "للمؤسسات الكبرى",
                features: [
                  "مستخدمون غير محدود",
                  "7 أطر + مخصص",
                  "تقارير مخصصة",
                  "دعم مخصص 24/7",
                  "AI مخصص",
                  "White Label"
                ],
                cta: "تواصل معنا",
                variant: "outline" as const
              }
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`premium-card relative ${plan.highlighted ? 'border-primary shadow-2xl scale-105' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl legal-heading">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground mr-2">ريال</span>
                    <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                  >
                    <Link href="/contact">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-card/30 to-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold legal-heading gold-glow">
              جاهز لتحقيق الامتثال الكامل؟
            </h2>
            <p className="text-xl text-muted-foreground">
              انضم إلى 280+ شركة تثق بنا لإدارة امتثالها التنظيمي
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl gap-3"
              >
                <Link href="/contact">
                  <Sparkles className="w-6 h-6" />
                  احجز عرضاً توضيحياً
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 px-10 py-7 text-xl gap-3"
              >
                <a href={getLoginUrl()}>
                  الدخول إلى المنصة
                  <ArrowRight className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="bg-muted/30 border-y border-border py-6 mt-20">
        <div className="container">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-chart-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-2">تنويه قانوني</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                المخرجات المقدمة من المنصة لأغراض التقييم والتحليل ولا تُعد استشارة قانونية ملزمة ما لم تصدر من جهة مرخصة. للحصول على استشارة قانونية ملزمة، يرجى التواصل مع مستشار قانوني مرخص.
              </p>
              <Link href="/legal-disclaimer" className="text-sm text-primary hover:underline mt-2 inline-block">
                اقرأ التنويه القانوني الكامل ←
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              {APP_LOGO && (
                <img src={APP_LOGO} alt={APP_TITLE} className="h-12" />
              )}
              <p className="text-sm text-muted-foreground">
                منصة الامتثال القانوني والتقني الشاملة للسوق السعودي
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">المنصة</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/frameworks" className="hover:text-primary">الأطر التنظيمية</Link></li>
                <li><Link href="/regulatory-comparison" className="hover:text-primary">مقارنة الجهات</Link></li>
                <li><Link href="/resources" className="hover:text-primary">مركز الموارد</Link></li>
                <li><Link href="/assessments" className="hover:text-primary">التقييمات</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">الشركة</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">من نحن</Link></li>
                <li><Link href="/contact" className="hover:text-primary">تواصل معنا</Link></li>
                <li><Link href="/blog" className="hover:text-primary">المدونة</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">قانوني</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="hover:text-primary">الشروط والأحكام</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 {APP_TITLE}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
