import { APP_TITLE } from "@/const";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            من نحن
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            نحول التعقيد التنظيمي إلى وضوح تقني
          </p>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              قصتنا
            </h2>
            <div className="space-y-6 text-right" dir="rtl">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                في عام 2024، لاحظنا أن <strong>الشركات في المملكة العربية السعودية</strong> تواجه تحدياً متزايداً: 
                <strong>الامتثال التنظيمي</strong> أصبح أكثر تعقيداً من أي وقت مضى. مع تسارع التحول الرقمي وصدور 
                تشريعات جديدة باستمرار، أصبح من الصعب على الشركات—خاصة الناشئة والمتوسطة—مواكبة هذه التغييرات.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                كان السؤال: <strong>لماذا لا يوجد حل تقني ذكي</strong> يجعل الامتثال أسهل وأسرع وأقل تكلفة؟
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                من هنا ولدت فكرة <strong>{APP_TITLE}</strong>—منصة تقنية متقدمة تجمع بين <strong>الذكاء الاصطناعي</strong> 
                و<strong>الخبرة القانونية</strong> لتقديم حلول امتثال شاملة ومبتكرة.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                اليوم، نفخر بأننا نساعد عشرات الشركات على تحقيق الامتثال الكامل، توفير الوقت والمال، 
                وتقليل المخاطر التنظيمية—كل ذلك من خلال منصة واحدة سهلة الاستخدام.
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              رؤيتنا
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-right" dir="rtl">
              أن نكون <strong>المنصة الرائدة</strong> في الشرق الأوسط لحلول الامتثال التنظيمي الذكية، 
              حيث يصبح الامتثال <strong>ميزة تنافسية</strong> وليس عبئاً.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              مهمتنا
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-right" dir="rtl">
              تمكين الشركات من تحقيق <strong>الامتثال الكامل</strong> بسهولة وسرعة من خلال 
              <strong>تقنيات الذكاء الاصطناعي</strong> وأدوات تلقائية مبتكرة.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              قيمنا
            </h3>
            <div className="text-slate-700 dark:text-slate-300 text-right" dir="rtl">
              <ul className="space-y-2">
                <li><strong>الدقة:</strong> لا مجال للخطأ</li>
                <li><strong>الشفافية:</strong> وضوح كامل</li>
                <li><strong>الابتكار:</strong> تقنيات متقدمة</li>
                <li><strong>الثقة:</strong> شريك موثوق</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            لماذا تختارنا؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    خبرة متخصصة
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    فريقنا يضم خبراء قانونيين ومختصي امتثال وتقنيين ذوي خبرة عميقة في الأنظمة السعودية والخليجية.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    تقنية متقدمة
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    نستخدم أحدث تقنيات الذكاء الاصطناعي (LLMs) لتحليل الأنظمة وتقديم استشارات دقيقة وسريعة.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    محتوى محدّث باستمرار
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    نراقب التشريعات 24/7 ونحدّث المنصة فوراً عند صدور أي تعديل تنظيمي جديد.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    حلول شاملة
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    من الاستشارة إلى الصياغة إلى التقييم—كل ما تحتاجه للامتثال في منصة واحدة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              أرقامنا تتحدث
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-white mb-2">378</p>
                <p className="text-blue-100">ضابط تنظيمي</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">5</p>
                <p className="text-blue-100">أطر تنظيمية</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">195</p>
                <p className="text-blue-100">اختبار آلي</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">99.5%</p>
                <p className="text-blue-100">نسبة التوفر</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            جاهز لتحويل الامتثال إلى ميزة تنافسية؟
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            ابدأ رحلتك معنا اليوم
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/pricing" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              اطلع على الباقات
            </a>
            <a 
              href="/contact" 
              className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
