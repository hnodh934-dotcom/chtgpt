import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PricingComparison } from "@/components/PricingComparison";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      nameAr: "المبتدئ",
      price: "2,999",
      period: "شهرياً",
      description: "للشركات الصغيرة والناشئة",
      features: [
        "RegAdvisor - 100 استعلام/شهر",
        "RegDrafter - 10 سياسات/شهر",
        "Compliance Hub - تقييم واحد/شهر",
        "RegMonitor - 5 أطر تنظيمية",
        "دعم فني عبر البريد",
        "تقارير أساسية",
      ],
      color: "blue",
    },
    {
      name: "Professional",
      nameAr: "المحترف",
      price: "7,999",
      period: "شهرياً",
      description: "للشركات المتوسطة",
      features: [
        "RegAdvisor - 500 استعلام/شهر",
        "RegDrafter - 50 سياسة/شهر",
        "RaaC - 20 قاعدة/شهر",
        "Compliance Hub - 5 تقييمات/شهر",
        "RegMonitor - 15 إطار تنظيمي",
        "Diagnostic - تشخيص شامل",
        "دعم فني ذو أولوية",
        "تقارير متقدمة + تصدير",
        "تكامل API",
      ],
      color: "indigo",
      popular: true,
    },
    {
      name: "Enterprise",
      nameAr: "المؤسسي",
      price: "مخصص",
      period: "",
      description: "للمؤسسات الكبرى",
      features: [
        "استعلامات وسياسات غير محدودة",
        "جميع الميزات المتقدمة",
        "تخصيص كامل للمنصة",
        "تدريب فريق العمل",
        "مدير حساب مخصص",
        "SLA مخصص (99.9%)",
        "دعم على مدار الساعة",
        "تكامل مع أنظمتك",
        "استضافة خاصة (اختياري)",
      ],
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            التسعير والباقات
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجات منظمتك. جميع الباقات تشمل تحديثات مجانية ودعم فني.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 ${
                plan.popular ? "ring-4 ring-indigo-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  الأكثر شعبية
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.nameAr}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600 dark:text-slate-400">
                      ريال {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-right" dir="rtl">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.price === "مخصص" ? "تواصل معنا" : "ابدأ الآن"}
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            مقارنة تفصيلية بين الباقات
          </h2>
          <PricingComparison />
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            أسئلة شائعة
          </h2>
          <div className="space-y-6 text-right" dir="rtl">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                هل يمكنني تغيير الباقة لاحقاً؟
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                نعم، يمكنك الترقية أو التخفيض في أي وقت. التغييرات تُطبق في دورة الفوترة التالية.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                هل الأسعار تشمل ضريبة القيمة المضافة؟
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                لا، الأسعار المعروضة لا تشمل ضريبة القيمة المضافة (15%). ستُضاف عند الفوترة.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                هل هناك فترة تجريبية مجانية؟
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                نعم، نوفر فترة تجريبية 14 يوماً لجميع الباقات. لا حاجة لبطاقة ائتمان.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                ماذا يحدث إذا تجاوزت حدود الباقة؟
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                سنُخطرك عند اقترابك من الحد. يمكنك الترقية أو شراء وحدات إضافية حسب الحاجة.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            لديك أسئلة أخرى؟ تواصل معنا
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              📧 البريد الإلكتروني
            </Button>
            <Button variant="outline">
              📞 اتصل بنا
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
