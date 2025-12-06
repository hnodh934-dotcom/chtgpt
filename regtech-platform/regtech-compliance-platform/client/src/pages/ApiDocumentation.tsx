import { APP_TITLE } from "@/const";
import { Code, Key, Book, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApiDocumentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              API Documentation
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              ادمج {APP_TITLE} مع أنظمتك بسهولة
            </p>
          </div>

          <div className="space-y-10 text-right" dir="rtl">
            {/* Overview */}
            <section>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  توفر {APP_TITLE} <strong>REST API</strong> قوية وسهلة الاستخدام تمكنك من دمج جميع 
                  وظائف المنصة مع أنظمتك الداخلية، مما يسمح لك ببناء حلول مخصصة تناسب احتياجاتك.
                </p>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                مميزات API
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
                  <Zap className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    سريع
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    استجابة خلال ميلي ثانية
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
                  <Shield className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    آمن
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    OAuth 2.0 + API Keys
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
                  <Book className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    موثّق
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    OpenAPI 3.0 Spec
                  </p>
                </div>
              </div>
            </section>

            {/* Available Endpoints */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Endpoints المتاحة
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "RegAdvisor API",
                    description: "الحصول على استشارات تنظيمية فورية",
                    endpoints: ["POST /api/regadvisor/consult", "GET /api/regadvisor/history"],
                  },
                  {
                    title: "RegDrafter API",
                    description: "صياغة السياسات والوثائق تلقائياً",
                    endpoints: ["POST /api/regdrafter/draft", "GET /api/regdrafter/templates"],
                  },
                  {
                    title: "Compliance API",
                    description: "تقييم الامتثال وإدارة المشاريع",
                    endpoints: ["POST /api/compliance/assess", "GET /api/compliance/projects"],
                  },
                  {
                    title: "RaaC API",
                    description: "تحويل الأنظمة إلى قواعد تلقائية",
                    endpoints: ["POST /api/raac/convert", "GET /api/raac/rules"],
                  },
                  {
                    title: "RegMonitor API",
                    description: "مراقبة التحديثات التنظيمية",
                    endpoints: ["GET /api/monitor/alerts", "POST /api/monitor/subscribe"],
                  },
                ].map((api, idx) => (
                  <details key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                    <summary className="font-bold text-slate-900 dark:text-white cursor-pointer flex items-center gap-3">
                      <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      {api.title}
                    </summary>
                    <div className="mt-4 mr-8">
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                        {api.description}
                      </p>
                      <div className="space-y-2">
                        {api.endpoints.map((endpoint, i) => (
                          <code key={i} className="block bg-slate-900 dark:bg-slate-950 text-green-400 p-2 rounded text-xs">
                            {endpoint}
                          </code>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Authentication */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🔐 المصادقة (Authentication)
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  جميع طلبات API تتطلب مصادقة عبر <strong>API Key</strong>:
                </p>
                <code className="block bg-slate-900 dark:bg-slate-950 text-green-400 p-4 rounded text-sm overflow-x-auto">
                  curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;https://api.{APP_TITLE.toLowerCase().replace(/\s/g, '')}.com/v1/regadvisor/consult
                </code>
                <div className="mt-4 flex items-start gap-3">
                  <Key className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    احصل على API Key من <strong>لوحة التحكم → الإعدادات → API Keys</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                ⚡ حدود الاستخدام (Rate Limits)
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    100
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    طلب/دقيقة (Starter)
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    1,000
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    طلب/دقيقة (Professional)
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    غير محدود
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    (Enterprise)
                  </p>
                </div>
              </div>
            </section>

            {/* SDKs */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                📦 SDKs & Libraries
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    JavaScript / TypeScript
                  </h3>
                  <code className="block bg-slate-900 dark:bg-slate-950 text-green-400 p-3 rounded text-xs">
                    npm install @{APP_TITLE.toLowerCase().replace(/\s/g, '')}/sdk
                  </code>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    Python
                  </h3>
                  <code className="block bg-slate-900 dark:bg-slate-950 text-green-400 p-3 rounded text-xs">
                    pip install {APP_TITLE.toLowerCase().replace(/\s/g, '-')}-sdk
                  </code>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-slate-400">⏳</span>
                    Java
                  </h3>
                  <p className="text-sm text-slate-500">قريباً...</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-slate-400">⏳</span>
                    .NET
                  </h3>
                  <p className="text-sm text-slate-500">قريباً...</p>
                </div>
              </div>
            </section>

            {/* Support */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                💬 الدعم الفني
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 border-r-4 border-green-500 p-6 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  فريقنا جاهز لمساعدتك في التكامل:
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>البريد الإلكتروني:</strong> api@{APP_TITLE.toLowerCase().replace(/\s/g, '')}.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>Slack Community:</strong> انضم لمجتمع المطورين</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span><strong>GitHub:</strong> أمثلة وكود جاهز</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  جاهز للبدء؟
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  احصل على API Key وابدأ التكامل اليوم
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Key className="ml-2 h-5 w-5" />
                    احصل على API Key
                  </Button>
                  <Button size="lg" variant="outline">
                    <Book className="ml-2 h-5 w-5" />
                    اطلع على التوثيق الكامل
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
