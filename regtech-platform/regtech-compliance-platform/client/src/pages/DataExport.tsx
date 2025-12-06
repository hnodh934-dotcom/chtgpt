import { APP_TITLE } from "@/const";
import { Download, FileJson, FileSpreadsheet, FileText, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DataExport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-950 dark:via-green-950 dark:to-emerald-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              تصدير البيانات
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              بياناتك ملكك - صدّرها في أي وقت، بأي صيغة
            </p>
          </div>

          <div className="space-y-10 text-right" dir="rtl">
            {/* Overview */}
            <section>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  في {APP_TITLE}، نؤمن بأن <strong>بياناتك ملكك الكامل</strong>. لذلك، نوفر لك إمكانية 
                  تصدير جميع بياناتك في أي وقت، بدون قيود، وبصيغ متعددة تناسب احتياجاتك.
                </p>
              </div>
            </section>

            {/* Export Formats */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                الصيغ المتاحة
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                      <FileJson className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      JSON
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      للتكامل مع الأنظمة البرمجية
                    </p>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 text-right">
                      <li>✓ بنية منظمة</li>
                      <li>✓ سهل البرمجة</li>
                      <li>✓ يدعم APIs</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                      <FileSpreadsheet className="w-7 h-7 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      CSV / Excel
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      للتحليل في جداول البيانات
                    </p>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 text-right">
                      <li>✓ فتح في Excel</li>
                      <li>✓ تحليل سهل</li>
                      <li>✓ رسوم بيانية</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                      <FileText className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      PDF
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      للطباعة والأرشفة
                    </p>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 text-right">
                      <li>✓ جاهز للطباعة</li>
                      <li>✓ تنسيق احترافي</li>
                      <li>✓ سهل المشاركة</li>
                    </ul>
                  </div>
                </Card>
              </div>
            </section>

            {/* What Can Be Exported */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                ما يمكن تصديره
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "جميع الاستشارات التنظيمية (RegAdvisor)",
                  "المسودات والسياسات (RegDrafter)",
                  "تقييمات الامتثال (Compliance Hub)",
                  "القواعد التلقائية (RaaC)",
                  "التنبيهات والإشعارات (RegMonitor)",
                  "التشخيصات والتحليلات (Diagnostic)",
                  "الاستشارات المتقدمة (Advisory)",
                  "سجل النشاطات والتغييرات",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                كيف يعمل التصدير؟
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      اختر البيانات
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      حدد نوع البيانات التي تريد تصديرها (كل شيء أو أقسام محددة)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      اختر الصيغة
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      حدد الصيغة المناسبة (JSON, CSV, أو PDF)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      التصدير الفوري
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      احصل على ملفك خلال ثوانٍ (أو دقائق للملفات الكبيرة)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                مميزات التصدير
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    سريع
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    تصدير فوري خلال ثوانٍ
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    آمن
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    تشفير كامل للملفات
                  </p>
                </div>
                <div className="text-center">
                  <Download className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    مجاني
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    بدون رسوم إضافية
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy & Security */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🔒 الخصوصية والأمان
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 border-r-4 border-green-500 p-6 rounded-lg">
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span><strong>تشفير AES-256:</strong> جميع الملفات المصدرة مشفرة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span><strong>روابط آمنة:</strong> صلاحية محدودة (24 ساعة)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span><strong>سجل كامل:</strong> تتبع جميع عمليات التصدير</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span><strong>حذف تلقائي:</strong> الملفات تُحذف بعد 7 أيام</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  جاهز لتصدير بياناتك؟
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  سجّل الدخول للوصول إلى لوحة التحكم وبدء التصدير
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Download className="ml-2 h-5 w-5" />
                  انتقل إلى لوحة التحكم
                </Button>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                أسئلة شائعة
              </h2>
              <div className="space-y-4">
                <details className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <summary className="font-bold text-slate-900 dark:text-white cursor-pointer">
                    هل هناك حد لعدد مرات التصدير؟
                  </summary>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
                    لا، يمكنك تصدير بياناتك في أي وقت وبأي عدد من المرات بدون قيود.
                  </p>
                </details>

                <details className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <summary className="font-bold text-slate-900 dark:text-white cursor-pointer">
                    كم يستغرق التصدير؟
                  </summary>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
                    معظم عمليات التصدير تتم خلال ثوانٍ. الملفات الكبيرة جداً قد تستغرق بضع دقائق.
                  </p>
                </details>

                <details className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <summary className="font-bold text-slate-900 dark:text-white cursor-pointer">
                    هل يمكنني تصدير بيانات فترة محددة؟
                  </summary>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
                    نعم، يمكنك تحديد نطاق زمني معين عند التصدير (مثلاً: آخر 30 يوم، أو سنة 2024).
                  </p>
                </details>

                <details className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <summary className="font-bold text-slate-900 dark:text-white cursor-pointer">
                    ماذا يحدث للملفات المصدرة؟
                  </summary>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
                    الملفات تُحذف تلقائياً من خوادمنا بعد 7 أيام من التصدير لحماية خصوصيتك.
                  </p>
                </details>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
