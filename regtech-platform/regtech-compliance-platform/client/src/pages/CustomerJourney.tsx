import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileSearch,
  BarChart3,
  CheckCircle2,
  FileText,
  Cog,
  GraduationCap,
  ClipboardCheck,
  Headphones,
  TrendingUp,
} from "lucide-react";

export default function CustomerJourney() {
  const [activePhase, setActivePhase] = useState<"pre-sale" | "execution" | "post-execution">("pre-sale");

  const phases = {
    "pre-sale": {
      title: "ما قبل البيع",
      description: "التعرف على العميل وفهم احتياجاته",
      steps: [
        {
          number: 1,
          title: "Kick-off Meeting",
          icon: Users,
          duration: "1-2 أيام",
          description: "اجتماع تعريفي مع فريق العميل لفهم الأهداف والتوقعات",
          deliverables: ["محضر اجتماع", "خطة عمل أولية", "جدول زمني مقترح"],
        },
        {
          number: 2,
          title: "جمع المعلومات",
          icon: FileSearch,
          duration: "3-5 أيام",
          description: "جمع الوثائق والسياسات والإجراءات الحالية",
          deliverables: ["قائمة الوثائق المطلوبة", "استبيان تقييم أولي", "مصفوفة الأصول"],
        },
        {
          number: 3,
          title: "التحليل الأولي",
          icon: BarChart3,
          duration: "5-7 أيام",
          description: "تحليل الوضع الحالي وتحديد الفجوات الأساسية",
          deliverables: ["تقرير تحليل أولي", "تقييم المخاطر الأولي", "عرض تقديمي للإدارة"],
        },
      ],
    },
    execution: {
      title: "التنفيذ",
      description: "تنفيذ مشروع الامتثال",
      steps: [
        {
          number: 4,
          title: "التقييم الشامل",
          icon: CheckCircle2,
          duration: "2-4 أسابيع",
          description: "تقييم شامل للامتثال مقابل الأطر التنظيمية المطلوبة",
          deliverables: ["تقرير تقييم شامل", "مصفوفة الفجوات", "تقييم المخاطر التفصيلي"],
        },
        {
          number: 5,
          title: "إعداد خطة العمل",
          icon: FileText,
          duration: "1-2 أسابيع",
          description: "إعداد خطة عمل تفصيلية لمعالجة الفجوات",
          deliverables: ["خطة عمل تفصيلية", "جدول زمني", "تقدير الموارد"],
        },
        {
          number: 6,
          title: "التنفيذ والتطبيق",
          icon: Cog,
          duration: "4-12 أسابيع",
          description: "تنفيذ الإجراءات التصحيحية ومعالجة الفجوات",
          deliverables: ["سياسات محدثة", "إجراءات جديدة", "تقارير تقدم أسبوعية"],
        },
        {
          number: 7,
          title: "التدريب والتوعية",
          icon: GraduationCap,
          duration: "1-2 أسابيع",
          description: "تدريب الفريق على السياسات والإجراءات الجديدة",
          deliverables: ["مواد تدريبية", "ورش عمل", "شهادات حضور"],
        },
      ],
    },
    "post-execution": {
      title: "ما بعد التنفيذ",
      description: "المتابعة والتحسين المستمر",
      steps: [
        {
          number: 8,
          title: "المراجعة النهائية",
          icon: ClipboardCheck,
          duration: "1-2 أسابيع",
          description: "مراجعة شاملة للتأكد من تحقيق الامتثال",
          deliverables: ["تقرير امتثال نهائي", "شهادة امتثال", "توصيات تحسين"],
        },
        {
          number: 9,
          title: "الدعم المستمر",
          icon: Headphones,
          duration: "3-12 شهر",
          description: "دعم فني ومتابعة مستمرة بعد انتهاء المشروع",
          deliverables: ["تقارير متابعة ربع سنوية", "استشارات عند الطلب", "تحديثات تنظيمية"],
        },
        {
          number: 10,
          title: "التحسين المستمر",
          icon: TrendingUp,
          duration: "مستمر",
          description: "مراجعة دورية وتحديث للسياسات والإجراءات",
          deliverables: ["تقارير تحسين", "توصيات تطوير", "خطط تحديث"],
        },
      ],
    },
  };

  const kpis = [
    {
      title: "معدل الاحتفاظ بالعملاء",
      value: 85,
      target: ">85%",
      description: "نسبة العملاء الذين يستمرون في العمل معنا",
    },
    {
      title: "رضا العملاء",
      value: 92,
      target: ">90%",
      description: "معدل رضا العملاء عن الخدمات المقدمة",
    },
    {
      title: "معدل تحويل العروض",
      value: 60,
      target: "60%",
      description: "نسبة العروض التي تتحول إلى مشاريع فعلية",
    },
    {
      title: "وقت الاستجابة",
      value: 95,
      target: "<24 ساعة",
      description: "متوسط وقت الاستجابة لاستفسارات العملاء",
    },
  ];

  const currentPhaseSteps = phases[activePhase].steps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            رحلة العميل
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            10 خطوات واضحة من البداية حتى النهاية لضمان نجاح مشروع الامتثال
          </p>
        </div>

        {/* Phase Tabs */}
        <Tabs value={activePhase} onValueChange={(v) => setActivePhase(v as any)} className="w-full mb-12">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8 bg-[#1a3a2e]/50">
            <TabsTrigger
              value="pre-sale"
              className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]"
            >
              ما قبل البيع
            </TabsTrigger>
            <TabsTrigger
              value="execution"
              className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]"
            >
              التنفيذ
            </TabsTrigger>
            <TabsTrigger
              value="post-execution"
              className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]"
            >
              ما بعد التنفيذ
            </TabsTrigger>
          </TabsList>

          {Object.entries(phases).map(([key, phase]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#f0d98c]">{phase.title}</CardTitle>
                  <CardDescription className="text-[#f0d98c]/70">{phase.description}</CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-6">
                {phase.steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <Card key={step.number} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-[#2D5F4C] flex items-center justify-center text-[#f0d98c] font-bold text-lg">
                              {step.number}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-6 w-6 text-[#d4af37]" />
                              <CardTitle className="text-xl text-[#f0d98c]">{step.title}</CardTitle>
                              <Badge variant="outline" className="text-[#f0d98c] border-[#C5A572]">
                                {step.duration}
                              </Badge>
                            </div>
                            <CardDescription className="text-[#f0d98c]/70">{step.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="font-semibold text-[#f0d98c] mb-3">المخرجات:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {step.deliverables.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-[#f0d98c]/80 bg-[#0f2318]/50 p-2 rounded"
                              >
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* KPIs */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-8">مؤشرات أداء رحلة العميل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => (
              <Card key={kpi.title} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c] text-lg">{kpi.title}</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60 text-sm">الهدف: {kpi.target}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-[#d4af37]">{kpi.value}%</div>
                  <Progress value={kpi.value} className="h-2" />
                  <p className="text-sm text-[#f0d98c]/70">{kpi.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card className="mt-12 bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#f0d98c]">ملخص رحلة العميل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#f0d98c]/80">
            <p>
              رحلة العميل مصممة لضمان تجربة سلسة واحترافية من اللحظة الأولى حتى التحسين المستمر. نحن نؤمن
              بأن نجاح العميل هو نجاحنا، ولذلك نركز على:
            </p>
            <ul className="space-y-2 mr-6">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] mt-1">•</span>
                <span>
                  <strong>الشفافية الكاملة:</strong> تحديثات منتظمة وتواصل مستمر طوال المشروع
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] mt-1">•</span>
                <span>
                  <strong>الجودة أولاً:</strong> مراجعات دقيقة في كل مرحلة لضمان أعلى المعايير
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] mt-1">•</span>
                <span>
                  <strong>التسليم في الوقت المحدد:</strong> التزام صارم بالجداول الزمنية المتفق عليها
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] mt-1">•</span>
                <span>
                  <strong>الدعم المستمر:</strong> لا ننتهي عند تسليم المشروع، بل نستمر في الدعم والمتابعة
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
