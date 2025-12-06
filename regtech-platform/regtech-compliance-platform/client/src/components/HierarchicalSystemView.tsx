import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Shield, Scale, Gavel, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * مكون عرض النظام الهرمي
 * Hierarchical System View Component
 * 
 * يعرض البنية المنطقية الكاملة للنظام عبر 4 طبقات:
 * 1. الأطر التنظيمية (Frameworks)
 * 2. الضوابط (Controls)
 * 3. المواد (Articles)
 * 4. الأحكام (Provisions)
 */

interface Framework {
  id: number;
  code: string;
  name: string;
  description: string | null;
  authority: string | null;
  sector: string | null;
}

interface Control {
  id: number;
  code: string;
  name: string;
  description: string | null;
  category: string | null;
  priority: string;
}

interface Article {
  id: number;
  number: string;
  name: string;
  content: string | null;
}

interface Provision {
  id: number;
  number: string;
  content: string;
  type: string;
}

interface HierarchicalSystemViewProps {
  framework: Framework;
  controls: Control[];
}

export function HierarchicalSystemView({ framework, controls }: HierarchicalSystemViewProps) {
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedProvision, setSelectedProvision] = useState<Provision | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<'framework' | 'control' | 'article' | 'provision'>('framework');

  // بيانات تجريبية للمواد والأحكام
  const mockArticles: Article[] = selectedControl ? [
    {
      id: 1,
      number: "المادة 1",
      name: "التعريفات",
      content: "في تطبيق أحكام هذا النظام، يُقصد بالألفاظ والعبارات الآتية المعاني المبينة أمام كل منها..."
    },
    {
      id: 2,
      number: "المادة 2",
      name: "نطاق التطبيق",
      content: "تسري أحكام هذا النظام على جميع الجهات التي تقوم بمعالجة البيانات الشخصية..."
    },
    {
      id: 3,
      number: "المادة 3",
      name: "الالتزامات العامة",
      content: "يجب على المتحكم والمعالج الالتزام بمبادئ معالجة البيانات الشخصية..."
    }
  ] : [];

  const mockProvisions: Provision[] = selectedArticle ? [
    {
      id: 1,
      number: "الفقرة 1",
      content: "يُحظر معالجة البيانات الشخصية الحساسة إلا بموافقة صريحة من صاحب البيانات",
      type: "إلزامي"
    },
    {
      id: 2,
      number: "الفقرة 2",
      content: "يجوز معالجة البيانات الشخصية الحساسة دون موافقة في حالات محددة نص عليها النظام",
      type: "استثنائي"
    },
    {
      id: 3,
      number: "الفقرة 3",
      content: "يجب على المتحكم توثيق جميع عمليات معالجة البيانات الشخصية الحساسة",
      type: "إلزامي"
    }
  ] : [];

  const handleFrameworkClick = () => {
    setSidebarContent('framework');
    setSidebarOpen(true);
  };

  const handleControlClick = (control: Control) => {
    setSelectedControl(control);
    setSelectedArticle(null);
    setSelectedProvision(null);
    setSidebarContent('control');
    setSidebarOpen(true);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setSelectedProvision(null);
    setSidebarContent('article');
    setSidebarOpen(true);
  };

  const handleProvisionClick = (provision: Provision) => {
    setSelectedProvision(provision);
    setSidebarContent('provision');
    setSidebarOpen(true);
  };

  const renderBreadcrumbs = () => {
    const items = [
      { label: framework.name, onClick: () => { setSelectedControl(null); setSelectedArticle(null); setSelectedProvision(null); } }
    ];
    
    if (selectedControl) {
      items.push({ label: selectedControl.name, onClick: () => { setSelectedArticle(null); setSelectedProvision(null); } });
    }
    
    if (selectedArticle) {
      items.push({ label: selectedArticle.name, onClick: () => { setSelectedProvision(null); } });
    }
    
    if (selectedProvision) {
      items.push({ label: selectedProvision.number, onClick: () => {} });
    }

    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6" dir="rtl">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronLeft className="w-4 h-4" />}
            <button
              onClick={item.onClick}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {renderBreadcrumbs()}

      {/* الطبقة 1: الإطار التنظيمي */}
      {!selectedControl && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono">{framework.code}</Badge>
                    {true && (
                      <Badge variant="default" className="bg-primary">إلزامي</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl legal-heading">{framework.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {framework.authority}
                    {framework.sector && framework.sector.length > 0 && (
                      <> • {framework.sector[0]}</>
                    )}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleFrameworkClick}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground legal-text">
              {framework.description || "الإطار التنظيمي الذي يحدد المتطلبات والضوابط الأساسية للامتثال"}
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">الضوابط ({controls.length})</h4>
              <div className="grid gap-2">
                {controls.slice(0, 5).map((control) => (
                  <button
                    key={control.id}
                    onClick={() => handleControlClick(control)}
                    className="p-3 border rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-all text-right"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium font-mono">{control.code}</span>
                      <Badge variant="secondary" className="text-xs">{control.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{control.name}</p>
                  </button>
                ))}
                {controls.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    + {controls.length - 5} ضوابط أخرى
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الطبقة 2: الضابط */}
      {selectedControl && !selectedArticle && (
        <Card className="border-2 border-accent/30">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono">{selectedControl.code}</Badge>
                    <Badge variant="secondary">{selectedControl.category}</Badge>
                    <Badge 
                      variant={selectedControl.priority === 'عالية' ? 'destructive' : 'default'}
                      className="text-xs"
                    >
                      {selectedControl.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg legal-heading">{selectedControl.name}</CardTitle>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleControlClick(selectedControl)}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground legal-text mb-4">
              {selectedControl.description || "وصف تفصيلي للضابط ومتطلبات تطبيقه"}
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">المواد ({mockArticles.length})</h4>
              <div className="grid gap-2">
                {mockArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="p-3 border rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-all text-right"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium legal-heading">{article.number}</span>
                      <span className="text-sm font-medium">{article.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 legal-text">{article.content}</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الطبقة 3: المادة */}
      {selectedArticle && !selectedProvision && (
        <Card className="border-2 border-secondary/30">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg legal-heading">
                    {selectedArticle.number}: {selectedArticle.name}
                  </CardTitle>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleArticleClick(selectedArticle)}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm legal-text leading-relaxed mb-4">
              {selectedArticle.content}
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">الأحكام ({mockProvisions.length})</h4>
              <div className="grid gap-2">
                {mockProvisions.map((provision) => (
                  <button
                    key={provision.id}
                    onClick={() => handleProvisionClick(provision)}
                    className="p-3 border rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-all text-right"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Gavel className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium legal-heading">{provision.number}</span>
                      <Badge variant="outline" className="text-xs">{provision.type}</Badge>
                    </div>
                    <p className="text-sm legal-text">{provision.content}</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الطبقة 4: الحكم */}
      {selectedProvision && (
        <Card className="border-2 border-destructive/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Gavel className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg legal-heading">{selectedProvision.number}</CardTitle>
                    <Badge variant="outline">{selectedProvision.type}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleProvisionClick(selectedProvision)}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm legal-text leading-relaxed">
              {selectedProvision.content}
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="text-xs font-medium text-muted-foreground mb-2">التحليل القانوني</h5>
                <p className="text-sm legal-text">
                  هذا الحكم يُلزم الجهات المعنية بتطبيق معايير محددة للامتثال، ويُعتبر من الأحكام الإلزامية التي يجب الالتزام بها بشكل كامل.
                </p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="text-xs font-medium text-muted-foreground mb-2">الاستنادات</h5>
                <ul className="space-y-1 text-sm legal-text">
                  <li>• يستند إلى: المادة 5 من النظام الأساسي</li>
                  <li>• يفسّر: القرار التنفيذي رقم 123</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* اللوحة الجانبية */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[400px] sm:w-[540px]" dir="rtl">
          <SheetHeader>
            <SheetTitle className="legal-heading">
              {sidebarContent === 'framework' && 'تفاصيل الإطار التنظيمي'}
              {sidebarContent === 'control' && 'تفاصيل الضابط'}
              {sidebarContent === 'article' && 'تفاصيل المادة'}
              {sidebarContent === 'provision' && 'تفاصيل الحكم'}
            </SheetTitle>
            <SheetDescription>
              معلومات تفصيلية ومؤشرات القياس والاستنادات
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {sidebarContent === 'framework' && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">الوصف النظامي</h4>
                  <p className="text-sm text-muted-foreground legal-text">
                    {framework.description || "وصف تفصيلي للإطار التنظيمي وأهدافه ونطاق تطبيقه"}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">معلومات أساسية</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">الرمز:</dt>
                    <dd className="font-medium">
                      {framework.sector || 'غير محدد'}
                    </dd>                 </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">الجهة المصدرة:</dt>
                      <dd>{framework.authority}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">القطاعات المطبقة:</dt>
                      <dd>
                        {framework.sector || 'غير محدد'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">النوع:</dt>
                      <dd>{true ? 'إلزامي' : 'اختياري'}</dd>
                    </div>
                  </dl>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">مؤشرات القياس</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">نسبة الامتثال</span>
                      <Badge variant="secondary">75%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">الضوابط المطبقة</span>
                      <Badge variant="secondary">3 من 5</Badge>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {sidebarContent === 'control' && selectedControl && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">الوصف التفصيلي</h4>
                  <p className="text-sm text-muted-foreground legal-text">
                    {selectedControl.description || "وصف تفصيلي للضابط ومتطلبات تطبيقه والإجراءات المطلوبة"}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">معلومات الضابط</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">الرمز:</dt>
                      <dd className="font-mono">{selectedControl.code}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">التصنيف:</dt>
                      <dd>{selectedControl.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">الأولوية:</dt>
                      <dd>{selectedControl.priority}</dd>
                    </div>
                  </dl>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">الاستنادات</h4>
                  <ul className="space-y-1 text-sm legal-text">
                    <li>• يستند إلى: المادة 8 من {framework.name}</li>
                    <li>• يفسّر: القرار التنفيذي رقم 456</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
