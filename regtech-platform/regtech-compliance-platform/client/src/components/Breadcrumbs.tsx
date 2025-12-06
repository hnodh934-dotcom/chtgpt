import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * 🧭 Breadcrumbs Component
 * يعرض مسار التنقل الحالي للمستخدم
 * مثال: Home > Frameworks > SAMA > Control Details
 */

interface BreadcrumbsProps {
  /**
   * مسار مخصص (اختياري)
   * إذا لم يُحدد، سيتم استخدام المسار الحالي من URL
   */
  customPath?: Array<{ title: string; href?: string }>;
}

// خريطة المسارات إلى العناوين العربية
const pathTitles: Record<string, string> = {
  // Public Pages
  "": "الرئيسية",
  "about-us": "من نحن",
  "contact": "تواصل معنا",
  "pricing": "الباقات",
  "blog": "المدونة",
  "case-studies": "دراسات الحالة",
  "resources": "مركز الموارد",
  "faq": "الأسئلة الشائعة",
  
  // Compliance Pages
  "compliance-hub": "مركز الامتثال",
  "compliance-assessment": "تقييم الامتثال",
  "frameworks": "الأطر التنظيمية",
  "regulatory-comparison": "مقارنة الأطر",
  "controls": "الضوابط",
  "articles": "المواد القانونية",
  "provisions": "البنود",
  
  // AI Tools
  "reg-advisor": "المستشار التنظيمي",
  "reg-drafter": "صائغ الوثائق",
  "reg-monitor": "مراقب التحديثات",
  "raac": "Regulation as Code",
  "diagnostic": "التشخيص الذكي",
  
  // Dashboard
  "dashboard": "لوحة التحكم",
  "kpis-dashboard": "مؤشرات الأداء",
  "monitor-dashboard": "لوحة المراقبة",
  "reports": "التقارير",
  "assessments": "التقييمات",
  "projects": "المشاريع",
  
  // System
  "help": "المساعدة",
  "support": "الدعم الفني",
  "api-documentation": "توثيق API",
  
  // Legal
  "privacy-policy": "سياسة الخصوصية",
  "terms-of-service": "شروط الخدمة",
  "legal-disclaimers": "التنويهات القانونية",
};

export function Breadcrumbs({ customPath }: BreadcrumbsProps) {
  const [location] = useLocation();

  // إذا كان هناك مسار مخصص، استخدمه
  if (customPath) {
    return (
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {/* Home Link */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <a className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  الرئيسية
                </a>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {customPath.map((item, index) => {
            const isLast = index === customPath.length - 1;
            return (
              <div key={index} className="flex items-center gap-2">
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>
                        <a>{item.title}</a>
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // استخدام المسار الحالي من URL
  const pathSegments = location.split("/").filter(Boolean);

  // إذا كنا في الصفحة الرئيسية، لا نعرض breadcrumbs
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <a className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                الرئيسية
              </a>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const title = pathTitles[segment] || decodeURIComponent(segment);

          return (
            <div key={segment} className="flex items-center gap-2">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>
                      <a>{title}</a>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
