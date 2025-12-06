import { APP_TITLE } from "@/const";
import { Building2, TrendingUp, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      company: "بنك المستقبل الرقمي",
      industry: "الخدمات المالية",
      size: "500+ موظف",
      challenge: "كان البنك يواجه صعوبة في مواكبة التحديثات المستمرة لضوابط البنك المركزي السعودي، مما أدى إلى تأخيرات في الامتثال وزيادة المخاطر التنظيمية.",
      solution: "استخدم البنك RegAdvisor للحصول على استشارات فورية، وRegDrafter لصياغة السياسات تلقائياً، وCompliance Hub لتقييم الامتثال الشامل.",
      results: [
        { metric: "تقليل الوقت", value: "70%", description: "في مراجعة السياسات" },
        { metric: "زيادة الدقة", value: "95%", description: "في تحديد الفجوات" },
        { metric: "توفير التكاليف", value: "2.5M ريال", description: "سنوياً" },
        { metric: "تسريع الامتثال", value: "3 أشهر", description: "بدلاً من 12 شهراً" },
      ],
      quote: "منصة {APP_TITLE} غيّرت طريقة عملنا بالكامل. أصبح الامتثال أسهل وأسرع وأقل تكلفة.",
      author: "أحمد الشمري",
      position: "مدير الامتثال",
      color: "blue",
    },
    {
      id: 2,
      company: "شركة التقنية المتقدمة",
      industry: "تقنية المعلومات",
      size: "150 موظف",
      challenge: "كشركة ناشئة سريعة النمو، كانت الشركة تفتقر إلى الخبرة الداخلية في الامتثال التنظيمي، مما أثر على قدرتها على الفوز بعقود حكومية.",
      solution: "اعتمدت الشركة على RaaC لتحويل الأنظمة إلى قواعد قابلة للتنفيذ، وRegMonitor لمراقبة التحديثات التنظيمية، وDiagnostic لتشخيص الفجوات.",
      results: [
        { metric: "الحصول على شهادات", value: "ISO 27001", description: "في 6 أشهر" },
        { metric: "زيادة العقود", value: "40%", description: "مع الجهات الحكومية" },
        { metric: "تقليل الأخطاء", value: "85%", description: "في التقييمات" },
        { metric: "توفير الوقت", value: "60%", description: "في إعداد التقارير" },
      ],
      quote: "بفضل {APP_TITLE}، تمكنّا من تحقيق الامتثال الكامل وفتح أبواب جديدة للنمو.",
      author: "سارة العتيبي",
      position: "الرئيس التنفيذي",
      color: "green",
    },
    {
      id: 3,
      company: "مجموعة الرعاية الصحية الشاملة",
      industry: "الرعاية الصحية",
      size: "1000+ موظف",
      challenge: "مع تعدد الأطر التنظيمية (وزارة الصحة، هيئة البيانات، الأمن السيبراني)، كانت المجموعة تعاني من تعقيد إدارة الامتثال عبر 15 منشأة.",
      solution: "استخدمت المجموعة Compliance Hub لتقييم جميع المنشآت، وRegAdvisor للاستشارات المتخصصة، وRegDrafter لتوحيد السياسات.",
      results: [
        { metric: "توحيد السياسات", value: "100%", description: "عبر 15 منشأة" },
        { metric: "تقليل المخالفات", value: "90%", description: "في التفتيش" },
        { metric: "تسريع التدقيق", value: "5 أيام", description: "بدلاً من 30 يوماً" },
        { metric: "رضا المدققين", value: "98%", description: "عن جودة الوثائق" },
      ],
      quote: "المنصة وفرت لنا رؤية موحدة للامتثال عبر جميع منشآتنا، مما سهّل الإدارة والتدقيق.",
      author: "د. خالد الدوسري",
      position: "مدير الجودة والامتثال",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            دراسات الحالة
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            قصص نجاح حقيقية من عملائنا الذين حولوا الامتثال إلى ميزة تنافسية
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r from-${study.color}-600 to-${study.color}-700 p-8 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="text-right" dir="rtl">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-6 h-6" />
                      <h2 className="text-3xl font-bold">{study.company}</h2>
                    </div>
                    <div className="flex gap-4 text-sm opacity-90">
                      <span>📊 {study.industry}</span>
                      <span>👥 {study.size}</span>
                    </div>
                  </div>
                  <div className="text-6xl font-bold opacity-20">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 space-y-8 text-right" dir="rtl">
                {/* Challenge */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-red-600 dark:text-red-400">⚠️</span>
                    التحدي
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {study.challenge}
                  </p>
                </section>

                {/* Solution */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">💡</span>
                    الحل
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {study.solution}
                  </p>
                </section>

                {/* Results */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">📈</span>
                    النتائج
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center">
                        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {result.value}
                        </p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {result.metric}
                        </p>
                        <p className="text-xs text-slate-500">
                          {result.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Quote */}
                <section className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
                    "{study.quote.replace('{APP_TITLE}', APP_TITLE)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">
                        {study.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {study.author}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {study.position} - {study.company}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              هل أنت جاهز لتكون قصة النجاح القادمة؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى عشرات الشركات التي حولت الامتثال إلى ميزة تنافسية
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                asChild
              >
                <a href="/pricing">
                  ابدأ الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/contact">
                  تواصل معنا
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            تأثيرنا الإجمالي
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                65%
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                متوسط تقليل الوقت
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                90%
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                متوسط تقليل الأخطاء
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                4 أشهر
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                متوسط تسريع الامتثال
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
              <Building2 className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                50+
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                شركة راضية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
