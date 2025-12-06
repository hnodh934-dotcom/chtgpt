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
  AlertTriangle,
  BookOpen
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * ⚖️ صفحة تفاصيل الحكم - تصميم قانوني فاخر
 * Provision Details Page - Premium Legal Design
 */
export default function ProvisionDetailsPage() {
  const { user } = useAuth();
  const params = useParams();
  const provisionId = params.id ? parseInt(params.id) : 0;

  const { data: provisions, isLoading: provisionsLoading } = trpc.provisions.list.useQuery();

  const provision = provisions?.find(p => p.id === provisionId);

  if (provisionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل تفاصيل الحكم...</p>
        </div>
      </div>
    );
  }

  if (!provision) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient" dir="rtl">
        <Card className="premium-card max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium legal-heading mb-2">
              الحكم غير موجود
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              لم يتم العثور على الحكم المطلوب
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

  const typeIcons: Record<string, any> = {
    principle: Scale,
    rule: AlertTriangle,
    exception: BookOpen,
    definition: FileText
  };

  const TypeIcon = typeIcons[provision.type] || AlertTriangle;

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
          <Link href={`/frameworks/${provision.frameworkId}`}>
            <span className="hover:text-primary cursor-pointer">الإطار التنظيمي</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{provision.name}</span>
        </div>

        {/* Provision Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <TypeIcon className="w-12 h-12 text-chart-4 shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/30 font-mono">
                  {provision.code}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${typeColors[provision.type] || typeColors.rule}`}
                >
                  {typeLabels[provision.type] || provision.type}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
                {provision.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Provision Text */}
        <Card className="premium-card mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              نص الحكم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
              <p className="text-base leading-relaxed legal-text whitespace-pre-wrap">
                {provision.text}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Context */}
        {provision.context && (
          <Card className="premium-card mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                السياق القانوني
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed legal-text">
                {provision.context}
              </p>
            </CardContent>
          </Card>
        )}

        <Separator className="my-8" />

        {/* Type Explanation */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              نوع الحكم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <TypeIcon className="w-6 h-6 text-chart-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">{typeLabels[provision.type] || provision.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {provision.type === 'principle' && 'مبدأ قانوني أساسي يحكم التطبيق والتفسير'}
                    {provision.type === 'rule' && 'حكم ملزم يجب الالتزام به'}
                    {provision.type === 'exception' && 'استثناء من القاعدة العامة في حالات محددة'}
                    {provision.type === 'definition' && 'تعريف قانوني لمصطلح أو مفهوم'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
