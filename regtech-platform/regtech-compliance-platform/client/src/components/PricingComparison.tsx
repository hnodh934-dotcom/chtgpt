import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * 📊 Pricing Comparison Table
 * جدول مقارنة تفصيلي بين الباقات الثلاثة
 */

interface Feature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

const features: Feature[] = [
  // Core Features
  { name: "RegAdvisor (المستشار التنظيمي)", starter: "100 استعلام/شهر", professional: "500 استعلام/شهر", enterprise: "غير محدود" },
  { name: "RegDrafter (صائغ الوثائق)", starter: "10 سياسات/شهر", professional: "50 سياسة/شهر", enterprise: "غير محدود" },
  { name: "RaaC (Regulation as Code)", starter: false, professional: "20 قاعدة/شهر", enterprise: "غير محدود" },
  { name: "Compliance Hub (مركز الامتثال)", starter: "تقييم واحد/شهر", professional: "5 تقييمات/شهر", enterprise: "غير محدود" },
  { name: "RegMonitor (مراقب التحديثات)", starter: "5 أطر", professional: "15 إطار", enterprise: "جميع الأطر" },
  { name: "Diagnostic (التشخيص الشامل)", starter: false, professional: true, enterprise: true },
  
  // Support
  { name: "دعم فني", starter: "بريد إلكتروني", professional: "ذو أولوية", enterprise: "24/7 مخصص" },
  { name: "مدير حساب مخصص", starter: false, professional: false, enterprise: true },
  { name: "تدريب فريق العمل", starter: false, professional: "جلسة واحدة", enterprise: "غير محدود" },
  
  // Reports & Integration
  { name: "تقارير", starter: "أساسية", professional: "متقدمة + تصدير", enterprise: "مخصصة" },
  { name: "تكامل API", starter: false, professional: true, enterprise: true },
  { name: "تكامل مع الأنظمة الداخلية", starter: false, professional: false, enterprise: true },
  
  // Advanced
  { name: "تخصيص المنصة", starter: false, professional: false, enterprise: true },
  { name: "SLA مضمون", starter: false, professional: "99%", enterprise: "99.9%" },
  { name: "استضافة خاصة", starter: false, professional: false, enterprise: "اختياري" },
];

const renderCell = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-green-500 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
};

export function PricingComparison() {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" dir="rtl">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-right font-bold">الميزة</th>
              <th className="p-4 text-center font-bold text-blue-600 dark:text-blue-400">
                المبتدئ
                <div className="text-sm font-normal text-muted-foreground">2,999 ريال/شهر</div>
              </th>
              <th className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                المحترف
                <div className="text-sm font-normal text-muted-foreground">7,999 ريال/شهر</div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">الأكثر شعبية</div>
              </th>
              <th className="p-4 text-center font-bold text-purple-600 dark:text-purple-400">
                المؤسسي
                <div className="text-sm font-normal text-muted-foreground">مخصص</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr 
                key={index} 
                className={`border-b hover:bg-muted/30 transition-colors ${
                  index % 5 === 0 && index !== 0 ? "border-t-2 border-primary/20" : ""
                }`}
              >
                <td className="p-4 text-right font-medium">{feature.name}</td>
                <td className="p-4 text-center">{renderCell(feature.starter)}</td>
                <td className="p-4 text-center bg-indigo-50/50 dark:bg-indigo-950/20">
                  {renderCell(feature.professional)}
                </td>
                <td className="p-4 text-center">{renderCell(feature.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-muted/30 text-center text-sm text-muted-foreground border-t">
        <p>
          جميع الباقات تشمل تحديثات مجانية ودعم فني. الأسعار لا تشمل ضريبة القيمة المضافة (15%).
        </p>
      </div>
    </Card>
  );
}
