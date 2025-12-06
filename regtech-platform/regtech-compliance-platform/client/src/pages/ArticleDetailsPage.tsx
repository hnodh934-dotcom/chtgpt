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
  FileText,
  Scale,
  Home,
  ChevronRight,
  BookOpen,
  AlertTriangle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📄 صفحة تفاصيل المادة - تصميم قانوني فاخر
 * Article Details Page - Premium Legal Design
 */
export default function ArticleDetailsPage() {
  const { user } = useAuth();
  const params = useParams();
  const articleId = params.id ? parseInt(params.id) : 0;

  const { data: articles, isLoading: articlesLoading } = trpc.articles.list.useQuery();
  const { data: provisions, isLoading: provisionsLoading } = trpc.provisions.listByArticle.useQuery(
    { articleId },
    { enabled: articleId > 0 }
  );

  const article = articles?.articles?.find((a: any) => a.id === articleId);

  if (articlesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل تفاصيل المادة...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient" dir="rtl">
        <Card className="premium-card max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium legal-heading mb-2">
              المادة غير موجودة
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              لم يتم العثور على المادة المطلوبة
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

  const typeLabels: Record<string, string> = {
    principle: "مبدأ",
    rule: "حكم",
    exception: "استثناء",
    definition: "تعريف"
  };

  const typeColors: Record<string, string> = {
    principle: "bg-chart-1/10 text-chart-1 border-chart-1/30",
    rule: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    exception: "bg-chart-3/10 text-chart-3 border-chart-3/30",
    definition: "bg-chart-4/10 text-chart-4 border-chart-4/30"
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
          <Link href={`/frameworks/${article.frameworkId}`}>
            <span className="hover:text-primary cursor-pointer">الإطار التنظيمي</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{article.name}</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <BookOpen className="w-12 h-12 text-chart-3 shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/30 font-mono">
                  {article.code}
                </Badge>
                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
              </div>
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
                {article.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Article Text */}
        <Card className="premium-card mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              نص المادة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
              <p className="text-base leading-relaxed legal-text whitespace-pre-wrap">
                {article.text}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Interpretation */}
        {article.interpretation && (
          <Card className="premium-card mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                التفسير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed legal-text">
                {article.interpretation}
              </p>
            </CardContent>
          </Card>
        )}

        <Separator className="my-8" />

        {/* Provisions Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold legal-heading flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-primary" />
              الأحكام المرتبطة
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              الأحكام القانونية المقيّدة بهذه المادة
            </p>
          </div>

          {provisionsLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : provisions && provisions.length > 0 ? (
            <div className="grid gap-4">
              {provisions.map((provision) => (
                <Link key={provision.id} href={`/provisions/${provision.id}`}>
                  <Card className="premium-card hover:scale-[1.01] transition-all group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/30 font-mono text-xs">
                            {provision.code}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${typeColors[provision.type] || typeColors.rule}`}
                          >
                            {typeLabels[provision.type] || provision.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg legal-heading group-hover:text-primary transition-colors">
                          {provision.name}
                        </CardTitle>
                        <CardDescription className="text-sm mt-2 line-clamp-2 legal-text">
                          {provision.text}
                        </CardDescription>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-chart-4/60 group-hover:text-chart-4 transition-colors shrink-0" />
                    </div>
                  </CardHeader>
                  {provision.context && (
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">السياق القانوني:</p>
                        <p className="text-sm leading-relaxed line-clamp-2">
                          {provision.context}
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
                <AlertTriangle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد أحكام مرتبطة بهذه المادة حالياً</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
