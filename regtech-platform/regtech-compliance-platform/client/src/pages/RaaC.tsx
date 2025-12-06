/**
 * RaaC - Regulation as Code
 * 
 * صفحة تصدير القواعد التنظيمية بصيغ قابلة للتنفيذ
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, Code, CheckCircle2, AlertCircle, FileJson, FileCode } from "lucide-react";
import { toast } from "sonner";

export default function RaaC() {
  const [activeTab, setActiveTab] = useState<"export" | "validate">("export");

  // Export State
  const [exportForm, setExportForm] = useState({
    frameworkId: undefined as number | undefined,
    format: "json" as "json" | "xml" | "yaml" | "openapi",
    includeMetadata: true,
  });

  // Validate State
  const [validateForm, setValidateForm] = useState({
    data: "{}",
    frameworkId: undefined as number | undefined,
  });

  // Results
  const [exportResult, setExportResult] = useState<any>(null);
  const [validateResult, setValidateResult] = useState<any>(null);

  // Mutations
  const exportMutation = trpc.raac.exportRules.useMutation({
    onSuccess: (data) => {
      setExportResult(data);
      toast.success("تم تصدير القواعد بنجاح!");
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const validateMutation = trpc.raac.validateData.useMutation({
    onSuccess: (data) => {
      setValidateResult(data);
      toast.success("تم التحقق من البيانات بنجاح!");
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const handleExport = () => {
    exportMutation.mutate(exportForm);
  };

  const handleValidate = () => {
    try {
      const data = JSON.parse(validateForm.data);
      validateMutation.mutate({
        data,
        frameworkId: validateForm.frameworkId,
      });
    } catch (error) {
      toast.error("خطأ في تحليل JSON");
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0f2318] text-[#f0d98c] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[#f0d98c]">
            RaaC - Regulation as Code
          </h1>
          <p className="text-lg text-[#f0d98c]/70">
            تصدير القواعد التنظيمية بصيغ قابلة للتنفيذ (JSON, XML, YAML, OpenAPI)
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "export" | "validate")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="export" className="text-lg">
              <Download className="w-5 h-5 mr-2" />
              تصدير القواعد
            </TabsTrigger>
            <TabsTrigger value="validate" className="text-lg">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              التحقق من البيانات
            </TabsTrigger>
          </TabsList>

          {/* Export Tab */}
          <TabsContent value="export">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">إعدادات التصدير</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    اختر الإطار والصيغة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Framework */}
                  <div>
                    <Label htmlFor="framework" className="text-[#f0d98c]">
                      الإطار التنظيمي
                    </Label>
                    <Select
                      value={exportForm.frameworkId?.toString() || "all"}
                      onValueChange={(v) =>
                        setExportForm({
                          ...exportForm,
                          frameworkId: v === "all" ? undefined : parseInt(v),
                        })
                      }
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأطر</SelectItem>
                        <SelectItem value="1">PDPL - نظام حماية البيانات</SelectItem>
                        <SelectItem value="2">ECC - الضوابط الأساسية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Format */}
                  <div>
                    <Label htmlFor="format" className="text-[#f0d98c]">
                      الصيغة
                    </Label>
                    <Select
                      value={exportForm.format}
                      onValueChange={(v) =>
                        setExportForm({ ...exportForm, format: v as any })
                      }
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="yaml">YAML</SelectItem>
                        <SelectItem value="openapi">OpenAPI 3.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Include Metadata */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="includeMetadata"
                      checked={exportForm.includeMetadata}
                      onChange={(e) =>
                        setExportForm({ ...exportForm, includeMetadata: e.target.checked })
                      }
                      className="rounded"
                    />
                    <Label htmlFor="includeMetadata" className="text-[#f0d98c]">
                      تضمين البيانات الوصفية
                    </Label>
                  </div>

                  {/* Export Button */}
                  <Button
                    onClick={handleExport}
                    disabled={exportMutation.isPending}
                    className="w-full bg-[#2d5a3f] hover:bg-[#3d6a4f] text-[#f0d98c]"
                  >
                    {exportMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري التصدير...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        تصدير القواعد
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Result */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">النتيجة</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    القواعد المُصدّرة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {exportResult ? (
                    <div className="space-y-4">
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-[#f0d98c]/70">
                        <Badge variant="outline" className="border-[#2d5a3f]">
                          {exportResult.rulesCount} قاعدة
                        </Badge>
                        <Badge variant="outline" className="border-[#2d5a3f]">
                          {exportResult.format.toUpperCase()}
                        </Badge>
                        {exportResult.framework && (
                          <Badge variant="outline" className="border-[#2d5a3f]">
                            {exportResult.framework.code}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDownload(
                              exportResult.content,
                              `raac-export.${exportResult.format}`
                            )
                          }
                          className="border-[#2d5a3f] text-[#f0d98c]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          تحميل
                        </Button>
                      </div>

                      {/* Content Preview */}
                      <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-4 max-h-[500px] overflow-y-auto">
                        <pre className="text-xs text-[#f0d98c]/80 font-mono whitespace-pre-wrap">
                          {exportResult.content}
                        </pre>
                      </div>

                      {/* Audit Ref */}
                      <div className="text-xs text-[#f0d98c]/50 mt-4">
                        Audit Ref: {exportResult.auditRef}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#f0d98c]/50">
                      <FileJson className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لم يتم تصدير قواعد بعد</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Validate Tab */}
          <TabsContent value="validate">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">التحقق من البيانات</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    أدخل البيانات بصيغة JSON
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Framework */}
                  <div>
                    <Label htmlFor="validateFramework" className="text-[#f0d98c]">
                      الإطار التنظيمي
                    </Label>
                    <Select
                      value={validateForm.frameworkId?.toString() || "all"}
                      onValueChange={(v) =>
                        setValidateForm({
                          ...validateForm,
                          frameworkId: v === "all" ? undefined : parseInt(v),
                        })
                      }
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأطر</SelectItem>
                        <SelectItem value="1">PDPL - نظام حماية البيانات</SelectItem>
                        <SelectItem value="2">ECC - الضوابط الأساسية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data Input */}
                  <div>
                    <Label htmlFor="data" className="text-[#f0d98c]">
                      البيانات (JSON)
                    </Label>
                    <Textarea
                      id="data"
                      value={validateForm.data}
                      onChange={(e) => setValidateForm({ ...validateForm, data: e.target.value })}
                      className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c] min-h-[400px] font-mono text-sm"
                      placeholder='{"field": "value"}'
                    />
                  </div>

                  {/* Validate Button */}
                  <Button
                    onClick={handleValidate}
                    disabled={validateMutation.isPending}
                    className="w-full bg-[#2d5a3f] hover:bg-[#3d6a4f] text-[#f0d98c]"
                  >
                    {validateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري التحقق...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        التحقق من البيانات
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Result */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">نتيجة التحقق</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    الانتهاكات والامتثال
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {validateResult ? (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="text-center py-6 bg-[#0f2318] border border-[#2d5a3f] rounded-lg">
                        <div className="text-5xl font-bold text-[#f0d98c] mb-2">
                          {validateResult.complianceScore}%
                        </div>
                        <div className="text-sm text-[#f0d98c]/70">نسبة الامتثال</div>
                        <div className="mt-2">
                          {validateResult.valid ? (
                            <Badge className="bg-green-600">✓ متوافق</Badge>
                          ) : (
                            <Badge variant="destructive">✗ غير متوافق</Badge>
                          )}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-green-500">
                            {validateResult.summary.passed}
                          </div>
                          <div className="text-xs text-[#f0d98c]/70">نجح</div>
                        </div>
                        <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-red-500">
                            {validateResult.summary.failed}
                          </div>
                          <div className="text-xs text-[#f0d98c]/70">فشل</div>
                        </div>
                        <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-orange-500">
                            {validateResult.summary.critical}
                          </div>
                          <div className="text-xs text-[#f0d98c]/70">حرج</div>
                        </div>
                        <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-yellow-500">
                            {validateResult.summary.high}
                          </div>
                          <div className="text-xs text-[#f0d98c]/70">عالي</div>
                        </div>
                      </div>

                      {/* Violations */}
                      {validateResult.violations && validateResult.violations.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[#f0d98c] mb-3">
                            الانتهاكات ({validateResult.violations.length})
                          </h3>
                          <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {validateResult.violations.map((violation: any, idx: number) => (
                              <div
                                key={idx}
                                className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="font-semibold text-[#f0d98c]">
                                    {violation.ruleCode}
                                  </div>
                                  <Badge
                                    variant={
                                      violation.severity === "critical"
                                        ? "destructive"
                                        : "outline"
                                    }
                                    className={
                                      violation.severity === "high"
                                        ? "bg-orange-600"
                                        : violation.severity === "medium"
                                        ? "bg-yellow-600"
                                        : ""
                                    }
                                  >
                                    {violation.severity}
                                  </Badge>
                                </div>
                                <div className="text-sm text-[#f0d98c]/70 mb-2">
                                  {violation.message}
                                </div>
                                {violation.field && (
                                  <div className="text-xs text-[#f0d98c]/50">
                                    Field: {violation.field}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Audit Ref */}
                      <div className="text-xs text-[#f0d98c]/50 mt-4">
                        Audit Ref: {validateResult.auditRef}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#f0d98c]/50">
                      <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لم يتم التحقق من بيانات بعد</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <Card className="mt-6 bg-[#1a3a28] border-[#2d5a3f]">
          <CardHeader>
            <CardTitle className="text-[#f0d98c]">ما هو RaaC؟</CardTitle>
          </CardHeader>
          <CardContent className="text-[#f0d98c]/70 space-y-3">
            <p>
              <strong>Regulation as Code (RaaC)</strong> هو نهج لتحويل القواعد التنظيمية إلى
              كود قابل للتنفيذ والتكامل مع الأنظمة الخارجية.
            </p>
            <p>
              <strong>الفوائد:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>تكامل سلس مع أنظمة الشركات الحالية</li>
              <li>التحقق الآلي من الامتثال</li>
              <li>تقليل الأخطاء البشرية</li>
              <li>توفير الوقت والتكاليف</li>
              <li>قابلية التتبع والمراجعة</li>
            </ul>
            <p>
              <strong>الصيغ المدعومة:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li><strong>JSON:</strong> للتكامل مع تطبيقات الويب والموبايل</li>
              <li><strong>XML:</strong> للأنظمة القديمة والتكامل المؤسسي</li>
              <li><strong>YAML:</strong> للتكوين والأتمتة</li>
              <li><strong>OpenAPI:</strong> لبناء APIs موثقة</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
