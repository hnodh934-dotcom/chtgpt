import { APP_TITLE, APP_LOGO } from "@/const";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء الاشتراك");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe.mutate({ email, source: "footer" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-right" dir="rtl">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4 justify-end">
              {APP_LOGO && (
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-auto" />
              )}
              <h3 className="text-xl font-bold text-white">{APP_TITLE}</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              منصة تقنية متقدمة تجمع بين الذكاء الاصطناعي والخبرة القانونية لتقديم حلول امتثال شاملة ومبتكرة.
            </p>
            <div className="flex gap-3 justify-end">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/regadvisor" className="hover:text-white transition-colors">
                  RegAdvisor - الاستشارات التنظيمية
                </Link>
              </li>
              <li>
                <Link href="/regdrafter" className="hover:text-white transition-colors">
                  RegDrafter - صياغة السياسات
                </Link>
              </li>
              <li>
                <Link href="/raac" className="hover:text-white transition-colors">
                  RaaC - القواعد التلقائية
                </Link>
              </li>
              <li>
                <Link href="/compliance-hub" className="hover:text-white transition-colors">
                  Compliance Hub - تقييم الامتثال
                </Link>
              </li>
              <li>
                <Link href="/regmonitor" className="hover:text-white transition-colors">
                  RegMonitor - مراقبة التحديثات
                </Link>
              </li>
              <li>
                <Link href="/diagnostic" className="hover:text-white transition-colors">
                  Diagnostic - التشخيص الذكي
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">الشركة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  دراسات الحالة
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  الباقات والأسعار
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  الدعم الفني
                </Link>
              </li>
              <li>
                <Link href="/content-update" className="hover:text-white transition-colors">
                  عملية التحديث
                </Link>
              </li>
              <li>
                <Link href="/backup-system" className="hover:text-white transition-colors">
                  نظام النسخ الاحتياطي
                </Link>
              </li>
              <li>
                <Link href="/data-export" className="hover:text-white transition-colors">
                  تصدير البيانات
                </Link>
              </li>
              <li>
                <Link href="/api-documentation" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">القانوني والتواصل</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/legal-disclaimers" className="hover:text-white transition-colors">
                  إخلاء المسؤولية
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/professional-insurance" className="hover:text-white transition-colors">
                  التأمين المهني
                </Link>
              </li>
              <li>
                <Link href="/master-service-agreement" className="hover:text-white transition-colors">
                  عقد الخدمة (MSA)
                </Link>
              </li>
            </ul>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}`} className="flex items-center gap-2 hover:text-white transition-colors justify-end">
                <span>{import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}</span>
                <Mail className="w-4 h-4" />
              </a>
              <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE || '+966112345678'}`} className="flex items-center gap-2 hover:text-white transition-colors justify-end">
                <span dir="ltr">{import.meta.env.VITE_CONTACT_PHONE || '+966 11 234 5678'}</span>
                <Phone className="w-4 h-4" />
              </a>
              <div className="flex items-start gap-2 justify-end">
                <span>الرياض، المملكة العربية السعودية</span>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-white font-bold text-lg mb-2">اشترك في نشرتنا البريدية</h4>
            <p className="text-sm text-slate-400 mb-4">
              احصل على آخر الأخبار والتحديثات التنظيمية مباشرة في بريدك
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Button 
                type="submit" 
                disabled={subscribe.isPending || !email}
                className="shrink-0"
              >
                {subscribe.isPending ? "جاري الاشتراك..." : "اشترك"}
              </Button>
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                dir="ltr"
              />
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} {APP_TITLE}. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            صُنع بـ ❤️ في المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
