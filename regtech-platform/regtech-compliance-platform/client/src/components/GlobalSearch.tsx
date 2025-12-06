import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Shield, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

/**
 * مكون البحث الشامل الذكي - نظام بحث فوري عبر جميع طبقات المنصة
 * Global Smart Search Component - Instant search across all platform layers
 */
export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch frameworks for search
  const { data: frameworks, isLoading: frameworksLoading } = trpc.frameworks.list.useQuery(
    undefined,
    { enabled: query.length >= 2 }
  );

  // Filter results based on query
  const searchResults = frameworks?.filter(framework => {
    const searchLower = query.toLowerCase();
    return (
      framework.name.toLowerCase().includes(searchLower) ||
      framework.name.toLowerCase().includes(searchLower) ||
      framework.code.toLowerCase().includes(searchLower) ||
      framework.description?.toLowerCase().includes(searchLower) ||
      framework.authority?.toLowerCase().includes(searchLower)
    );
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (frameworkId: number) => {
    setLocation(`/frameworks/${frameworkId}`);
    setIsOpen(false);
    setQuery("");
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-foreground font-medium">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Search Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border bg-background",
          "hover:bg-muted/50 transition-colors text-sm text-muted-foreground",
          "w-64"
        )}
      >
        <Search className="w-4 h-4" />
        <span>بحث...</span>
        <kbd className="mr-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />

          {/* Search Panel */}
          <Card className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 border-2 shadow-2xl">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث في الأطر التنظيمية، الضوابط، المواد..."
                  className="pr-10 pl-10 h-12 text-base"
                  dir="rtl"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Tips */}
              {!query && (
                <div className="mt-3 text-xs text-muted-foreground">
                  <p>ابحث عن: اسم الإطار، الرمز، الجهة المصدرة، أو أي كلمة مفتاحية</p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.length < 2 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>أدخل حرفين على الأقل للبحث</p>
                </div>
              ) : frameworksLoading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="divide-y">
                  {searchResults.map((framework) => (
                    <button
                      key={framework.id}
                      onClick={() => handleSelect(framework.id)}
                      className="w-full p-4 text-right hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-medium text-foreground">
                              {highlightMatch(framework.name, query)}
                            </h3>
                            <Badge variant="outline" className="text-xs font-mono">
                              {highlightMatch(framework.code, query)}
                            </Badge>
                            {true && (
                              <Badge variant="default" className="text-xs">
                                إلزامي
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {highlightMatch(framework.description || "", query)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {highlightMatch(framework.authority || '', query)}
                          </p>
                        </div>
                        <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>لم يتم العثور على نتائج</p>
                  <p className="text-xs mt-1">جرب كلمات مفتاحية أخرى</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono">↓</kbd>
                  <span>للتنقل</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono">Enter</kbd>
                  <span>للفتح</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border bg-background font-mono">Esc</kbd>
                <span>للإغلاق</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
