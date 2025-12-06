import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Link as LinkIcon, 
  History, 
  MessageSquare,
  TrendingUp,
  Shield,
  ExternalLink
} from "lucide-react";

/**
 * مكون تفاصيل الضابط - عرض الضابط كأصل فكري قابل للتحليل
 * Control Details Component - Display control as an intellectual asset
 */

interface ControlDetailsProps {
  control: {
    id: number;
    code: string;
    name: string;
    description: string | null;
    category: string | null;
    priority: string;
    implementationGuidance: string | null;
  };
  frameworkName: string;
}

export function ControlDetails({ control, frameworkName }: ControlDetailsProps) {
  const priorityLabels: Record<string, string> = {
    critical: "حرج",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColors: Record<string, string> = {
    critical: "destructive",
    high: "default",
    medium: "secondary",
    low: "outline"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono text-xs">
                {control.code}
              </Badge>
              <Badge 
                variant={priorityColors[control.priority] as any}
                className="text-xs"
              >
                {priorityLabels[control.priority]}
              </Badge>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-1">
              {control.name}
            </h2>
            {control.name && (
              <p className="text-sm text-muted-foreground" dir="ltr">
                {control.name}
              </p>
            )}
          </div>
          <Shield className="w-8 h-8 text-muted-foreground/30" />
        </div>

        {/* Context */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>الإطار التنظيمي:</span>
          <span className="font-medium text-foreground">{frameworkName}</span>
          <span className="mx-2">•</span>
          <span>الفئة:</span>
          <span className="font-medium text-foreground">{control.category}</span>
        </div>
      </div>

      {/* Main Description */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            الوصف التفصيلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              {control.description}
            </p>
            {control.description && (
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Description (English)
                </p>
                <p className="text-sm text-foreground leading-relaxed" dir="ltr">
                  {control.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidance */}
      {(control.implementationGuidance || control.implementationGuidance) && (
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              إرشادات التطبيق
            </CardTitle>
            <CardDescription className="text-sm">
              توجيهات عملية لتطبيق هذا الضابط
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {control.implementationGuidance && (
                <p className="text-sm text-foreground leading-relaxed">
                  {control.implementationGuidance}
                </p>
              )}
              {control.implementationGuidance && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Implementation Guidance (English)
                  </p>
                  <p className="text-sm text-foreground leading-relaxed" dir="ltr">
                    {control.implementationGuidance}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Intellectual Asset Features */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Related References */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              المراجع والاستنادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <LinkIcon className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                لا توجد مراجع مرتبطة حالياً
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Version History */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <History className="w-4 h-4" />
              تاريخ التعديلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <History className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                لا يوجد سجل تعديلات متاح
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Metrics */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              مؤشرات الامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">معدل التطبيق</span>
                <Badge variant="outline">0%</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الأدلة المرفقة</span>
                <Badge variant="outline">0</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التقييمات</span>
                <Badge variant="outline">0</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments & Notes */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              الملاحظات والتعليقات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                لا توجد ملاحظات حالياً
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="border bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              هل تحتاج لمزيد من المعلومات حول هذا الضابط؟
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                المصدر الرسمي
              </Button>
              <Button variant="default" size="sm">
                بدء تقييم
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
