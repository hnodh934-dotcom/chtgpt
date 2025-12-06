import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Shield,
  FileText,
  Sparkles
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * 🎯 Onboarding Wizard - معالج الإعداد الأولي
 * 
 * Wizard من 3 خطوات لتسهيل البداية:
 * 1. إنشاء مشروع جديد
 * 2. اختيار إطارين تنظيميين
 * 3. رفع سياسة موجودة (اختياري)
 */
export default function OnboardingWizard() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    selectedFrameworks: [] as string[],
    policyFile: null as File | null,
  });

  // Fetch frameworks
  const { data: frameworks } = trpc.frameworks.list.useQuery();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFrameworkToggle = (frameworkCode: string) => {
    if (projectData.selectedFrameworks.includes(frameworkCode)) {
      setProjectData({
        ...projectData,
        selectedFrameworks: projectData.selectedFrameworks.filter(f => f !== frameworkCode),
      });
    } else {
      if (projectData.selectedFrameworks.length < 2) {
        setProjectData({
          ...projectData,
          selectedFrameworks: [...projectData.selectedFrameworks, frameworkCode],
        });
      } else {
        toast.error("يمكنك اختيار إطارين فقط في البداية");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error("حجم الملف يجب أن يكون أقل من 10MB");
        return;
      }
      setProjectData({ ...projectData, policyFile: file });
      toast.success(`تم اختيار الملف: ${file.name}`);
    }
  };

  const handleComplete = () => {
    if (!projectData.name) {
      toast.error("يرجى إدخال اسم المشروع");
      return;
    }
    if (projectData.selectedFrameworks.length === 0) {
      toast.error("يرجى اختيار إطار تنظيمي واحد على الأقل");
      return;
    }

    toast.success("تم إنشاء المشروع بنجاح!");
    
    // Redirect to dashboard
    setTimeout(() => {
      setLocation("/compliance-hub");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">مرحباً بك في منصة RegTech</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            إعداد مشروعك الأول
          </h1>
          <p className="text-muted-foreground text-lg">
            سنساعدك على البدء في 3 خطوات بسيطة
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              الخطوة {currentStep} من {totalSteps}
            </span>
            <span className="text-sm font-medium text-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <Card className="glass-card border-purple-500/20">
          <CardContent className="p-8">
            {/* Step 1: Create Project */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <FileText className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">إنشاء مشروع جديد</h2>
                  <p className="text-muted-foreground">
                    أدخل معلومات المشروع الأساسية
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="project-name">اسم المشروع *</Label>
                    <Input
                      id="project-name"
                      placeholder="مثال: مشروع الامتثال لـ PDPL"
                      value={projectData.name}
                      onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-description">الوصف (اختياري)</Label>
                    <Textarea
                      id="project-description"
                      placeholder="وصف مختصر للمشروع وأهدافه..."
                      value={projectData.description}
                      onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Frameworks */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <Shield className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">اختيار الأطر التنظيمية</h2>
                  <p className="text-muted-foreground">
                    اختر إطاراً أو إطارين للبدء (يمكنك إضافة المزيد لاحقاً)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {frameworks?.map((framework) => {
                    const isSelected = projectData.selectedFrameworks.includes(framework.code);
                    return (
                      <button
                        key={framework.id}
                        onClick={() => handleFrameworkToggle(framework.code)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={isSelected ? "default" : "outline"}>
                            {framework.code}
                          </Badge>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <h3 className="font-semibold mb-1">{framework.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {framework.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  تم اختيار {projectData.selectedFrameworks.length} من 2 إطار
                </div>
              </div>
            )}

            {/* Step 3: Upload Policy */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">رفع سياسة موجودة</h2>
                  <p className="text-muted-foreground">
                    (اختياري) يمكنك رفع سياسة موجودة لتحليلها
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    اسحب الملف هنا أو انقر للاختيار
                  </p>
                  <input
                    type="file"
                    id="policy-file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("policy-file")?.click()}
                  >
                    اختيار ملف
                  </Button>
                  {projectData.policyFile && (
                    <div className="mt-4 p-3 bg-purple-500/10 rounded-lg">
                      <p className="text-sm font-medium text-purple-300">
                        {projectData.policyFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(projectData.policyFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  الصيغ المدعومة: PDF, DOC, DOCX, TXT (حد أقصى 10MB)
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                السابق
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !projectData.name}
                >
                  التالي
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  إنهاء الإعداد
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/compliance-hub")}
            className="text-muted-foreground hover:text-foreground"
          >
            تخطي الإعداد والانتقال للوحة التحكم
          </Button>
        </div>
      </div>
    </div>
  );
}
