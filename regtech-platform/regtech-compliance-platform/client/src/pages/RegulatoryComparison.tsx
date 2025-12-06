import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Building2, 
  AlertTriangle, 
  Calendar, 
  FileText,
  TrendingUp,
  Shield,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Link } from "wouter";

/**
 * ⚖️ صفحة مقارنة الجهات التنظيمية
 * مقارنة شاملة بين SAMA، CMA، SDAIA، CITC، NCA
 */

interface RegulatoryAuthority {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  scope: string;
  keyRequirements: string[];
  penalties: string;
  licenseDuration: string;
  lastUpdate: string;
  website: string;
  color: string;
}

const authorities: RegulatoryAuthority[] = [
  {
    id: "sama",
    name: "مؤسسة النقد العربي السعودي",
    nameEn: "SAMA",
    code: "SAMA",
    scope: "الخدمات المالية والمصرفية والفينتك",
    keyRequirements: [
      "رأس مال لا يقل عن 10 مليون ريال",
      "نظام KYC/AML متكامل",
      "تقارير ربع سنوية",
      "امتثال للأمن السيبراني"
    ],
    penalties: "حتى 10 مليون ريال أو إيقاف الترخيص",
    licenseDuration: "3-5 سنوات (قابلة للتجديد)",
    lastUpdate: "يناير 2025",
    website: "https://www.sama.gov.sa",
    color: "text-chart-1"
  },
  {
    id: "cma",
    name: "هيئة السوق المالية",
    nameEn: "CMA",
    code: "CMA",
    scope: "الأوراق المالية والاستثمار",
    keyRequirements: [
      "رأس مال حسب نوع الترخيص",
      "حوكمة مؤسسية قوية",
      "تقارير شهرية وربع سنوية",
      "إفصاح كامل للمستثمرين"
    ],
    penalties: "حتى 5 مليون ريال + عقوبات إدارية",
    licenseDuration: "سنة واحدة (قابلة للتجديد)",
    lastUpdate: "ديسمبر 2024",
    website: "https://cma.org.sa",
    color: "text-chart-2"
  },
  {
    id: "sdaia",
    name: "الهيئة السعودية للبيانات والذكاء الاصطناعي",
    nameEn: "SDAIA",
    code: "SDAIA",
    scope: "حماية البيانات الشخصية (PDPL)",
    keyRequirements: [
      "سياسات حماية البيانات موثقة",
      "مسؤول حماية بيانات معتمد",
      "تقييم أثر الخصوصية (PIA)",
      "إجراءات الإبلاغ عن الخروقات"
    ],
    penalties: "حتى 3 مليون ريال أو 2% من الإيرادات",
    licenseDuration: "غير محدد (امتثال مستمر)",
    lastUpdate: "سبتمبر 2024",
    website: "https://sdaia.gov.sa",
    color: "text-chart-3"
  },
  {
    id: "citc",
    name: "هيئة الاتصالات وتقنية المعلومات",
    nameEn: "CITC",
    code: "CITC",
    scope: "الاتصالات والخدمات الرقمية",
    keyRequirements: [
      "ترخيص فئة أولى أو ثانية",
      "معايير جودة الخدمة",
      "حماية المستهلك",
      "الأمن السيبراني للشبكات"
    ],
    penalties: "حتى 5 مليون ريال + إيقاف الخدمة",
    licenseDuration: "5 سنوات (قابلة للتجديد)",
    lastUpdate: "أكتوبر 2024",
    website: "https://citc.gov.sa",
    color: "text-chart-4"
  },
  {
    id: "nca",
    name: "الهيئة الوطنية للأمن السيبراني",
    nameEn: "NCA",
    code: "NCA",
    scope: "الأمن السيبراني للقطاعات الحيوية",
    keyRequirements: [
      "امتثال لضوابط الأمن السيبراني",
      "تقييم دوري للمخاطر",
      "خطة استجابة للحوادث",
      "تدريب الموظفين"
    ],
    penalties: "حتى 2 مليون ريال + عقوبات تنظيمية",
    licenseDuration: "غير محدد (امتثال مستمر)",
    lastUpdate: "نوفمبر 2024",
    website: "https://nca.gov.sa",
    color: "text-primary"
  }
];

export default function RegulatoryComparison() {
  return (
    <div className="min-h-screen night-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← العودة للرئيسية
            </Button>
          </Link>
          <h1 className="text-xl font-bold legal-heading">مقارنة الجهات التنظيمية</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            دليل شامل
          </Badge>
          <h2 className="text-4xl font-bold legal-heading gold-glow mb-4">
            مقارنة الجهات التنظيمية السعودية
          </h2>
          <p className="text-lg text-muted-foreground">
            مقارنة تفصيلية بين متطلبات SAMA، CMA، SDAIA، CITC، وNCA لمساعدتك في فهم التزاماتك
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {authorities.map((auth) => (
            <Card key={auth.id} className="premium-card text-center">
              <CardHeader className="pb-3">
                <Scale className={`w-8 h-8 ${auth.color} mx-auto mb-2`} />
                <CardTitle className="text-sm">{auth.code}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {auth.scope}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="space-y-8">
          {/* Scope Comparison */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-primary" />
                <CardTitle>نطاق التطبيق</CardTitle>
              </div>
              <CardDescription>
                القطاعات والأنشطة التي تغطيها كل جهة تنظيمية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {authorities.map((auth) => (
                  <div key={auth.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Badge className={`${auth.color} shrink-0`} variant="outline">
                      {auth.code}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{auth.name}</p>
                      <p className="text-sm text-muted-foreground">{auth.scope}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Requirements */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle>المتطلبات الرئيسية</CardTitle>
              </div>
              <CardDescription>
                أهم الشروط والمتطلبات لكل جهة تنظيمية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorities.map((auth) => (
                  <div key={auth.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={`${auth.color}`} variant="outline">
                        {auth.code}
                      </Badge>
                      <h4 className="font-bold text-sm">{auth.name}</h4>
                    </div>
                    <ul className="space-y-2">
                      {auth.keyRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Penalties */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-chart-5" />
                <CardTitle>الغرامات والعقوبات</CardTitle>
              </div>
              <CardDescription>
                العقوبات المحتملة في حالة عدم الامتثال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {authorities.map((auth) => (
                  <div key={auth.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Badge className={`${auth.color} shrink-0`} variant="outline">
                      {auth.code}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{auth.name}</p>
                      <p className="text-sm text-muted-foreground">{auth.penalties}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* License Duration */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <CardTitle>مدة الترخيص</CardTitle>
              </div>
              <CardDescription>
                فترة صلاحية التراخيص ومتطلبات التجديد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {authorities.map((auth) => (
                  <div key={auth.id} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                    <Badge className={`${auth.color}`} variant="outline">
                      {auth.code}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">{auth.name}</p>
                      <p className="text-xs text-muted-foreground">{auth.licenseDuration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Last Updates */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <CardTitle>آخر التحديثات</CardTitle>
              </div>
              <CardDescription>
                تاريخ آخر تحديث للوائح والأنظمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {authorities.map((auth) => (
                  <div key={auth.id} className="text-center p-4 rounded-lg bg-muted/30">
                    <Badge className={`${auth.color} mb-2`} variant="outline">
                      {auth.code}
                    </Badge>
                    <p className="text-sm font-semibold mb-1">{auth.name}</p>
                    <p className="text-xs text-muted-foreground">{auth.lastUpdate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Official Links */}
          <Card className="premium-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <CardTitle>الروابط الرسمية</CardTitle>
              </div>
              <CardDescription>
                المواقع الرسمية للجهات التنظيمية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {authorities.map((auth) => (
                  <a
                    key={auth.id}
                    href={auth.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Badge className={`${auth.color}`} variant="outline">
                      {auth.code}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{auth.name}</p>
                      <p className="text-xs text-primary">زيارة الموقع ←</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="premium-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl legal-heading">
                هل تحتاج مساعدة في الامتثال؟
              </CardTitle>
              <CardDescription>
                منصتنا تساعدك على تحقيق الامتثال الكامل لجميع الجهات التنظيمية
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  ابدأ تجربة مجانية
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  تواصل معنا
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
