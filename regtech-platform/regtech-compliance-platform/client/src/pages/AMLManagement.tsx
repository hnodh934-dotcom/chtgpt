import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * 🏦 AML/CTF Management Page
 * صفحة إدارة مكافحة غسل الأموال وتمويل الإرهاب
 */

export default function AMLManagement() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // جلب الإحصائيات
  const { data: stats, isLoading: statsLoading } = trpc.aml.getAMLStatistics.useQuery();

  // جلب المعاملات المشبوهة
  const { data: transactions, isLoading: transLoading } = trpc.aml.getSuspiciousTransactions.useQuery({
    page: 1,
    limit: 10,
  });

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مكافحة غسل الأموال (AML/CTF)</h1>
          <p className="text-gray-600 mt-2">إدارة فحوصات KYC والمراقبة والتقارير</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          إنشاء تقرير جديد
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">إجمالي العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCustomers || 0}</div>
            <p className="text-xs text-gray-500 mt-1">عملاء مسجلين</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats?.customersUnderReview || 0}</div>
            <p className="text-xs text-gray-500 mt-1">عملاء</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">معاملات مشبوهة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.suspiciousTransactions || 0}</div>
            <p className="text-xs text-gray-500 mt-1">معاملة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">مُبلغ عنها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.reportedToAuthorities || 0}</div>
            <p className="text-xs text-gray-500 mt-1">للسلطات</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="suspicious">معاملات مشبوهة</TabsTrigger>
          <TabsTrigger value="kyc">فحوصات KYC</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              آخر تحديث: {stats?.lastUpdateDate ? new Date(stats.lastUpdateDate).toLocaleString("ar-SA") : "لم يتم التحديث"}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>فحص KYC مكتمل</span>
                    </div>
                    <span className="text-sm text-gray-500">منذ ساعة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span>معاملة مشبوهة مكتشفة</span>
                    </div>
                    <span className="text-sm text-gray-500">منذ ساعتين</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span>تقرير قيد الإعداد</span>
                    </div>
                    <span className="text-sm text-gray-500">منذ 3 ساعات</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الالتزامات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>تقرير AML الشهري</span>
                    <Badge className="bg-orange-100 text-orange-800">خلال 5 أيام</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>مراجعة ملفات المخاطر</span>
                    <Badge className="bg-yellow-100 text-yellow-800">خلال 15 يوم</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>تقرير CMA ربع سنوي</span>
                    <Badge className="bg-green-100 text-green-800">خلال 30 يوم</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Suspicious Transactions Tab */}
        <TabsContent value="suspicious" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المعاملات المشبوهة</CardTitle>
              <CardDescription>قائمة المعاملات التي تتطلب مراجعة</CardDescription>
            </CardHeader>
            <CardContent>
              {transLoading ? (
                <div className="text-center py-8">جاري التحميل...</div>
              ) : transactions?.transactions && transactions.transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-right py-2">المعرف</th>
                        <th className="text-right py-2">المبلغ</th>
                        <th className="text-right py-2">السبب</th>
                        <th className="text-right py-2">الحالة</th>
                        <th className="text-right py-2">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.transactions.map((trans: any) => (
                        <tr key={trans.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{trans.id}</td>
                          <td className="py-2">{trans.amount} {trans.currency}</td>
                          <td className="py-2">{trans.reason}</td>
                          <td className="py-2">
                            <Badge className={getRiskBadgeColor(trans.status)}>
                              {trans.status}
                            </Badge>
                          </td>
                          <td className="py-2">
                            <Button variant="outline" size="sm">
                              مراجعة
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  لا توجد معاملات مشبوهة
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Checks Tab */}
        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>فحوصات KYC</CardTitle>
              <CardDescription>إدارة فحوصات اعرف عميلك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">فحص KYC الأولي</h4>
                    <p className="text-sm text-gray-600">التحقق من الهوية والعنوان</p>
                  </div>
                  <Button>إجراء فحص</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">مراجعة دورية</h4>
                    <p className="text-sm text-gray-600">مراجعة سنوية لملفات العملاء</p>
                  </div>
                  <Button>جدولة مراجعة</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">فحص قوائم العقوبات</h4>
                    <p className="text-sm text-gray-600">التحقق من قوائم العقوبات الدولية</p>
                  </div>
                  <Button>فحص الآن</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>التقارير التنظيمية</CardTitle>
              <CardDescription>إدارة التقارير المرسلة للسلطات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">تقرير SAMA الشهري</h4>
                    <p className="text-sm text-gray-600">تقرير مكافحة غسل الأموال</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-100 text-green-800">مُرسل</Badge>
                    <Button variant="outline" size="sm">عرض</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">تقرير CMA ربع سنوي</h4>
                    <p className="text-sm text-gray-600">تقرير حماية المستثمر</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">مسودة</Badge>
                    <Button variant="outline" size="sm">تحرير</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
