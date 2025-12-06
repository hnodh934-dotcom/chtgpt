import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Eye
} from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

/**
 * 🔬 صفحة التشخيص الشامل
 * رفع الوثائق + تحليل بالذكاء الاصطناعي + الوكلاء الماليون
 */

interface UploadedFile {
  id: string;
  file: File;
  category: string;
  status: "pending" | "uploading" | "analyzing" | "completed" | "error";
  progress: number;
  analysisResult?: {
    complianceScore: number;
    gaps: string[];
    recommendations: string[];
  };
}

const documentCategories = [
  { value: "policies", label: "السياسات الداخلية", icon: FileText },
  { value: "financial", label: "النماذج المالية", icon: FileSpreadsheet },
  { value: "agreements", label: "الاتفاقيات والعقود", icon: FileText },
  { value: "licenses", label: "التراخيص والموافقات", icon: File },
  { value: "procedures", label: "الإجراءات التشغيلية", icon: FileText },
  { value: "reports", label: "التقارير والبيانات", icon: FileSpreadsheet },
  { value: "other", label: "أخرى", icon: File }
];

export default function Diagnostic() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'docx', 'xlsx', 'doc', 'xls'].includes(ext || '');
    });

    if (validFiles.length === 0) {
      toast.error("الرجاء رفع ملفات PDF أو DOCX أو XLSX فقط");
      return;
    }

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      category: autoDetectCategory(file.name),
      status: "pending",
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload and analysis
    newFiles.forEach(fileData => {
      simulateUploadAndAnalysis(fileData.id);
    });

    toast.success(`تم رفع ${validFiles.length} ملف بنجاح`);
  };

  const autoDetectCategory = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('policy') || lower.includes('سياسة')) return 'policies';
    if (lower.includes('financial') || lower.includes('مالي')) return 'financial';
    if (lower.includes('agreement') || lower.includes('اتفاقية')) return 'agreements';
    if (lower.includes('license') || lower.includes('ترخيص')) return 'licenses';
    if (lower.includes('procedure') || lower.includes('إجراء')) return 'procedures';
    if (lower.includes('report') || lower.includes('تقرير')) return 'reports';
    return 'other';
  };

  const simulateUploadAndAnalysis = (fileId: string) => {
    // Simulate upload
    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: "uploading" as const } : f
    ));

    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));

      if (progress >= 100) {
        clearInterval(uploadInterval);
        
        // Start analysis
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: "analyzing" as const } : f
        ));

        // Simulate analysis (3 seconds)
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId ? {
              ...f,
              status: "completed" as const,
              analysisResult: {
                complianceScore: Math.floor(Math.random() * 30) + 70,
                gaps: [
                  "نقص في توثيق إجراءات KYC",
                  "عدم وجود سياسة واضحة لحماية البيانات",
                  "غياب خطة الاستجابة للحوادث"
                ],
                recommendations: [
                  "تحديث سياسة KYC وفقاً لمتطلبات SAMA",
                  "إعداد سياسة حماية بيانات متوافقة مع PDPL",
                  "إنشاء خطة استجابة للحوادث السيبرانية"
                ]
              }
            } : f
          ));

          toast.success("اكتمل تحليل الملف");
        }, 3000);
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    toast.info("تم حذف الملف");
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-chart-1" />;
    if (['xlsx', 'xls'].includes(ext || '')) return <FileSpreadsheet className="w-5 h-5 text-chart-2" />;
    return <File className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: UploadedFile['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">في الانتظار</Badge>;
      case "uploading":
        return <Badge className="bg-chart-4/20 text-chart-4">جاري الرفع...</Badge>;
      case "analyzing":
        return <Badge className="bg-chart-3/20 text-chart-3">جاري التحليل...</Badge>;
      case "completed":
        return <Badge className="bg-chart-2/20 text-chart-2">مكتمل</Badge>;
      case "error":
        return <Badge variant="destructive">خطأ</Badge>;
    }
  };

  const overallProgress = uploadedFiles.length > 0
    ? uploadedFiles.filter(f => f.status === "completed").length / uploadedFiles.length * 100
    : 0;

  const completedFiles = uploadedFiles.filter(f => f.status === "completed");

  return (
    <div className="min-h-screen night-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              ← العودة للوحة التحكم
            </Button>
          </Link>
          <h1 className="text-xl font-bold legal-heading">التشخيص الشامل</h1>
          <div className="w-32" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-8">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <h2 className="text-4xl font-bold legal-heading gold-glow mb-4">
            التشخيص الشامل للامتثال
          </h2>
          <p className="text-lg text-muted-foreground">
            ارفع وثائقك ودع الذكاء الاصطناعي يحللها مقابل اللوائح الرسمية
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="premium-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              رفع الوثائق
            </CardTitle>
            <CardDescription>
              PDF, DOCX, XLSX - حتى 10 ملفات في المرة الواحدة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                transition-all duration-200
                ${isDragging 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }
              `}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="text-lg font-semibold mb-2">
                {isDragging ? 'أفلت الملفات هنا' : 'اسحب الملفات وأفلتها هنا'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                أو انقر للاختيار من جهازك
              </p>
              <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                اختر الملفات
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx,.doc,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Document Categories */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">أنواع الوثائق المدعومة:</p>
              <div className="flex flex-wrap gap-2">
                {documentCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Badge key={cat.value} variant="outline" className="gap-1">
                      <Icon className="w-3 h-3" />
                      {cat.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        {uploadedFiles.length > 0 && (
          <Card className="premium-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>التقدم الإجمالي</CardTitle>
              <CardDescription>
                {completedFiles.length} من {uploadedFiles.length} ملف مكتمل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-bold">الملفات المرفوعة</h3>
            {uploadedFiles.map((fileData) => (
              <Card key={fileData.id} className="premium-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="shrink-0">
                      {getFileIcon(fileData.file.name)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{fileData.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(fileData.file.size / 1024).toFixed(1)} KB • {
                              documentCategories.find(c => c.value === fileData.category)?.label
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(fileData.status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => removeFile(fileData.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {(fileData.status === "uploading" || fileData.status === "analyzing") && (
                        <div className="space-y-2">
                          <Progress value={fileData.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            {fileData.status === "uploading" ? "جاري الرفع..." : "جاري التحليل..."}
                          </p>
                        </div>
                      )}

                      {/* Analysis Result */}
                      {fileData.status === "completed" && fileData.analysisResult && (
                        <div className="mt-4 p-4 bg-accent/30 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">نتيجة التحليل</p>
                            <Badge className="bg-chart-2/20 text-chart-2">
                              {fileData.analysisResult.complianceScore}% امتثال
                            </Badge>
                          </div>
                          
                          {fileData.analysisResult.gaps.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">الفجوات المكتشفة:</p>
                              <ul className="text-xs space-y-1">
                                {fileData.analysisResult.gaps.slice(0, 2).map((gap, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <AlertCircle className="w-3 h-3 text-chart-3 shrink-0 mt-0.5" />
                                    <span>{gap}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 ml-1" />
                            عرض التقرير الكامل
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA - Generate Full Report */}
        {completedFiles.length > 0 && (
          <Card className="premium-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">جاهز لرؤية التقرير الشامل؟</CardTitle>
              <CardDescription className="text-center">
                تم تحليل {completedFiles.length} ملف بنجاح
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/compliance-map">
                  عرض خريطة الامتثال
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                تحميل تقرير الفجوات (PDF)
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
