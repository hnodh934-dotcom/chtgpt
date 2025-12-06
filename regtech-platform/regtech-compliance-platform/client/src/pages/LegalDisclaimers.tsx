import { APP_TITLE } from "@/const";

export default function LegalDisclaimers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
              <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              إخلاء المسؤولية القانونية
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Legal Disclaimers
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              آخر تحديث: 8 نوفمبر 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-right" dir="rtl">
            {/* مقدمة */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                مقدمة
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يُقدم {APP_TITLE} ("المنصة") خدمات استشارية تقنية في مجال الامتثال التنظيمي والقانوني. 
                استخدامك للمنصة يعني موافقتك الكاملة على إخلاء المسؤولية هذا. يُرجى قراءة هذه الوثيقة بعناية 
                قبل استخدام أي من خدماتنا.
              </p>
            </section>

            {/* 1. ليست استشارة قانونية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. ليست استشارة قانونية مباشرة
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-r-4 border-amber-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ⚠️ <strong>تحذير هام:</strong> المعلومات والتوصيات المقدمة من خلال المنصة هي لأغراض إعلامية 
                  وتقنية فقط، ولا تُشكل استشارة قانونية مباشرة. لا يُنشئ استخدام المنصة علاقة محامٍ-موكل.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mt-4 mr-6">
                <li>جميع المخرجات تُعتبر <strong>مسودات أولية</strong> تحتاج مراجعة قانونية متخصصة</li>
                <li>يجب استشارة محامٍ مرخص قبل اتخاذ أي قرارات قانونية</li>
                <li>المنصة لا تحل محل الاستشارات القانونية المهنية</li>
                <li>لا نتحمل مسؤولية القرارات المتخذة بناءً على مخرجات المنصة فقط</li>
              </ul>
            </section>

            {/* 2. دقة المعلومات */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. دقة المعلومات والتحديثات
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                نبذل قصارى جهدنا لضمان دقة وحداثة المعلومات، لكن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>التشريعات تتغير باستمرار:</strong> الأنظمة واللوائح قد تتغير دون إشعار مسبق</li>
                <li><strong>التفسيرات قد تختلف:</strong> الجهات الرقابية قد يكون لها تفسيرات مختلفة</li>
                <li><strong>الحالات الفردية تختلف:</strong> كل منظمة لها ظروفها الخاصة</li>
                <li><strong>نحدّث المحتوى دورياً:</strong> لكن قد يكون هناك تأخير بين صدور التشريع وتحديث المنصة</li>
              </ul>
            </section>

            {/* 3. الذكاء الاصطناعي */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. استخدام الذكاء الاصطناعي
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  🤖 تستخدم المنصة تقنيات الذكاء الاصطناعي (AI) لتحليل البيانات وتقديم التوصيات. 
                  مخرجات الذكاء الاصطناعي:
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mt-4 mr-6">
                <li><strong>قد تحتوي على أخطاء:</strong> الذكاء الاصطناعي ليس معصوماً من الخطأ</li>
                <li><strong>تحتاج مراجعة بشرية:</strong> يجب مراجعة جميع المخرجات من قبل خبراء</li>
                <li><strong>قد تكون عامة:</strong> لا تأخذ في الاعتبار جميع التفاصيل الدقيقة</li>
                <li><strong>تتحسن مع الوقت:</strong> نعمل باستمرار على تحسين دقة النماذج</li>
              </ul>
            </section>

            {/* 4. المسؤولية المحدودة */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. المسؤولية المحدودة
              </h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  🛡️ <strong>حد المسؤولية:</strong> لا نتحمل أي مسؤولية عن:
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mt-4 mr-6">
                <li>الخسائر المالية الناتجة عن استخدام المنصة</li>
                <li>العقوبات التنظيمية أو القانونية</li>
                <li>الأضرار غير المباشرة أو التبعية</li>
                <li>فقدان البيانات أو الأرباح</li>
                <li>الأخطاء أو السهو في المعلومات المقدمة</li>
                <li>التأخير في تحديث المعلومات</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                <strong>الحد الأقصى للمسؤولية:</strong> في حالة ثبوت المسؤولية، يقتصر تعويضنا على المبلغ 
                المدفوع فعلياً للخدمة خلال الـ 12 شهراً السابقة.
              </p>
            </section>

            {/* 5. مسؤولية المستخدم */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. مسؤولية المستخدم
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                باستخدام المنصة، أنت توافق على:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>التحقق من المعلومات:</strong> مراجعة جميع المخرجات مع خبراء متخصصين</li>
                <li><strong>الاستشارة القانونية:</strong> الحصول على استشارة قانونية مستقلة عند الحاجة</li>
                <li><strong>تحمل المسؤولية:</strong> أنت المسؤول الوحيد عن قراراتك وإجراءاتك</li>
                <li><strong>الامتثال للقوانين:</strong> الالتزام بجميع القوانين واللوائح المعمول بها</li>
                <li><strong>استخدام مسؤول:</strong> عدم الاعتماد الكلي على المنصة دون مراجعة</li>
              </ul>
            </section>

            {/* 6. التأمين المهني */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. التأمين المهني
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نحن نحمل تأميناً مهنياً للمسؤولية المدنية، لكن التغطية محدودة وفقاً لشروط وثيقة التأمين. 
                للمزيد من التفاصيل، يُرجى مراجعة صفحة <a href="/professional-insurance" className="text-blue-600 dark:text-blue-400 hover:underline">التأمين المهني</a>.
              </p>
            </section>

            {/* 7. الروابط الخارجية */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. الروابط الخارجية
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                قد تحتوي المنصة على روابط لمواقع خارجية. نحن لا نتحمل مسؤولية محتوى أو دقة هذه المواقع. 
                استخدامك لها على مسؤوليتك الخاصة.
              </p>
            </section>

            {/* 8. التغييرات */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                8. التغييرات على إخلاء المسؤولية
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                نحتفظ بالحق في تعديل إخلاء المسؤولية هذا في أي وقت. التغييرات تصبح سارية فور نشرها. 
                استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك عليها.
              </p>
            </section>

            {/* 9. القانون الحاكم */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                9. القانون الحاكم
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يخضع إخلاء المسؤولية هذا لأنظمة المملكة العربية السعودية. أي نزاع يُحل وفقاً للأنظمة السعودية 
                والاختصاص للمحاكم السعودية.
              </p>
            </section>

            {/* 10. الاتصال */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                10. الاتصال بنا
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول إخلاء المسؤولية هذا، يُرجى التواصل معنا:
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
