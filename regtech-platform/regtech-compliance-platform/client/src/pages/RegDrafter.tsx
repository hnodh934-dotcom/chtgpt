/**
 * RegDrafter - المحرر التنظيمي الذكي
 * 
 * صفحة لكتابة ومراجعة السياسات والإجراءات التنظيمية
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, CheckCircle2, AlertCircle, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

export default function RegDrafter() {
  const [activeTab, setActiveTab] = useState<"draft" | "review">("draft");

  // Draft Policy State
  const [draftForm, setDraftForm] = useState({
    templateId: "",
    policyType: "privacy",
    framework: "PDPL",
    companyName: "",
    industry: "",
    customRequirements: "",
    language: "ar" as "ar" | "en",
  });

  // Review Policy State
  const [reviewForm, setReviewForm] = useState({
    policyText: "",
    framework: "PDPL",
    language: "ar" as "ar" | "en",
  });

  // Results
  const [draftResult, setDraftResult] = useState<any>(null);
  const [reviewResult, setReviewResult] = useState<any>(null);

  // Queries
  const { data: templatesData } = trpc.regDrafter.getTemplates.useQuery({
    framework: draftForm.framework,
  });

  // Mutations
  const draftMutation = trpc.regDrafter.draftPolicy.useMutation({
    onSuccess: (data) => {
      setDraftResult(data);
      toast.success("تم إنشاء السياسة بنجاح!");
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const reviewMutation = trpc.regDrafter.reviewPolicy.useMutation({
    onSuccess: (data) => {
      setReviewResult(data);
      toast.success("تم مراجعة السياسة بنجاح!");
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const handleDraft = () => {
    if (!draftForm.companyName) {
      toast.error("يرجى إدخال اسم الشركة");
      return;
    }

    draftMutation.mutate(draftForm);
  };

  const handleReview = () => {
    if (!reviewForm.policyText) {
      toast.error("يرجى إدخال نص السياسة");
      return;
    }

    reviewMutation.mutate(reviewForm);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
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
            RegDrafter - المحرر التنظيمي الذكي
          </h1>
          <p className="text-lg text-[#f0d98c]/70">
            كتابة ومراجعة السياسات والإجراءات التنظيمية بذكاء اصطناعي
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "draft" | "review")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="draft" className="text-lg">
              <FileText className="w-5 h-5 mr-2" />
              كتابة سياسة جديدة
            </TabsTrigger>
            <TabsTrigger value="review" className="text-lg">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              مراجعة سياسة موجودة
            </TabsTrigger>
          </TabsList>

          {/* Draft Policy Tab */}
          <TabsContent value="draft">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">معلومات السياسة</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    أدخل معلومات الشركة والمتطلبات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Framework */}
                  <div>
                    <Label htmlFor="framework" className="text-[#f0d98c]">
                      الإطار التنظيمي
                    </Label>
                    <Select
                      value={draftForm.framework}
                      onValueChange={(v) => setDraftForm({ ...draftForm, framework: v })}
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDPL">PDPL - نظام حماية البيانات</SelectItem>
                        <SelectItem value="ECC">ECC - الضوابط الأساسية</SelectItem>
                        <SelectItem value="SAMA">SAMA - تعليمات ساما</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Template */}
                  {templatesData && templatesData.templates.length > 0 && (
                    <div>
                      <Label htmlFor="template" className="text-[#f0d98c]">
                        القالب
                      </Label>
                      <Select
                        value={draftForm.templateId}
                        onValueChange={(v) => setDraftForm({ ...draftForm, templateId: v })}
                      >
                        <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                          <SelectValue placeholder="اختر قالباً" />
                        </SelectTrigger>
                        <SelectContent>
                          {templatesData.templates.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className="text-[#f0d98c]">
                      اسم الشركة *
                    </Label>
                    <Input
                      id="companyName"
                      value={draftForm.companyName}
                      onChange={(e) => setDraftForm({ ...draftForm, companyName: e.target.value })}
                      className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]"
                      placeholder="مثال: شركة التقنية المتقدمة"
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className="text-[#f0d98c]">
                      القطاع
                    </Label>
                    <Input
                      id="industry"
                      value={draftForm.industry}
                      onChange={(e) => setDraftForm({ ...draftForm, industry: e.target.value })}
                      className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]"
                      placeholder="مثال: التقنية المالية"
                    />
                  </div>

                  {/* Custom Requirements */}
                  <div>
                    <Label htmlFor="customRequirements" className="text-[#f0d98c]">
                      متطلبات إضافية
                    </Label>
                    <Textarea
                      id="customRequirements"
                      value={draftForm.customRequirements}
                      onChange={(e) =>
                        setDraftForm({ ...draftForm, customRequirements: e.target.value })
                      }
                      className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c] min-h-[100px]"
                      placeholder="أدخل أي متطلبات خاصة..."
                    />
                  </div>

                  {/* Language */}
                  <div>
                    <Label htmlFor="language" className="text-[#f0d98c]">
                      اللغة
                    </Label>
                    <Select
                      value={draftForm.language}
                      onValueChange={(v) => setDraftForm({ ...draftForm, language: v as "ar" | "en" })}
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleDraft}
                    disabled={draftMutation.isPending}
                    className="w-full bg-[#2d5a3f] hover:bg-[#3d6a4f] text-[#f0d98c]"
                  >
                    {draftMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري الإنشاء...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        إنشاء السياسة
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
                    السياسة المُنشأة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {draftResult ? (
                    <div className="space-y-4">
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-[#f0d98c]/70">
                        <Badge variant="outline" className="border-[#2d5a3f]">
                          {draftResult.metadata.wordCount} كلمة
                        </Badge>
                        <Badge variant="outline" className="border-[#2d5a3f]">
                          {draftResult.metadata.estimatedReadTime} دقيقة قراءة
                        </Badge>
                        <Badge variant="outline" className="border-[#2d5a3f]">
                          نسبة الامتثال: {draftResult.metadata.complianceScore}%
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDownload(
                              draftResult.policyDocument,
                              `policy-${draftForm.companyName}.md`
                            )
                          }
                          className="border-[#2d5a3f] text-[#f0d98c]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          تحميل
                        </Button>
                      </div>

                      {/* Policy Document */}
                      <div className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-4 max-h-[600px] overflow-y-auto">
                        <Streamdown>{draftResult.policyDocument}</Streamdown>
                      </div>

                      {/* Recommendations */}
                      {draftResult.recommendations && draftResult.recommendations.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold text-[#f0d98c] mb-2">
                            توصيات
                          </h3>
                          <ul className="space-y-2">
                            {draftResult.recommendations.map((rec: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-[#f0d98c]/70"
                              >
                                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Audit Ref */}
                      <div className="text-xs text-[#f0d98c]/50 mt-4">
                        Audit Ref: {draftResult.auditRef}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#f0d98c]/50">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لم يتم إنشاء سياسة بعد</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Review Policy Tab */}
          <TabsContent value="review">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">مراجعة السياسة</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    أدخل نص السياسة للمراجعة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Framework */}
                  <div>
                    <Label htmlFor="reviewFramework" className="text-[#f0d98c]">
                      الإطار التنظيمي
                    </Label>
                    <Select
                      value={reviewForm.framework}
                      onValueChange={(v) => setReviewForm({ ...reviewForm, framework: v })}
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDPL">PDPL - نظام حماية البيانات</SelectItem>
                        <SelectItem value="ECC">ECC - الضوابط الأساسية</SelectItem>
                        <SelectItem value="SAMA">SAMA - تعليمات ساما</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Policy Text */}
                  <div>
                    <Label htmlFor="policyText" className="text-[#f0d98c]">
                      نص السياسة *
                    </Label>
                    <Textarea
                      id="policyText"
                      value={reviewForm.policyText}
                      onChange={(e) => setReviewForm({ ...reviewForm, policyText: e.target.value })}
                      className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c] min-h-[400px] font-mono text-sm"
                      placeholder="الصق نص السياسة هنا..."
                    />
                  </div>

                  {/* Language */}
                  <div>
                    <Label htmlFor="reviewLanguage" className="text-[#f0d98c]">
                      اللغة
                    </Label>
                    <Select
                      value={reviewForm.language}
                      onValueChange={(v) =>
                        setReviewForm({ ...reviewForm, language: v as "ar" | "en" })
                      }
                    >
                      <SelectTrigger className="bg-[#0f2318] border-[#2d5a3f] text-[#f0d98c]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleReview}
                    disabled={reviewMutation.isPending}
                    className="w-full bg-[#2d5a3f] hover:bg-[#3d6a4f] text-[#f0d98c]"
                  >
                    {reviewMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        جاري المراجعة...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        مراجعة السياسة
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Result */}
              <Card className="bg-[#1a3a28] border-[#2d5a3f]">
                <CardHeader>
                  <CardTitle className="text-[#f0d98c]">نتيجة المراجعة</CardTitle>
                  <CardDescription className="text-[#f0d98c]/60">
                    تقرير المراجعة والتوصيات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reviewResult ? (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="text-center py-6 bg-[#0f2318] border border-[#2d5a3f] rounded-lg">
                        <div className="text-5xl font-bold text-[#f0d98c] mb-2">
                          {reviewResult.overallScore}%
                        </div>
                        <div className="text-sm text-[#f0d98c]/70">النتيجة الإجمالية</div>
                      </div>

                      {/* Sections */}
                      {reviewResult.sections && reviewResult.sections.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[#f0d98c] mb-3">
                            تفاصيل الأقسام
                          </h3>
                          <div className="space-y-3">
                            {reviewResult.sections.map((section: any, idx: number) => (
                              <div
                                key={idx}
                                className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-[#f0d98c]">
                                    {section.title}
                                  </h4>
                                  <Badge
                                    variant={section.score >= 80 ? "default" : "destructive"}
                                    className="bg-[#2d5a3f]"
                                  >
                                    {section.score}%
                                  </Badge>
                                </div>

                                {section.issues && section.issues.length > 0 && (
                                  <ul className="space-y-2 mt-3">
                                    {section.issues.map((issue: any, issueIdx: number) => (
                                      <li
                                        key={issueIdx}
                                        className="flex items-start gap-2 text-sm"
                                      >
                                        <AlertCircle
                                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                            issue.severity === "critical"
                                              ? "text-red-500"
                                              : issue.severity === "high"
                                              ? "text-orange-500"
                                              : issue.severity === "medium"
                                              ? "text-yellow-500"
                                              : "text-blue-500"
                                          }`}
                                        />
                                        <div>
                                          <div className="text-[#f0d98c]">
                                            {issue.description}
                                          </div>
                                          <div className="text-[#f0d98c]/60 mt-1">
                                            💡 {issue.suggestion}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Missing Elements */}
                      {reviewResult.missingElements &&
                        reviewResult.missingElements.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-[#f0d98c] mb-3">
                              عناصر مفقودة
                            </h3>
                            <ul className="space-y-2">
                              {reviewResult.missingElements.map((missing: any, idx: number) => (
                                <li
                                  key={idx}
                                  className="bg-[#0f2318] border border-[#2d5a3f] rounded-lg p-3"
                                >
                                  <div className="font-semibold text-[#f0d98c] mb-1">
                                    {missing.element}
                                  </div>
                                  <div className="text-sm text-[#f0d98c]/70 mb-2">
                                    {missing.description}
                                  </div>
                                  <div className="text-xs text-[#f0d98c]/50">
                                    {missing.controlCode} / {missing.articleCode}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* Recommendations */}
                      {reviewResult.recommendations &&
                        reviewResult.recommendations.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-[#f0d98c] mb-3">
                              توصيات عامة
                            </h3>
                            <ul className="space-y-2">
                              {reviewResult.recommendations.map((rec: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-[#f0d98c]/70"
                                >
                                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* Audit Ref */}
                      <div className="text-xs text-[#f0d98c]/50 mt-4">
                        Audit Ref: {reviewResult.auditRef}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#f0d98c]/50">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لم يتم مراجعة سياسة بعد</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
