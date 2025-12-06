import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, Database, CheckCircle2, Network, FileText, Scale, Award, ClipboardCheck, BarChart3 } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import Testimonials from "@/components/Testimonials";

/**
 * 🏛️ الصفحة الرئيسية - واجهة قانونية فاخرة
 * Premium Legal Platform Homepage
 */
export default function Home() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { data: frameworks, isLoading: frameworksLoading } = trpc.frameworks.list.useQuery();
  const { data: controlsData } = trpc.controls.list.useQuery();
  const { data: articlesData } = trpc.articles.list.useQuery();
  
  const controls = controlsData?.controls || [];
  const articles = articlesData?.articles || [];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen night-gradient flex items-center justify-center p-4">
        <div className="max-w-3xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            {APP_LOGO && (
              <img 
                src={APP_LOGO} 
                alt={APP_TITLE} 
                className="h-20 mx-auto opacity-90 drop-shadow-lg"
              />
            )}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold legal-heading gold-glow">
                {APP_TITLE}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                منصة الامتثال القانوني والتقني الأولى في المملكة
              </p>
              <p className="text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
                نظام متكامل لإدارة الامتثال التنظيمي، يربط الأطر القانونية بالضوابط التقنية والمواد والأحكام في منصة واحدة
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="premium-card border-primary/20">
              <CardHeader>
                <Scale className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-lg">الأطر التنظيمية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  تغطية شاملة لجميع الأنظمة واللوائح السعودية
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card border-primary/20">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-lg">الضوابط التقنية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  ضوابط تقنية قابلة للتطبيق والقياس
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card border-primary/20">
              <CardHeader>
                <Award className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-lg">تقييم الامتثال</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  نظام تقييم شامل مع تقارير تفصيلية
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <Testimonials />

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              <a href={getLoginUrl()}>
                <Shield className="w-5 h-5 ml-2" />
                الدخول إلى المنصة
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              تسجيل الدخول عبر حساب Manus
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated View
  const stats = [
    { 
      label: "الأطر التنظيمية", 
      value: frameworks?.length || 0, 
      icon: Scale,
      color: "text-primary"
    },
    { 
      label: "الضوابط", 
      value: controlsData?.pagination?.total || 0, 
      icon: Shield,
      color: "text-chart-2"
    },
    { 
      label: "المواد", 
      value: articlesData?.pagination?.total || 0, 
      icon: FileText,
      color: "text-chart-3"
    },
    { 
      label: "التقييمات", 
      value: 0, 
      icon: ClipboardCheck,
      color: "text-chart-4"
    },
  ];

  return (
    <div className="min-h-screen night-gradient">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {APP_LOGO && (
                <img src={APP_LOGO} alt={APP_TITLE} className="h-10" />
              )}
              <div>
                <h1 className="text-xl font-bold legal-heading">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">RegTech Compliance Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <GlobalSearch />
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  لوحة التحكم
                </Button>
              </Link>
              <Link href="/assessments">
                <Button variant="outline" size="sm" className="gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  التقييمات
                </Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" size="sm" className="gap-2">
                  <Network className="w-4 h-4" />
                  الخريطة
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent">
                  <Award className="w-4 h-4" />
                  الباقات
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold legal-heading mb-2 gold-glow">
            مرحباً، {user?.name || 'Gj Opu'}
          </h2>
          <p className="text-muted-foreground">
            الوصول إلى نظام إدارة الامتثال التنظيمي
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Frameworks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold legal-heading">الأطر التنظيمية</h3>
              <p className="text-sm text-muted-foreground mt-1">
                الأطر التنظيمية المتاحة في النظام
              </p>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/frameworks">
                عرض الكل
                <FileText className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {frameworksLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : frameworks && frameworks.length > 0 ? (
            <div className="grid gap-6">
              {frameworks.map((framework) => (
                <Link key={framework.id} href={`/frameworks/${framework.id}`}>
                  <Card className="premium-card hover:scale-[1.01] transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                              {framework.code}
                            </Badge>
                            {framework.sector && (
                              <Badge variant="secondary" className="text-xs">
                                {framework.sector}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl legal-heading mb-2">
                            {framework.name}
                          </CardTitle>
                          {framework.description && (
                            <CardDescription className="text-sm line-clamp-2">
                              {framework.description}
                            </CardDescription>
                          )}
                        </div>
                        <Scale className="w-8 h-8 text-primary/60 shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        {framework.authority && (
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            <span>{framework.authority}</span>
                          </div>
                        )}
                        {framework.effectiveDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>ساري منذ {new Date(framework.effectiveDate).toLocaleDateString('ar-SA')}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="premium-card">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد أطر تنظيمية حالياً</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
