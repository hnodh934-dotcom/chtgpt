import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Plus,
  Home,
  ClipboardCheck,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📊 صفحة التقييمات - عرض جميع تقييمات الامتثال
 * Assessments Page - Display all compliance assessments
 */
export default function Assessments() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // TODO: Add assessments.list query when implemented
  // const { data: assessments, isLoading } = trpc.assessments.list.useQuery();
  
  // Mock data for now
  const assessments = [
    {
      id: 1,
      name: "تقييم الامتثال لنظام PDPL - Q1 2024",
      frameworkId: 1,
      frameworkName: "نظام حماية البيانات الشخصية (PDPL)",
      status: "in_progress",
      progress: 65,
      startDate: "2024-01-15",
      dueDate: "2024-03-31",
      assessor: "أحمد محمد",
      controlsTotal: 12,
      controlsCompleted: 8
    },
    {
      id: 2,
      name: "تقييم الامتثال لنظام المدفوعات - Q4 2023",
      frameworkId: 2,
      frameworkName: "نظام المدفوعات وخدماتها",
      status: "completed",
      progress: 100,
      startDate: "2023-10-01",
      dueDate: "2023-12-31",
      completedDate: "2023-12-28",
      assessor: "فاطمة علي",
      controlsTotal: 8,
      controlsCompleted: 8
    }
  ];
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

  const statusIcons: Record<string, any> = {
    draft: AlertCircle,
    in_progress: Clock,
    completed: CheckCircle2,
    archived: AlertCircle
  };

  const filteredAssessments = statusFilter === "all" 
    ? assessments 
    : assessments.filter(a => a.status === statusFilter);

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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2 flex items-center gap-3">
                <ClipboardCheck className="w-8 h-8 text-primary" />
                تقييمات الامتثال
              </h2>
              <p className="text-muted-foreground">
                إدارة ومتابعة تقييمات الامتثال للأطر التنظيمية
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              تقييم جديد
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              الكل ({assessments.length})
            </Button>
            <Button
              variant={statusFilter === "in_progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("in_progress")}
              className="gap-2"
            >
              <Clock className="w-3 h-3" />
              قيد التنفيذ ({assessments.filter(a => a.status === "in_progress").length})
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className="gap-2"
            >
              <CheckCircle2 className="w-3 h-3" />
              مكتمل ({assessments.filter(a => a.status === "completed").length})
            </Button>
          </div>
        </div>

        {/* Assessments Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground mt-4">جاري تحميل التقييمات...</p>
          </div>
        ) : filteredAssessments.length > 0 ? (
          <div className="grid gap-6">
            {filteredAssessments.map((assessment) => {
              const StatusIcon = statusIcons[assessment.status] || Clock;
              
              return (
                <Link key={assessment.id} href={`/assessments/${assessment.id}`}>
                  <Card className="premium-card hover:scale-[1.01] transition-all group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${statusColors[assessment.status] || statusColors.draft}`}
                            >
                              <StatusIcon className="w-3 h-3 ml-1" />
                              {statusLabels[assessment.status] || assessment.status}
                            </Badge>
                            <Badge variant="secondary" className="text-xs font-mono">
                              #{assessment.id}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl legal-heading group-hover:text-primary transition-colors mb-2">
                            {assessment.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {assessment.frameworkName}
                          </CardDescription>
                        </div>
                        <ClipboardCheck className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">المقيّم</p>
                          <p className="text-sm font-medium">{assessment.assessor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">تاريخ البدء</p>
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(assessment.startDate).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {assessment.status === 'completed' ? 'تاريخ الإكمال' : 'الموعد النهائي'}
                          </p>
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(assessment.status === 'completed' ? assessment.completedDate! : assessment.dueDate).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">الضوابط</p>
                          <p className="text-sm font-medium">
                            {assessment.controlsCompleted} / {assessment.controlsTotal}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">نسبة الإنجاز</span>
                          <span className="text-sm font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            {assessment.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all"
                            style={{ width: `${assessment.progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="premium-card">
            <CardContent className="py-12 text-center">
              <ClipboardCheck className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium legal-heading mb-2">
                لا توجد تقييمات
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {statusFilter === "all" 
                  ? "لم يتم إنشاء أي تقييمات بعد"
                  : `لا توجد تقييمات ${statusLabels[statusFilter]}`
                }
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إنشاء تقييم جديد
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
