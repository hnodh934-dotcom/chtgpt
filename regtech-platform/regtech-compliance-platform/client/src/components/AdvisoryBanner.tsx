import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * AdvisoryBanner - تنويه ثابت يظهر في أعلى شاشات النتائج
 * 
 * يوضح أن المخرجات توصيات تحليلية فقط وليست قرارات ملزمة
 */
export function AdvisoryBanner() {
  return (
    <Alert className="mb-6 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
      <AlertDescription className="text-sm text-amber-900 dark:text-amber-200">
        <strong>تنويه:</strong> المخرجات أدناه تمثل توصيات تحليلية فقط، وليست
        قرارات ملزمة، والقرار النهائي على عاتق المستخدم.
      </AlertDescription>
    </Alert>
  );
}

/**
 * دالة معالجة الضغط على زر "اعتماد التوصية"
 * 
 * @param confirm - دالة عرض صندوق التأكيد
 * @param adopt - دالة تنفيذ الاعتماد
 */
export async function onAdoptClick(
  confirm: (msg: string) => Promise<boolean>,
  adopt: () => Promise<void>
) {
  const confirmMessage = `تأكيد اعتماد التوصية

المنصة لا تصدر قرارات ملزمة، وإنما توصيات تحليلية مبنية على معايير الامتثال المدخلة.

هل تريد المتابعة؟`;

  const ok = await confirm(confirmMessage);
  if (ok) {
    await adopt();
  }
}
