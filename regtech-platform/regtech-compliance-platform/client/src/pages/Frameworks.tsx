import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  Shield, 
  Search,
  ExternalLink,
  Building2,
  Calendar,
  FileText,
  ArrowRight,
  Scale,
  Home,
  Database
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * 📋 صفحة الأطر التنظيمية - تصميم قانوني فاخر
 * Regulatory Frameworks Page - Premium Legal Design
 */
export default function Frameworks() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const { data: frameworks, isLoading } = trpc.frameworks.list.useQuery();

  // Filter frameworks
  const filteredFrameworks = frameworks?.filter(framework => {
    const matchesSearch = 
      framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = !selectedSector || framework.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  // Get unique sectors
  const allSectors = Array.from(
    new Set(frameworks?.map(f => f.sector).filter(Boolean) || [])
  );

  const sectorLabels: Record<string, string> = {
    "عام": "عام",
    "مالي": "مالي",
    "تقني": "تقني",
    "صحي": "صحي",
    "تعليمي": "تعليمي",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center night-gradient">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">جاري تحميل الأطر التنظيمية...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold legal-heading gold-glow">
              الأطر التنظيمية
            </h2>
          </div>
          <p className="text-muted-foreground">
            استعراض وإدارة الأطر التنظيمية والقانونية المتاحة في النظام
          </p>
        </div>

        {/* Filters */}
        <Card className="premium-card mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الأطر التنظيمية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 bg-background/50"
                />
              </div>

              {/* Sector Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedSector === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(null)}
                  className="text-xs"
                >
                  الكل
                </Button>
                {allSectors.filter(Boolean).map((sector) => (
                  <Button
                    key={sector}
                    variant={selectedSector === sector ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSector(sector!)}
                    className="text-xs"
                  >
                    {sector && (sectorLabels[sector] || sector)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            عرض {filteredFrameworks?.length || 0} من {frameworks?.length || 0} إطار تنظيمي
          </p>
        </div>

        {/* Frameworks Grid */}
        {filteredFrameworks && filteredFrameworks.length > 0 ? (
          <div className="grid gap-6">
            {filteredFrameworks.map((framework) => (
              <Link key={framework.id} href={`/frameworks/${framework.id}`}>
                <Card className="premium-card hover:scale-[1.01] transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono">
                            {framework.code}
                          </Badge>
                          {framework.sector && (
                            <Badge variant="secondary" className="text-xs">
                              {framework.sector ? (sectorLabels[framework.sector] || framework.sector) : ''}
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <CardTitle className="text-xl legal-heading mb-2 group-hover:text-primary transition-colors">
                          {framework.name}
                        </CardTitle>

                        {/* Description */}
                        {framework.description && (
                          <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                            {framework.description}
                          </CardDescription>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="shrink-0">
                        <Scale className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      {/* Authority */}
                      {framework.authority && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{framework.authority}</span>
                        </div>
                      )}

                      {/* Effective Date */}
                      {framework.effectiveDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            ساري منذ {new Date(framework.effectiveDate).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      )}

                      {/* View Details */}
                      <div className="mr-auto flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                        <span className="text-xs">عرض التفاصيل</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Official Link */}
                    {framework.officialUrl && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <a
                          href={framework.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:text-primary/80 flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>الموقع الرسمي للنظام</span>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="premium-card">
            <CardContent className="py-16 text-center">
              <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground mb-2">
                لا توجد نتائج
              </p>
              <p className="text-sm text-muted-foreground/70">
                {searchQuery || selectedSector 
                  ? "جرّب تعديل معايير البحث" 
                  : "لا توجد أطر تنظيمية حالياً"}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
