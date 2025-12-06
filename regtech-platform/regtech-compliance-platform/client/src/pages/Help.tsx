import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  MessageCircle, 
  Video,
  FileText,
  Search,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Shield,
  FileCode,
  Activity,
  Target,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

/**
 * 🎯 Help Page - صفحة المساعدة
 * 
 * دليل شامل لاستخدام المنصة:
 * - شرح الأدوات الخمس
 * - أسئلة شائعة (FAQ)
 * - فيديوهات تعليمية
 * - دليل البدء السريع
 */
export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      icon: MessageCircle,
      name: "RegAdvisor",
      title: "المستشار التنظيمي الذكي",
      description: "محرك ذكاء اصطناعي يجيب على أسئلتك حول الأنظمة والضوابط التنظيمية",
      features: [
        "إجابات فورية من 378 ضابط تنظيمي",
        "استشهادات دقيقة بالمواد والضوابط",
        "أسئلة مقترحة ذات صلة",
        "نسبة ثقة لكل إجابة",
      ],
      usage: "اطرح سؤالك بالعربية أو الإنجليزية، وسيبحث RegAdvisor في قاعدة البيانات ويقدم إجابة شاملة مع المراجع.",
      example: "مثال: \"ما هي متطلبات حماية البيانات الشخصية حسب PDPL؟\"",
    },
    {
      icon: FileText,
      name: "RegDrafter",
      title: "المحرر التنظيمي الذكي",
      description: "يكتب ويراجع السياسات التنظيمية بذكاء اصطناعي",
      features: [
        "5 قوالب جاهزة (PDPL, ECC, SAMA, NCA, CITC)",
        "كتابة سياسات شاملة من الصفر",
        "مراجعة سياسات موجودة",
        "تقرير امتثال مفصل",
      ],
      usage: "اختر قالباً أو اكتب متطلباتك، وسيولد RegDrafter سياسة كاملة مع استشهادات بالضوابط.",
      example: "مثال: اختر \"PDPL Privacy Policy\" وأدخل معلومات شركتك للحصول على سياسة خصوصية كاملة.",
    },
    {
      icon: FileCode,
      name: "RaaC",
      title: "التنظيم كالكود",
      description: "يحول القواعد التنظيمية إلى كود قابل للتنفيذ",
      features: [
        "تصدير بـ 4 صيغ (JSON, XML, YAML, OpenAPI)",
        "تحقق آلي من البيانات",
        "حساب نسبة الامتثال",
        "تحليل الانتهاكات",
      ],
      usage: "صدّر القواعد بالصيغة المطلوبة، ثم استخدمها للتحقق الآلي من البيانات في أنظمتك.",
      example: "مثال: صدّر ضوابط PDPL بصيغة JSON واستخدمها في API validation.",
    },
    {
      icon: Target,
      name: "ComplianceHub",
      title: "مركز الامتثال الشامل",
      description: "Dashboard متقدم يجمع جميع معلومات الامتثال",
      features: [
        "نسب امتثال لجميع الأطر",
        "Donut Chart تفاعلي",
        "تحليل الفجوات (Gap Analysis)",
        "تقارير قابلة للتصدير",
      ],
      usage: "شاهد نظرة عامة على حالة الامتثال لجميع الأطر، وحدد الفجوات والأولويات.",
      example: "مثال: شاهد نسبة امتثالك لـ PDPL مقارنة بـ ECC و SAMA.",
    },
    {
      icon: Activity,
      name: "RegMonitor",
      title: "نظام المراقبة",
      description: "يراقب التحديثات التنظيمية ويرسل تنبيهات",
      features: [
        "تنبيهات حسب المستوى (Critical, Warning, Info)",
        "تحليل الاتجاهات",
        "إحصائيات مفصلة",
        "Override Mode للمالك",
      ],
      usage: "فعّل المراقبة لإطار معين، وستصلك تنبيهات عند أي تحديثات أو تغييرات.",
      example: "مثال: راقب تحديثات PDPL واحصل على تنبيه فوري عند صدور ضوابط جديدة.",
    },
  ];

  const faqs = [
    {
      question: "كيف أبدأ استخدام المنصة؟",
      answer: "ابدأ بـ Onboarding Wizard (/onboarding) لإنشاء مشروعك الأول واختيار الأطر التنظيمية. ثم انتقل إلى ComplianceHub لرؤية نظرة عامة.",
    },
    {
      question: "هل البيانات آمنة؟",
      answer: "نعم. نستخدم Helmet + CORS + XSS Protection + Rate Limiting. جميع الاتصالات مشفرة بـ HTTPS.",
    },
    {
      question: "كم عدد الضوابط المتوفرة؟",
      answer: "378 ضابط من 5 أطر: PDPL (43), ECC (215), SAMA (50), NCA (40), CITC (30).",
    },
    {
      question: "هل يمكنني تصدير التقارير؟",
      answer: "نعم. يمكنك تصدير السياسات (PDF/Word) والقواعد (JSON/XML/YAML) والتقارير من ComplianceHub.",
    },
    {
      question: "ما هي دقة RegAdvisor؟",
      answer: "RegAdvisor يستخدم Rule Engine v2.5 مع 378 ضابط من قاعدة البيانات. لا hallucinations - فقط إجابات من مصادر موثوقة.",
    },
    {
      question: "هل يدعم المنصة اللغة العربية؟",
      answer: "نعم. جميع الأدوات تدعم العربية والإنجليزية بالكامل.",
    },
  ];

  const quickStart = [
    {
      step: 1,
      title: "إنشاء مشروع",
      description: "انتقل إلى /onboarding واتبع الخطوات الثلاث",
      icon: Sparkles,
    },
    {
      step: 2,
      title: "اختر إطارين",
      description: "اختر الأطر التنظيمية المناسبة لمجالك (PDPL, ECC, إلخ)",
      icon: Shield,
    },
    {
      step: 3,
      title: "استكشف الأدوات",
      description: "جرّب RegAdvisor للأسئلة، RegDrafter للسياسات، RaaC للتصدير",
      icon: Target,
    },
    {
      step: 4,
      title: "راقب الامتثال",
      description: "استخدم ComplianceHub لمتابعة التقدم وتحديد الفجوات",
      icon: Activity,
    },
  ];

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.title.includes(searchQuery) ||
    tool.description.includes(searchQuery)
  );

  const filteredFAQs = faqs.filter(faq =>
    faq.question.includes(searchQuery) ||
    faq.answer.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">مركز المساعدة</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            كيف يمكننا مساعدتك؟
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            دليل شامل لاستخدام منصة RegTech
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن موضوع أو أداة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="glass-card grid grid-cols-3 w-full max-w-2xl mx-auto">
            <TabsTrigger value="tools">
              <BookOpen className="w-4 h-4 mr-2" />
              الأدوات
            </TabsTrigger>
            <TabsTrigger value="faq">
              <MessageCircle className="w-4 h-4 mr-2" />
              أسئلة شائعة
            </TabsTrigger>
            <TabsTrigger value="quick-start">
              <Sparkles className="w-4 h-4 mr-2" />
              البدء السريع
            </TabsTrigger>
          </TabsList>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            {filteredTools.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">لا توجد نتائج للبحث "{searchQuery}"</p>
                </CardContent>
              </Card>
            ) : (
              filteredTools.map((tool, idx) => (
                <Card key={idx} className="glass-card border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <tool.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">{tool.name}</Badge>
                          <CardTitle className="text-xl">{tool.title}</CardTitle>
                          <CardDescription className="mt-1">{tool.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">الميزات:</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Usage */}
                    <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
                      <h4 className="font-semibold mb-2 text-sm">كيفية الاستخدام:</h4>
                      <p className="text-sm text-muted-foreground mb-2">{tool.usage}</p>
                      <p className="text-sm text-purple-300 italic">{tool.example}</p>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = `/${tool.name.toLowerCase()}`}
                    >
                      جرّب {tool.name} الآن
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">لا توجد نتائج للبحث "{searchQuery}"</p>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq, idx) => (
                <Card key={idx} className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quick-start" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  دليل البدء السريع
                </CardTitle>
                <CardDescription>
                  اتبع هذه الخطوات الأربع للبدء في استخدام المنصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quickStart.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center">
                          <span className="text-lg font-bold text-purple-400">{item.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {idx < quickStart.length - 1 && (
                        <div className="absolute right-[26px] mt-12 h-6 w-0.5 bg-purple-500/20" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials (Placeholder) */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-400" />
                  فيديوهات تعليمية
                </CardTitle>
                <CardDescription>
                  شروحات مصورة لجميع الأدوات (قريباً)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tools.slice(0, 4).map((tool, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-black/20 border border-gray-800">
                      <div className="aspect-video bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                        <Video className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold mb-1">{tool.name} - شرح مفصل</h4>
                      <p className="text-sm text-muted-foreground">مدة الفيديو: 5 دقائق</p>
                      <Badge variant="outline" className="mt-2">قريباً</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card className="glass-card border-purple-500/20 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">لم تجد ما تبحث عنه؟</h3>
                <p className="text-sm text-muted-foreground">
                  تواصل مع فريق الدعم للحصول على مساعدة إضافية
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                تواصل معنا
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
