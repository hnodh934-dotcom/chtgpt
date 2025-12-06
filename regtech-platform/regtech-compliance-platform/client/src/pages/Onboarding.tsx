import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  Building2, 
  Shield, 
  Users, 
  ClipboardCheck,
  Award,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Mail,
  Trash2,
  Plus,
  Target,
  TrendingUp,
  Calendar,
  Briefcase,
  Bell
} from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";

/**
 * 🎯 معالج الإعداد الفاخر - Premium Onboarding Wizard
 * 5 خطوات لإعداد الحساب بشكل كامل
 */
export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const { data: frameworks } = trpc.frameworks.list.useQuery();
  
  const [formData, setFormData] = useState({
    // Step 1: Company Details
    companySize: "",
    employeeCount: "",
    foundedYear: "",
    complianceGoals: [] as string[],
    challenges: "",
    
    // Step 2: Frameworks
    selectedFrameworks: [] as number[],
    
    // Step 3: Team Members
    teamMembers: [
      { email: "", role: "", name: "" }
    ],
    
    // Step 4: Quick Assessment
    assessmentAnswers: {} as Record<number, boolean>,
    
    // Step 5: Tour completed
    tourCompleted: false
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { num: 1, title: "معلومات الشركة", icon: Building2, description: "تفاصيل وأهداف" },
    { num: 2, title: "الأطر التنظيمية", icon: Shield, description: "اختر الأطر" },
    { num: 3, title: "الفريق", icon: Users, description: "أضف الأعضاء" },
    { num: 4, title: "التقييم السريع", icon: ClipboardCheck, description: "10 أسئلة" },
    { num: 5, title: "جولة تعريفية", icon: Award, description: "تعرّف على المنصة" },
  ];

  const companySizes = [
    "شركة ناشئة (Startup)",
    "صغيرة (1-50 موظف)",
    "متوسطة (51-250 موظف)",
    "كبيرة (251-1000 موظف)",
    "مؤسسة (1000+ موظف)"
  ];

  const employeeCounts = [
    "1-10",
    "11-50",
    "51-100",
    "101-250",
    "251-500",
    "501-1000",
    "1000+"
  ];

  const complianceGoalsOptions = [
    { id: "avoid-fines", label: "تجنب الغرامات التنظيمية", icon: Shield },
    { id: "get-license", label: "الحصول على ترخيص SAMA/CMA", icon: Award },
    { id: "improve-security", label: "تحسين الأمن السيبراني", icon: Target },
    { id: "automate", label: "أتمتة عمليات الامتثال", icon: TrendingUp },
    { id: "reports", label: "إنشاء تقارير احترافية", icon: ClipboardCheck },
    { id: "stay-updated", label: "متابعة التحديثات التنظيمية", icon: Calendar }
  ];

  const roles = [
    "مدير امتثال (Compliance Manager)",
    "مسؤول امتثال (Compliance Officer)",
    "محلل امتثال (Compliance Analyst)",
    "مدقق داخلي (Internal Auditor)",
    "مستشار قانوني (Legal Counsel)",
    "عضو فريق (Team Member)"
  ];

  const assessmentQuestions = [
    "هل لديك سياسات مكتوبة لحماية البيانات الشخصية؟",
    "هل تجري تقييمات دورية للمخاطر السيبرانية؟",
    "هل لديك فريق امتثال مخصص؟",
    "هل تستخدم أدوات أتمتة للامتثال حالياً؟",
    "هل تقوم بتدريب الموظفين على الامتثال بشكل دوري؟",
    "هل لديك خطة استجابة للحوادث الأمنية؟",
    "هل تجري مراجعات امتثال داخلية منتظمة؟",
    "هل تحتفظ بسجلات موثقة لأنشطة الامتثال؟",
    "هل لديك إجراءات واضحة للإبلاغ عن المخالفات؟",
    "هل تراجع وتحدث سياساتك بناءً على التغييرات التنظيمية؟"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = () => {
    // TODO: Save onboarding data
    console.log("Onboarding completed:", formData);
    setLocation("/dashboard");
  };

  const toggleFramework = (frameworkId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedFrameworks: prev.selectedFrameworks.includes(frameworkId)
        ? prev.selectedFrameworks.filter(id => id !== frameworkId)
        : [...prev.selectedFrameworks, frameworkId]
    }));
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      complianceGoals: prev.complianceGoals.includes(goalId)
        ? prev.complianceGoals.filter(id => id !== goalId)
        : [...prev.complianceGoals, goalId]
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { email: "", role: "", name: "" }]
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const updateAssessmentAnswer = (questionIndex: number, answer: boolean) => {
    setFormData(prev => ({
      ...prev,
      assessmentAnswers: {
        ...prev.assessmentAnswers,
        [questionIndex]: answer
      }
    }));
  };

  const calculateAssessmentScore = () => {
    const answers = Object.values(formData.assessmentAnswers);
    const yesCount = answers.filter(a => a === true).length;
    return Math.round((yesCount / assessmentQuestions.length) * 100);
  };

  return (
    <div className="min-h-screen night-gradient py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {APP_LOGO && (
            <img 
              src={APP_LOGO} 
              alt={APP_TITLE} 
              className="h-14 mx-auto mb-4 opacity-90"
            />
          )}
          <h1 className="text-3xl font-bold legal-heading gold-glow mb-2">
            إعداد حسابك
          </h1>
          <p className="text-muted-foreground">
            5 خطوات بسيطة لتخصيص تجربتك (5 دقائق فقط)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center flex-1">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2
                  transition-all duration-300
                  ${step.num === currentStep 
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/30 scale-110' 
                    : step.num < currentStep
                    ? 'bg-primary/80 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {step.num < currentStep ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="text-center hidden md:block">
                  <p className={`text-xs font-bold ${step.num === currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            الخطوة {currentStep} من {totalSteps}
          </p>
        </div>

        {/* Content Card */}
        <Card className="premium-card mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 text-primary" })}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl legal-heading">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "أخبرنا المزيد عن شركتك وأهدافك"}
                  {currentStep === 2 && "حدد الأطر التنظيمية التي تحتاج للامتثال لها"}
                  {currentStep === 3 && "أضف أعضاء فريق الامتثال وحدد صلاحياتهم"}
                  {currentStep === 4 && "أجب على 10 أسئلة لتقييم وضعك الحالي"}
                  {currentStep === 5 && "تعرّف على الميزات الرئيسية للمنصة"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Company Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      حجم الشركة
                    </Label>
                    <Select 
                      value={formData.companySize} 
                      onValueChange={(v) => setFormData(prev => ({ ...prev, companySize: v }))}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="اختر حجم الشركة" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount" className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      عدد الموظفين
                    </Label>
                    <Select 
                      value={formData.employeeCount} 
                      onValueChange={(v) => setFormData(prev => ({ ...prev, employeeCount: v }))}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="اختر عدد الموظفين" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeCounts.map((count) => (
                          <SelectItem key={count} value={count}>{count}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundedYear" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    سنة التأسيس
                  </Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    placeholder="2020"
                    value={formData.foundedYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value }))}
                    className="bg-input border-border"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    ما هي أهدافك من استخدام المنصة؟ (اختر جميع ما ينطبق)
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {complianceGoalsOptions.map((goal) => (
                      <div
                        key={goal.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                          ${formData.complianceGoals.includes(goal.id)
                            ? 'bg-primary/10 border-primary'
                            : 'bg-muted/20 border-border hover:border-primary/50'
                          }
                        `}
                        onClick={() => toggleGoal(goal.id)}
                      >
                        <Checkbox 
                          checked={formData.complianceGoals.includes(goal.id)}
                          onCheckedChange={() => toggleGoal(goal.id)}
                        />
                        <goal.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm flex-1">{goal.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    ما هي أكبر التحديات التي تواجهها في الامتثال؟ (اختياري)
                  </Label>
                  <Textarea
                    id="challenges"
                    placeholder="مثال: صعوبة متابعة التحديثات التنظيمية، نقص الموارد البشرية، تعقيد المتطلبات..."
                    value={formData.challenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                    className="bg-input border-border min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Frameworks Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  اختر الأطر التنظيمية التي تحتاج شركتك للامتثال لها. يمكنك تغيير هذا لاحقاً.
                </p>
                <div className="grid gap-4">
                  {frameworks?.map((framework) => (
                    <Card
                      key={framework.id}
                      className={`
                        cursor-pointer transition-all
                        ${formData.selectedFrameworks.includes(framework.id)
                          ? 'border-primary bg-primary/5 ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      onClick={() => toggleFramework(framework.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Checkbox 
                            checked={formData.selectedFrameworks.includes(framework.id)}
                            onCheckedChange={() => toggleFramework(framework.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                {framework.code}
                              </Badge>
                              {framework.sector && (
                                <Badge variant="secondary" className="text-xs">
                                  {framework.sector}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg legal-heading mb-1">
                              {framework.name}
                            </CardTitle>
                            {framework.description && (
                              <CardDescription className="text-sm">
                                {framework.description}
                              </CardDescription>
                            )}
                            {framework.authority && (
                              <p className="text-xs text-muted-foreground mt-2">
                                الجهة: {framework.authority}
                              </p>
                            )}
                          </div>
                          <Shield className="w-8 h-8 text-primary/60" />
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                {formData.selectedFrameworks.length === 0 && (
                  <p className="text-sm text-chart-5 text-center">
                    ⚠️ يرجى اختيار إطار تنظيمي واحد على الأقل
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Team Members */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  أضف أعضاء فريق الامتثال. سيتم إرسال دعوات عبر البريد الإلكتروني.
                </p>
                <div className="space-y-3">
                  {formData.teamMembers.map((member, index) => (
                    <Card key={index} className="border-border">
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">الاسم</Label>
                            <Input
                              placeholder="أحمد محمد"
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                              className="bg-input border-border"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">البريد الإلكتروني</Label>
                            <Input
                              type="email"
                              placeholder="ahmad@company.sa"
                              value={member.email}
                              onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                              className="bg-input border-border"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">الدور</Label>
                            <div className="flex gap-2">
                              <Select 
                                value={member.role} 
                                onValueChange={(v) => updateTeamMember(index, "role", v)}
                              >
                                <SelectTrigger className="bg-input border-border flex-1">
                                  <SelectValue placeholder="اختر الدور" />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.teamMembers.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeTeamMember(index)}
                                  className="shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={addTeamMember}
                  className="w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة عضو آخر
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  💡 يمكنك إضافة المزيد من الأعضاء لاحقاً من الإعدادات
                </p>
              </div>
            )}

            {/* Step 4: Quick Assessment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  أجب بـ "نعم" أو "لا" على الأسئلة التالية لنساعدك على فهم وضعك الحالي
                </p>
                <div className="space-y-3">
                  {assessmentQuestions.map((question, index) => (
                    <Card key={index} className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">
                              {index + 1}. {question}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant={formData.assessmentAnswers[index] === true ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateAssessmentAnswer(index, true)}
                              className={formData.assessmentAnswers[index] === true ? "bg-chart-2" : ""}
                            >
                              نعم
                            </Button>
                            <Button
                              variant={formData.assessmentAnswers[index] === false ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateAssessmentAnswer(index, false)}
                              className={formData.assessmentAnswers[index] === false ? "bg-chart-5" : ""}
                            >
                              لا
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {Object.keys(formData.assessmentAnswers).length === assessmentQuestions.length && (
                  <Card className="premium-card border-primary">
                    <CardContent className="pt-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-primary">
                          {calculateAssessmentScore()}%
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">نتيجة التقييم</h3>
                      <p className="text-muted-foreground">
                        {calculateAssessmentScore() >= 70 
                          ? "ممتاز! لديك أساس قوي للامتثال. سنساعدك على تحسينه أكثر."
                          : calculateAssessmentScore() >= 40
                          ? "جيد! لديك بعض الممارسات الجيدة. سنساعدك على سد الفجوات."
                          : "يحتاج إلى تحسين. لا تقلق، سنساعدك على بناء برنامج امتثال قوي."
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 5: Product Tour */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="w-14 h-14 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold legal-heading mb-2">
                    🎉 أحسنت! اكتمل الإعداد
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    حسابك جاهز الآن. دعنا نأخذك في جولة سريعة
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-right">
                  {[
                    {
                      icon: Shield,
                      title: "لوحة التحكم",
                      description: "نظرة شاملة على مستوى امتثالك"
                    },
                    {
                      icon: ClipboardCheck,
                      title: "التقييمات",
                      description: "قيّم امتثالك لكل إطار تنظيمي"
                    },
                    {
                      icon: FileText,
                      title: "التقارير",
                      description: "أنشئ تقارير احترافية بنقرة واحدة"
                    },
                    {
                      icon: Bell,
                      title: "التنبيهات",
                      description: "تلقى إشعارات بالتحديثات التنظيمية"
                    }
                  ].map((feature, i) => (
                    <Card key={i} className="border-border">
                      <CardContent className="pt-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <feature.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    💡 يمكنك الوصول إلى مركز المساعدة في أي وقت من القائمة العلوية
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            السابق
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              disabled={
                (currentStep === 2 && formData.selectedFrameworks.length === 0) ||
                (currentStep === 4 && Object.keys(formData.assessmentAnswers).length < assessmentQuestions.length)
              }
            >
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Sparkles className="w-4 h-4" />
              ابدأ الآن
            </Button>
          )}
        </div>

        {/* Skip Option */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          هل تريد تخطي الإعداد؟{" "}
          <button 
            onClick={() => setLocation("/dashboard")}
            className="text-primary hover:underline font-bold"
          >
            الانتقال مباشرة للوحة التحكم
          </button>
        </p>
      </div>
    </div>
  );
}

// React import for createElement
import React from "react";
import { FileText } from "lucide-react";
