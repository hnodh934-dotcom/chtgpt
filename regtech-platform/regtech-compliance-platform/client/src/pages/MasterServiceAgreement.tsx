import { APP_TITLE } from "@/const";

export default function MasterServiceAgreement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              عقد الخدمة الرئيسي
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Master Service Agreement (MSA)</p>
            <p className="text-sm text-slate-500 mt-2">آخر تحديث: 8 نوفمبر 2025</p>
          </div>

          <div className="space-y-8 text-right" dir="rtl">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                📋 <strong>ملاحظة:</strong> هذا العقد الرئيسي يحكم جميع الخدمات المقدمة من {APP_TITLE}. 
                بتوقيعك أو استخدامك للمنصة، أنت توافق على جميع البنود الواردة أدناه.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. الأطراف</h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">الطرف الأول (مقدم الخدمة)</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{APP_TITLE}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">سجل تجاري: XXXXXXXXX</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">العنوان: الرياض، المملكة العربية السعودية</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">الطرف الثاني (العميل)</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">[اسم العميل]</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">يُحدد عند التسجيل</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. نطاق الخدمات</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                يوفر مقدم الخدمة للعميل الوصول إلى المنصة التقنية التالية:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">🤖 RegAdvisor</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">مستشار تنظيمي ذكي</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📝 RegDrafter</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">صياغة السياسات تلقائياً</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">⚖️ RaaC</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">تحويل الأنظمة لقواعد</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📊 Compliance Hub</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">تقييم الامتثال الشامل</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. مدة العقد</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>تاريخ البدء:</strong> تاريخ تفعيل الحساب</li>
                <li><strong>المدة الأولية:</strong> 12 شهراً (أو حسب الباقة المختارة)</li>
                <li><strong>التجديد:</strong> تلقائي ما لم يُلغى قبل 30 يوماً من الانتهاء</li>
                <li><strong>الإلغاء:</strong> يمكن للعميل الإلغاء في أي وقت مع إشعار 30 يوماً</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. الرسوم والدفع</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>نموذج التسعير:</strong> حسب <a href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">صفحة التسعير</a>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>طريقة الفوترة:</strong> شهرية أو سنوية مقدماً</li>
                <li><strong>طرق الدفع:</strong> بطاقات ائتمان، تحويل بنكي، فواتير</li>
                <li><strong>تأخر الدفع:</strong> تعليق الخدمة بعد 15 يوماً من تاريخ الاستحقاق</li>
                <li><strong>الضريبة:</strong> تُضاف ضريبة القيمة المضافة (15%) حسب القانون</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. التزامات مقدم الخدمة</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>توفير المنصة بنسبة توفر 99.5% (باستثناء الصيانة المجدولة)</li>
                <li>تحديث المحتوى التنظيمي بشكل دوري</li>
                <li>حماية بيانات العميل وفقاً لسياسة الخصوصية</li>
                <li>تقديم الدعم الفني خلال ساعات العمل</li>
                <li>إخطار العميل بأي تغييرات جوهرية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. التزامات العميل</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>دفع الرسوم في المواعيد المحددة</li>
                <li>استخدام المنصة بشكل قانوني ومسؤول</li>
                <li>الحفاظ على سرية بيانات الحساب</li>
                <li>عدم مشاركة الحساب مع الغير</li>
                <li>مراجعة المخرجات مع خبراء متخصصين</li>
                <li>الامتثال لشروط الاستخدام</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. الملكية الفكرية</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>ملكية مقدم الخدمة:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mb-4">
                <li>جميع حقوق الملكية الفكرية للمنصة</li>
                <li>الأكواد البرمجية والخوارزميات</li>
                <li>العلامة التجارية والشعار</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>ملكية العميل:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>البيانات المُدخلة من قبل العميل</li>
                <li>المخرجات المُنتجة خصيصاً للعميل</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. السرية</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يلتزم الطرفان بالحفاظ على سرية جميع المعلومات السرية المتبادلة، ما لم يُطلب الإفصاح عنها قانونياً 
                أو بموافقة الطرف الآخر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. إخلاء المسؤولية</h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-r-4 border-amber-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  ⚠️ <strong>المنصة تُقدم "كما هي":</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  <li>لا نضمن دقة أو اكتمال المعلومات</li>
                  <li>لا نضمن نتائج محددة</li>
                  <li>المخرجات تحتاج مراجعة قانونية</li>
                  <li>لا تُشكل استشارة قانونية مباشرة</li>
                </ul>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                للتفاصيل الكاملة، راجع <a href="/legal-disclaimers" className="text-blue-600 dark:text-blue-400 hover:underline">إخلاء المسؤولية</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. حد المسؤولية</h2>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>الحد الأقصى لمسؤولية مقدم الخدمة:</strong>
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                  المبالغ المدفوعة فعلياً خلال الـ 12 شهراً السابقة
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center mt-2">
                  أو حد التأمين المهني، أيهما أعلى
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11. الإنهاء</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>إنهاء العميل:</strong> يمكن الإلغاء في أي وقت مع إشعار 30 يوماً.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>إنهاء مقدم الخدمة:</strong> يمكن الإنهاء في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>عدم دفع الرسوم لمدة 30 يوماً</li>
                <li>انتهاك شروط الاستخدام</li>
                <li>استخدام غير قانوني للمنصة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12. القانون الحاكم</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يخضع هذا العقد لأنظمة المملكة العربية السعودية. أي نزاع يُحل وفقاً للإجراءات التالية:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mt-4">
                <li><strong>التفاوض الودي</strong> (30 يوماً)</li>
                <li><strong>الوساطة</strong> (إن أمكن)</li>
                <li><strong>التحكيم أو المحاكم السعودية</strong></li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">13. أحكام عامة</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>العقد الكامل:</strong> هذا العقد يُشكل الاتفاق الكامل بين الطرفين</li>
                <li><strong>التعديلات:</strong> أي تعديل يجب أن يكون خطياً وموقعاً من الطرفين</li>
                <li><strong>القابلية للفصل:</strong> إذا كان أي بند غير قابل للتنفيذ، تبقى البنود الأخرى سارية</li>
                <li><strong>عدم التنازل:</strong> لا يمكن نقل الحقوق دون موافقة الطرف الآخر</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">14. التوقيع</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <p className="font-bold text-slate-900 dark:text-white mb-4">الطرف الأول (مقدم الخدمة)</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">الاسم: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">الصفة: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">التوقيع: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300">التاريخ: _________________</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <p className="font-bold text-slate-900 dark:text-white mb-4">الطرف الثاني (العميل)</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">الاسم: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">الصفة: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">التوقيع: _________________</p>
                  <p className="text-slate-700 dark:text-slate-300">التاريخ: _________________</p>
                </div>
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
