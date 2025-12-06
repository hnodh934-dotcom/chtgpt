import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Building2, User, Mail, Phone, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    interestedPackage: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("تم إرسال طلبك بنجاح!", {
        description: "سيتواصل معك فريقنا خلال 24 ساعة",
      });
    },
    onError: (error) => {
      toast.error("حدث خطأ", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createLead.mutate({
      companyName: formData.companyName,
      contactName: formData.contactName,
      contactEmail: formData.email,
      contactPhone: formData.phone || undefined,
      position: formData.interestedPackage || undefined,
      industry: formData.industry || undefined,
      source: "website",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="py-16 text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-l from-primary via-primary to-accent bg-clip-text text-transparent">
              شكراً لتواصلك معنا!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              تم استلام طلبك بنجاح. سيتواصل معك أحد خبرائنا خلال 24 ساعة عمل.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    companyName: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    companySize: "",
                    industry: "",
                    interestedPackage: "",
                    message: "",
                  });
                }}
                variant="outline"
              >
                إرسال طلب آخر
              </Button>
              <Button onClick={() => window.location.href = "/"}>
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
              <Sparkles className="w-3 h-3 ml-1" />
              احصل على استشارة مجانية
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-l from-primary via-primary to-accent bg-clip-text text-transparent">
              ابدأ رحلة الامتثال مع {APP_TITLE}
            </h1>
            <p className="text-lg text-muted-foreground">
              املأ النموذج أدناه وسيتواصل معك أحد خبرائنا لمناقشة احتياجاتك وتقديم الحل الأمثل
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">معلومات التواصل</CardTitle>
                <CardDescription>
                  نحتاج بعض المعلومات الأساسية للتواصل معك وفهم احتياجاتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    اسم المؤسسة *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="مثال: شركة التقنية المتقدمة"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="text-right"
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    اسم المسؤول *
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="مثال: أحمد محمد"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    required
                    className="text-right"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      رقم الجوال
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Company Size & Industry */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">حجم المؤسسة</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                    >
                      <SelectTrigger id="companySize" className="text-right">
                        <SelectValue placeholder="اختر حجم المؤسسة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 موظفين</SelectItem>
                        <SelectItem value="11-50">11-50 موظف</SelectItem>
                        <SelectItem value="51-200">51-200 موظف</SelectItem>
                        <SelectItem value="201-500">201-500 موظف</SelectItem>
                        <SelectItem value="500+">أكثر من 500 موظف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">القطاع</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger id="industry" className="text-right">
                        <SelectValue placeholder="اختر القطاع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">مالي</SelectItem>
                        <SelectItem value="healthcare">صحي</SelectItem>
                        <SelectItem value="tech">تقني</SelectItem>
                        <SelectItem value="retail">تجزئة</SelectItem>
                        <SelectItem value="education">تعليمي</SelectItem>
                        <SelectItem value="government">حكومي</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interested Package */}
                <div className="space-y-2">
                  <Label htmlFor="package">الباقة المهتم بها</Label>
                  <Select
                    value={formData.interestedPackage}
                    onValueChange={(value) => setFormData({ ...formData, interestedPackage: value })}
                  >
                    <SelectTrigger id="package" className="text-right">
                      <SelectValue placeholder="اختر الباقة (اختياري)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">باقة البداية</SelectItem>
                      <SelectItem value="growth">باقة النمو</SelectItem>
                      <SelectItem value="enterprise">باقة المؤسسات</SelectItem>
                      <SelectItem value="custom">حل مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    رسالتك
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="أخبرنا عن احتياجاتك والتحديات التي تواجهها في الامتثال..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="text-right resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    disabled={createLead.isPending}
                  >
                    {createLead.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية وشروط الاستخدام
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">استشارة مجانية</h3>
                <p className="text-sm text-muted-foreground">
                  جلسة استشارية مجانية مع خبرائنا
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">رد سريع</h3>
                <p className="text-sm text-muted-foreground">
                  نتواصل معك خلال 24 ساعة عمل
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">حلول مخصصة</h3>
                <p className="text-sm text-muted-foreground">
                  نصمم الحل المناسب لاحتياجاتك
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
