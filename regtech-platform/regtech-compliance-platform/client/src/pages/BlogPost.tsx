import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

const CATEGORIES = {
  news: "أخبار",
  regulatory: "تنظيمي",
  guide: "دليل",
  case_study: "دراسة حالة",
  announcement: "إعلان",
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            المقال غير موجود
          </h2>
          <Link href="/blog">
            <a>
              <Button>
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة للمدونة
              </Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <a className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8">
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للمدونة
          </a>
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
              {CATEGORIES[post.category]}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            {post.authorName && (
              <span className="font-medium">
                بواسطة: {post.authorName}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: ar })}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {post.viewCount} مشاهدة
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Share Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="mb-8"
          >
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة المقال
          </Button>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-right" dir="rtl">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {JSON.parse(post.tags).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            هل تحتاج مساعدة في الامتثال التنظيمي؟
          </h3>
          <p className="text-blue-100 mb-6">
            تواصل معنا اليوم للحصول على استشارة مجانية
          </p>
          <Link href="/contact">
            <a>
              <Button size="lg" variant="secondary">
                تواصل معنا
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
