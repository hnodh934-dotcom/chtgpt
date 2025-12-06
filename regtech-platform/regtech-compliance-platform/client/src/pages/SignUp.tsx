import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Mail, 
  Phone, 
  Briefcase,
  User,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield
} from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * 🎨 صفحة التسجيل الفاخرة - Premium Sign Up Flow
 * 4 خطوات سلسة بدون احتكاك
 */
export default function SignUp() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: "",
    email: "",
    phone: "",
    sector: "",
    
    // Step 2: Package Selection
    selectedPackage: "growth",
    
    // Step 3: Account Creation
    fullName: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
    
    // Step 4: Verification
    verificationCode: ""
  });

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "50,000",
      description: "للشركات الناشئة",
      features: ["10 مستخدمين", "3 أطر", "تقارير أساسية"]
    },
    {
      id: "growth",
      name: "Growth",
      price: "150,000",
      description: "الأكثر شعبية",
      badge: "موصى به",
      features: ["50 مستخدم", "7 أطر", "AI كامل", "API Access"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "500,000+",
      description: "للمؤسسات الكبرى",
      features: ["غير محدود", "مخصص", "دعم 24/7", "White Label"]
    }
  ];

  const sectors = [
    "المدفوعات الرقمية",
    "التمويل الجماعي",
    "الإقراض الرقمي",
    "التأمين الرقمي",
    "إدارة الثروات",
    "العملات الرقمية",
    "أخرى"
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: Integrate with backend
    console.log("Form submitted:", formData);
    setLocation("/welcome");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen night-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          {APP_LOGO && (
            <Link href="/">
              <img 
                src={APP_LOGO} 
                alt={APP_TITLE} 
                className="h-16 mx-auto mb-4 opacity-90 drop-shadow-lg cursor-pointer hover:opacity-100 transition-opacity"
              />
            </Link>
          )}
          <h1 className="text-3xl font-bold legal-heading gold-glow mb-2">
            إنشاء حساب جديد
          </h1>
          <p className="text-muted-foreground">
            انضم إلى 280+ شركة تثق بنا لإدارة امتثالها التنظيمي
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${s <= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                  ${s < step ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                `}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`
                    flex-1 h-1 mx-2
                    ${s < step ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between max-w-2xl mx-auto mt-2 text-xs text-muted-foreground">
            <span className={step === 1 ? 'text-primary font-bold' : ''}>معلومات الشركة</span>
            <span className={step === 2 ? 'text-primary font-bold' : ''}>اختيار الباقة</span>
            <span className={step === 3 ? 'text-primary font-bold' : ''}>إنشاء الحساب</span>
            <span className={step === 4 ? 'text-primary font-bold' : ''}>التحقق</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="premium-card max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl legal-heading">
              {step === 1 && "معلومات الشركة"}
              {step === 2 && "اختر الباقة المناسبة"}
              {step === 3 && "إنشاء حسابك"}
              {step === 4 && "تأكيد البريد الإلكتروني"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "أخبرنا عن شركتك لنخصص تجربتك"}
              {step === 2 && "اختر الباقة التي تناسب احتياجاتك"}
              {step === 3 && "أنشئ حسابك الشخصي للوصول إلى المنصة"}
              {step === 4 && "أرسلنا رمز التحقق إلى بريدك الإلكتروني"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Company Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    اسم الشركة
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="مثال: شركة التقنية المالية المحدودة"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      البريد الإلكتروني للشركة
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@company.sa"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      رقم الجوال
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+966 5X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="bg-input border-border"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    القطاع
                  </Label>
                  <Select value={formData.sector} onValueChange={(v) => updateFormData("sector", v)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="اختر قطاع شركتك" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Package Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`
                        cursor-pointer transition-all
                        ${formData.selectedPackage === pkg.id
                          ? 'border-primary bg-primary/5 ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      onClick={() => updateFormData("selectedPackage", pkg.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">{pkg.name}</CardTitle>
                              {pkg.badge && (
                                <Badge className="bg-primary text-primary-foreground">
                                  {pkg.badge}
                                </Badge>
                              )}
                            </div>
                            <CardDescription>{pkg.description}</CardDescription>
                          </div>
                          <div className="text-left">
                            <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                            <span className="text-sm text-muted-foreground mr-1">ريال/سنة</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-chart-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Account Creation */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="أحمد محمد"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      المسمى الوظيفي
                    </Label>
                    <Input
                      id="jobTitle"
                      placeholder="مدير الامتثال"
                      value={formData.jobTitle}
                      onChange={(e) => updateFormData("jobTitle", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="bg-input border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، رقم، ورمز
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    تأكيد كلمة المرور
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    بإنشاء حساب، أنت توافق على{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      الشروط والأحكام
                    </Link>
                    {" "}و{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    أرسلنا رمز التحقق المكون من 6 أرقام إلى:
                  </p>
                  <p className="font-bold text-lg">{formData.email}</p>
                </div>

                <div className="space-y-2 max-w-xs mx-auto">
                  <Label htmlFor="verificationCode">رمز التحقق</Label>
                  <Input
                    id="verificationCode"
                    placeholder="000000"
                    value={formData.verificationCode}
                    onChange={(e) => updateFormData("verificationCode", e.target.value)}
                    className="bg-input border-border text-center text-2xl tracking-widest"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>

                <Button variant="outline" size="sm">
                  إعادة إرسال الرمز
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                السابق
              </Button>

              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  التالي
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  إنهاء التسجيل
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* OAuth Options */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                أو سجّل باستخدام
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11.4 24H0V8h11.4v16zM24 8v16h-11.4V8H24zm0-8v6.8H0V0h24z"/>
              </svg>
              Microsoft
            </Button>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-primary hover:underline font-bold">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
