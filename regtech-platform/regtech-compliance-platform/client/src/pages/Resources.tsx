import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Link as LinkIcon, 
  BookOpen, 
  TrendingUp, 
  Download,
  ExternalLink,
  Search,
  Filter
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * 📚 مركز الموارد
 * Rulebooks، روابط رسمية، دلائل، تحديثات، مقالات
 */

interface Resource {
  id: string;
  title: string;
  description: string;
  category: "rulebook" | "guide" | "update" | "article" | "link";
  authority?: string;
  date: string;
  url?: string;
  downloadUrl?: string;
}

const resources: Resource[] = [
  // Rulebooks
  {
    id: "sama-fintech-rulebook",
    title: "دليل الفينتك الصادر عن SAMA",
    description: "الدليل الشامل لمتطلبات الترخيص والامتثال للشركات الناشئة في مجال التقنية المالية",
    category: "rulebook",
    authority: "SAMA",
    date: "يناير 2025",
    url: "https://www.sama.gov.sa/ar-sa/FinTech/Pages/default.aspx",
    downloadUrl: "#"
  },
  {
    id: "pdpl-regulation",
    title: "نظام حماية البيانات الشخصية (PDPL)",
    description: "النظام الكامل لحماية البيانات الشخصية الصادر عن SDAIA",
    category: "rulebook",
    authority: "SDAIA",
    date: "سبتمبر 2024",
    url: "https://sdaia.gov.sa/ar/PDPL/Pages/default.aspx",
    downloadUrl: "#"
  },
  {
    id: "cma-investment-rules",
    title: "لائحة الأشخاص المرخص لهم",
    description: "اللائحة التنفيذية لنشاط الأشخاص المرخص لهم من هيئة السوق المالية",
    category: "rulebook",
    authority: "CMA",
    date: "ديسمبر 2024",
    url: "https://cma.org.sa/RulesRegulations/Regulations/Pages/default.aspx",
    downloadUrl: "#"
  },
  {
    id: "nca-cybersecurity-controls",
    title: "ضوابط الأمن السيبراني",
    description: "الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني",
    category: "rulebook",
    authority: "NCA",
    date: "نوفمبر 2024",
    url: "https://nca.gov.sa/pages/controls.html",
    downloadUrl: "#"
  },
  
  // Guides
  {
    id: "kyc-aml-guide",
    title: "دليل KYC/AML للفينتك",
    description: "دليل عملي لتطبيق متطلبات معرفة العميل ومكافحة غسل الأموال",
    category: "guide",
    authority: "SAMA",
    date: "يناير 2025",
    downloadUrl: "#"
  },
  {
    id: "data-breach-response",
    title: "دليل الاستجابة لخروقات البيانات",
    description: "خطوات عملية للتعامل مع خروقات البيانات الشخصية والإبلاغ عنها",
    category: "guide",
    authority: "SDAIA",
    date: "أكتوبر 2024",
    downloadUrl: "#"
  },
  
  // Updates
  {
    id: "sama-update-jan-2025",
    title: "تحديث: متطلبات جديدة للمحافظ الرقمية",
    description: "SAMA تصدر متطلبات إضافية لمزودي خدمات المحافظ الرقمية",
    category: "update",
    authority: "SAMA",
    date: "15 يناير 2025",
    url: "https://www.sama.gov.sa"
  },
  {
    id: "sdaia-update-dec-2024",
    title: "تحديث: توضيحات حول موافقة المستخدم",
    description: "SDAIA تصدر توضيحات حول متطلبات الحصول على موافقة المستخدم",
    category: "update",
    authority: "SDAIA",
    date: "20 ديسمبر 2024",
    url: "https://sdaia.gov.sa"
  },
  
  // Articles
  {
    id: "article-compliance-automation",
    title: "أتمتة الامتثال: الدليل الشامل",
    description: "كيف تستخدم التقنية لتحقيق الامتثال بكفاءة أعلى وتكلفة أقل",
    category: "article",
    date: "10 يناير 2025"
  },
  {
    id: "article-sandbox-guide",
    title: "دليل التقديم لبيئة SAMA التجريبية",
    description: "خطوات عملية للتقديم والنجاح في بيئة الاختبار التجريبية",
    category: "article",
    date: "5 يناير 2025"
  },
  
  // Official Links
  {
    id: "link-sama",
    title: "مؤسسة النقد العربي السعودي (SAMA)",
    description: "الموقع الرسمي لمؤسسة النقد العربي السعودي",
    category: "link",
    authority: "SAMA",
    date: "",
    url: "https://www.sama.gov.sa"
  },
  {
    id: "link-cma",
    title: "هيئة السوق المالية (CMA)",
    description: "الموقع الرسمي لهيئة السوق المالية",
    category: "link",
    authority: "CMA",
    date: "",
    url: "https://cma.org.sa"
  },
  {
    id: "link-sdaia",
    title: "الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)",
    description: "الموقع الرسمي للهيئة السعودية للبيانات والذكاء الاصطناعي",
    category: "link",
    authority: "SDAIA",
    date: "",
    url: "https://sdaia.gov.sa"
  },
  {
    id: "link-citc",
    title: "هيئة الاتصالات وتقنية المعلومات (CITC)",
    description: "الموقع الرسمي لهيئة الاتصالات وتقنية المعلومات",
    category: "link",
    authority: "CITC",
    date: "",
    url: "https://citc.gov.sa"
  },
  {
    id: "link-nca",
    title: "الهيئة الوطنية للأمن السيبراني (NCA)",
    description: "الموقع الرسمي للهيئة الوطنية للأمن السيبراني",
    category: "link",
    authority: "NCA",
    date: "",
    url: "https://nca.gov.sa"
  }
];

const categories = [
  { value: "all", label: "الكل", icon: FileText },
  { value: "rulebook", label: "الأنظمة واللوائح", icon: BookOpen },
  { value: "guide", label: "الدلائل الإرشادية", icon: FileText },
  { value: "update", label: "التحديثات", icon: TrendingUp },
  { value: "article", label: "المقالات", icon: FileText },
  { value: "link", label: "الروابط الرسمية", icon: LinkIcon }
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : FileText;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      rulebook: "text-chart-1",
      guide: "text-chart-2",
      update: "text-chart-3",
      article: "text-chart-4",
      link: "text-primary"
    };
    return colors[category] || "text-muted-foreground";
  };

  return (
    <div className="min-h-screen night-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← العودة للرئيسية
            </Button>
          </Link>
          <h1 className="text-xl font-bold legal-heading">مركز الموارد</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            مكتبة شاملة
          </Badge>
          <h2 className="text-4xl font-bold legal-heading gold-glow mb-4">
            مركز الموارد التنظيمية
          </h2>
          <p className="text-lg text-muted-foreground">
            مكتبة شاملة من الأنظمة، اللوائح، الدلائل، والتحديثات التنظيمية
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث في الموارد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const Icon = getCategoryIcon(resource.category);
            const colorClass = getCategoryColor(resource.category);

            return (
              <Card key={resource.id} className="premium-card flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Icon className={`w-8 h-8 ${colorClass} shrink-0`} />
                    {resource.authority && (
                      <Badge variant="outline" className="text-xs">
                        {resource.authority}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  {resource.date && (
                    <p className="text-xs text-muted-foreground">
                      {resource.date}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {resource.url && (
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 ml-1" />
                          عرض
                        </a>
                      </Button>
                    )}
                    {resource.downloadUrl && (
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={resource.downloadUrl} download>
                          <Download className="w-4 h-4 ml-1" />
                          تحميل
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">
              جرّب تغيير الفئة أو مصطلح البحث
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="premium-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl legal-heading">
                هل تحتاج موارد إضافية؟
              </CardTitle>
              <CardDescription>
                نوفر لعملائنا مكتبة موسعة من الموارد والدلائل المخصصة
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  ابدأ تجربة مجانية
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  تواصل معنا
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
