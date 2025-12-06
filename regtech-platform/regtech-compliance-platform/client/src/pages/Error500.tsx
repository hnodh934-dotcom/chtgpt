import { Button } from "@/components/ui/button";
import { ServerCrash, Home, RefreshCcw } from "lucide-react";
import { Link } from "wouter";

export default function Error500() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <ServerCrash className="w-32 h-32 text-red-600 dark:text-red-400 relative" />
          </div>
        </div>

        {/* Error Code */}
        <div>
          <h1 className="text-9xl font-bold text-red-600 dark:text-red-400 mb-4">
            500
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            خطأ في الخادم
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            عذراً، حدث خطأ غير متوقع في الخادم. فريقنا الفني تم إشعاره تلقائياً ويعمل على حل المشكلة.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={handleRefresh}
            variant="default"
            size="lg"
            className="gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            إعادة المحاولة
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        {/* Support Info */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-right" dir="rtl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            هل تحتاج مساعدة؟
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم الفني:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>البريد الإلكتروني:</strong>{" "}
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}
              </a>
            </p>
            <p>
              <strong>الهاتف:</strong>{" "}
              <a
                href={`tel:${import.meta.env.VITE_CONTACT_PHONE || '+966112345678'}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                dir="ltr"
              >
                {import.meta.env.VITE_CONTACT_PHONE || '+966 11 234 5678'}
              </a>
            </p>
            <p>
              <strong>ساعات العمل:</strong> الأحد - الخميس (9 صباحاً - 6 مساءً)
            </p>
          </div>
        </div>

        {/* Error ID (for debugging) */}
        <p className="text-xs text-slate-500 dark:text-slate-600">
          Error ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </p>
      </div>
    </div>
  );
}
