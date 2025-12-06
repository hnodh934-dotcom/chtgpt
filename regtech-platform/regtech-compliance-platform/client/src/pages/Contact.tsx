import { useState } from "react";
import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("تم إرسال رسالتك بنجاح!");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء الإرسال");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-12 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            شكراً لتواصلك!
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-8">
            تم استلام رسالتك بنجاح. سنتواصل معك خلال 24 ساعة.
          </p>
          <Button onClick={() => setSubmitted(false)} className="w-full">
            إرسال رسالة أخرى
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">البريد الإلكتروني</h3>
            <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {import.meta.env.VITE_CONTACT_EMAIL || 'support@regtech.sa'}
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Phone className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">الهاتف</h3>
            <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE || '+966112345678'}`} className="text-green-600 dark:text-green-400 hover:underline" dir="ltr">
              {import.meta.env.VITE_CONTACT_PHONE || '+966 11 234 5678'}
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <MapPin className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">العنوان</h3>
            <p className="text-slate-700 dark:text-slate-300">
              الرياض، المملكة العربية السعودية
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+966 5X XXX XXXX"
                  className="mt-2"
                  dir="ltr"
                />
              </div>

              <div>
                <Label htmlFor="company">اسم الشركة</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="اسم شركتك"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">الموضوع *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="ما هو موضوع رسالتك؟"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="message">الرسالة *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="اكتب رسالتك هنا..."
                required
                rows={6}
                className="mt-2"
              />
            </div>

            {submitMutation.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {submitMutation.error.message}
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="ml-2 h-5 w-5" />
                  إرسال الرسالة
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>ساعات العمل:</strong> الأحد - الخميس، 9:00 صباحاً - 5:00 مساءً (توقيت الرياض)
          </p>
        </div>
      </div>
    </div>
  );
}
