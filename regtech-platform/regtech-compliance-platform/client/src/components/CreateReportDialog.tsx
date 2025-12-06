import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CreateReportDialogProps {
  reportTypes: Array<{
    value: string;
    label: string;
    authority: string;
  }>;
  onCreateReport?: (reportType: string, period: string) => void;
}

/**
 * 📋 Create Report Dialog
 * نموذج إنشاء تقرير جديد
 */
export function CreateReportDialog({
  reportTypes,
  onCreateReport,
}: CreateReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("");
  const [period, setPeriod] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!reportType || !period) {
      toast.error("اختر نوع التقرير والفترة الزمنية");
      return;
    }

    setCreating(true);
    try {
      // TODO: Call API to create report
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onCreateReport?.(reportType, period);
      toast.success("تم إنشاء التقرير بنجاح");

      // Reset form
      setTimeout(() => {
        setReportType("");
        setPeriod("");
        setOpen(false);
      }, 1000);
    } catch (error) {
      toast.error("فشل إنشاء التقرير");
    } finally {
      setCreating(false);
    }
  };

  const selectedReport = reportTypes.find((r) => r.value === reportType);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <FileText className="h-4 w-4" />
          إنشاء تقرير جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إنشاء تقرير جديد</DialogTitle>
          <DialogDescription>
            اختر نوع التقرير والفترة الزمنية
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">نوع التقرير</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع التقرير" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {type.label}
                      <Badge className="text-xs">{type.authority}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Period */}
          <div>
            <label className="text-sm font-medium mb-2 block">الفترة الزمنية</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">يناير 2025</SelectItem>
                <SelectItem value="2024-12">ديسمبر 2024</SelectItem>
                <SelectItem value="2024-11">نوفمبر 2024</SelectItem>
                <SelectItem value="2024-Q4">Q4 2024</SelectItem>
                <SelectItem value="2024-Q3">Q3 2024</SelectItem>
                <SelectItem value="2024-Q2">Q2 2024</SelectItem>
                <SelectItem value="2024-Q1">Q1 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Report Info */}
          {selectedReport && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">{selectedReport.label}</h4>
              <p className="text-xs text-gray-600">
                سيتم إنشاء تقرير {selectedReport.label} للفترة {period}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setReportType("");
                setPeriod("");
                setOpen(false);
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!reportType || !period || creating}
              className="bg-green-600 hover:bg-green-700"
            >
              {creating ? "جاري الإنشاء..." : "إنشاء التقرير"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
