import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "د. أحمد العتيبي",
    role: "مدير الامتثال",
    company: "البنك السعودي للاستثمار",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    rating: 5,
    text: "منصة RegTech غيرت طريقة عملنا بالكامل. وفرنا 60% من الوقت المستغرق في مراجعة الامتثال، والنتائج أكثر دقة من أي وقت مضى.",
  },
  {
    name: "سارة المطيري",
    role: "رئيسة قسم الجودة",
    company: "شركة الدواء السعودية",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    text: "RegDrafter ساعدنا في صياغة سياسات متوافقة مع SFDA في أيام بدلاً من شهور. الدقة والاحترافية لا مثيل لها.",
  },
  {
    name: "خالد الشمري",
    role: "مدير تقنية المعلومات",
    company: "شركة الاتصالات المتقدمة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    rating: 5,
    text: "RaaC حول الأنظمة المعقدة إلى قواعد تلقائية. الآن نكتشف مشاكل الامتثال قبل حدوثها، وهذا أنقذنا من غرامات كبيرة.",
  },
  {
    name: "نورة القحطاني",
    role: "مديرة الشؤون القانونية",
    company: "مجموعة الطاقة السعودية",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    rating: 5,
    text: "الدعم الفني استثنائي. الفريق متعاون جداً ويفهم احتياجاتنا. المنصة أصبحت جزءاً أساسياً من عملياتنا اليومية.",
  },
  {
    name: "محمد الدوسري",
    role: "رئيس قسم المخاطر",
    company: "شركة التأمين الوطنية",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    text: "ComplianceHub يوفر رؤية شاملة لمستوى امتثالنا. التقارير التفصيلية والتوصيات العملية ساعدتنا على تحسين نسبة الامتثال من 75% إلى 95%.",
  },
  {
    name: "ليلى الغامدي",
    role: "مديرة الحوكمة",
    company: "مجموعة الرعاية الصحية",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    rating: 5,
    text: "RegMonitor يتابع التحديثات التنظيمية لحظياً. لم نعد نقلق من تفويت أي تغيير مهم. الإشعارات الذكية دقيقة ومفيدة جداً.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            انضم إلى أكثر من 500 شركة سعودية تثق في منصتنا لإدارة الامتثال التنظيمي
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 opacity-10">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-right relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-slate-200 dark:border-slate-800 pt-6 relative z-10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-right flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              500+
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              شركة تثق بنا
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              95%
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              نسبة رضا العملاء
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              60%
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              توفير في الوقت
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              24/7
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              دعم فني
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
