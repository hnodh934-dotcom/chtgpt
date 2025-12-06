import { useState } from "react";
import { useParams, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Loader2, 
  ArrowRight,
  Home,
  ChevronRight,
  ClipboardCheck,
  Calendar,
  User,
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Download
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📊 صفحة تفاصيل التقييم - عرض تفاصيل تقييم الامتثال
 * Assessment Details Page - Display compliance assessment details
 */
export default function AssessmentDetails() {
  const { user } = useAuth();
  const params = useParams();
  const assessmentId = params.id ? parseInt(params.id) : 0;

  // TODO: Add assessments.getById query when implemented
  // const { data: assessment, isLoading } = trpc.assessments.getById.useQuery({ id: assessmentId });
  
  // Mock data for now
  const assessment = {
    id: 1,
    name: "تقييم الامتثال لنظام PDPL - Q1 2024",
    frameworkId: 1,
    frameworkName: "نظام حماية البيانات الشخصية (PDPL)",
    status: "in_progress",
    progress: 65,
    startDate: "2024-01-15",
    dueDate: "2024-03-31",
    assessor: "أحمد محمد",
    assessorEmail: "ahmed@example.com",
    description: "تقييم شامل للامتثال لنظام حماية البيانات الشخصية للربع الأول من عام 2024",
    controlAssessments: [
      {
        id: 1,
        controlId: 1,
        controlName: "إدارة الموافقات",
        controlCode: "PDPL-C01",
        status: "compliant",
        score: 95,
        notes: "تم تطبيق جميع المتطلبات بشكل صحيح",
        evidenceCount: 3,
        lastUpdated: "2024-02-15"
      },
      {
        id: 2,
        controlId: 2,
        controlName: "سياسات الاحتفاظ",
        controlCode: "PDPL-C02",
        status: "partially_compliant",
        score: 70,
        notes: "بعض السياسات تحتاج تحديث",
        evidenceCount: 2,
        lastUpdated: "2024-02-20"
      },
      {
        id: 3,
        controlId: 3,
        controlName: "أمن البيانات",
        controlCode: "PDPL-C03",
        status: "not_assessed",
        score: 0,
        notes: "",
        evidenceCount: 0,
        lastUpdated: null
      }
    ]
  };
  const isLoading = false;

  const statusLabels: Record<string, string> = {
    draft: "مسودة",
    in_progress: "قيد التنفيذ",
    completed: "مكتمل",
    archived: "مؤرشف"
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-500/10 text-gray-500 border-gray-500/30",
    in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    completed: "bg-green-500/10 text-green-500 border-green-500/30",
    archived: "bg-gray-400/10 text-gray-400 border-gray-400/30"
  };

  const complianceStatusLabels: Record<string, string> = {
    compliant: "ملتزم",
    partially_compliant: "ملتزم جزئياً",
    non_compliant: "غير ملتزم",
    not_assessed: "لم يتم التقييم"
  };

  const complianceStatusColors: Record<string, string> = {
    compliant: "bg-green-500/10 text-green-500 border-green-500/30",
    partially_compliant: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    non_compliant: "bg-red-500/10 text-red-500 border-red-500/30",
    not_assessed: "bg-gray-500/10 text-gray-500 border-gray-500/30"
  };

  const complianceStatusIcons: Record<string, any> = {
    compliant: CheckCircle2,
    partially_compliant: AlertCircle,
    non_compliant: XCircle,
    not_assessed: Clock
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل تفاصيل التقييم...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient" dir="rtl">
        <Card className="premium-card max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium legal-heading mb-2">
              التقييم غير موجود
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              لم يتم العثور على التقييم المطلوب
            </p>
            <Link href="/assessments">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                العودة للتقييمات
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedControls = assessment.controlAssessments.filter(ca => ca.status !== 'not_assessed').length;
  const totalControls = assessment.controlAssessments.length;
  const averageScore = assessment.controlAssessments
    .filter(ca => ca.status !== 'not_assessed')
    .reduce((sum, ca) => sum + ca.score, 0) / completedControls || 0;

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
              <Link href="/assessments">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="w-4 h-4" />
                  التقييمات
                </Button>
              </Link>
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
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/">
            <span className="hover:text-primary cursor-pointer">الرئيسية</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/assessments">
            <span className="hover:text-primary cursor-pointer">التقييمات</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{assessment.name}</span>
        </div>

        {/* Assessment Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <ClipboardCheck className="w-12 h-12 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${statusColors[assessment.status] || statusColors.draft}`}
                >
                  {statusLabels[assessment.status] || assessment.status}
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  #{assessment.id}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
                {assessment.name}
              </h2>
              <p className="text-muted-foreground">
                {assessment.description}
              </p>
            </div>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Assessment Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">الإطار التنظيمي</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/frameworks/${assessment.frameworkId}`}>
                <p className="text-lg font-medium hover:text-primary transition-colors cursor-pointer">
                  {assessment.frameworkName}
                </p>
              </Link>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">المقيّم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-lg font-medium">{assessment.assessor}</p>
                  <p className="text-xs text-muted-foreground">{assessment.assessorEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">المدة الزمنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">البدء:</span>
                  <span className="font-medium">{new Date(assessment.startDate).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">الانتهاء:</span>
                  <span className="font-medium">{new Date(assessment.dueDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <Card className="premium-card mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              ملخص التقدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">نسبة الإنجاز</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">{assessment.progress}%</span>
                </div>
                <Progress value={assessment.progress} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">الضوابط المكتملة</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{completedControls}</span>
                  <span className="text-muted-foreground">/ {totalControls}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">متوسط الدرجة</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{Math.round(averageScore)}</span>
                  <span className="text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Assessments */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              تقييم الضوابط
            </CardTitle>
            <CardDescription>
              تفاصيل تقييم كل ضابط من ضوابط الامتثال
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessment.controlAssessments.map((ca) => {
                const StatusIcon = complianceStatusIcons[ca.status] || Clock;
                
                return (
                  <Card key={ca.id} className="bg-muted/30 border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {ca.controlCode}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${complianceStatusColors[ca.status]}`}
                            >
                              <StatusIcon className="w-3 h-3 ml-1" />
                              {complianceStatusLabels[ca.status]}
                            </Badge>
                          </div>
                          <Link href={`/controls/${ca.controlId}`}>
                            <CardTitle className="text-base hover:text-primary transition-colors cursor-pointer">
                              {ca.controlName}
                            </CardTitle>
                          </Link>
                        </div>
                        {ca.status !== 'not_assessed' && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{ca.score}</p>
                            <p className="text-xs text-muted-foreground">/ 100</p>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    {(ca.notes || ca.evidenceCount > 0) && (
                      <CardContent>
                        {ca.notes && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {ca.notes}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {ca.evidenceCount > 0 && (
                              <span className="flex items-center gap-1">
                                <Upload className="w-4 h-4" />
                                {ca.evidenceCount} أدلة
                              </span>
                            )}
                            {ca.lastUpdated && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                آخر تحديث: {new Date(ca.lastUpdated).toLocaleDateString('ar-SA')}
                              </span>
                            )}
                          </div>
                          <Button size="sm" variant="outline">
                            {ca.status === 'not_assessed' ? 'بدء التقييم' : 'عرض التفاصيل'}
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
