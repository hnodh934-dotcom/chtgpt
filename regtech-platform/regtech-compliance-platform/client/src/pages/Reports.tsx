import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, FileSpreadsheet, FileType } from "lucide-react";

export default function Reports() {
  const reports = [
    {
      id: 1,
      title: "تقرير الامتثال الشامل",
      description: "تقرير شامل يغطي جميع الأطر التنظيمية ومستوى الامتثال الحالي",
      icon: FileText,
      frequency: "ربع سنوي",
      lastGenerated: "2025-10-15",
      sections: [
        "ملخص تنفيذي",
        "تقييم الامتثال لكل إطار",
        "تحليل الفجوات",
        "خطة العمل التصحيحية",
        "توصيات التحسين",
      ],
      formats: ["PDF", "Word"],
    },
    {
      id: 2,
      title: "تقرير تقييم المخاطر",
      description: "تحليل شامل للمخاطر المتعلقة بالامتثال وتصنيفها حسب الأولوية",
      icon: FileText,
      frequency: "شهري",
      lastGenerated: "2025-11-01",
      sections: [
        "مصفوفة المخاطر",
        "تقييم احتمالية وتأثير كل خطر",
        "خطط التخفيف",
        "مؤشرات المخاطر الرئيسية",
        "توصيات إدارة المخاطر",
      ],
      formats: ["PDF", "Excel"],
    },
    {
      id: 3,
      title: "تقرير تقدم المشروع",
      description: "متابعة تقدم مشاريع الامتثال والمهام المنجزة والمتبقية",
      icon: FileText,
      frequency: "أسبوعي",
      lastGenerated: "2025-11-03",
      sections: [
        "نظرة عامة على المشروع",
        "المهام المكتملة",
        "المهام قيد التنفيذ",
        "المهام المتأخرة",
        "الجدول الزمني المحدث",
      ],
      formats: ["PDF", "Excel"],
    },
    {
      id: 4,
      title: "تقرير الأداء الشهري",
      description: "مؤشرات الأداء الرئيسية ومقاييس نجاح برنامج الامتثال",
      icon: FileText,
      frequency: "شهري",
      lastGenerated: "2025-11-01",
      sections: [
        "مؤشرات الأداء الرئيسية",
        "الإنجازات الشهرية",
        "التحديات والعقبات",
        "مقارنة بالأهداف",
        "خطة الشهر القادم",
      ],
      formats: ["PDF", "Excel", "Word"],
    },
    {
      id: 5,
      title: "تقرير المراجعة السنوية",
      description: "مراجعة شاملة لبرنامج الامتثال على مدار العام",
      icon: FileText,
      frequency: "سنوي",
      lastGenerated: "2025-01-15",
      sections: [
        "ملخص تنفيذي للعام",
        "الإنجازات الرئيسية",
        "التحديات والدروس المستفادة",
        "تحليل التكلفة والعائد",
        "الأهداف الاستراتيجية للعام القادم",
      ],
      formats: ["PDF", "Word"],
    },
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileType className="h-4 w-4" />;
      case "Excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "Word":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "أسبوعي":
        return "bg-blue-600";
      case "شهري":
        return "bg-emerald-600";
      case "ربع سنوي":
        return "bg-amber-600";
      case "سنوي":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2318] via-[#1a3a2e] to-[#0f2318] text-[#f0d98c]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#f0d98c] via-[#d4af37] to-[#f0d98c] bg-clip-text text-transparent">
            التقارير
          </h1>
          <p className="text-xl text-[#f0d98c]/80 max-w-3xl mx-auto">
            5 أنواع من التقارير الشاملة مع إمكانية التصدير بصيغ متعددة
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">إجمالي التقارير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d4af37]">{reports.length}</div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">أنواع التقارير المتاحة</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">صيغ التصدير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d4af37]">3</div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">PDF, Excel, Word</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">تقارير دورية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d4af37]">4</div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">تقارير منتظمة</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#f0d98c] text-lg">آخر تحديث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d4af37]">اليوم</div>
              <p className="text-sm text-[#f0d98c]/70 mt-2">2025-11-03</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="bg-[#1a3a2e]/50 border-[#2D5F4C] backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#2D5F4C]/30 rounded-lg">
                        <Icon className="h-6 w-6 text-[#d4af37]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[#f0d98c]">{report.title}</CardTitle>
                        <CardDescription className="text-[#f0d98c]/60 text-sm mt-1">
                          آخر إنشاء: {report.lastGenerated}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getFrequencyColor(report.frequency)}>{report.frequency}</Badge>
                  </div>
                  <p className="text-sm text-[#f0d98c]/70">{report.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#f0d98c] mb-2 text-sm">الأقسام:</h4>
                    <ul className="space-y-1">
                      {report.sections.map((section, idx) => (
                        <li key={idx} className="text-sm text-[#f0d98c]/70 flex items-start gap-2">
                          <span className="text-[#d4af37] mt-1">•</span>
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2D5F4C]/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#f0d98c]">تصدير بصيغة:</span>
                      <div className="flex gap-2">
                        {report.formats.map((format) => (
                          <Badge
                            key={format}
                            variant="outline"
                            className="text-[#f0d98c] border-[#C5A572] cursor-pointer hover:bg-[#2D5F4C]/30"
                          >
                            {getFormatIcon(format)}
                            <span className="mr-1">{format}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-[#2D5F4C] text-[#f0d98c] hover:bg-[#2D5F4C]/30"
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        معاينة
                      </Button>
                      <Button className="flex-1 bg-[#2D5F4C] hover:bg-[#3a7a5f] text-[#f0d98c]">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Report */}
        <Card className="mt-12 bg-gradient-to-br from-[#2D5F4C]/20 to-[#1a3a2e]/50 border-[#C5A572]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#f0d98c]">تقرير مخصص</CardTitle>
            <CardDescription className="text-[#f0d98c]/70">
              هل تحتاج تقريراً مخصصاً؟ يمكننا إنشاء تقارير حسب احتياجاتك الخاصة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-[#2D5F4C]/30">
                <h4 className="font-semibold text-[#f0d98c] mb-2">اختر المحتوى</h4>
                <p className="text-sm text-[#f0d98c]/70">حدد الأقسام والبيانات التي تريد تضمينها</p>
              </div>
              <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-[#2D5F4C]/30">
                <h4 className="font-semibold text-[#f0d98c] mb-2">اختر الصيغة</h4>
                <p className="text-sm text-[#f0d98c]/70">PDF, Excel, Word أو صيغة مخصصة</p>
              </div>
              <div className="bg-[#0f2318]/50 p-4 rounded-lg border border-[#2D5F4C]/30">
                <h4 className="font-semibold text-[#f0d98c] mb-2">جدولة التقرير</h4>
                <p className="text-sm text-[#f0d98c]/70">إنشاء تلقائي يومي، أسبوعي، أو شهري</p>
              </div>
            </div>
            <Button className="w-full bg-[#C5A572] hover:bg-[#d4af37] text-[#0f2318] font-semibold">
              إنشاء تقرير مخصص
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
