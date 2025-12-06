import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  limit?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  total,
  limit,
}: PaginationProps) {
  const startItem = total && limit ? (currentPage - 1) * limit + 1 : null;
  const endItem = total && limit ? Math.min(currentPage * limit, total) : null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 px-2">
      {/* معلومات العناصر */}
      {startItem && endItem && total && (
        <div className="text-sm text-muted-foreground">
          عرض <span className="font-medium">{startItem}</span> إلى{" "}
          <span className="font-medium">{endItem}</span> من{" "}
          <span className="font-medium">{total}</span> عنصر
        </div>
      )}

      {/* أزرار التنقل */}
      <div className="flex items-center gap-2">
        {/* الذهاب للصفحة الأولى */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>

        {/* الصفحة السابقة */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* أرقام الصفحات */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number"}
              className="h-8 min-w-[32px]"
            >
              {page}
            </Button>
          ))}
        </div>

        {/* الصفحة التالية */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* الذهاب للصفحة الأخيرة */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
