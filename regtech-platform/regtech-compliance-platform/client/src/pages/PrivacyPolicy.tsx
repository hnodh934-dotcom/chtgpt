import { APP_TITLE } from "@/const";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-pink-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              سياسة الخصوصية
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Privacy Policy</p>
            <p className="text-sm text-slate-500 mt-2">آخر تحديث: 8 نوفمبر 2025</p>
          </div>

          <div className="space-y-8 text-right" dir="rtl">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. المقدمة</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نحن في {APP_TITLE} نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك الشخصية 
                وفقاً لنظام حماية البيانات الشخصية السعودي ولائحة الاتحاد الأوروبي العامة لحماية البيانات (GDPR).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. البيانات التي نجمعها</h2>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📋 بيانات الحساب</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 mr-4">
                    <li>الاسم والبريد الإلكتروني</li>
                    <li>رقم الهاتف (اختياري)</li>
                    <li>اسم المنظمة ومعلوماتها</li>
                    <li>الدور الوظيفي</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">💼 بيانات الاستخدام</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 mr-4">
                    <li>الصفحات المُشاهدة والميزات المستخدمة</li>
                    <li>الوقت المُستغرق على المنصة</li>
                    <li>الاستعلامات والمدخلات</li>
                    <li>التقارير والمخرجات المُنتجة</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">🖥️ بيانات تقنية</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 mr-4">
                    <li>عنوان IP والموقع الجغرافي التقريبي</li>
                    <li>نوع المتصفح والجهاز</li>
                    <li>ملفات تعريف الارتباط (Cookies)</li>
                    <li>سجلات الأخطاء والأداء</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. كيف نستخدم بياناتك</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>تقديم الخدمة:</strong> معالجة طلباتك وتوفير الميزات</li>
                <li><strong>التحسين:</strong> تطوير وتحسين المنصة</li>
                <li><strong>التخصيص:</strong> تقديم تجربة مخصصة</li>
                <li><strong>الدعم:</strong> الرد على استفساراتك ومشاكلك</li>
                <li><strong>الأمان:</strong> حماية المنصة من الإساءة</li>
                <li><strong>الامتثال:</strong> الالتزام بالمتطلبات القانونية</li>
                <li><strong>التسويق:</strong> إرسال تحديثات وعروض (بموافقتك)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. مشاركة البيانات</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  🔒 <strong>نحن لا نبيع بياناتك أبداً.</strong> نشارك البيانات فقط في الحالات التالية:
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mt-4">
                <li><strong>مقدمو الخدمات:</strong> AWS، خدمات الدفع، أدوات التحليل (بعقود حماية)</li>
                <li><strong>الامتثال القانوني:</strong> عند الطلب من جهات رسمية</li>
                <li><strong>حماية الحقوق:</strong> للدفاع عن حقوقنا القانونية</li>
                <li><strong>بموافقتك:</strong> عندما تطلب ذلك صراحةً</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. حقوقك</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">✅ الوصول</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">الحصول على نسخة من بياناتك</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">✏️ التصحيح</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">تصحيح البيانات غير الدقيقة</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">🗑️ الحذف</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">طلب حذف بياناتك</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">📦 النقل</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">نقل بياناتك لمنصة أخرى</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">🚫 الاعتراض</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">الاعتراض على معالجة معينة</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">⏸️ التقييد</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">تقييد معالجة بياناتك</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                لممارسة حقوقك، راسلنا على: <a href="mailto:privacy@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@regtech-platform.sa</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. أمان البيانات</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                نستخدم تدابير أمنية متقدمة لحماية بياناتك:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>التشفير:</strong> SSL/TLS لنقل البيانات، AES-256 للتخزين</li>
                <li><strong>المصادقة:</strong> OAuth 2.0 مع JWT tokens</li>
                <li><strong>الوصول المحدود:</strong> فقط الموظفون المصرح لهم</li>
                <li><strong>النسخ الاحتياطي:</strong> نسخ احتياطية يومية مشفرة</li>
                <li><strong>المراقبة:</strong> مراقبة أمنية على مدار الساعة</li>
                <li><strong>الاختبار:</strong> اختبارات اختراق دورية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. الاحتفاظ بالبيانات</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نحتفظ ببياناتك طالما كان حسابك نشطاً، أو حسب الحاجة لتقديم الخدمات. بعد حذف الحساب، نحذف البيانات 
                خلال 90 يوماً، إلا ما يتطلبه القانون الاحتفاظ به.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. ملفات تعريف الارتباط (Cookies)</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                نستخدم Cookies لتحسين تجربتك:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>ضرورية:</strong> للمصادقة والأمان (لا يمكن تعطيلها)</li>
                <li><strong>وظيفية:</strong> لحفظ تفضيلاتك</li>
                <li><strong>تحليلية:</strong> لفهم كيفية استخدام المنصة (يمكن تعطيلها)</li>
                <li><strong>تسويقية:</strong> للإعلانات المخصصة (بموافقتك)</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                يمكنك إدارة Cookies من إعدادات المتصفح.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. خصوصية الأطفال</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                المنصة غير موجهة للأطفال دون 18 عاماً. لا نجمع بيانات الأطفال عمداً. إذا علمنا بذلك، نحذفها فوراً.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. التغييرات</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                قد نُحدّث هذه السياسة. سنُخطرك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11. الاتصال</h2>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  <strong>مسؤول حماية البيانات:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  📧 <a href="mailto:privacy@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@regtech-platform.sa</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  📞 +966 11 XXX XXXX
                </p>
              </div>
            </section>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
              <p className="text-center text-sm text-slate-500">
                © 2025 {APP_TITLE}. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
