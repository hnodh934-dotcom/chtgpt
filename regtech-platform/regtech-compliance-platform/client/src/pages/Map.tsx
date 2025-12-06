import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Loader2, Network, ArrowRight, Scale, Shield, FileText, Building2, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * 🗺️ صفحة الخريطة البصرية - عرض منظم للأطر التنظيمية
 * Map Page - Organized view of regulatory frameworks
 */
export default function Map() {
  const { data: frameworks, isLoading: frameworksLoading } = trpc.frameworks.list.useQuery();
  const { data: controls } = trpc.controls.list.useQuery();
  const { data: articles } = trpc.articles.list.useQuery();

  if (frameworksLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-3" />
          <p className="text-sm text-muted-foreground">جاري تحميل الخريطة...</p>
        </div>
      </div>
    );
  }

  // تجميع البيانات حسب الإطار
  const frameworksWithStats = frameworks?.map(fw => {
    const fwControls = controls?.controls?.filter((c: any) => c.frameworkId === fw.id) || [];
    const fwArticles = articles?.articles?.filter((a: any) => a.frameworkId === fw.id) || [];
    
    return {
      ...fw,
      controlsCount: fwControls.length,
      articlesCount: fwArticles.length,
    };
  }) || [];

  // تجميع حسب القطاع
  const sectors = Array.from(new Set(frameworksWithStats.map(f => f.sector || 'أخرى')));

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'تقني': return Shield;
      case 'عام': return Scale;
      case 'مالي': return Building2;
      default: return FileText;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'تقني': return 'text-chart-2 bg-chart-2/10 border-chart-2/20';
      case 'عام': return 'text-primary bg-primary/10 border-primary/20';
      case 'مالي': return 'text-chart-3 bg-chart-3/10 border-chart-3/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <Network className="w-6 h-6 text-primary" />
                خريطة الأطر التنظيمية
              </h1>
              <p className="text-sm text-muted-foreground">
                عرض شامل ومنظم لجميع الأطر التنظيمية والضوابط والمواد
              </p>
            </div>
            <div className="flex items-center gap-3">
              <GlobalSearch />
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  الرئيسية
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {frameworksWithStats.length > 0 ? (
          <div className="space-y-12">
            {/* إحصائيات عامة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    الأطر التنظيمية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{frameworksWithStats.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">إطار تنظيمي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    الضوابط
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-2">{controls?.controls?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">ضابط تقني</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    المواد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-3">{articles?.articles?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">مادة قانونية</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    القطاعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-4">{sectors.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">قطاع تنظيمي</p>
                </CardContent>
              </Card>
            </div>

            {/* الأطر حسب القطاع */}
            {sectors.map(sector => {
              const sectorFrameworks = frameworksWithStats.filter(f => (f.sector || 'أخرى') === sector);
              const SectorIcon = getSectorIcon(sector);
              
              return (
                <div key={sector} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getSectorColor(sector)}`}>
                      <SectorIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{sector}</h2>
                      <p className="text-sm text-muted-foreground">
                        {sectorFrameworks.length} {sectorFrameworks.length === 1 ? 'إطار' : 'أطر'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectorFrameworks.map(fw => (
                      <Card key={fw.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {fw.code}
                                </Badge>
                                {fw.priority === 'critical' && (
                                  <Badge variant="destructive" className="text-xs">
                                    إلزامي
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-base leading-tight">
                                {fw.name}
                              </CardTitle>
                              {fw.nameEn && (
                                <p className="text-xs text-muted-foreground font-mono">
                                  {fw.nameEn}
                                </p>
                              )}
                            </div>
                          </div>
                          <CardDescription className="text-xs line-clamp-2 mt-2">
                            {fw.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {/* الجهة المسؤولة */}
                          {fw.authority && (
                            <div className="flex items-start gap-2 text-xs">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{fw.authority}</span>
                            </div>
                          )}

                          {/* الإحصائيات */}
                          <div className="flex items-center gap-4 text-xs">
                            {fw.controlsCount > 0 && (
                              <div className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-chart-2" />
                                <span className="font-medium">{fw.controlsCount}</span>
                                <span className="text-muted-foreground">ضابط</span>
                              </div>
                            )}
                            {fw.articlesCount > 0 && (
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-chart-3" />
                                <span className="font-medium">{fw.articlesCount}</span>
                                <span className="text-muted-foreground">مادة</span>
                              </div>
                            )}
                          </div>

                          {/* الروابط */}
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Link href={`/frameworks/${fw.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full text-xs">
                                عرض التفاصيل
                              </Button>
                            </Link>
                            {fw.officialUrl && (
                              <a 
                                href={fw.officialUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-shrink-0"
                              >
                                <Button variant="ghost" size="sm" className="px-2">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Network className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              لا توجد أطر تنظيمية متاحة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
