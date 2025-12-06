import { APP_TITLE } from "@/const";

export default function ProfessionalInsurance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              التأمين المهني
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Professional Insurance</p>
            <p className="text-sm text-slate-500 mt-2">آخر تحديث: 8 نوفمبر 2025</p>
          </div>

          <div className="space-y-8 text-right" dir="rtl">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. نظرة عامة</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يحمل {APP_TITLE} تأميناً مهنياً شاملاً للمسؤولية المدنية (Professional Indemnity Insurance) 
                لحماية عملائنا في حالة الأخطاء المهنية أو الإهمال.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. تفاصيل التغطية</h2>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-r-4 border-emerald-500 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">شركة التأمين</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">[اسم شركة التأمين]</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">رقم الوثيقة</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">PI-2025-XXXXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">حد التغطية</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">10,000,000 ريال سعودي</p>
                    <p className="text-sm text-slate-500">لكل حادثة</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">التغطية السنوية الإجمالية</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">20,000,000 ريال سعودي</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">فترة الوثيقة</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">1 يناير 2025 - 31 ديسمبر 2025</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. ما تغطيه الوثيقة</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>الأخطاء المهنية:</strong> الأخطاء في التحليل أو التوصيات</li>
                <li><strong>الإهمال:</strong> عدم بذل العناية المهنية المطلوبة</li>
                <li><strong>السهو:</strong> إغفال معلومات هامة</li>
                <li><strong>خرق الواجب المهني:</strong> عدم الالتزام بالمعايير المهنية</li>
                <li><strong>التكاليف القانونية:</strong> تكاليف الدفاع القانوني</li>
                <li><strong>التعويضات:</strong> التعويضات المالية للعملاء المتضررين</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. ما لا تغطيه الوثيقة</h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  <li>الأفعال المتعمدة أو الاحتيال</li>
                  <li>الأضرار الناتجة عن سوء استخدام العميل</li>
                  <li>الخسائر غير المباشرة أو التبعية (إلا ما نص عليه)</li>
                  <li>المطالبات السابقة لتاريخ الوثيقة</li>
                  <li>الغرامات والعقوبات التنظيمية</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. كيفية تقديم مطالبة</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                إذا كنت تعتقد أن لديك مطالبة مشمولة بالتأمين:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6">
                <li><strong>أخطرنا فوراً:</strong> راسلنا على <a href="mailto:claims@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">claims@regtech-platform.sa</a></li>
                <li><strong>قدم التفاصيل:</strong> وصف كامل للحادثة والأضرار</li>
                <li><strong>المستندات:</strong> أرفق جميع المستندات الداعمة</li>
                <li><strong>التعاون:</strong> تعاون معنا ومع شركة التأمين في التحقيق</li>
              </ol>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                <strong>مدة المعالجة:</strong> عادةً 30-60 يوماً من تاريخ تقديم المطالبة الكاملة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. الحدود والاستثناءات</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                يُرجى ملاحظة أن التأمين المهني لا يحل محل مسؤوليتك في:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mr-6 mt-4">
                <li>التحقق من دقة المخرجات قبل استخدامها</li>
                <li>الحصول على استشارة قانونية مستقلة</li>
                <li>الامتثال للقوانين واللوائح</li>
                <li>اتخاذ قرارات مستنيرة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. الاتصال</h2>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  <strong>للاستفسارات حول التأمين:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  📧 <a href="mailto:insurance@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">insurance@regtech-platform.sa</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  📞 +966 11 XXX XXXX
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-4">
                  <strong>للمطالبات:</strong>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  📧 <a href="mailto:claims@regtech-platform.sa" className="text-blue-600 dark:text-blue-400 hover:underline">claims@regtech-platform.sa</a>
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
