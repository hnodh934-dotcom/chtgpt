import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react";

export default function SWOTAnalysis() {
  const strengths = [
    {
      title: "التخصص الدقيق",
      description: "تركيز حصري على الامتثال القانوني والتقني في السوق السعودي",
      impact: "عالي",
    },
    {
      title: "الفريق المؤهل",
      description: "خبرة مزدوجة (قانونية + تقنية) لدى 45% من الفريق",
      impact: "عالي",
    },
    {
      title: "قاعدة عملاء أولية",
      description: "15 عميل في السنة الأولى من قطاعات متنوعة",
      impact: "متوسط",
    },
    {
      title: "المعرفة المحلية",
      description: "فهم عميق للبيئة التنظيمية السعودية والثقافة المحلية",
      impact: "عالي",
    },
    {
      title: "الشراكات الاستراتيجية",
      description: "علاقات قوية مع الجهات التنظيمية (SAMA, NCA, CITC, SFDA)",
      impact: "عالي",
    },
  ];

  const weaknesses = [
    {
      title: "علامة تجارية جديدة",
      description: "محدودية الوعي بالعلامة التجارية في السوق",
      impact: "متوسط",
    },
    {
      title: "موارد محدودة",
      description: "رأس مال وموارد بشرية محدودة مقارنة بالمنافسين الكبار",
      impact: "متوسط",
    },
    {
      title: "الاعتماد على فريق صغير",
      description: "خطر فقدان أعضاء رئيسيين في الفريق",
      impact: "عالي",
    },
    {
      title: "نطاق جغرافي محدود",
      description: "التركيز الحالي على السوق السعودي فقط",
      impact: "منخفض",
    },
  ];

  const opportunities = [
    {
      title: "نمو السوق",
      description: "نمو سوق الامتثال في السعودية بمعدل 13% سنوياً",
      impact: "عالي",
    },
    {
      title: "رؤية 2030",
      description: "التحول الرقمي والتنظيمي يخلق طلباً متزايداً",
      impact: "عالي",
    },
    {
      title: "الطلب المتزايد",
      description: "261 شركة في السوق السعودي تحتاج خدمات الامتثال",
      impact: "عالي",
    },
    {
      title: "التشريعات الجديدة",
      description: "إصدار تشريعات جديدة يخلق فرصاً للاستشارات",
      impact: "متوسط",
    },
    {
      title: "التوسع الإقليمي",
      description: "إمكانية التوسع في دول الخليج الأخرى",
      impact: "متوسط",
    },
  ];

  const threats = [
    {
      title: "المنافسة",
      description: "دخول شركات استشارية كبرى للسوق السعودي",
      severity: "متوسط",
    },
    {
      title: "التغيرات التنظيمية",
      description: "تغييرات مفاجئة في الأطر التنظيمية",
      severity: "متوسط",
    },
    {
      title: "التقلبات الاقتصادية",
      description: "تأثير الظروف الاقتصادية على ميزانيات الشركات",
      severity: "منخفض",
    },
    {
      title: "التكنولوجيا (AI)",
      description: "أدوات الذكاء الاصطناعي قد تقلل الحاجة للاستشارات",
      severity: "منخفض",
    },
  ];

  const strategies = [
    {
      type: "SO",
      title: "استراتيجيات القوة-الفرص",
      description: "استغلال نقاط القوة للاستفادة من الفرص",
      items: [
        "استخدام التخصص الدقيق للاستحواذ على حصة من السوق المتنامي",
        "الاستفادة من الشراكات لتقديم حلول متكاملة لرؤية 2030",
        "توظيف الخبرة المزدوجة لخدمة الشركات المتأثرة بالتشريعات الجديدة",
      ],
    },
    {
      type: "WO",
      title: "استراتيجيات الضعف-الفرص",
      description: "معالجة نقاط الضعف للاستفادة من الفرص",
      items: [
        "بناء العلامة التجارية من خلال التسويق الرقمي والمحتوى",
        "جذب استثمارات لتوسيع الموارد والاستفادة من نمو السوق",
        "توظيف مواهب جديدة لتقليل الاعتماد على الفريق الصغير",
      ],
    },
    {
      type: "ST",
      title: "استراتيجيات القوة-التهديدات",
      description: "استخدام نقاط القوة لمواجهة التهديدات",
      items: [
        "التميز بالخبرة المزدوجة لمواجهة المنافسة",
        "الاستفادة من المعرفة المحلية للتكيف السريع مع التغيرات التنظيمية",
        "تعزيز الشراكات لبناء حواجز دخول أمام المنافسين",
      ],
    },
    {
      type: "WT",
      title: "استراتيجيات الضعف-التهديدات",
      description: "تقليل نقاط الضعف وتجنب التهديدات",
      items: [
        "تنويع مصادر الإيرادات لتقليل تأثير التقلبات الاقتصادية",
        "الاستثمار في التكنولوجيا (AI) بدلاً من مقاومتها",
        "بناء علاقات طويلة الأمد مع العملاء لتقليل تأثير المنافسة",
      ],
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "عالي":
        return "bg-emerald-600";
      case "متوسط":
        return "bg-blue-600";
      case "منخفض":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "عالي":
        return "bg-red-600";
      case "متوسط":
        return "bg-amber-600";
      case "منخفض":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            التحليل الاستراتيجي (SWOT)
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            تحليل شامل لنقاط القوة والضعف والفرص والتهديدات
          </p>
        </div>

        {/* SWOT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          <Card className="bg-gradient-to-br from-emerald-900/20 to-[#1a3a2e]/50 border-emerald-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-600/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-emerald-400">نقاط القوة</CardTitle>
                  <CardDescription className="text-emerald-300/70">Strengths</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {strengths.map((item, idx) => (
                <div key={idx} className="bg-[#0f2318]/50 p-4 rounded-lg border border-emerald-800/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-[#f0d98c]">{item.title}</h4>
                    <Badge className={getImpactColor(item.impact)}>{item.impact}</Badge>
                  </div>
                  <p className="text-sm text-[#f0d98c]/70">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="bg-gradient-to-br from-amber-900/20 to-[#1a3a2e]/50 border-amber-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-600/20 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-amber-400">نقاط الضعف</CardTitle>
                  <CardDescription className="text-amber-300/70">Weaknesses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {weaknesses.map((item, idx) => (
                <div key={idx} className="bg-[#0f2318]/50 p-4 rounded-lg border border-amber-800/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-[#f0d98c]">{item.title}</h4>
                    <Badge className={getImpactColor(item.impact)}>{item.impact}</Badge>
                  </div>
                  <p className="text-sm text-[#f0d98c]/70">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-[#1a3a2e]/50 border-blue-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-blue-400">الفرص</CardTitle>
                  <CardDescription className="text-blue-300/70">Opportunities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {opportunities.map((item, idx) => (
                <div key={idx} className="bg-[#0f2318]/50 p-4 rounded-lg border border-blue-800/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-[#f0d98c]">{item.title}</h4>
                    <Badge className={getImpactColor(item.impact)}>{item.impact}</Badge>
                  </div>
                  <p className="text-sm text-[#f0d98c]/70">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Threats */}
          <Card className="bg-gradient-to-br from-red-900/20 to-[#1a3a2e]/50 border-red-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-600/20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-400">التهديدات</CardTitle>
                  <CardDescription className="text-red-300/70">Threats</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {threats.map((item, idx) => (
                <div key={idx} className="bg-[#0f2318]/50 p-4 rounded-lg border border-red-800/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-[#f0d98c]">{item.title}</h4>
                    <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
                  </div>
                  <p className="text-sm text-[#f0d98c]/70">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Strategies */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-8">الاستراتيجيات المقترحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.type} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-[#C5A572] text-[#0f2318]">{strategy.type}</Badge>
                  <CardTitle className="text-xl text-[#f0d98c]">{strategy.title}</CardTitle>
                  <CardDescription className="text-[#f0d98c]/70">{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {strategy.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#f0d98c]/80">
                        <span className="text-[#d4af37] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
