import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, TrendingUp, Building2, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Packages() {
  const { data: packages, isLoading } = trpc.packages.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'starter':
        return <Sparkles className="w-6 h-6" />;
      case 'growth':
        return <TrendingUp className="w-6 h-6" />;
      case 'enterprise':
        return <Building2 className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getPackageGradient = (type: string) => {
    switch (type) {
      case 'starter':
        return "from-blue-500/10 to-cyan-500/10";
      case 'growth':
        return "from-primary/10 to-accent/10";
      case 'enterprise':
        return "from-amber-500/10 to-orange-500/10";
      default:
        return "from-primary/10 to-accent/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
              الباقات والأسعار
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-l from-primary via-primary to-accent bg-clip-text text-transparent">
              اختر الباقة المناسبة لمؤسستك
            </h1>
            <p className="text-lg text-muted-foreground">
              حلول امتثال شاملة مصممة لتلبية احتياجات مؤسستك في كل مرحلة من مراحل النمو
            </p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages?.map((pkg) => {
            const features = pkg.features ? JSON.parse(pkg.features) : [];
            const isPopular = pkg.type === 'growth';

            return (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isPopular ? 'border-primary shadow-xl scale-105' : 'border-border/40'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-sm font-semibold">
                    الأكثر طلباً
                  </div>
                )}

                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getPackageGradient(pkg.type)} opacity-50`} />

                <CardHeader className={`relative ${isPopular ? 'pt-16' : 'pt-8'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getPackageGradient(pkg.type)} border border-border/40`}>
                      {getPackageIcon(pkg.type)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {pkg.nameEn}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                        {parseInt(pkg.priceMin).toLocaleString('ar-SA')}
                      </span>
                      <span className="text-muted-foreground">ريال</span>
                    </div>
                    {pkg.priceMax && (
                      <p className="text-sm text-muted-foreground">
                        حتى {parseInt(pkg.priceMax).toLocaleString('ar-SA')} ريال
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    {pkg.description}
                  </p>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  <div className="space-y-3">
                    {features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Package Details */}
                  <div className="pt-4 border-t border-border/40 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">الأطر التنظيمية:</span>
                      <span className="font-semibold">
                        {pkg.includedFrameworks || 'غير محدود'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ساعات الاستشارات:</span>
                      <span className="font-semibold">
                        {pkg.consultingHours || 'غير محدود'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ساعات التدريب:</span>
                      <span className="font-semibold">{pkg.trainingHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">مستوى الدعم:</span>
                      <Badge variant="outline" className="text-xs">
                        {pkg.supportLevel === 'basic' && 'أساسي'}
                        {pkg.supportLevel === 'standard' && 'متقدم'}
                        {pkg.supportLevel === 'premium' && 'مميز'}
                        {pkg.supportLevel === 'dedicated' && 'مخصص'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="relative">
                  <Button
                    asChild
                    className={`w-full ${
                      isPopular
                        ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
                        : ''
                    }`}
                    variant={isPopular ? 'default' : 'outline'}
                    size="lg"
                  >
                    <Link href="/contact">اطلب استشارة مجانية</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">
                لست متأكداً من الباقة المناسبة؟
              </h3>
              <p className="text-muted-foreground mb-6">
                تواصل مع فريقنا للحصول على استشارة مجانية وتحديد الحل الأمثل لاحتياجات مؤسستك
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                  <Link href="/contact">تحدث مع خبير</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">احجز اجتماع تعريفي</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
