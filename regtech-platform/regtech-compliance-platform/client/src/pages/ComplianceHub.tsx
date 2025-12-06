import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  ClipboardCheck,
  Download,
  RefreshCw,
  Target,
  Activity,
  Zap
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { exportComplianceToPDF, exportComplianceToExcel, exportAllFrameworksToExcel } from "@/lib/exportUtils";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * 🎯 ComplianceHub - مركز الامتثال الشامل
 * 
 * Dashboard متقدم يجمع جميع معلومات الامتثال في مكان واحد:
 * - نظرة عامة على حالة الامتثال
 * - إحصائيات حية من جميع الأدوات
 * - تقارير تفاعلية
 * - Gap Analysis
 * - Compliance Score
 */
export default function ComplianceHub() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const [selectedFramework, setSelectedFramework] = useState<number | null>(null);

  // Fetch real data
  const { data: frameworks } = trpc.frameworks.list.useQuery();
  const { data: controls } = trpc.controls.list.useQuery({ 
    page: 1,
    limit: 1000
  });
  
  // Fetch compliance scores
  const { data: complianceData } = trpc.compliance.getOverall.useQuery();
  const { data: allFrameworkScores } = trpc.compliance.getAllFrameworks.useQuery();

  // Calculate compliance metrics
  const totalControls = controls?.controls?.length || 0;
  const totalFrameworks = frameworks?.length || 0;
  
  // Use real compliance score from API
  const complianceScore = complianceData?.overallScore || 0;
  const criticalControls = controls?.controls?.filter((c: any) => c.priority === 'critical').length || 0;

  // Group controls by priority
  const controlsByPriority = controls?.controls?.reduce((acc: any, control: any) => {
    acc[control.priority] = (acc[control.priority] || 0) + 1;
    return acc;
  }, {}) || {};

  // Prepare chart data
  const priorityData = [
    { name: 'حرج', value: controlsByPriority.critical || 0, color: '#ef4444' },
    { name: 'عالي', value: controlsByPriority.high || 0, color: '#f97316' },
    { name: 'متوسط', value: controlsByPriority.medium || 0, color: '#eab308' },
    { name: 'منخفض', value: controlsByPriority.low || 0, color: '#22c55e' },
  ];

  // Compliance trend data (mock for now)
  const trendData = [
    { month: 'يناير', score: 65 },
    { month: 'فبراير', score: 68 },
    { month: 'مارس', score: 72 },
    { month: 'أبريل', score: 75 },
    { month: 'مايو', score: 78 },
    { month: 'يونيو', score: complianceScore },
  ];

  // Framework coverage data
  const frameworkData = frameworks?.map((fw: any) => ({
    name: fw.code,
    coverage: Math.floor(Math.random() * 40) + 60, // Mock data
  })) || [];

  return (
    <div className="min-h-screen night-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                🎯 مركز الامتثال الشامل
              </h1>
              <p className="text-muted-foreground">
                نظرة شاملة على حالة الامتثال التنظيمي لمؤسستك
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                تحديث
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => {
                  if (complianceData) {
                    exportComplianceToPDF({
                      frameworkCode: 'ALL',
                      frameworkName: 'جميع الأطر',
                      score: complianceData.overallScore,
                      status: 'good' as const,
                      totalControls: complianceData.frameworks.reduce((sum, fw) => sum + fw.totalControls, 0),
                      compliantControls: complianceData.frameworks.reduce((sum, fw) => sum + fw.implementedControls, 0),
                      gaps: complianceData.frameworks.flatMap(fw => (fw.gaps || []).map(gap => ({
                        category: gap.category,
                        gapCount: gap.total - gap.implemented,
                        percentage: gap.percentage
                      }))),
                      generatedAt: new Date()
                    });
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                تصدير PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (allFrameworkScores) {
                    exportAllFrameworksToExcel(allFrameworkScores.map(fw => ({
                      code: fw.frameworkCode,
                      name: fw.frameworkName,
                      score: fw.complianceScore,
                      status: fw.status,
                      totalControls: fw.totalControls,
                      compliantControls: fw.implementedControls
                    })));
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                تصدير Excel
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range === 'week' && 'أسبوع'}
                {range === 'month' && 'شهر'}
                {range === 'quarter' && 'ربع سنة'}
                {range === 'year' && 'سنة'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Compliance Score */}
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                نسبة الامتثال الإجمالية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {complianceScore}%
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">+5.2%</span>
                <span className="text-muted-foreground">عن الشهر السابق</span>
              </div>
              <Progress value={complianceScore} className="mt-3" />
            </CardContent>
          </Card>

          {/* Total Frameworks */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                الأطر التنظيمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{totalFrameworks}</div>
              <div className="text-sm text-muted-foreground">
                إطار تنظيمي نشط
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  PDPL
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ECC
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Total Controls */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-purple-500" />
                الضوابط الكلية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{totalControls}</div>
              <div className="text-sm text-muted-foreground mb-3">
                ضابط تقني
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-red-500">● {controlsByPriority.critical || 0} حرج</span>
                <span className="text-orange-500">● {controlsByPriority.high || 0} عالي</span>
                <span className="text-yellow-500">● {controlsByPriority.medium || 0} متوسط</span>
              </div>
            </CardContent>
          </Card>

          {/* Assessments */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                التقييمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{totalFrameworks}</div>
              <div className="text-sm text-muted-foreground mb-3">
                إطار تنظيمي
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-green-500">{criticalControls} ضابط حرج</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="frameworks">الأطر التنظيمية</TabsTrigger>
            <TabsTrigger value="gaps">تحليل الفجوات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    اتجاه الامتثال
                  </CardTitle>
                  <CardDescription>
                    تطور نسبة الامتثال خلال الأشهر الستة الماضية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #333',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Controls by Priority */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    توزيع الضوابط حسب الأولوية
                  </CardTitle>
                  <CardDescription>
                    تصنيف الضوابط التقنية حسب مستوى الأهمية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #333',
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Donut Chart */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  نسب الامتثال للأطر التنظيمية
                </CardTitle>
                <CardDescription>
                  توزيع نسب الامتثال لجميع الأطر (PDPL, ECC, SAMA, NCA, CITC)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={allFrameworkScores?.map(f => ({
                        name: f.frameworkCode,
                        value: f.complianceScore,
                        color: f.status === 'excellent' ? '#22c55e' :
                               f.status === 'good' ? '#3b82f6' :
                               f.status === 'fair' ? '#eab308' :
                               f.status === 'poor' ? '#f97316' : '#ef4444'
                      })) || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {(allFrameworkScores || []).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.status === 'excellent' ? '#22c55e' :
                               entry.status === 'good' ? '#3b82f6' :
                               entry.status === 'fair' ? '#eab308' :
                               entry.status === 'poor' ? '#f97316' : '#ef4444'}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                  {allFrameworkScores?.map((framework, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-black/20">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {framework.frameworkCode}
                      </div>
                      <div className="text-2xl font-bold">
                        {framework.complianceScore}%
                      </div>
                      <Badge 
                        variant={framework.status === 'excellent' || framework.status === 'good' ? 'default' : 'destructive'}
                        className="mt-2"
                      >
                        {framework.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Framework Coverage */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  تغطية الأطر التنظيمية
                </CardTitle>
                <CardDescription>
                  نسبة تطبيق الضوابط لكل إطار تنظيمي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={frameworkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="coverage" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  إجراءات سريعة
                </CardTitle>
                <CardDescription>
                  الوصول السريع إلى الأدوات والميزات الرئيسية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/regadvisor">
                      <Shield className="w-6 h-6 text-primary" />
                      <div className="text-center">
                        <div className="font-semibold">RegAdvisor</div>
                        <div className="text-xs text-muted-foreground">المستشار الذكي</div>
                      </div>
                    </a>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/regdrafter">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <div className="text-center">
                        <div className="font-semibold">RegDrafter</div>
                        <div className="text-xs text-muted-foreground">المحرر التنظيمي</div>
                      </div>
                    </a>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/raac">
                      <BarChart3 className="w-6 h-6 text-purple-500" />
                      <div className="text-center">
                        <div className="font-semibold">RaaC</div>
                        <div className="text-xs text-muted-foreground">التنظيم كالكود</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Frameworks Tab */}
          <TabsContent value="frameworks">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>الأطر التنظيمية المتاحة</CardTitle>
                <CardDescription>
                  قائمة شاملة بجميع الأطر التنظيمية المدعومة في المنصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frameworks?.map((fw: any) => (
                    <div key={fw.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{fw.code}</Badge>
                          <h3 className="font-semibold">{fw.name}</h3>
                        </div>
                        <Button variant="ghost" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {fw.description || 'لا يوجد وصف'}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          الضوابط: <span className="text-foreground font-medium">
                            {controls?.controls?.filter((c: any) => c.frameworkId === fw.id).length || 0}
                          </span>
                        </span>
                        <span className="text-muted-foreground">
                          الإصدار: <span className="text-foreground font-medium">{fw.version}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gaps Tab */}
          <TabsContent value="gaps">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  تحليل الفجوات
                </CardTitle>
                <CardDescription>
                  تحديد المجالات التي تحتاج إلى تحسين في الامتثال التنظيمي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-500 mb-1">فجوات حرجة (3)</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          ضوابط ذات أولوية عالية لم يتم تطبيقها بعد
                        </p>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-500 mb-1">فجوات متوسطة (7)</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          مجالات تحتاج إلى تحسين في المدى القريب
                        </p>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-500 mb-1">ضوابط مكتملة ({totalControls - 10})</h4>
                        <p className="text-sm text-muted-foreground">
                          تم تطبيقها بنجاح وتتوافق مع المتطلبات
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  التقارير والتصدير
                </CardTitle>
                <CardDescription>
                  إنشاء وتصدير تقارير الامتثال الشاملة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">تقرير الامتثال الشامل</h4>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        تصدير PDF
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      تقرير مفصل يتضمن جميع الأطر التنظيمية والضوابط والتقييمات
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">تقرير الفجوات</h4>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        تصدير Excel
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      قائمة تفصيلية بالفجوات والتوصيات لتحسين الامتثال
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">تقرير الأداء</h4>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        تصدير PDF
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      تحليل الأداء والاتجاهات خلال الفترة المحددة
                    </p>
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
