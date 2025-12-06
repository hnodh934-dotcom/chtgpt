import { useState } from "react";
import { useParams, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  ArrowRight,
  ExternalLink,
  Building2,
  Calendar,
  FileText,
  Shield,
  CheckCircle2,
  AlertCircle,
  Scale,
  Home,
  ChevronRight,
  Network
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📋 صفحة تفاصيل الإطار التنظيمي - تصميم قانوني فاخر
 * Framework Details Page - Premium Legal Design
 */
export default function FrameworkDetails() {
  const { user } = useAuth();
  const params = useParams();
  const frameworkId = params.id ? parseInt(params.id) : 0;

  const { data: frameworks, isLoading: frameworksLoading } = trpc.frameworks.list.useQuery();
  const { data: controls, isLoading: controlsLoading } = trpc.controls.listByFramework.useQuery(
    { frameworkId },
    { enabled: frameworkId > 0 }
  );

  const framework = frameworks?.find(f => f.id === frameworkId);

  if (frameworksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل تفاصيل الإطار...</p>
        </div>
      </div>
    );
  }

  if (!framework) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient" dir="rtl">
        <Card className="premium-card max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Scale className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium legal-heading mb-2">
              الإطار غير موجود
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              لم يتم العثور على الإطار التنظيمي المطلوب
            </p>
            <Link href="/frameworks">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                العودة للأطر التنظيمية
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const priorityLabels: Record<string, string> = {
    critical: "حرج",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColors: Record<string, string> = {
    critical: "bg-destructive/10 text-destructive border-destructive/30",
    high: "bg-chart-3/10 text-chart-3 border-chart-3/30",
    medium: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    low: "bg-muted text-muted-foreground border-border"
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
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/">
            <span className="hover:text-primary cursor-pointer">الرئيسية</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/frameworks">
            <span className="hover:text-primary cursor-pointer">الأطر التنظيمية</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{framework.name}</span>
        </div>

        {/* Framework Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Scale className="w-12 h-12 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono">
                  {framework.code}
                </Badge>
                {framework.sector && (
                  <Badge variant="secondary" className="text-xs">
                    {framework.sector}
                  </Badge>
                )}
              </div>
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
                {framework.name}
              </h2>
              {framework.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {framework.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Framework Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Authority */}
          {framework.authority && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  الجهة المنظمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{framework.authority}</p>
              </CardContent>
            </Card>
          )}

          {/* Effective Date */}
          {framework.effectiveDate && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  تاريخ السريان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {new Date(framework.effectiveDate).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Official URL */}
          {framework.officialUrl && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  الموقع الرسمي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={framework.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-2"
                >
                  <span>زيارة الموقع</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-8" />

        {/* Controls Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold legal-heading flex items-center gap-3">
                <Shield className="w-7 h-7 text-primary" />
                الضوابط التقنية
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                الضوابط التقنية المرتبطة بهذا الإطار التنظيمي
              </p>
            </div>
            <Link href="/map">
              <Button variant="outline" className="gap-2">
                <Network className="w-4 h-4" />
                عرض الخريطة
              </Button>
            </Link>
          </div>

          {controlsLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : controls && controls.length > 0 ? (
            <div className="grid gap-4">
              {controls.map((control) => (
                <Link key={control.id} href={`/controls/${control.id}`}>
                  <Card className="premium-card hover:scale-[1.01] transition-all group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs">
                            {control.code}
                          </Badge>
                          {control.priority && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${priorityColors[control.priority] || priorityColors.low}`}
                            >
                              {priorityLabels[control.priority] || control.priority}
                            </Badge>
                          )}
                          {control.category && (
                            <Badge variant="secondary" className="text-xs">
                              {control.category}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg legal-heading group-hover:text-primary transition-colors">
                          {control.name}
                        </CardTitle>
                        {control.description && (
                          <CardDescription className="text-sm mt-2 line-clamp-2">
                            {control.description}
                          </CardDescription>
                        )}
                      </div>
                      <Shield className="w-8 h-8 text-chart-2/60 group-hover:text-chart-2 transition-colors shrink-0" />
                    </div>
                  </CardHeader>
                  {control.implementationGuidance && (
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">إرشادات التنفيذ:</p>
                        <p className="text-sm leading-relaxed line-clamp-3">
                          {control.implementationGuidance}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
          ) : (
            <Card className="premium-card">
              <CardContent className="py-12 text-center">
                <Shield className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد ضوابط مرتبطة بهذا الإطار حالياً</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
