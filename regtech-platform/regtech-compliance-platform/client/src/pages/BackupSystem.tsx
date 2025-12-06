import { APP_TITLE } from "@/const";
import { Database, Shield, Clock, HardDrive, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BackupSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-cyan-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
              <Database className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              نظام النسخ الاحتياطي وحماية البيانات
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              كيف نحمي بياناتك ونضمن استمرارية الخدمة
            </p>
            <p className="text-sm text-slate-500 mt-2">آخر تحديث: 8 نوفمبر 2025</p>
          </div>

          <div className="space-y-10 text-right" dir="rtl">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🛡️ التزامنا بحماية بياناتك
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  في {APP_TITLE}، <strong>بياناتك هي أغلى ما نملك</strong>. لذلك، استثمرنا في بنية تحتية متقدمة 
                  للنسخ الاحتياطي والاسترجاع تضمن <strong>حماية مطلقة</strong> لجميع معلوماتك، مع القدرة على 
                  استعادة الخدمة بسرعة في حالات الطوارئ.
                </p>
              </div>
            </section>

            {/* Backup Strategy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                📊 استراتيجية النسخ الاحتياطي متعددة الطبقات
              </h2>
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الطبقة 1: النسخ الاحتياطي المستمر (Real-time)
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        <strong>التكرار:</strong> كل 5 دقائق
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>نسخ تلقائي لجميع التغييرات في قاعدة البيانات</li>
                        <li>تخزين في مركز بيانات مختلف جغرافياً</li>
                        <li>تشفير AES-256 أثناء النقل والتخزين</li>
                        <li><strong>RPO (Recovery Point Objective):</strong> 5 دقائق</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الطبقة 2: النسخ الاحتياطي اليومي (Daily Snapshots)
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        <strong>التكرار:</strong> يومياً في الساعة 2:00 صباحاً (بتوقيت السعودية)
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>نسخة كاملة (Full Backup) لجميع البيانات</li>
                        <li>الاحتفاظ بـ 30 نسخة يومية</li>
                        <li>تخزين في 3 مواقع جغرافية مختلفة</li>
                        <li>اختبار تلقائي لصحة النسخة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الطبقة 3: النسخ الاحتياطي الأسبوعي (Weekly Archives)
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        <strong>التكرار:</strong> كل يوم جمعة
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>أرشفة كاملة للنظام بأكمله</li>
                        <li>الاحتفاظ بـ 12 نسخة أسبوعية (3 أشهر)</li>
                        <li>تخزين في مواقع cold storage آمنة</li>
                        <li>مراجعة يدوية لضمان الجودة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        الطبقة 4: النسخ الاحتياطي الشهري (Monthly Long-term)
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                        <strong>التكرار:</strong> أول يوم من كل شهر
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm mr-4">
                        <li>نسخة طويلة الأمد للامتثال التنظيمي</li>
                        <li>الاحتفاظ بـ 36 نسخة شهرية (3 سنوات)</li>
                        <li>تخزين في مواقع immutable (غير قابلة للتعديل)</li>
                        <li>توثيق كامل لكل نسخة</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Infrastructure */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🏗️ البنية التحتية
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                    مواقع التخزين
                  </h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      <span><strong>الموقع الأساسي:</strong> الرياض، السعودية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      <span><strong>الموقع الثانوي:</strong> جدة، السعودية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      <span><strong>الموقع الثالث:</strong> البحرين (خارج المملكة)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      <span><strong>الأرشيف:</strong> AWS S3 Glacier (عالمي)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                    التقنيات المستخدمة
                  </h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span><strong>قاعدة البيانات:</strong> MySQL Replication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span><strong>الملفات:</strong> AWS S3 + Versioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span><strong>التشفير:</strong> AES-256 + TLS 1.3</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                      <span><strong>المراقبة:</strong> 24/7 Automated Monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Recovery */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                ⚡ خطة الاسترجاع (Disaster Recovery)
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-r-4 border-amber-500 p-6 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      أهداف الاسترجاع
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          <strong>RTO (Recovery Time Objective)</strong>
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          &lt; 1 ساعة
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          الوقت المستهدف لاستعادة الخدمة
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          <strong>RPO (Recovery Point Objective)</strong>
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          &lt; 5 دقائق
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          الحد الأقصى لفقدان البيانات
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  سيناريوهات الاسترجاع:
                </h3>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
                    1. فشل خادم واحد
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>الإجراء:</strong> التبديل التلقائي للخادم الاحتياطي (Automatic Failover)
                    <br />
                    <strong>الوقت:</strong> &lt; 30 ثانية
                    <br />
                    <strong>فقدان البيانات:</strong> صفر
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
                    2. فشل مركز بيانات كامل
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>الإجراء:</strong> التبديل لمركز البيانات الثانوي
                    <br />
                    <strong>الوقت:</strong> &lt; 15 دقيقة
                    <br />
                    <strong>فقدان البيانات:</strong> &lt; 5 دقائق
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
                    3. فقدان بيانات بسبب خطأ بشري
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>الإجراء:</strong> استرجاع من النسخة الاحتياطية اليومية
                    <br />
                    <strong>الوقت:</strong> &lt; 1 ساعة
                    <br />
                    <strong>فقدان البيانات:</strong> حسب وقت الحذف (حد أقصى 24 ساعة)
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
                    4. كارثة إقليمية (Regional Disaster)
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>الإجراء:</strong> تفعيل الموقع خارج المملكة (البحرين)
                    <br />
                    <strong>الوقت:</strong> &lt; 4 ساعات
                    <br />
                    <strong>فقدان البيانات:</strong> &lt; 5 دقائق
                  </p>
                </div>
              </div>
            </section>

            {/* Testing */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🧪 اختبار النسخ الاحتياطي
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  نجري اختبارات دورية لضمان فعالية نظام النسخ الاحتياطي:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        اختبار تلقائي يومي
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        التحقق من صحة النسخة الاحتياطية وإمكانية استرجاعها
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        اختبار استرجاع شهري
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        استرجاع كامل لقاعدة البيانات في بيئة اختبار
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        تمرين كوارث ربع سنوي
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        محاكاة كاملة لسيناريو كارثة واسترجاع الخدمة
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                📜 الامتثال التنظيمي
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 border-r-4 border-green-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  نظام النسخ الاحتياطي لدينا متوافق مع:
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>نظام حماية البيانات الشخصية</strong> (السعودية)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>ضوابط الحوسبة السحابية</strong> (البنك المركزي السعودي)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>ISO 27001</strong> (إدارة أمن المعلومات)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>SOC 2 Type II</strong> (ضوابط الأمان والتوفر)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Customer Access */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                👤 إمكانية الوصول للعملاء
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                    تصدير البيانات
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    يمكنك تصدير جميع بياناتك في أي وقت:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>✓ صيغ متعددة (JSON, CSV, PDF)</li>
                    <li>✓ تصدير فوري (خلال دقائق)</li>
                    <li>✓ بدون رسوم إضافية</li>
                  </ul>
                  <a 
                    href="/data-export" 
                    className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    تصدير بياناتي →
                  </a>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                    طلب استرجاع
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    إذا احتجت استرجاع بيانات محذوفة:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>✓ تواصل مع الدعم الفني</li>
                    <li>✓ حدد الفترة الزمنية</li>
                    <li>✓ الاسترجاع خلال 24 ساعة</li>
                  </ul>
                  <a 
                    href="/support" 
                    className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    تواصل مع الدعم →
                  </a>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  لديك أسئلة حول نظام النسخ الاحتياطي؟
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  فريقنا التقني جاهز للإجابة على استفساراتك
                </p>
                <a 
                  href="/support" 
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  تواصل مع الدعم الفني
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
