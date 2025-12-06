import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Handshake,
  Award,
  Clock,
  Lightbulb,
  TrendingUp,
  Network,
  Zap,
  DollarSign,
  Rocket,
} from "lucide-react";

export default function KPIsDashboard() {
  const kpis = [
    {
      id: 1,
      title: "الخبرة المزدوجة (قانونية + تقنية)",
      icon: Users,
      target: ">40%",
      current: 45,
      status: "excellent",
      description: "نسبة أعضاء الفريق الذين يجمعون بين الخبرة القانونية والتقنية",
      analysis:
        "فريقنا يضم محامين بخبرة تقنية واستشاريين تقنيين بمعرفة قانونية، مما يميزنا عن المنافسين",
    },
    {
      id: 2,
      title: "العلاقات مع الجهات التنظيمية",
      icon: Handshake,
      target: ">12 شريك",
      current: 85,
      status: "excellent",
      description: "عدد الشراكات والعلاقات مع الجهات التنظيمية والحكومية",
      analysis:
        "علاقات قوية مع SAMA، NCA، CITC، SFDA وجهات أخرى تضمن فهماً عميقاً للمتطلبات",
    },
    {
      id: 3,
      title: "جودة الخدمة",
      icon: Award,
      target: ">90%",
      current: 92,
      status: "excellent",
      description: "معدل رضا العملاء عن جودة الخدمات المقدمة",
      analysis: "تقييمات عملاء ممتازة تعكس التزامنا بالجودة والاحترافية",
    },
    {
      id: 4,
      title: "السرعة في التسليم",
      icon: Clock,
      target: "<90 يوم",
      current: 75,
      status: "good",
      description: "متوسط الوقت لإكمال مشروع امتثال متوسط الحجم",
      analysis: "عمليات مُحسّنة تضمن تسليماً سريعاً دون المساس بالجودة",
    },
    {
      id: 5,
      title: "الابتكار والتطوير",
      icon: Lightbulb,
      target: ">15%",
      current: 18,
      status: "excellent",
      description: "نسبة الوقت والموارد المخصصة للابتكار وتطوير الحلول",
      analysis: "استثمار مستمر في تطوير أدوات وأساليب جديدة لخدمة العملاء",
    },
    {
      id: 6,
      title: "السمعة والعلامة التجارية",
      icon: TrendingUp,
      target: "NPS >70",
      current: 78,
      status: "excellent",
      description: "صافي نقاط الترويج (Net Promoter Score)",
      analysis: "عملاء راضون يوصون بخدماتنا، مما يعكس قوة العلامة التجارية",
    },
    {
      id: 7,
      title: "الشبكة والشراكات",
      icon: Network,
      target: ">10 شراكة",
      current: 70,
      status: "good",
      description: "عدد الشراكات الاستراتيجية مع شركات استشارية وتقنية",
      analysis: "شبكة واسعة من الشركاء تعزز قدرتنا على تقديم حلول متكاملة",
    },
    {
      id: 8,
      title: "الكفاءة التشغيلية",
      icon: Zap,
      target: ">35%",
      current: 38,
      status: "excellent",
      description: "هامش الربح التشغيلي كمؤشر للكفاءة",
      analysis: "عمليات مُحسّنة وأتمتة ذكية تحقق كفاءة عالية",
    },
    {
      id: 9,
      title: "الاستقرار المالي",
      icon: DollarSign,
      target: "إيجابي",
      current: 100,
      status: "excellent",
      description: "التدفق النقدي والسيولة المالية",
      analysis: "وضع مالي قوي يدعم النمو والتوسع المستقبلي",
    },
    {
      id: 10,
      title: "القدرة على التوسع",
      icon: Rocket,
      target: "قابل للتوسع",
      current: 85,
      status: "excellent",
      description: "القدرة على خدمة عملاء جدد دون زيادة تكاليف بنفس النسبة",
      analysis: "بنية تحتية قابلة للتوسع تدعم النمو السريع",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-500";
      case "good":
        return "text-blue-500";
      case "warning":
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-emerald-600">ممتاز</Badge>;
      case "good":
        return <Badge className="bg-blue-600">جيد</Badge>;
      case "warning":
        return <Badge className="bg-amber-600">يحتاج تحسين</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            مؤشرات الأداء الرئيسية
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            10 مؤشرات أداء رئيسية تقيس نجاح المنصة وقدرتها التنافسية
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">المؤشرات الممتازة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-500">
                {kpis.filter((k) => k.status === "excellent").length}/10
              </div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">تحقق الأهداف بامتياز</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">المؤشرات الجيدة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">
                {kpis.filter((k) => k.status === "good").length}/10
              </div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">أداء جيد قابل للتحسين</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">متوسط الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d4af37]">
                {Math.round(kpis.reduce((acc, k) => acc + k.current, 0) / kpis.length)}%
              </div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">إجمالي الأداء</p>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.id} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#2D5F4C]/30 rounded-lg">
                        <Icon className={`h-6 w-6 ${getStatusColor(kpi.status)}`} />
                      </div>
                      <div>
                        <CardTitle className="text-[#f0d98c] text-lg">{kpi.title}</CardTitle>
                        <CardDescription className="text-[#f0d98c]/60 text-sm mt-1">
                          الهدف: {kpi.target}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(kpi.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#f0d98c]/70">الأداء الحالي</span>
                      <span className={`text-2xl font-bold ${getStatusColor(kpi.status)}`}>
                        {kpi.current}%
                      </span>
                    </div>
                    <Progress value={kpi.current} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm text-[#f0d98c]/70 mb-2">{kpi.description}</p>
                    <div className="bg-[#0f2318]/50 p-3 rounded-lg border border-[#2D5F4C]/30">
                      <p className="text-sm text-[#f0d98c]/80">{kpi.analysis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analysis Summary */}
        <Card className="mt-12 bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#f0d98c]">التحليل الشامل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#f0d98c]/80">
            <p>
              تُظهر مؤشرات الأداء الرئيسية أن المنصة تتمتع بوضع تنافسي قوي في السوق السعودي، حيث تحقق{" "}
              <strong className="text-emerald-500">
                {kpis.filter((k) => k.status === "excellent").length} من أصل 10 مؤشرات
              </strong>{" "}
              أداءً ممتازاً.
            </p>
            <p>
              أبرز نقاط القوة تتمثل في <strong className="text-[#d4af37]">الخبرة المزدوجة</strong> للفريق،{" "}
              <strong className="text-[#d4af37]">العلاقات القوية</strong> مع الجهات التنظيمية، و
              <strong className="text-[#d4af37]">جودة الخدمة</strong> العالية التي تنعكس في رضا العملاء.
            </p>
            <p>
              الكفاءة التشغيلية والاستقرار المالي يوفران أساساً متيناً للنمو والتوسع، بينما القدرة على
              التوسع تضمن إمكانية خدمة عدد أكبر من العملاء دون زيادة تكاليف بنفس النسبة.
            </p>
            <p>
              المؤشرات التي تحتاج إلى تحسين مستمر تشمل السرعة في التسليم والشبكة الشراكات، وهي مجالات
              نعمل على تطويرها باستمرار من خلال تحسين العمليات وبناء علاقات استراتيجية جديدة.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
