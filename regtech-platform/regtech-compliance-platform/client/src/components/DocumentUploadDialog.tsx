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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadDialogProps {
  documentType: string;
  documentTypeAr: string;
  required?: boolean;
  onUpload?: (file: File) => void;
}

/**
 * 📄 Document Upload Dialog
 * نموذج رفع الوثائق
 */
export function DocumentUploadDialog({
  documentType,
  documentTypeAr,
  required = false,
  onUpload,
}: DocumentUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 10MB");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("نوع الملف غير مدعوم. استخدم JPG أو PNG أو PDF");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("اختر ملف أولاً");
      return;
    }

    setUploading(true);
    try {
      // TODO: Upload to S3 using storagePut
      // For now, just simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadedFile(file);
      onUpload?.(file);
      toast.success("تم رفع الملف بنجاح");

      // Reset form
      setTimeout(() => {
        setFile(null);
        setOpen(false);
      }, 1000);
    } catch (error) {
      toast.error("فشل رفع الملف");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          رفع وثيقة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>رفع {documentTypeAr}</DialogTitle>
          <DialogDescription>
            اختر ملف من جهازك لرفعه (JPG, PNG, PDF)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload Area */}
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {file ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="font-medium text-sm">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="font-medium text-sm">اضغط لاختيار ملف</span>
                  <span className="text-xs text-gray-500">أو اسحب الملف هنا</span>
                </>
              )}
            </label>
          </div>

          {/* File Info */}
          {uploadedFile && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                تم رفع الملف: {uploadedFile.name}
              </AlertDescription>
            </Alert>
          )}

          {/* Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              متطلبات الملف
            </h4>
            <ul className="text-xs text-blue-900 space-y-1">
              <li>• الحد الأقصى للحجم: 10 MB</li>
              <li>• الصيغ المدعومة: JPG, PNG, PDF</li>
              <li>• يجب أن تكون الوثيقة واضحة وقابلة للقراءة</li>
              {required && <li>• هذه الوثيقة مطلوبة</li>}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setOpen(false);
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? "جاري الرفع..." : "رفع الملف"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
