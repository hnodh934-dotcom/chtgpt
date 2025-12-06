import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Shield, 
  FileText, 
  Link as LinkIcon,
  ArrowRight,
  Layers
} from "lucide-react";
import { Link } from "wouter";

/**
 * مكون الخريطة البصرية للعلاقات - رحلة فكرية عبر البنية النظامية
 * Framework Map Component - Intellectual journey through regulatory structure
 */

interface FrameworkMapProps {
  frameworks: Array<{
    id: number;
    code: string;
    name: string;
    sectorAr: string;
    mandatory: boolean;
    controlsCount?: number;
  }>;
}

export function FrameworkMap({ frameworks }: FrameworkMapProps) {
  // Group frameworks by sector
  const frameworksBySector = frameworks.reduce((acc, framework) => {
    const sector = framework.sectorAr || "أخرى";
    if (!acc[sector]) {
      acc[sector] = [];
    }
    acc[sector].push(framework);
    return acc;
  }, {} as Record<string, typeof frameworks>);

  const sectorColors: Record<string, string> = {
    "التقنية المالية": "bg-blue-500/10 border-blue-500/20 text-blue-700",
    "الأمن السيبراني": "bg-red-500/10 border-red-500/20 text-red-700",
    "حماية البيانات": "bg-purple-500/10 border-purple-500/20 text-purple-700",
    "الخدمات المالية": "bg-green-500/10 border-green-500/20 text-green-700",
    "التمويل الجماعي": "bg-orange-500/10 border-orange-500/20 text-orange-700",
    "الشركات": "bg-indigo-500/10 border-indigo-500/20 text-indigo-700",
    "أخرى": "bg-gray-500/10 border-gray-500/20 text-gray-700"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Network className="w-5 h-5" />
          <h2 className="text-lg font-medium text-foreground">
            الخريطة البصرية للأطر التنظيمية
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          رحلة فكرية عبر البنية النظامية - استكشف العلاقات والتقاطعات بين الأطر التنظيمية المختلفة
        </p>
      </div>

      {/* Legend */}
      <Card className="border bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-6 justify-center flex-wrap text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">إطار إلزامي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30"></div>
              <span className="text-muted-foreground">إطار اختياري</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">عدد الضوابط</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map by Sector */}
      <div className="space-y-6">
        {Object.entries(frameworksBySector).map(([sector, sectorFrameworks]) => (
          <Card key={sector} className="border">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {sector}
              </CardTitle>
              <CardDescription className="text-sm">
                {sectorFrameworks.length} إطار تنظيمي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sectorFrameworks.map((framework) => (
                  <Link key={framework.id} href={`/frameworks/${framework.id}`}>
                    <Card 
                      className={`
                        border-2 hover:border-primary/50 transition-all cursor-pointer
                        ${true ? 'border-primary/20 bg-primary/5' : 'border-muted'}
                      `}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="outline" className="text-xs font-mono">
                              {framework.code}
                            </Badge>
                            {true && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-foreground line-clamp-2">
                            {framework.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Layers className="w-3 h-3" />
                            <span>{framework.controlsCount || 0} ضابط</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Relationships Visualization */}
      <Card className="border bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            العلاقات والتقاطعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Network className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              رسم بياني تفاعلي للعلاقات بين الأطر التنظيمية
            </p>
            <p className="text-xs text-muted-foreground">
              قريباً: خريطة تفاعلية توضح التقاطعات والاستنادات بين الأطر المختلفة
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            التنقل السريع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/frameworks">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                عرض جميع الأطر التنظيمية
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Shield className="w-4 h-4" />
              الأطر الإلزامية فقط
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Layers className="w-4 h-4" />
              الأطر حسب عدد الضوابط
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Network className="w-4 h-4" />
              الأطر المترابطة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
