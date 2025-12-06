import { APP_TITLE } from "@/const";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              شروط الخدمة
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Terms of Service
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              آخر تحديث: 8 نوفمبر 2025 | نافذة من تاريخ النشر
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-right" dir="rtl">
            {/* مقدمة */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. القبول والموافقة
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                مرحباً بك في {APP_TITLE} ("المنصة"، "نحن"، "الخدمة"). باستخدامك للمنصة، أنت توافق على الالتزام 
                بشروط الخدمة هذه ("الشروط"). إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام المنصة.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  📌 <strong>ملاحظة هامة:</strong> هذه الشروط تُشكل عقداً ملزماً قانونياً بينك وبين {APP_TITLE}. 
                  يُرجى قراءتها بعناية.
                </p>
              </div>
            </section>

            {/* 2. التعريفات */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. التعريفات
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>"المنصة":</strong> تطبيق {APP_TITLE} الإلكتروني وجميع خدماته</li>
                <li><strong>"المستخدم" أو "أنت":</strong> أي شخص أو منظمة تستخدم المنصة</li>
                <li><strong>"الخدمات":</strong> جميع الميزات والأدوات المتاحة على المنصة</li>
                <li><strong>"المحتوى":</strong> أي نص، بيانات، أو معلومات على المنصة</li>
                <li><strong>"الحساب":</strong> حسابك الشخصي على المنصة</li>
              </ul>
            </section>

            {/* 3. الأهلية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. الأهلية والتسجيل
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                لاستخدام المنصة، يجب أن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>تكون شخصاً طبيعياً أو اعتبارياً مسجلاً نظامياً</li>
                <li>تمتلك الأهلية القانونية لإبرام العقود</li>
                <li>تقدم معلومات دقيقة وصحيحة عند التسجيل</li>
                <li>تحافظ على سرية بيانات حسابك</li>
                <li>تكون مسؤولاً عن جميع الأنشطة التي تتم من خلال حسابك</li>
              </ul>
            </section>

            {/* 4. الخدمات المقدمة */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. الخدمات المقدمة
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                توفر المنصة الخدمات التالية:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">🤖 RegAdvisor</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    مستشار تنظيمي ذكي يجيب على استفساراتك
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📝 RegDrafter</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    صياغة السياسات والإجراءات تلقائياً
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">⚖️ RaaC</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    تحويل الأنظمة إلى قواعد قابلة للتنفيذ
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📊 Compliance Hub</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    تقييم شامل للامتثال التنظيمي
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">📡 RegMonitor</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    مراقبة التحديثات التنظيمية
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">🔍 Diagnostic</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    تشخيص الفجوات التنظيمية
                  </p>
                </div>
              </div>
            </section>

            {/* 5. الرسوم والدفع */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. الرسوم والدفع
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                تخضع الخدمات لنموذج التسعير المعلن على <a href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">صفحة التسعير</a>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>الفوترة:</strong> شهرية أو سنوية حسب الباقة المختارة</li>
                <li><strong>طرق الدفع:</strong> بطاقات الائتمان، التحويل البنكي، أو الفواتير</li>
                <li><strong>التجديد التلقائي:</strong> تُجدد الاشتراكات تلقائياً ما لم تُلغى</li>
                <li><strong>الإلغاء:</strong> يمكنك إلغاء الاشتراك في أي وقت</li>
                <li><strong>الاسترداد:</strong> لا نقدم استرداداً للمبالغ المدفوعة إلا في حالات محددة</li>
                <li><strong>تغيير الأسعار:</strong> نحتفظ بالحق في تغيير الأسعار مع إشعار مسبق</li>
              </ul>
            </section>

            {/* 6. الاستخدام المقبول */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. سياسة الاستخدام المقبول
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                يُحظر عليك:
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  <li>استخدام المنصة لأغراض غير قانونية</li>
                  <li>محاولة اختراق أو تعطيل المنصة</li>
                  <li>نسخ أو توزيع المحتوى دون إذن</li>
                  <li>مشاركة حسابك مع آخرين</li>
                  <li>استخدام أدوات آلية (bots) دون إذن</li>
                  <li>تحميل محتوى ضار أو مسيء</li>
                  <li>انتحال شخصية الغير</li>
                  <li>التلاعب بالبيانات أو النتائج</li>
                </ul>
              </div>
            </section>

            {/* 7. الملكية الفكرية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. الملكية الفكرية
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>ملكيتنا:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mb-4">
                <li>جميع حقوق الملكية الفكرية للمنصة تعود لنا</li>
                <li>الشعار، العلامة التجارية، والتصميم محميون قانونياً</li>
                <li>الأكواد البرمجية والخوارزميات ملك خاص</li>
                <li>المحتوى التنظيمي مجمّع من مصادر رسمية</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>ملكيتك:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>تحتفظ بملكية البيانات التي تُدخلها</li>
                <li>المخرجات المُنتجة خصيصاً لك تعود ملكيتها لك</li>
                <li>نحتفظ بحق استخدام البيانات المجهولة لتحسين الخدمة</li>
              </ul>
            </section>

            {/* 8. الخصوصية والبيانات */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                8. الخصوصية وحماية البيانات
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نلتزم بحماية خصوصيتك وفقاً لـ <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">سياسة الخصوصية</a>. 
                باستخدام المنصة، أنت توافق على جمع واستخدام بياناتك وفقاً لهذه السياسة.
              </p>
            </section>

            {/* 9. إخلاء المسؤولية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                9. إخلاء المسؤولية والضمانات
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-r-4 border-amber-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  ⚠️ <strong>المنصة تُقدم "كما هي":</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  <li>لا نضمن دقة أو اكتمال المعلومات</li>
                  <li>لا نضمن توفر الخدمة بشكل مستمر</li>
                  <li>لا نضمن خلو المنصة من الأخطاء</li>
                  <li>لا نضمن نتائج محددة من استخدام المنصة</li>
                </ul>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                للمزيد من التفاصيل، راجع <a href="/legal-disclaimers" className="text-blue-600 dark:text-blue-400 hover:underline">إخلاء المسؤولية الكامل</a>.
              </p>
            </section>

            {/* 10. حد المسؤولية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                10. حد المسؤولية
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>الحد الأقصى للمسؤولية:</strong> في حالة ثبوت المسؤولية، يقتصر تعويضنا على:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                  المبلغ المدفوع فعلياً خلال الـ 12 شهراً السابقة
                </p>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                لا نتحمل مسؤولية الأضرار غير المباشرة، التبعية، أو العرضية.
              </p>
            </section>

            {/* 11. التعويض */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                11. التعويض
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                أنت توافق على تعويضنا وحمايتنا من أي مطالبات أو خسائر ناتجة عن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mt-4">
                <li>انتهاكك لهذه الشروط</li>
                <li>انتهاكك لحقوق الغير</li>
                <li>استخدامك غير القانوني للمنصة</li>
                <li>أي محتوى تُحمّله على المنصة</li>
              </ul>
            </section>

            {/* 12. الإنهاء */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                12. الإنهاء والتعليق
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>حقك في الإنهاء:</strong> يمكنك إنهاء حسابك في أي وقت من خلال الإعدادات.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>حقنا في الإنهاء:</strong> نحتفظ بالحق في تعليق أو إنهاء حسابك إذا:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li>انتهكت هذه الشروط</li>
                <li>لم تدفع الرسوم المستحقة</li>
                <li>استخدمت المنصة بشكل غير قانوني</li>
                <li>قدمت معلومات كاذبة</li>
              </ul>
            </section>

            {/* 13. التعديلات */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                13. التعديلات على الشروط
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنُخطرك بالتعديلات الجوهرية عبر البريد الإلكتروني 
                أو إشعار على المنصة. استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك عليها.
              </p>
            </section>

            {/* 14. القانون الحاكم */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                14. القانون الحاكم وحل النزاعات
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>القانون الحاكم:</strong> تخضع هذه الشروط لأنظمة المملكة العربية السعودية.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <strong>حل النزاعات:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>الخطوة 1:</strong> التفاوض الودي (30 يوماً)</li>
                <li><strong>الخطوة 2:</strong> الوساطة (إن أمكن)</li>
                <li><strong>الخطوة 3:</strong> التحكيم أو المحاكم السعودية</li>
              </ul>
            </section>

            {/* 15. أحكام عامة */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                15. أحكام عامة
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>العقد الكامل:</strong> هذه الشروط تُشكل العقد الكامل بيننا</li>
                <li><strong>القابلية للفصل:</strong> إذا كان أي بند غير قابل للتنفيذ، تبقى البنود الأخرى سارية</li>
                <li><strong>عدم التنازل:</strong> عدم ممارستنا لأي حق لا يعني التنازل عنه</li>
                <li><strong>الإحالة:</strong> لا يمكنك نقل حقوقك دون موافقتنا الخطية</li>
                <li><strong>الإشعارات:</strong> جميع الإشعارات تُرسل عبر البريد الإلكتروني المسجل</li>
              </ul>
            </section>

            {/* 16. الاتصال */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                16. الاتصال بنا
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                لأي استفسارات حول هذه الشروط:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300">
                  📧 البريد الإلكتروني: <a href="mailto:legal@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">legal@regtech-platform.sa</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  📞 الهاتف: +966 11 XXX XXXX
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  🏢 العنوان: الرياض، المملكة العربية السعودية
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
              <p className="text-center text-slate-700 dark:text-slate-300 mb-4">
                بالنقر على "أوافق" أو باستخدام المنصة، أنت تؤكد أنك قرأت وفهمت ووافقت على هذه الشروط.
              </p>
              <p className="text-center text-sm text-slate-500 dark:text-slate-500">
                © 2025 {APP_TITLE}. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
