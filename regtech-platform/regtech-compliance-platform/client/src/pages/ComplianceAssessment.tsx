import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

export default function ComplianceAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [complianceScore, setComplianceScore] = useState(0);

  const frameworks = [
    { id: "pdpl", name: "نظام حماية البيانات الشخصية (PDPL)", sector: "عام" },
    { id: "ecc", name: "الضوابط الأساسية للأمن السيبراني (ECC)", sector: "أمن سيبراني" },
    { id: "sama", name: "ضوابط SAMA للأمن السيبراني", sector: "مالي" },
    { id: "citc", name: "لوائح هيئة الاتصالات (CITC)", sector: "اتصالات" },
    { id: "sfda", name: "لوائح الهيئة العامة للغذاء والدواء", sector: "صحي" },
  ];

  const assessmentQuestions = [
    {
      category: "الحوكمة والإدارة",
      questions: [
        "هل لديكم سياسة موثقة لحماية البيانات؟",
        "هل تم تعيين مسؤول حماية بيانات؟",
        "هل يتم مراجعة السياسات بشكل دوري؟",
      ],
    },
    {
      category: "الأمن التقني",
      questions: [
        "هل لديكم نظام تشفير للبيانات الحساسة؟",
        "هل يتم إجراء اختبارات اختراق دورية؟",
        "هل لديكم نظام للنسخ الاحتياطي؟",
      ],
    },
    {
      category: "التدريب والتوعية",
      questions: [
        "هل يتم تدريب الموظفين على الأمن السيبراني؟",
        "هل لديكم برنامج توعية مستمر؟",
        "هل يتم اختبار الموظفين بشكل دوري؟",
      ],
    },
  ];

  const handleFrameworkToggle = (id: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleStartAssessment = () => {
    if (selectedFrameworks.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleCompleteAssessment = () => {
    // محاكاة حساب النتيجة
    const score = Math.floor(Math.random() * 30) + 60; // نتيجة عشوائية بين 60-90
    setComplianceScore(score);
    setAssessmentComplete(true);
    setCurrentStep(3);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: "ممتاز", color: "bg-emerald-600" };
    if (score >= 60) return { text: "جيد - يحتاج تحسين", color: "bg-amber-600" };
    return { text: "ضعيف - يحتاج عمل كبير", color: "bg-red-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            تقييم الامتثال
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            أداة تفاعلية لتقييم مستوى امتثال مؤسستك للأطر التنظيمية
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, title: "اختيار الأطر" },
              { num: 2, title: "التقييم" },
              { num: 3, title: "النتائج" },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      currentStep >= step.num
                        ? "bg-[#2D5F4C] text-[#f0d98c]"
                        : "bg-[#1a3a2e] text-[#f0d98c]/50"
                    }`}
                  >
                    {currentStep > step.num ? <CheckCircle2 className="h-6 w-6" /> : step.num}
                  </div>
                  <span className="text-sm mt-2 text-[#f0d98c]/70">{step.title}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-1 flex-1 mx-4 ${
                      currentStep > step.num ? "bg-[#2D5F4C]" : "bg-[#1a3a2e]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Framework Selection */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#f0d98c]">اختر الأطر التنظيمية</CardTitle>
                <CardDescription className="text-[#f0d98c]/70">
                  اختر الأطر التنظيمية التي تريد تقييم امتثالك لها
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {frameworks.map((framework) => (
                  <div
                    key={framework.id}
                    onClick={() => handleFrameworkToggle(framework.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedFrameworks.includes(framework.id)
                        ? "border-[#C5A572] bg-[#2D5F4C]/30"
                        : "border-[#2D5F4C]/30 bg-[#0f2318]/50 hover:border-[#2D5F4C]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedFrameworks.includes(framework.id) ? (
                          <CheckCircle2 className="h-6 w-6 text-[#C5A572]" />
                        ) : (
                          <Circle className="h-6 w-6 text-[#f0d98c]/30" />
                        )}
                        <div>
                          <h4 className="font-semibold text-[#f0d98c]">{framework.name}</h4>
                          <p className="text-sm text-[#f0d98c]/60">القطاع: {framework.sector}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[#f0d98c] border-[#C5A572]">
                        {framework.sector}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button
                    onClick={handleStartAssessment}
                    disabled={selectedFrameworks.length === 0}
                    className="w-full bg-[#2D5F4C] hover:bg-[#3a7a5f] text-[#f0d98c]"
                  >
                    ابدأ التقييم ({selectedFrameworks.length} إطار محدد)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Assessment Questions */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto space-y-6">
            {assessmentQuestions.map((category, idx) => (
              <Card key={idx} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-[#f0d98c]">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((question, qIdx) => (
                    <div key={qIdx} className="flex items-center justify-between p-4 bg-[#0f2318]/50 rounded-lg">
                      <span className="text-[#f0d98c]">{question}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-emerald-500 border-emerald-500">
                          نعم
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-500">
                          لا
                        </Button>
                        <Button size="sm" variant="outline" className="text-amber-500 border-amber-500">
                          جزئياً
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={handleCompleteAssessment}
              className="w-full bg-[#2D5F4C] hover:bg-[#3a7a5f] text-[#f0d98c]"
            >
              إنهاء التقييم وعرض النتائج
            </Button>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && assessmentComplete && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-[#f0d98c] mb-4">نتيجة التقييم</CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(complianceScore)} mb-4`}>
                  {complianceScore}%
                </div>
                <Badge className={`${getScoreStatus(complianceScore).color} text-lg px-6 py-2`}>
                  {getScoreStatus(complianceScore).text}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#f0d98c]">نسبة الامتثال الإجمالية</span>
                    <span className={`font-bold ${getScoreColor(complianceScore)}`}>{complianceScore}%</span>
                  </div>
                  <Progress value={complianceScore} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-emerald-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <h4 className="font-semibold text-[#f0d98c]">نقاط القوة</h4>
                    </div>
                    <ul className="text-sm text-[#f0d98c]/70 space-y-1">
                      <li>• سياسات موثقة</li>
                      <li>• تدريب منتظم</li>
                      <li>• نظام نسخ احتياطي</li>
                    </ul>
                  </div>

                  <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-amber-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <h4 className="font-semibold text-[#f0d98c]">يحتاج تحسين</h4>
                    </div>
                    <ul className="text-sm text-[#f0d98c]/70 space-y-1">
                      <li>• نظام التشفير</li>
                      <li>• اختبارات الاختراق</li>
                      <li>• توعية الموظفين</li>
                    </ul>
                  </div>

                  <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-red-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <h4 className="font-semibold text-[#f0d98c]">فجوات حرجة</h4>
                    </div>
                    <ul className="text-sm text-[#f0d98c]/70 space-y-1">
                      <li>• مسؤول حماية بيانات</li>
                      <li>• مراجعة دورية</li>
                      <li>• خطة استجابة للحوادث</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#0f2318]/50 p-6 rounded-lg border border-[#2D5F4C]/30">
                  <h4 className="font-semibold text-[#f0d98c] mb-3">الخطوات التالية المقترحة:</h4>
                  <ol className="space-y-2 text-[#f0d98c]/80">
                    <li>1. تعيين مسؤول حماية بيانات معتمد</li>
                    <li>2. تطبيق نظام تشفير شامل للبيانات الحساسة</li>
                    <li>3. إجراء اختبار اختراق خارجي</li>
                    <li>4. تطوير خطة استجابة للحوادث</li>
                    <li>5. تنفيذ برنامج توعية مستمر للموظفين</li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedFrameworks([]);
                      setAssessmentComplete(false);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    تقييم جديد
                  </Button>
                  <Button className="flex-1 bg-[#2D5F4C] hover:bg-[#3a7a5f] text-[#f0d98c]">
                    تحميل التقرير الكامل (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
