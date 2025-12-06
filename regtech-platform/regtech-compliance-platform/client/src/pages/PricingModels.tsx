import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export default function PricingModels() {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "annual">("annual");

  const packagePricing = [
    {
      name: "Starter",
      price: "50,000 - 100,000",
      duration: "مشروع واحد",
      description: "للشركات الصغيرة والناشئة",
      features: [
        "تقييم امتثال أولي لإطار واحد",
        "تحليل الفجوات الأساسي",
        "خطة عمل مبسطة",
        "تقرير امتثال نهائي",
        "دعم فني لمدة 3 أشهر",
      ],
      deliverables: [
        "تقرير تقييم الامتثال",
        "خطة عمل تنفيذية",
        "توصيات تحسين",
      ],
    },
    {
      name: "Growth",
      price: "150,000 - 300,000",
      duration: "مشروع واحد",
      description: "للشركات المتوسطة",
      features: [
        "تقييم شامل لإطارين تنظيميين",
        "تحليل مخاطر متقدم",
        "خطة عمل تفصيلية",
        "مراجعة السياسات والإجراءات",
        "تدريب الفريق (ورشة عمل)",
        "دعم فني لمدة 6 أشهر",
      ],
      deliverables: [
        "تقرير امتثال شامل",
        "خطة معالجة المخاطر",
        "سياسات وإجراءات محدثة",
        "شهادات تدريب",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "500,000+",
      duration: "حسب المشروع",
      description: "للمؤسسات الكبرى",
      features: [
        "تقييم شامل لجميع الأطر التنظيمية",
        "تحليل مخاطر متعمق",
        "خطة امتثال استراتيجية متكاملة",
        "مراجعة شاملة للسياسات",
        "برنامج تدريب متكامل",
        "استشارات مستمرة",
        "دعم فني لمدة 12 شهراً",
        "مدير حساب مخصص",
      ],
      deliverables: [
        "تقرير امتثال استراتيجي",
        "خارطة طريق الامتثال",
        "دليل سياسات كامل",
        "برنامج تدريب شامل",
        "دعم تنفيذي مستمر",
      ],
    },
  ];

  const projectPricing = [
    {
      name: "مشروع صغير",
      price: "75,000 - 150,000",
      duration: "2-3 أشهر",
      description: "تقييم إطار واحد",
      scope: [
        "تقييم امتثال لإطار تنظيمي واحد",
        "تحليل فجوات أساسي",
        "خطة عمل مختصرة",
        "تقرير نهائي",
      ],
    },
    {
      name: "مشروع متوسط",
      price: "200,000 - 400,000",
      duration: "4-6 أشهر",
      description: "تقييم 2-3 أطر",
      scope: [
        "تقييم شامل لـ 2-3 أطر تنظيمية",
        "تحليل مخاطر متقدم",
        "خطة عمل تفصيلية",
        "مراجعة سياسات",
        "ورشة تدريب واحدة",
      ],
      popular: true,
    },
    {
      name: "مشروع كبير",
      price: "600,000+",
      duration: "6-12 شهر",
      description: "تقييم شامل",
      scope: [
        "تقييم متكامل لجميع الأطر",
        "تحليل مخاطر استراتيجي",
        "خطة امتثال شاملة",
        "مراجعة كاملة للسياسات",
        "برنامج تدريب متكامل",
        "دعم تنفيذي مستمر",
      ],
    },
  ];

  const subscriptionPricing = [
    {
      name: "أساسي",
      monthlyPrice: "15,000",
      annualPrice: "150,000",
      description: "للمتابعة المستمرة",
      features: [
        "متابعة التحديثات التنظيمية",
        "تنبيهات الامتثال",
        "مكتبة الموارد",
        "دعم عبر البريد الإلكتروني",
        "تقرير ربع سنوي",
      ],
    },
    {
      name: "متقدم",
      monthlyPrice: "30,000",
      annualPrice: "300,000",
      description: "للشركات النشطة",
      features: [
        "كل ميزات الباقة الأساسية",
        "استشارات شهرية (4 ساعات)",
        "تحديثات فورية للتشريعات",
        "تقييم امتثال ربع سنوي",
        "ورشة تدريب سنوية",
        "دعم هاتفي",
      ],
      popular: true,
    },
    {
      name: "شامل",
      monthlyPrice: "60,000",
      annualPrice: "600,000",
      description: "للمؤسسات الكبرى",
      features: [
        "كل ميزات الباقة المتقدمة",
        "استشارات غير محدودة",
        "مدير حساب مخصص",
        "تقييم امتثال شهري",
        "برنامج تدريب ربع سنوي",
        "دعم فوري 24/7",
        "تقارير مخصصة",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            نماذج التسعير
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            ثلاثة نماذج تسعير مرنة تناسب جميع احتياجات الشركات
          </p>
        </div>

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-[#1a3a2e]/50">
            <TabsTrigger value="packages" className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]">
              الباقات الثابتة
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]">
              التسعير بالمشروع
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-[#2D5F4C] data-[state=active]:text-[#f0d98c]">
              الاشتراكات الشهرية
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packagePricing.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={`bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm ${
                    pkg.popular ? "ring-2 ring-[#C5A572]" : ""
                  }`}
                >
                  <CardHeader>
                    {pkg.popular && (
                      <Badge className="w-fit mb-2 bg-[#C5A572] text-[#0f2318]">الأكثر طلباً</Badge>
                    )}
                    <CardTitle className="text-2xl text-[#f0d98c]">{pkg.name}</CardTitle>
                    <CardDescription className="text-[#f0d98c]/70">{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-[#d4af37]">{pkg.price} ر.س</div>
                      <div className="text-sm text-[#f0d98c]/60">{pkg.duration}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#f0d98c] mb-3">الميزات:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[#f0d98c]/80">
                            <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#f0d98c] mb-3">المخرجات:</h4>
                      <ul className="space-y-2">
                        {pkg.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[#f0d98c]/80">
                            <Check className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectPricing.map((project) => (
                <Card
                  key={project.name}
                  className={`bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm ${
                    project.popular ? "ring-2 ring-[#C5A572]" : ""
                  }`}
                >
                  <CardHeader>
                    {project.popular && (
                      <Badge className="w-fit mb-2 bg-[#C5A572] text-[#0f2318]">الأكثر شيوعاً</Badge>
                    )}
                    <CardTitle className="text-2xl text-[#f0d98c]">{project.name}</CardTitle>
                    <CardDescription className="text-[#f0d98c]/70">{project.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-[#d4af37]">{project.price} ر.س</div>
                      <div className="text-sm text-[#f0d98c]/60">المدة: {project.duration}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-[#f0d98c] mb-3">نطاق العمل:</h4>
                    <ul className="space-y-2">
                      {project.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#f0d98c]/80">
                          <Check className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <div className="mb-8 flex justify-center gap-4">
              <button
                onClick={() => setSubscriptionPeriod("monthly")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  subscriptionPeriod === "monthly"
                    ? "bg-[#2D5F4C] text-[#f0d98c]"
                    : "bg-[#1a3a2e]/50 text-[#f0d98c]/60"
                }`}
              >
                شهري
              </button>
              <button
                onClick={() => setSubscriptionPeriod("annual")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  subscriptionPeriod === "annual"
                    ? "bg-[#2D5F4C] text-[#f0d98c]"
                    : "bg-[#1a3a2e]/50 text-[#f0d98c]/60"
                }`}
              >
                سنوي <Badge className="mr-2 bg-emerald-600">وفّر 17%</Badge>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPricing.map((sub) => (
                <Card
                  key={sub.name}
                  className={`bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm ${
                    sub.popular ? "ring-2 ring-[#C5A572]" : ""
                  }`}
                >
                  <CardHeader>
                    {sub.popular && (
                      <Badge className="w-fit mb-2 bg-[#C5A572] text-[#0f2318]">الأكثر قيمة</Badge>
                    )}
                    <CardTitle className="text-2xl text-[#f0d98c]">{sub.name}</CardTitle>
                    <CardDescription className="text-[#f0d98c]/70">{sub.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-[#d4af37]">
                        {subscriptionPeriod === "monthly" ? sub.monthlyPrice : sub.annualPrice} ر.س
                      </div>
                      <div className="text-sm text-[#f0d98c]/60">
                        {subscriptionPeriod === "monthly" ? "شهرياً" : "سنوياً"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {sub.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#f0d98c]/80">
                          <Check className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Payment Options */}
        <Card className="mt-12 bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#f0d98c]">خيارات الدفع المرنة</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#f0d98c]/80">
            <div>
              <h4 className="font-semibold text-[#f0d98c] mb-2">دفعة واحدة</h4>
              <p className="text-sm">دفع كامل المبلغ مقدماً مع خصم 5%</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#f0d98c] mb-2">دفعات مجزأة</h4>
              <p className="text-sm">تقسيط على 3 دفعات (بداية، منتصف، نهاية المشروع)</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#f0d98c] mb-2">اشتراك شهري</h4>
              <p className="text-sm">دفع شهري مرن مع إمكانية الإلغاء في أي وقت</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
