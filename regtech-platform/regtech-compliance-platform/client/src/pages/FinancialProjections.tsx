import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target, Calendar } from "lucide-react";

export default function FinancialProjections() {
  const projections = [
    {
      year: "2025",
      revenue: "2,500,000",
      costs: "1,800,000",
      profit: "700,000",
      margin: "28%",
      clients: 15,
    },
    {
      year: "2026",
      revenue: "5,200,000",
      costs: "3,100,000",
      profit: "2,100,000",
      margin: "40%",
      clients: 35,
    },
    {
      year: "2027",
      revenue: "9,800,000",
      costs: "4,900,000",
      profit: "4,900,000",
      margin: "50%",
      clients: 65,
    },
    {
      year: "2028",
      revenue: "16,500,000",
      costs: "7,400,000",
      profit: "9,100,000",
      margin: "55%",
      clients: 110,
    },
    {
      year: "2029",
      revenue: "25,000,000",
      costs: "10,000,000",
      profit: "15,000,000",
      margin: "60%",
      clients: 170,
    },
  ];

  const kpis = [
    {
      title: "معدل النمو السنوي (CAGR)",
      value: "45%",
      description: "نمو مستدام على مدى 5 سنوات",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      title: "نقطة التعادل",
      value: "السنة الثانية",
      description: "تحقيق الأرباح بعد 18 شهراً",
      icon: Target,
      color: "text-blue-600",
    },
    {
      title: "العائد على الاستثمار (ROI)",
      value: "180%",
      description: "بعد 5 سنوات من التشغيل",
      icon: DollarSign,
      color: "text-amber-600",
    },
    {
      title: "فترة الاسترداد",
      value: "24 شهر",
      description: "استرداد رأس المال الأولي",
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            التوقعات المالية
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            توقعات مالية واقعية لخمس سنوات (2025-2029) مبنية على تحليل السوق ومعدلات النمو المتوقعة
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${kpi.color}`} />
                    <Badge variant="outline" className="text-[#f0d98c] border-[#C5A572]">
                      مؤشر رئيسي
                    </Badge>
                  </div>
                  <CardTitle className="text-[#f0d98c] text-lg mt-4">{kpi.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">{kpi.value}</div>
                  <p className="text-sm text-[#f0d98c]/70">{kpi.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Projections Table */}
        <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-[#f0d98c]">التوقعات المالية التفصيلية (بالريال السعودي)</CardTitle>
            <CardDescription className="text-[#f0d98c]/70">
              جميع الأرقام بالريال السعودي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2D5F4C]">
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">السنة</th>
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">الإيرادات</th>
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">التكاليف</th>
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">صافي الربح</th>
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">هامش الربح</th>
                    <th className="text-right py-4 px-4 text-[#f0d98c] font-semibold">عدد العملاء</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, idx) => (
                    <tr key={proj.year} className={`border-b border-[#2D5F4C]/30 ${idx % 2 === 0 ? 'bg-[#0f2318]/30' : ''}`}>
                      <td className="py-4 px-4 text-[#d4af37] font-bold">{proj.year}</td>
                      <td className="py-4 px-4 text-[#f0d98c]">{proj.revenue} ر.س</td>
                      <td className="py-4 px-4 text-[#f0d98c]">{proj.costs} ر.س</td>
                      <td className="py-4 px-4 text-emerald-400 font-semibold">{proj.profit} ر.س</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="text-[#d4af37] border-[#C5A572]">
                          {proj.margin}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-[#f0d98c]">{proj.clients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c]">تحليل الإيرادات</CardTitle>
            </CardHeader>
            <CardContent className="text-[#f0d98c]/80 space-y-3">
              <p>• نمو الإيرادات من 2.5 مليون ريال في السنة الأولى إلى 25 مليون ريال في السنة الخامسة</p>
              <p>• معدل نمو سنوي مركب (CAGR) بنسبة 45% يعكس التوسع المستدام</p>
              <p>• التنويع بين الباقات الثلاث (Starter, Growth, Enterprise) يضمن استقرار الإيرادات</p>
              <p>• زيادة عدد العملاء من 15 إلى 170 عميل خلال 5 سنوات</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c]">تحليل التكاليف والربحية</CardTitle>
            </CardHeader>
            <CardContent className="text-[#f0d98c]/80 space-y-3">
              <p>• تحسن هامش الربح من 28% في السنة الأولى إلى 60% في السنة الخامسة</p>
              <p>• وفورات الحجم (Economies of Scale) تقلل التكاليف النسبية مع النمو</p>
              <p>• نقطة التعادل في السنة الثانية تعكس كفاءة نموذج العمل</p>
              <p>• العائد على الاستثمار 180% بعد 5 سنوات يجعل المشروع جذاباً للمستثمرين</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c]">الافتراضات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="text-[#f0d98c]/80 space-y-3">
              <p>• متوسط قيمة العقد السنوي: 150,000 ريال</p>
              <p>• معدل الاحتفاظ بالعملاء: 85% سنوياً</p>
              <p>• معدل تحويل العروض: 60%</p>
              <p>• نمو السوق السعودي للامتثال: 13% سنوياً</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c]">المخاطر والتخفيف</CardTitle>
            </CardHeader>
            <CardContent className="text-[#f0d98c]/80 space-y-3">
              <p>• <strong>المنافسة:</strong> التميز بالخبرة المزدوجة (قانونية + تقنية)</p>
              <p>• <strong>التغيرات التنظيمية:</strong> فريق متابعة مستمر للتحديثات</p>
              <p>• <strong>التقلبات الاقتصادية:</strong> باقات مرنة تناسب جميع الأحجام</p>
              <p>• <strong>الاعتماد على فريق صغير:</strong> خطة توظيف تدريجية</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
