import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Shield,
  Bell,
  BellOff,
  Clock,
  TrendingUp,
  Activity,
  Zap,
  Settings,
  Eye,
  EyeOff,
  Download
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * 🔔 RegMonitor - نظام المراقبة الذكي
 * 
 * نظام متقدم لمراقبة التحديثات التنظيمية:
 * - Advisory Monitor Engine
 * - Real-time Alerts
 * - Override Mode للمالك
 * - Notification System
 * - Statistics & Analytics
 */
export default function RegMonitor() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [overrideMode, setOverrideMode] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<number | null>(null);

  // Fetch data
  const { data: stats, refetch: refetchStats, isLoading } = trpc.monitor.getStats.useQuery();
  const { data: health } = trpc.monitor.getHealth.useQuery();
  const { data: frameworks } = trpc.frameworks.list.useQuery();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchStats();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث البيانات");
    }, 500);
  };

  // Mock data for charts
  const alertsTrend = [
    { day: 'السبت', critical: 2, warning: 5, info: 8 },
    { day: 'الأحد', critical: 1, warning: 3, info: 6 },
    { day: 'الاثنين', critical: 3, warning: 7, info: 10 },
    { day: 'الثلاثاء', critical: 0, warning: 4, info: 7 },
    { day: 'الأربعاء', critical: 1, warning: 2, info: 5 },
    { day: 'الخميس', critical: 2, warning: 6, info: 9 },
    { day: 'الجمعة', critical: 0, warning: 3, info: 4 },
  ];

  const frameworkActivity = frameworks?.map((fw: any) => ({
    name: fw.code,
    alerts: Math.floor(Math.random() * 20) + 5,
  })) || [];

  // Mock alerts data
  const recentAlerts = [
    {
      id: 1,
      level: 'CRITICAL',
      title: 'تحديث حرج في نظام حماية البيانات الشخصية',
      description: 'تم إصدار تعديل جديد على المادة 15 من نظام PDPL',
      framework: 'PDPL',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: 2,
      level: 'WARNING',
      title: 'تحديث في الضوابط الأمنية',
      description: 'تم تحديث متطلبات التشفير في ECC',
      framework: 'ECC',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: 3,
      level: 'INFO',
      title: 'إصدار دليل استرشادي جديد',
      description: 'دليل تطبيق ضوابط الأمن السيبراني',
      framework: 'ECC',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 4,
      level: 'WARNING',
      title: 'موعد نهائي للامتثال',
      description: 'آخر موعد لتطبيق الضوابط الجديدة: 30 يونيو 2024',
      framework: 'PDPL',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      read: true,
    },
  ];

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'WARNING': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'INFO': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'WARNING': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'INFO': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `منذ ${days} يوم`;
    if (hours > 0) return `منذ ${hours} ساعة`;
    return 'الآن';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen night-gradient flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen night-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                🔔 RegMonitor - نظام المراقبة الذكي
              </h1>
              <p className="text-muted-foreground">
                مراقبة مباشرة للتحديثات التنظيمية والتنبيهات الحرجة
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
              <Button variant="default" size="sm">
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </div>

        {/* System Health */}
        {health && (
          <Card className="glass-card border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                حالة النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${health?.healthy ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    <span className="font-semibold">
                      {health?.healthy ? 'النظام يعمل بشكل طبيعي' : 'يوجد مشاكل'}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    آخر فحص: {health?.lastCheckTime ? new Date(health.lastCheckTime).toLocaleTimeString('ar-SA') : 'غير متاح'}
                  </Badge>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">
                    إجمالي الفحوصات: <span className="text-foreground font-medium">{health?.totalChecks || 0}</span>
                  </span>
                  <span className="text-muted-foreground">
                    التنبيهات الحرجة: <span className="text-red-500 font-medium">{health?.criticalAlerts || 0}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-red-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                تنبيهات حرجة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500 mb-2">
                {recentAlerts.filter(a => a.level === 'CRITICAL').length}
              </div>
              <p className="text-sm text-muted-foreground">تحتاج إجراء فوري</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-orange-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                تحذيرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {recentAlerts.filter(a => a.level === 'WARNING').length}
              </div>
              <p className="text-sm text-muted-foreground">تحتاج متابعة</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                معلومات عامة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {recentAlerts.filter(a => a.level === 'INFO').length}
              </div>
              <p className="text-sm text-muted-foreground">للاطلاع</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                إجمالي التنبيهات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {recentAlerts.length}
              </div>
              <p className="text-sm text-muted-foreground">خلال آخر 7 أيام</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  التنبيهات الأخيرة
                </CardTitle>
                <CardDescription>
                  جميع التحديثات والتنبيهات التنظيمية المهمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${getAlertLevelColor(alert.level)} ${
                        !alert.read ? 'ring-2 ring-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {getAlertIcon(alert.level)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{alert.title}</h4>
                            {!alert.read && (
                              <Badge variant="secondary" className="text-xs">
                                جديد
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              {alert.framework}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimestamp(alert.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alerts Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    اتجاه التنبيهات
                  </CardTitle>
                  <CardDescription>
                    توزيع التنبيهات خلال الأسبوع الماضي
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={alertsTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="day" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="warning" stroke="#f97316" strokeWidth={2} />
                      <Line type="monotone" dataKey="info" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Framework Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    نشاط الأطر التنظيمية
                  </CardTitle>
                  <CardDescription>
                    عدد التنبيهات لكل إطار تنظيمي
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={frameworkActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="alerts" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  إعدادات المراقبة
                </CardTitle>
                <CardDescription>
                  تخصيص نظام المراقبة والتنبيهات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Override Mode */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    {overrideMode ? (
                      <Eye className="w-5 h-5 text-primary" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <h4 className="font-semibold">Override Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        تجاوز الفلاتر وعرض جميع التنبيهات (للمالك فقط)
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={overrideMode}
                    onCheckedChange={setOverrideMode}
                  />
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold">إعدادات التنبيهات</h4>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <div>
                        <h5 className="font-medium">التنبيهات الحرجة</h5>
                        <p className="text-sm text-muted-foreground">
                          إشعارات فورية للتحديثات الحرجة
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-orange-500" />
                      <div>
                        <h5 className="font-medium">التحذيرات</h5>
                        <p className="text-sm text-muted-foreground">
                          إشعارات للتحديثات المهمة
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <BellOff className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h5 className="font-medium">المعلومات العامة</h5>
                        <p className="text-sm text-muted-foreground">
                          إشعارات للتحديثات الإعلامية
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                {/* Framework Filters */}
                <div className="space-y-4">
                  <h4 className="font-semibold">فلترة الأطر التنظيمية</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {frameworks?.map((fw: any) => (
                      <div
                        key={fw.id}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border/50"
                      >
                        <Switch defaultChecked />
                        <Label className="cursor-pointer">{fw.code}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
