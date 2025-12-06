import { APP_TITLE } from "@/const";
import { RefreshCw, Users, FileCheck, Bell, Calendar, Shield } from "lucide-react";

export default function ContentUpdate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-pink-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <RefreshCw className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              عملية تحديث المحتوى التنظيمي
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              كيف نضمن دقة وحداثة المحتوى التنظيمي على مدار الساعة
            </p>
            <p className="text-sm text-slate-500 mt-2">آخر تحديث: 8 نوفمبر 2025</p>
          </div>

          <div className="space-y-10 text-right" dir="rtl">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                📋 نظرة عامة
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  في {APP_TITLE}، ندرك أن <strong>دقة المحتوى التنظيمي</strong> هي أساس نجاح منصتنا. 
                  لذلك، طورنا عملية تحديث شاملة تجمع بين <strong>المراقبة الآلية</strong> و<strong>المراجعة البشرية المتخصصة</strong> 
                  لضمان أن جميع المعلومات محدثة ودقيقة ومتوافقة مع أحدث التشريعات.
                </p>
              </div>
            </section>

            {/* Update Cycle */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🔄 دورة التحديث
              </h2>
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        المراقبة المستمرة (24/7)
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        نظامنا الآلي يراقب باستمرار:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>المواقع الرسمية للجهات التنظيمية (البنك المركزي، هيئة السوق المالية، إلخ)</li>
                        <li>الجريدة الرسمية (أم القرى)</li>
                        <li>منصات النشر الحكومية</li>
                        <li>مصادر إخبارية موثوقة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الكشف الآلي عن التغييرات
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        عند اكتشاف تحديث تنظيمي جديد:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>يتم إنشاء تنبيه فوري لفريق المحتوى</li>
                        <li>يُصنف التحديث حسب الأهمية (حرج، عالي، متوسط، منخفض)</li>
                        <li>يُحدد النطاق المتأثر (أطر، ضوابط، مواد)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        المراجعة المتخصصة
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        فريقنا من الخبراء القانونيين والتقنيين:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>يراجع التحديث بدقة</li>
                        <li>يحلل التأثير على الأطر الموجودة</li>
                        <li>يُحدّث الضوابط والمواد ذات الصلة</li>
                        <li>يُعدّل محركات الذكاء الاصطناعي (RegAdvisor, RegDrafter, RaaC)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الاختبار والتحقق
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        قبل النشر:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>اختبار شامل للتأكد من عدم وجود تعارضات</li>
                        <li>مراجعة جودة (QA) من فريق مستقل</li>
                        <li>التحقق من دقة الروابط والمراجع</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        النشر وإشعار العملاء
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        بعد الموافقة:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>نشر التحديث فوراً على المنصة</li>
                        <li>إرسال إشعارات للعملاء المتأثرين</li>
                        <li>تحديث سجل التغييرات (Changelog)</li>
                        <li>إضافة ملاحظات توضيحية إن لزم الأمر</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Update Frequency */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                📅 معدلات التحديث
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      تحديثات حرجة
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>خلال 2-4 ساعات</strong> من الإعلان الرسمي
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    (تشريعات جديدة، تعديلات جوهرية، مواعيد نهائية)
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      تحديثات عالية الأهمية
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>خلال 24-48 ساعة</strong>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    (توضيحات، تعديلات ثانوية، إرشادات جديدة)
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      تحديثات دورية
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>أسبوعياً</strong>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    (تحسينات، إضافات، تصحيحات صغيرة)
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      مراجعة شاملة
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>ربع سنوياً</strong>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    (تدقيق كامل لجميع الأطر والضوابط)
                  </p>
                </div>
              </div>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                👥 فريق تحديث المحتوى
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      خبراء قانونيون
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      محامون متخصصون في التنظيم والامتثال
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                      <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      مختصو امتثال
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      خبراء في الأطر التنظيمية المحلية والدولية
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                      <FileCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      محررون تقنيون
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      متخصصون في صياغة المحتوى التقني
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quality Assurance */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                ✅ ضمان الجودة
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      مراجعة مزدوجة
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      كل تحديث يمر بمراجعتين مستقلتين على الأقل
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      التحقق من المصادر
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      جميع المعلومات مرتبطة بمصادرها الرسمية
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      سجل التغييرات
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      توثيق كامل لجميع التحديثات مع التواريخ والأسباب
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      اختبار آلي
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      195+ اختبار آلي يضمن عدم وجود أخطاء تقنية
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Transparency */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🔍 الشفافية
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  نؤمن بالشفافية الكاملة مع عملائنا:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-4">
                  <li>جميع التحديثات موثقة في <strong>سجل التغييرات</strong> العام</li>
                  <li>إشعارات فورية للتحديثات الحرجة</li>
                  <li>ملخصات شهرية للتحديثات التنظيمية</li>
                  <li>إمكانية الاطلاع على تاريخ التعديلات لكل ضابط</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  لديك أسئلة حول عملية التحديث؟
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  فريقنا جاهز للإجابة على استفساراتك
                </p>
                <a 
                  href="/support" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  تواصل معنا
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
