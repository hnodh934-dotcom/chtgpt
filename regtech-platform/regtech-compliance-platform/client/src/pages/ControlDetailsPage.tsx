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
  Shield,
  Scale,
  Home,
  ChevronRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 🛡️ صفحة تفاصيل الضابط - تصميم قانوني فاخر
 * Control Details Page - Premium Legal Design
 */
export default function ControlDetailsPage() {
  const { user } = useAuth();
  const params = useParams();
  const controlId = params.id ? parseInt(params.id) : 0;

  const { data: controls, isLoading: controlsLoading } = trpc.controls.list.useQuery();
  const { data: articles, isLoading: articlesLoading } = trpc.articles.listByControl.useQuery(
    { controlId },
    { enabled: controlId > 0 }
  );

  const control = controls?.controls?.find((c: any) => c.id === controlId);

  if (controlsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل تفاصيل الضابط...</p>
        </div>
      </div>
    );
  }

  if (!control) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient" dir="rtl">
        <Card className="premium-card max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium legal-heading mb-2">
              الضابط غير موجود
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              لم يتم العثور على الضابط المطلوب
            </p>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                العودة للرئيسية
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
          <Link href={`/frameworks/${control.frameworkId}`}>
            <span className="hover:text-primary cursor-pointer">الإطار التنظيمي</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{control.name}</span>
        </div>

        {/* Control Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-12 h-12 text-chart-2 shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono">
                  {control.code}
                </Badge>
                {control.priority && (
                  <Badge 
                    variant="outline" 
                    className={priorityColors[control.priority] || priorityColors.low}
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
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
                {control.name}
              </h2>
              {control.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {control.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Implementation Guidance */}
        {control.implementationGuidance && (
          <Card className="premium-card mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                إرشادات التنفيذ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <p className="text-sm leading-relaxed legal-text">
                  {control.implementationGuidance}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Separator className="my-8" />

        {/* Articles Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold legal-heading flex items-center gap-3">
              <FileText className="w-7 h-7 text-primary" />
              المواد القانونية
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              المواد القانونية التي يستند إليها هذا الضابط
            </p>
          </div>

          {articlesLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid gap-4">
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`}>
                  <Card className="premium-card hover:scale-[1.01] transition-all group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/30 font-mono text-xs">
                            {article.code}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg legal-heading group-hover:text-primary transition-colors">
                          {article.name}
                        </CardTitle>
                        {article.text && (
                          <CardDescription className="text-sm mt-2 line-clamp-3 legal-text">
                            {article.text}
                          </CardDescription>
                        )}
                      </div>
                      <BookOpen className="w-8 h-8 text-chart-3/60 group-hover:text-chart-3 transition-colors shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="premium-card">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد مواد مرتبطة بهذا الضابط حالياً</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
