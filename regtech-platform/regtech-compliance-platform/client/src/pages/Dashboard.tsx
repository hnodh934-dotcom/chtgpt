import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Loader2, 
  Home,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Scale,
  ClipboardCheck,
  FileText,
  Calendar,
  Settings,
  Lock,
  Users,
  FileCheck
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📊 لوحة التحكم - Analytics Dashboard
 * Comprehensive compliance analytics and insights
 */
export default function Dashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");

  // TODO: Add real data queries
  const { data: frameworks } = trpc.frameworks.list.useQuery();
  
  // Mock analytics data
  const analytics = {
    overallCompliance: 78,
    complianceTrend: 5.2, // percentage change
    activeAssessments: 3,
    completedAssessments: 12,
    totalControls: 45,
    compliantControls: 35,
    partiallyCompliantControls: 7,
    nonCompliantControls: 3,
    recentActivity: [
      {
        id: 1,
        type: "assessment_completed",
        title: "تم إكمال تقييم PDPL Q4 2023",
        timestamp: "2024-01-15T10:30:00",
        score: 95
      },
      {
        id: 2,
        type: "control_updated",
        title: "تحديث ضابط إدارة الموافقات",
        timestamp: "2024-01-14T15:45:00"
      },
      {
        id: 3,
        type: "evidence_uploaded",
        title: "رفع 3 أدلة جديدة لضابط أمن البيانات",
        timestamp: "2024-01-14T09:20:00"
      },
      {
        id: 4,
        type: "assessment_started",
        title: "بدء تقييم جديد لنظام المدفوعات",
        timestamp: "2024-01-13T14:00:00"
      }
    ],
    complianceByFramework: [
      {
        frameworkId: 1,
        frameworkName: "PDPL",
        compliance: 85,
        controlsTotal: 25,
        controlsCompliant: 21
      },
      {
        frameworkId: 2,
        frameworkName: "نظام المدفوعات",
        compliance: 70,
        controlsTotal: 20,
        controlsCompliant: 14
      }
    ],
    upcomingDeadlines: [
      {
        id: 1,
        title: "تقييم PDPL Q1 2024",
        dueDate: "2024-03-31",
        daysLeft: 45,
        progress: 65
      },
      {
        id: 2,
        title: "مراجعة سياسات الاحتفاظ",
        dueDate: "2024-02-28",
        daysLeft: 14,
        progress: 30
      }
    ]
  };

  const timeRangeLabels = {
    week: "أسبوع",
    month: "شهر",
    quarter: "ربع سنة",
    year: "سنة"
  };

  const activityIcons: Record<string, any> = {
    assessment_completed: CheckCircle2,
    control_updated: Shield,
    evidence_uploaded: FileText,
    assessment_started: ClipboardCheck
  };

  const activityColors: Record<string, string> = {
    assessment_completed: "text-green-500",
    control_updated: "text-blue-500",
    evidence_uploaded: "text-yellow-500",
    assessment_started: "text-purple-500"
  };

  return (
    <div className="min-h-screen night-gradient" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {APP_LOGO && (
                <Link href="/">
                  <img src={APP_LOGO} alt={APP_TITLE} className="h-10 cursor-pointer" />
                </Link>
              )}
              <div>
                <h1 className="text-xl font-bold legal-heading">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">RegTech Compliance Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <GlobalSearch />
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  الرئيسية
                </Button>
              </Link>
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold legal-heading gold-glow mb-2">
                مرحباً، {user?.name || 'المستخدم'} 👋
              </h2>
              <p className="text-lg text-muted-foreground">
                إليك نظرة شاملة على حالة الامتثال لشركتك
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["week", "month", "quarter", "year"] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="min-w-[80px]"
                >
                  {timeRangeLabels[range]}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Link href="/diagnostic">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">التشخيص الشامل</h3>
                    <p className="text-xs text-muted-foreground">تحليل الوثائق بالذكاء الاصطناعي</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/frameworks">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">تصفح الأطر</h3>
                    <p className="text-xs text-muted-foreground">استكشف المتطلبات التنظيمية</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">إنشاء تقرير</h3>
                    <p className="text-xs text-muted-foreground">تقارير احترافية جاهزة</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-chart-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">الإعدادات</h3>
                    <p className="text-xs text-muted-foreground">إدارة الحساب والفريق</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/aml">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">AML/CTF</h3>
                    <p className="text-xs text-muted-foreground">مكافحة غسل الأموال</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/kyc">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">KYC</h3>
                    <p className="text-xs text-muted-foreground">اعرف عميلك</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/compliance-reports">
              <Card className="premium-card hover:scale-105 transition-transform cursor-pointer h-full">
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">التقارير</h3>
                    <p className="text-xs text-muted-foreground">التقارير التنظيمية</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">نسبة الامتثال الإجمالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-primary">{analytics.overallCompliance}%</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 text-xs">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +{analytics.complianceTrend}%
                </Badge>
              </div>
              <Progress value={analytics.overallCompliance} className="h-2" />
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">التقييمات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">{analytics.activeAssessments}</span>
                <ClipboardCheck className="w-10 h-10 text-chart-2/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {analytics.completedAssessments} مكتمل
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">الضوابط الملتزمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{analytics.compliantControls}</span>
                <span className="text-muted-foreground">/ {analytics.totalControls}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((analytics.compliantControls / analytics.totalControls) * 100)}% نسبة الامتثال
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">الضوابط غير الملتزمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-destructive">{analytics.nonCompliantControls}</span>
                <AlertTriangle className="w-10 h-10 text-destructive/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {analytics.partiallyCompliantControls} ملتزم جزئياً
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Compliance by Framework */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                الامتثال حسب الإطار التنظيمي
              </CardTitle>
              <CardDescription>
                نسبة الامتثال لكل إطار تنظيمي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.complianceByFramework.map((fw) => (
                  <div key={fw.frameworkId}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{fw.frameworkName}</p>
                        <p className="text-xs text-muted-foreground">
                          {fw.controlsCompliant} / {fw.controlsTotal} ضابط
                        </p>
                      </div>
                      <span className="text-lg font-bold text-primary">{fw.compliance}%</span>
                    </div>
                    <Progress value={fw.compliance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                المواعيد النهائية القادمة
              </CardTitle>
              <CardDescription>
                التقييمات والمهام المطلوبة قريباً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {deadline.daysLeft} يوم متبقي
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={deadline.daysLeft < 30 ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"}
                      >
                        {new Date(deadline.dueDate).toLocaleDateString('ar-SA')}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">التقدم</span>
                        <span className="text-xs font-medium">{deadline.progress}%</span>
                      </div>
                      <Progress value={deadline.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              النشاط الأخير
            </CardTitle>
            <CardDescription>
              آخر التحديثات والأنشطة في المنصة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type] || Clock;
                const colorClass = activityColors[activity.type] || "text-muted-foreground";
                
                return (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className={`p-2 rounded-lg bg-muted/30 ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    {activity.score && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                        {activity.score}%
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
