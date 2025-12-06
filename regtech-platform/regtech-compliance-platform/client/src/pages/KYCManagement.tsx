import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Clock, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { DocumentUploadDialog } from "@/components/DocumentUploadDialog";

/**
 * 🆔 KYC Management Page
 * صفحة إدارة اعرف عميلك
 */

export default function KYCManagement() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // جلب المستندات المطلوبة
  const { data: requiredDocs } = trpc.kyc.getRequiredDocuments.useQuery();

  // جلب إحصائيات KYC
  const { data: stats } = trpc.kyc.getKYCStatistics.useQuery();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">اعرف عميلك (KYC)</h1>
          <p className="text-gray-600 mt-2">إدارة التحقق من هوية العملاء وملفات المخاطر</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          بدء عملية KYC جديدة
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
            <p className="text-xs text-gray-500 mt-1">عملاء</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">تم التحقق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.verifiedCustomers || 0}</div>
            <p className="text-xs text-gray-500 mt-1">عملاء</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">قيد التحقق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pendingVerification || 0}</div>
            <p className="text-xs text-gray-500 mt-1">عملاء</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">مرفوضة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.rejectedDocuments || 0}</div>
            <p className="text-xs text-gray-500 mt-1">وثائق</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="riskprofile">ملف المخاطر</TabsTrigger>
          <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>عملية KYC</CardTitle>
                <CardDescription>مراحل التحقق من العميل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">المرحلة 1: التحقق من الهوية</span>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">المرحلة 2: التحقق من العنوان</span>
                    <Badge className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">المرحلة 3: تقييم المخاطر</span>
                    <Badge className="bg-gray-100 text-gray-800">لم يبدأ</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإحصائيات</CardTitle>
                <CardDescription>معدل التحقق والأداء</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">معدل التحقق الناجح</span>
                  <span className="font-bold">
                    {stats?.totalCustomers ? Math.round((stats.verifiedCustomers / stats.totalCustomers) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">متوسط وقت التحقق</span>
                  <span className="font-bold">{stats?.averageVerificationTime || 0} ساعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">آخر تحديث</span>
                  <span className="text-sm text-gray-600">
                    {stats?.lastUpdateDate ? new Date(stats.lastUpdateDate).toLocaleDateString("ar-SA") : "لم يتم"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المستندات المطلوبة</CardTitle>
              <CardDescription>قائمة الوثائق المطلوبة لإكمال KYC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredDocs?.documents && requiredDocs.documents.length > 0 ? (
                  requiredDocs.documents.map((doc: any) => (
                    <div key={doc.type} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-semibold">{doc.nameAr}</h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                        <div className="mt-2">
                          {doc.required ? (
                            <Badge className="bg-red-100 text-red-800">مطلوب</Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800">اختياري</Badge>
                          )}
                        </div>
                      </div>
                      <DocumentUploadDialog
                        documentType={doc.type}
                        documentTypeAr={doc.nameAr}
                        required={doc.required}
                      />
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

        {/* Risk Profile Tab */}
        <TabsContent value="riskprofile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ملف المخاطر</CardTitle>
              <CardDescription>تقييم مستوى مخاطر العميل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">تحمل المخاطر</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="risk" value="conservative" className="ml-2" />
                      <span>متحفظ</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="risk" value="moderate" className="ml-2" defaultChecked />
                      <span>معتدل</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="risk" value="aggressive" className="ml-2" />
                      <span>عالي</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">خبرة الاستثمار</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="experience" value="beginner" className="ml-2" />
                      <span>مبتدئ</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="experience" value="intermediate" className="ml-2" defaultChecked />
                      <span>متوسط</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="experience" value="advanced" className="ml-2" />
                      <span>متقدم</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full">حفظ ملف المخاطر</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني</CardTitle>
              <CardDescription>سجل مراحل التحقق</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div className="w-0.5 h-12 bg-green-600 my-2" />
                  </div>
                  <div className="pb-8">
                    <h4 className="font-semibold">تم رفع الهوية</h4>
                    <p className="text-sm text-gray-600">منذ 3 أيام</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div className="w-0.5 h-12 bg-green-600 my-2" />
                  </div>
                  <div className="pb-8">
                    <h4 className="font-semibold">تم التحقق من الهوية</h4>
                    <p className="text-sm text-gray-600">منذ يومين</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">قيد انتظار إثبات العنوان</h4>
                    <p className="text-sm text-gray-600">منذ يوم واحد</p>
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
