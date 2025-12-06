import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, Book, Clock } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-950 dark:via-green-950 dark:to-emerald-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            الدعم الفني
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            نحن هنا لمساعدتك. تواصل معنا بالطريقة التي تناسبك.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              البريد الإلكتروني
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              الرد خلال 24 ساعة
            </p>
            <a href="mailto:support@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">
              support@regtech-platform.sa
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              الهاتف
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              الأحد - الخميس: 9 ص - 5 م
            </p>
            <a href="tel:+966XXXXXXXX" className="text-green-600 dark:text-green-400 hover:underline">
              +966 11 XXX XXXX
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              الدردشة المباشرة
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              متاح خلال ساعات العمل
            </p>
            <Button variant="outline" className="mt-2">
              ابدأ المحادثة
            </Button>
          </div>
        </div>

        {/* Support Tiers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            مستويات الدعم
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-right" dir="rtl">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                الدعم الأساسي
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                لباقة Starter
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                <li>✅ دعم عبر البريد الإلكتروني</li>
                <li>✅ الرد خلال 24-48 ساعة</li>
                <li>✅ قاعدة المعرفة</li>
                <li>✅ تحديثات شهرية</li>
              </ul>
            </div>

            <div className="border-2 border-indigo-500 rounded-lg p-6 bg-indigo-50 dark:bg-indigo-900/20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                الدعم ذو الأولوية
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                لباقة Professional
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                <li>✅ جميع ميزات الدعم الأساسي</li>
                <li>✅ دعم هاتفي</li>
                <li>✅ الرد خلال 12 ساعة</li>
                <li>✅ تحديثات أسبوعية</li>
                <li>✅ جلسات تدريب ربع سنوية</li>
              </ul>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                الدعم المخصص
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                لباقة Enterprise
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                <li>✅ جميع ميزات الدعم ذو الأولوية</li>
                <li>✅ مدير حساب مخصص</li>
                <li>✅ دعم على مدار الساعة</li>
                <li>✅ الرد خلال ساعة واحدة</li>
                <li>✅ تدريب مخصص</li>
                <li>✅ SLA مخصص</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            موارد المساعدة الذاتية
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/help" className="flex items-start gap-4 p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
              <Book className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="text-right" dir="rtl">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  قاعدة المعرفة
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  مقالات شاملة وأدلة استخدام لجميع الميزات
                </p>
              </div>
            </a>

            <a href="/api-docs" className="flex items-start gap-4 p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
              <Book className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div className="text-right" dir="rtl">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  وثائق API
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  دليل كامل للمطورين للتكامل مع المنصة
                </p>
              </div>
            </a>

            <a href="/content-update" className="flex items-start gap-4 p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div className="text-right" dir="rtl">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  عملية التحديث
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  كيف نحدّث المحتوى التنظيمي باستمرار
                </p>
              </div>
            </a>

            <a href="/backup-system" className="flex items-start gap-4 p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
              <div className="text-right" dir="rtl">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  نظام النسخ الاحتياطي
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  كيف نحمي بياناتك ونضمن استمرارية الخدمة
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
