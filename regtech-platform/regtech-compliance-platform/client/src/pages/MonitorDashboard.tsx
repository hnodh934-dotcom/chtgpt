/**
 * Monitor Dashboard - لوحة مراقبة النظام
 * 
 * عرض بسيط وواضح لإحصائيات Monitor:
 * 1. عداد التقارير اليومية
 * 2. عداد الأخطاء CRITICAL
 * 3. آخر 10 تنبيهات
 * 4. زر تحديث فوري
 */

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MonitorDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: stats, refetch: refetchStats, isLoading } = trpc.monitor.getStats.useQuery();
  const { data: health } = trpc.monitor.getHealth.useQuery();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchStats();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث البيانات");
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "destructive";
      case "ERROR":
        return "destructive";
      case "WARNING":
        return "warning";
      case "INFO":
        return "default";
      default:
        return "secondary";
    }
  };

  const getAlertLevelIcon = (level: string) => {
    switch (level) {
      case "CRITICAL":
      case "ERROR":
        return <AlertCircle className="w-4 h-4" />;
      case "WARNING":
        return <AlertCircle className="w-4 h-4" />;
      case "INFO":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">لوحة مراقبة النظام</h1>
          <p className="text-muted-foreground mt-1">
            مراقبة فورية لجميع التقارير والتنبيهات
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 ml-2 ${isRefreshing ? "animate-spin" : ""}`} />
          تحديث فوري
        </Button>
      </div>

      {/* Health Status */}
      {health && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              حالة النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {health.healthy ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                )}
                <span className="text-lg font-semibold">
                  {health.healthy ? "صحي ✅" : "يحتاج انتباه ⚠️"}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                نسبة النجاح: {health.passRate.toFixed(1)}%
              </div>
              {health.criticalAlerts > 0 && (
                <Badge variant="destructive">
                  {health.criticalAlerts} تنبيه حرج
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Daily Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              التقارير اليومية
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.dailyReports || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              آخر 24 ساعة
            </p>
          </CardContent>
        </Card>

        {/* Critical Errors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              الأخطاء الحرجة
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {stats?.criticalErrors || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              منذ آخر إعادة تعيين
            </p>
          </CardContent>
        </Card>

        {/* Total Checks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الفحوصات
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalChecks || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.passedChecks || 0} ناجح، {stats?.failedChecks || 0} فاشل
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>آخر 10 تنبيهات</CardTitle>
          <CardDescription>
            التنبيهات الأخيرة من نظام المراقبة
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.recentAlerts && stats.recentAlerts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentAlerts.map((alert: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getAlertLevelIcon(alert.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getAlertLevelColor(alert.level) as any}>
                        {alert.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString("ar-SA")}
                      </span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    {alert.context && (
                      <details className="mt-2">
                        <summary className="text-xs text-muted-foreground cursor-pointer">
                          عرض التفاصيل
                        </summary>
                        <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-x-auto">
                          {JSON.stringify(alert.context, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>لا توجد تنبيهات حتى الآن</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Last Check Time */}
      {stats?.lastCheckTime && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          آخر فحص: {new Date(stats.lastCheckTime).toLocaleString("ar-SA")}
        </div>
      )}
    </div>
  );
}
