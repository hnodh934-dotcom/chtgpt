import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, Plus, Calendar, User, Building2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Projects() {
  const { user, loading: authLoading } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    type: "assessment" as const,
    status: "lead" as const,
  });

  const { data: projects, isLoading, refetch } = trpc.projects.list.useQuery({ organizationId: 1 });

  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      toast.success("تم إنشاء المشروع بنجاح");
      setIsCreateDialogOpen(false);
      setNewProject({ name: "", description: "", type: "assessment", status: "lead" });
      refetch();
    },
    onError: (error) => {
      toast.error("حدث خطأ", { description: error.message });
    },
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast.error("الرجاء إدخال اسم المشروع");
      return;
    }

    createProject.mutate({
      organizationId: 1, // TODO: استخدام organizationId من المستخدم
      name: newProject.name,
      description: newProject.description || undefined,
      type: newProject.type,
      status: newProject.status,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      lead: { label: "عميل محتمل", variant: "secondary" as const },
      proposal: { label: "عرض", variant: "outline" as const },
      contracted: { label: "متعاقد", variant: "default" as const },
      kickoff: { label: "بداية", variant: "default" as const },
      in_progress: { label: "قيد التنفيذ", variant: "default" as const },
      review: { label: "مراجعة", variant: "outline" as const },
      completed: { label: "مكتمل", variant: "default" as const },
      cancelled: { label: "ملغي", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.lead;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">المشاريع</h1>
            <p className="text-muted-foreground mt-1">
              إدارة جميع مشاريع الامتثال القانوني والتقني
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="w-4 h-4 ml-2" />
                مشروع جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>إنشاء مشروع جديد</DialogTitle>
                <DialogDescription>
                  أضف مشروع امتثال جديد لإدارة المهام والوثائق
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم المشروع *</Label>
                  <Input
                    id="name"
                    placeholder="مثال: مشروع الامتثال لـ PDPL"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مختصر للمشروع..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="text-right resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">نوع المشروع</Label>
                  <Select
                    value={newProject.type}
                    onValueChange={(value: any) => setNewProject({ ...newProject, type: value })}
                  >
                    <SelectTrigger id="type" className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assessment">تقييم</SelectItem>
                      <SelectItem value="implementation">تنفيذ</SelectItem>
                      <SelectItem value="audit">مراجعة</SelectItem>
                      <SelectItem value="consulting">استشارات</SelectItem>
                      <SelectItem value="training">تدريب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">الحالة</Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value: any) => setNewProject({ ...newProject, status: value })}
                  >
                    <SelectTrigger id="status" className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">عميل محتمل</SelectItem>
                      <SelectItem value="proposal">عرض</SelectItem>
                      <SelectItem value="contracted">متعاقد</SelectItem>
                      <SelectItem value="kickoff">بداية</SelectItem>
                      <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={createProject.isPending}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  {createProject.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    "إنشاء المشروع"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !projects || projects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد مشاريع بعد</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                ابدأ بإنشاء مشروع امتثال جديد لإدارة المهام والوثائق
              </p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء أول مشروع
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                    <CardTitle className="text-xl line-clamp-1">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">
                      {project.description || "لا يوجد وصف"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {project.startDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            بدأ في {new Date(project.startDate).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                      )}

                      {project.projectManagerId && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>مدير المشروع #{project.projectManagerId}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>المؤسسة #{project.organizationId}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        تم الإنشاء {new Date(project.createdAt).toLocaleDateString("ar-SA")}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <span>عرض التفاصيل ←</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
