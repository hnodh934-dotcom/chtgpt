import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

/**
 * Blog Router - إدارة مقالات المدونة
 */
export const blogRouter = router({
  /**
   * الحصول على جميع المقالات المنشورة (مع pagination)
   */
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        category: z.enum(["news", "regulatory", "guide", "case_study", "announcement"]).optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const page = input?.page || 1;
      const limit = input?.limit || 10;
      const offset = (page - 1) * limit;

      const conditions = [
        eq(blogPosts.status, "published"),
      ];

      if (input?.category) {
        conditions.push(eq(blogPosts.category, input.category));
      }

      const posts = await db
        .select()
        .from(blogPosts)
        .where(and(...conditions))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit)
        .offset(offset);

      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(blogPosts)
        .where(and(...conditions));

      return {
        posts,
        pagination: {
          page,
          limit,
          total: Number(count),
          totalPages: Math.ceil(Number(count) / limit),
        },
      };
    }),

  /**
   * الحصول على مقال واحد بواسطة slug
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const [post] = await db
        .select()
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.slug, input.slug),
            eq(blogPosts.status, "published")
          )
        )
        .limit(1);

      if (!post) {
        throw new Error("Post not found");
      }

      // زيادة عدد المشاهدات
      await db
        .update(blogPosts)
        .set({ viewCount: post.viewCount + 1 })
        .where(eq(blogPosts.id, post.id));

      return { ...post, viewCount: post.viewCount + 1 };
    }),

  /**
   * الحصول على المقالات المميزة
   */
  featured: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(3) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const limit = input?.limit || 3;

      const posts = await db
        .select()
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.status, "published"),
            eq(blogPosts.featured, true)
          )
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit);

      return posts;
    }),

  /**
   * إنشاء مقال جديد (محمي - للمسؤولين فقط)
   */
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5).max(500),
        slug: z.string().min(3).max(500),
        excerpt: z.string().min(20),
        content: z.string().min(50),
        coverImage: z.string().url().optional(),
        category: z.enum(["news", "regulatory", "guide", "case_study", "announcement"]),
        tags: z.array(z.string()).optional(),
        status: z.enum(["draft", "published"]).default("draft"),
        featured: z.boolean().default(false),
        seoTitle: z.string().max(255).optional(),
        seoDescription: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const [result] = await db.insert(blogPosts).values({
        ...input,
        tags: input.tags ? JSON.stringify(input.tags) : null,
        authorId: ctx.user.id,
        authorName: ctx.user.name || "Admin",
        publishedAt: input.status === "published" ? new Date() : null,
      });

      return {
        success: true,
        postId: result.insertId,
      };
    }),
});
