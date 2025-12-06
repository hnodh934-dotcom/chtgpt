import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Download, Send, AlertTriangle, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { CreateReportDialog } from "@/components/CreateReportDialog";

/**
 * 📋 Compliance Reports Page
 * صفحة إدارة التقارير التنظيمية
 */

export default function ComplianceReports() {
  const [selectedTab, setSelectedTab] = useState("obligations");

  // جلب الالتزامات التنظيمية
  const { data: obligations } = trpc.compliance.getRegulatoryObligations.useQuery();

  // جلب الإحصائيات
  const { data: stats } = trpc.compliance.getComplianceStatistics.useQuery();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800">مُرسل</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">مسودة</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">قيد الانتظار</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">متأخر</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAuthorityColor = (authority: string) => {
    switch (authority) {
      case "SAMA":
        return "bg-blue-50 border-blue-200";
      case "CMA":
        return "bg-purple-50 border-purple-200";
      case "NCSC":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">التقارير التنظيمية</h1>
          <p className="text-gray-600 mt-2">إدارة التقارير المرسلة للسلطات (SAMA, CMA, NCSC)</p>
        </div>
        <CreateReportDialog
          reportTypes={[
            { value: "aml_ctf", label: "تقرير AML/CTF الشهري", authority: "SAMA" },
            { value: "transaction_report", label: "تقرير المعاملات", authority: "SAMA" },
            { value: "investor_protection", label: "تقرير حماية المستثمر", authority: "CMA" },
            { value: "market_conduct", label: "تقرير سلوك السوق", authority: "CMA" },
          ]}
        />
      </div>

      {/* Compliance Score */}
      <Card className="border-2 border-yellow-400">
        <CardHeader>
          <CardTitle>درجة الامتثال</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-yellow-600">
              {stats?.complianceScore || 0}%
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">مستوى الامتثال الكلي</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${stats?.complianceScore || 0}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">إجمالي التقارير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalReports || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">مُرسلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.submittedReports || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">قيد الإعداد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats?.pendingReports || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">متأخرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.overdueReports || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="obligations">الالتزامات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="schedule">الجدول الزمني</TabsTrigger>
        </TabsList>

        {/* Obligations Tab */}
        <TabsContent value="obligations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الالتزامات التنظيمية</CardTitle>
              <CardDescription>قائمة الالتزامات المطلوبة من السلطات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {obligations?.obligations && obligations.obligations.length > 0 ? (
                  obligations.obligations.map((obligation: any) => (
                    <div
                      key={obligation.id}
                      className={`p-4 border-2 rounded-lg ${getAuthorityColor(obligation.authority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{obligation.nameAr}</h4>
                            <Badge className="bg-blue-100 text-blue-800">{obligation.authority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{obligation.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">
                              التكرار: <strong>{obligation.frequency}</strong>
                            </span>
                            <span className="text-gray-600">
                              الموعد النهائي:{" "}
                              <strong>
                                {new Date(obligation.dueDate).toLocaleDateString("ar-SA")}
                              </strong>
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="ml-4">
                          إنشاء تقرير
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    جاري التحميل...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>التقارير المُنشأة</CardTitle>
              <CardDescription>قائمة التقارير المُعدة والمُرسلة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* SAMA Reports */}
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    تقارير البنك المركزي (SAMA)
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">تقرير AML/CTF الشهري</h4>
                        <p className="text-sm text-gray-600">يناير 2025</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge("submitted")}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">تقرير المعاملات المشبوهة</h4>
                        <p className="text-sm text-gray-600">ديسمبر 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge("submitted")}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CMA Reports */}
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                    تقارير هيئة السوق المالية (CMA)
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">تقرير حماية المستثمر</h4>
                        <p className="text-sm text-gray-600">Q4 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge("draft")}
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">تقرير سلوك السوق</h4>
                        <p className="text-sm text-gray-600">Q3 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge("submitted")}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني للتقارير</CardTitle>
              <CardDescription>مواعيد التقارير المستقبلية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    تقرير AML الشهري مستحق خلال 5 أيام
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  {[
                    { date: "2025-02-15", title: "تقرير AML الشهري", authority: "SAMA" },
                    { date: "2025-03-31", title: "تقرير حماية المستثمر", authority: "CMA" },
                    { date: "2025-03-31", title: "تقرير سلوك السوق", authority: "CMA" },
                    { date: "2025-04-30", title: "تقرير AML الشهري", authority: "SAMA" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString("ar-SA")}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{item.authority}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
