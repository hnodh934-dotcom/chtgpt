import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Building2,
  Save,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ⚙️ صفحة الإعدادات - Settings Page
 * إدارة إعدادات الحساب والمنصة
 */
export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  // إعدادات الإشعارات
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
    complianceAlerts: true,
    deadlineReminders: true,
  });

  // إعدادات الحساب
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    position: "",
    address: "",
  });

  const handleSaveProfile = () => {
    // TODO: Save profile to backend
    console.log("Saving profile:", profile);
  };

  const handleSaveNotifications = () => {
    // TODO: Save notifications to backend
    console.log("Saving notifications:", notifications);
  };

  return (
    <div className="min-h-screen night-gradient" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {APP_LOGO && (
                <Link href="/">
                  <img src={APP_LOGO} alt={APP_TITLE} className="h-10 cursor-pointer" />
                </Link>
              )}
              <div>
                <h1 className="text-xl font-bold legal-heading">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">الإعدادات</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold legal-heading gold-glow mb-2">
            الإعدادات
          </h2>
          <p className="text-muted-foreground">
            إدارة إعدادات حسابك والمنصة
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              المظهر
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              الأمان
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  معلومات الملف الشخصي
                </CardTitle>
                <CardDescription>
                  قم بتحديث معلوماتك الشخصية ومعلومات الشركة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="example@company.com"
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+966 5XX XXX XXXX"
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">الشركة</Label>
                    <div className="relative">
                      <Building2 className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        placeholder="اسم الشركة"
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">المنصب الوظيفي</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      placeholder="مثال: مدير الامتثال"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        placeholder="المدينة، الدولة"
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  إعدادات الإشعارات
                </CardTitle>
                <CardDescription>
                  تحكم في كيفية تلقي الإشعارات والتنبيهات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">قنوات الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">إشعارات البريد الإلكتروني</p>
                        <p className="text-sm text-muted-foreground">تلقي الإشعارات عبر البريد</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">إشعارات المتصفح</p>
                        <p className="text-sm text-muted-foreground">إشعارات فورية في المتصفح</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">رسائل SMS</p>
                        <p className="text-sm text-muted-foreground">تنبيهات عاجلة عبر الرسائل النصية</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">أنواع الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">التقرير الأسبوعي</p>
                        <p className="text-sm text-muted-foreground">ملخص أسبوعي لحالة الامتثال</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">تنبيهات الامتثال</p>
                        <p className="text-sm text-muted-foreground">تنبيهات فورية عند اكتشاف مشاكل</p>
                      </div>
                      <Switch
                        checked={notifications.complianceAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, complianceAlerts: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">تذكيرات المواعيد</p>
                        <p className="text-sm text-muted-foreground">تذكير قبل المواعيد النهائية</p>
                      </div>
                      <Switch
                        checked={notifications.deadlineReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, deadlineReminders: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} className="gap-2">
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  إعدادات المظهر
                </CardTitle>
                <CardDescription>
                  خصص مظهر المنصة حسب تفضيلاتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">السمة</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === "light" ? "border-primary bg-primary/10" : "border-border"
                      }`}
                    >
                      <div className="w-full h-20 bg-white rounded-md mb-2 border"></div>
                      <p className="font-medium">فاتح</p>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === "dark" ? "border-primary bg-primary/10" : "border-border"
                      }`}
                    >
                      <div className="w-full h-20 bg-gray-900 rounded-md mb-2"></div>
                      <p className="font-medium">داكن</p>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === "system" ? "border-primary bg-primary/10" : "border-border"
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 rounded-md mb-2 border"></div>
                      <p className="font-medium">تلقائي</p>
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">اللغة</h3>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2">
                      <Globe className="w-4 h-4" />
                      العربية
                      <Badge variant="secondary">الافتراضي</Badge>
                    </Button>
                    <Button variant="ghost" className="gap-2">
                      English
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  إعدادات الأمان
                </CardTitle>
                <CardDescription>
                  إدارة كلمة المرور وخيارات الأمان
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">تغيير كلمة المرور</h3>
                  <div className="grid gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="w-fit">تحديث كلمة المرور</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">المصادقة الثنائية</h3>
                  <div className="flex items-center justify-between max-w-md">
                    <div>
                      <p className="font-medium">تفعيل المصادقة الثنائية</p>
                      <p className="text-sm text-muted-foreground">أضف طبقة حماية إضافية لحسابك</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">جلسات الدخول النشطة</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">الجلسة الحالية</p>
                        <p className="text-sm text-muted-foreground">Chrome • الرياض، السعودية</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">نشط</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
