import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Shield,
  FileText,
  Bot,
  BarChart3,
  FolderKanban,
  BookOpen,
  HelpCircle,
  Settings,
  Scale,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Building2,
  Phone,
  Info,
  DollarSign,
  Newspaper,
  GraduationCap,
  LifeBuoy,
} from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalSearch } from "./GlobalSearch";

/**
 * 🎯 Mega Menu - Navigation الرئيسي للمنصة
 * يغطي 57 صفحة مقسمة إلى فئات واضحة
 */

interface MenuItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const publicPages: MenuItem[] = [
  {
    title: "الرئيسية",
    href: "/",
    description: "الصفحة الرئيسية للمنصة",
    icon: Building2,
  },
  {
    title: "من نحن",
    href: "/about-us",
    description: "تعرف على فريقنا ورؤيتنا",
    icon: Info,
  },
  {
    title: "الباقات",
    href: "/pricing",
    description: "اختر الباقة المناسبة لك",
    icon: DollarSign,
  },
  {
    title: "تواصل معنا",
    href: "/contact",
    description: "نحن هنا لمساعدتك",
    icon: Phone,
  },
];

const compliancePages: MenuItem[] = [
  {
    title: "مركز الامتثال",
    href: "/compliance-hub",
    description: "نظرة شاملة على الامتثال",
    icon: Shield,
  },
  {
    title: "الأطر التنظيمية",
    href: "/frameworks",
    description: "7 أطر تنظيمية سعودية",
    icon: Scale,
  },
  {
    title: "تقييم الامتثال",
    href: "/compliance-assessment",
    description: "قيّم مستوى امتثالك",
    icon: CheckCircle2,
  },
  {
    title: "مقارنة الأطر",
    href: "/regulatory-comparison",
    description: "قارن بين الجهات التنظيمية",
    icon: TrendingUp,
  },
];

const aiToolsPages: MenuItem[] = [
  {
    title: "المستشار التنظيمي",
    href: "/reg-advisor",
    description: "مستشار ذكي لأسئلتك",
    icon: Bot,
  },
  {
    title: "صائغ الوثائق",
    href: "/reg-drafter",
    description: "إنشاء وثائق تلقائياً",
    icon: FileText,
  },
  {
    title: "مراقب التحديثات",
    href: "/reg-monitor",
    description: "إشعارات فورية للتحديثات",
    icon: AlertTriangle,
  },
  {
    title: "Regulation as Code",
    href: "/raac",
    description: "تحويل اللوائح إلى كود",
    icon: FileText,
  },
];

const resourcesPages: MenuItem[] = [
  {
    title: "المدونة",
    href: "/blog",
    description: "5 مقالات تنظيمية",
    icon: Newspaper,
  },
  {
    title: "مركز الموارد",
    href: "/resources",
    description: "أدلة وملفات قابلة للتحميل",
    icon: BookOpen,
  },
  {
    title: "دراسات الحالة",
    href: "/case-studies",
    description: "قصص نجاح عملائنا",
    icon: GraduationCap,
  },
  {
    title: "الأسئلة الشائعة",
    href: "/faq",
    description: "إجابات لأسئلتك",
    icon: HelpCircle,
  },
  {
    title: "الدعم الفني",
    href: "/support",
    description: "نحن هنا لمساعدتك",
    icon: LifeBuoy,
  },
];

export function MegaMenu() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-2 space-x-reverse">
            {APP_LOGO ? (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8" />
            ) : (
              <Shield className="h-8 w-8 text-primary" />
            )}
            <span className="hidden font-bold sm:inline-block text-primary">
              {APP_TITLE}
            </span>
          </a>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* الصفحات العامة */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>الصفحات العامة</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {publicPages.map((item) => (
                    <ListItem
                      key={item.href}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* الامتثال */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>الامتثال</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {compliancePages.map((item) => (
                    <ListItem
                      key={item.href}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* أدوات AI */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>أدوات AI</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {aiToolsPages.map((item) => (
                    <ListItem
                      key={item.href}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* الموارد */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>الموارد</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resourcesPages.map((item) => (
                    <ListItem
                      key={item.href}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* لوحة التحكم (للمستخدمين المسجلين فقط) */}
            {isAuthenticated && (
              <NavigationMenuItem>
                <Link href="/dashboard">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <BarChart3 className="ml-2 h-4 w-4" />
                    لوحة التحكم
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side: Search + Theme Toggle + Auth */}
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline-block">
                {user?.name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <a href={getLoginUrl()}>تسجيل الدخول</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

// Helper Component for Menu Items
interface ListItemProps {
  title: string;
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

function ListItem({ title, href, children, icon: Icon }: ListItemProps) {
  return (
    <li>
      <Link href={href}>
        <NavigationMenuLink asChild>
          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  );
}
