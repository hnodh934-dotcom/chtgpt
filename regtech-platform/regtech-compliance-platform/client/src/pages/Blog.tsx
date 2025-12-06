import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, Tag } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const CATEGORIES = {
  news: "أخبار",
  regulatory: "تنظيمي",
  guide: "دليل",
  case_study: "دراسة حالة",
  announcement: "إعلان",
};

export default function Blog() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();

  const { data, isLoading } = trpc.blog.list.useQuery({
    page,
    limit: 9,
    category: category as any,
  });

  const { data: featuredPosts } = trpc.blog.featured.useQuery({ limit: 3 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            المدونة والأخبار
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            آخر الأخبار والتحديثات التنظيمية والإرشادات
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts && featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              المقالات المميزة
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className="group block bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                          {CATEGORIES[post.category]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: ar })}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.viewCount}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={!category ? "default" : "outline"}
            onClick={() => setCategory(undefined)}
            size="sm"
          >
            الكل
          </Button>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <Button
              key={key}
              variant={category === key ? "default" : "outline"}
              onClick={() => setCategory(key)}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : data && data.posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {data.posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className="group block bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                          {CATEGORIES[post.category]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.publishedAt), "d MMM yyyy", { locale: ar })}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.viewCount}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  السابق
                </Button>
                <span className="flex items-center px-4 text-slate-700 dark:text-slate-300">
                  صفحة {page} من {data.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data.pagination.totalPages}
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              لا توجد مقالات في هذه الفئة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
