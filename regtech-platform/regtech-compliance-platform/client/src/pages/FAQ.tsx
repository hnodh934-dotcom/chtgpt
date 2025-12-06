import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    category: "عام",
    questions: [
      {
        q: "ما هي منصة RegTech؟",
        a: "منصة RegTech هي حل تقني متقدم يجمع بين الذكاء الاصطناعي والخبرة القانونية لتقديم خدمات امتثال تنظيمي شاملة. نساعد الشركات على فهم وتطبيق الأنظمة واللوائح بكفاءة وفعالية.",
      },
      {
        q: "من يمكنه الاستفادة من المنصة؟",
        a: "المنصة مصممة للشركات من جميع الأحجام في القطاعات المختلفة (مالي، صحي، تقني، حكومي). سواء كنت شركة ناشئة أو مؤسسة كبيرة، نوفر حلولاً مخصصة تناسب احتياجاتك.",
      },
      {
        q: "هل المنصة متوافقة مع الأنظمة السعودية؟",
        a: "نعم، المنصة متخصصة في الأنظمة واللوائح السعودية والخليجية. نغطي أكثر من 5 أطر تنظيمية رئيسية بما في ذلك SAMA، NCA، CITC، SFDA، وغيرها.",
      },
      {
        q: "كيف يمكنني البدء؟",
        a: "يمكنك البدء بإنشاء حساب مجاني والاستفادة من الفترة التجريبية. بعد ذلك، اختر الباقة المناسبة لاحتياجاتك وابدأ باستخدام الأدوات الذكية مباشرة.",
      },
    ],
  },
  {
    category: "الخدمات والأدوات",
    questions: [
      {
        q: "ما هو RegAdvisor؟",
        a: "RegAdvisor هو مستشار تنظيمي ذكي يعمل بالذكاء الاصطناعي. يقدم استشارات فورية حول الامتثال التنظيمي، ويساعدك على فهم متطلبات الأنظمة وتطبيقها بشكل صحيح.",
      },
      {
        q: "كيف يعمل RegDrafter؟",
        a: "RegDrafter هو أداة ذكية لصياغة السياسات والإجراءات. تدخل متطلباتك، وتحصل على مسودات احترافية متوافقة مع الأنظمة، جاهزة للمراجعة والتطبيق.",
      },
      {
        q: "ما الفرق بين RaaC وComplianceHub؟",
        a: "RaaC (Regulation as Code) يحول الأنظمة إلى قواعد تلقائية قابلة للتنفيذ، بينما ComplianceHub يقيّم مستوى امتثالك الحالي ويوفر تقارير تفصيلية مع توصيات للتحسين.",
      },
      {
        q: "هل يمكنني استخدام أكثر من أداة؟",
        a: "نعم، جميع الباقات تتيح الوصول لجميع الأدوات. الفرق بين الباقات يكون في عدد الاستعلامات الشهرية ومستوى الدعم المقدم.",
      },
    ],
  },
  {
    category: "التسعير والباقات",
    questions: [
      {
        q: "ما هي الباقات المتاحة؟",
        a: "نوفر 4 باقات: Starter (للشركات الصغيرة)، Professional (للشركات المتوسطة)، Enterprise (للمؤسسات الكبيرة)، وCustom (حلول مخصصة). كل باقة تناسب احتياجات مختلفة.",
      },
      {
        q: "هل يوجد فترة تجريبية مجانية؟",
        a: "نعم، نوفر فترة تجريبية مجانية لمدة 14 يوماً لجميع الباقات. يمكنك تجربة جميع الميزات بدون الحاجة لبطاقة ائتمان.",
      },
      {
        q: "هل يمكنني تغيير الباقة لاحقاً؟",
        a: "نعم، يمكنك الترقية أو التخفيض في أي وقت. عند الترقية، ستدفع الفرق فقط. عند التخفيض، سيتم تطبيق السعر الجديد في دورة الفوترة التالية.",
      },
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "نقبل جميع طرق الدفع: بطاقات الائتمان (Visa, Mastercard, Amex)، التحويل البنكي، Apple Pay، والفواتير للمؤسسات الكبيرة.",
      },
    ],
  },
  {
    category: "الأمان والخصوصية",
    questions: [
      {
        q: "كيف تحمون بياناتي؟",
        a: "نستخدم تشفير AES-256 لحماية البيانات، ونطبق معايير ISO 27001 وSOC 2. جميع البيانات مخزنة في مراكز بيانات آمنة في السعودية مع نسخ احتياطي يومي.",
      },
      {
        q: "هل بياناتي مشفرة؟",
        a: "نعم، جميع البيانات مشفرة أثناء النقل (TLS 1.3) وأثناء التخزين (AES-256). لا يمكن لأي شخص الوصول لبياناتك بدون صلاحيات.",
      },
      {
        q: "من يمكنه الوصول لبياناتي؟",
        a: "فقط أنت وفريقك المصرح له. نحن لا نشارك بياناتك مع أي طرف ثالث، ولا نستخدمها لأي غرض غير تقديم الخدمة لك.",
      },
      {
        q: "هل المنصة متوافقة مع نظام حماية البيانات الشخصية؟",
        a: "نعم، المنصة متوافقة 100% مع نظام حماية البيانات الشخصية السعودي (PDPL) ولائحة GDPR الأوروبية.",
      },
    ],
  },
  {
    category: "الدعم الفني",
    questions: [
      {
        q: "ما هي ساعات عمل الدعم الفني؟",
        a: "الدعم الفني متاح 24/7 للباقات Enterprise وCustom. للباقات الأخرى، الدعم متاح من الأحد إلى الخميس (9 صباحاً - 6 مساءً بتوقيت السعودية).",
      },
      {
        q: "كيف يمكنني التواصل مع الدعم؟",
        a: "يمكنك التواصل عبر: البريد الإلكتروني، الهاتف، الدردشة المباشرة في المنصة، أو نظام التذاكر. تحقق من صفحة الاتصال للتفاصيل.",
      },
      {
        q: "هل تقدمون تدريباً على المنصة؟",
        a: "نعم، نوفر تدريباً مجانياً لجميع العملاء. للباقات Enterprise، نقدم تدريباً مخصصاً في موقعكم مع شهادات معتمدة.",
      },
      {
        q: "ما هو وقت الاستجابة للدعم؟",
        a: "للقضايا الحرجة: أقل من ساعة. للقضايا العادية: 4-8 ساعات. للاستفسارات العامة: 24 ساعة.",
      },
    ],
  },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQ = FAQ_DATA.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            إجابات على أكثر الأسئلة شيوعاً حول منصة RegTech
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="ابحث عن سؤالك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 h-12 text-lg bg-white dark:bg-slate-900"
              dir="rtl"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        {filteredFAQ.length > 0 ? (
          <div className="space-y-8">
            {filteredFAQ.map((category, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-right">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem
                      key={qIdx}
                      value={`${idx}-${qIdx}`}
                      className="border border-slate-200 dark:border-slate-800 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-right hover:no-underline py-4">
                        <span className="text-lg font-semibold text-slate-900 dark:text-white">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-right pt-2 pb-4">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              لم نجد أي نتائج لبحثك. جرب كلمات مختلفة.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-blue-100 mb-6">
            فريق الدعم الفني جاهز لمساعدتك على مدار الساعة
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              تواصل معنا
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
