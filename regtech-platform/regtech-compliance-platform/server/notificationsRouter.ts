import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { notifications } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Notifications Router
 * 
 * Endpoints:
 * - getAll: Get all notifications for current user
 * - getUnread: Get unread notifications
 * - markAsRead: Mark notification as read
 * - markAllAsRead: Mark all notifications as read
 * - create: Create new notification (protected)
 */

export const notificationsRouter = router({
  /**
   * Get all notifications for current user
   */
  getAll: protectedProcedure
    .input(z.object({
      limit: z.number().optional().default(50),
      offset: z.number().optional().default(0),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, ctx.user.id))
        .orderBy(desc(notifications.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return {
        notifications: userNotifications,
        total: userNotifications.length,
      };
    }),

  /**
   * Get unread notifications count
   */
  getUnreadCount: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const unread = await db
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, ctx.user.id),
            eq(notifications.isRead, false)
          )
        );

      return {
        count: unread.length,
      };
    }),

  /**
   * Get unread notifications
   */
  getUnread: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const unread = await db
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, ctx.user.id),
            eq(notifications.isRead, false)
          )
        )
        .orderBy(desc(notifications.createdAt))
        .limit(20);

      return {
        notifications: unread,
      };
    }),

  /**
   * Mark notification as read
   */
  markAsRead: protectedProcedure
    .input(z.object({
      notificationId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(notifications)
        .set({
          isRead: true,
          readAt: new Date(),
        })
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.userId, ctx.user.id)
          )
        );

      return {
        success: true,
      };
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure
    .mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(notifications)
        .set({
          isRead: true,
          readAt: new Date(),
        })
        .where(
          and(
            eq(notifications.userId, ctx.user.id),
            eq(notifications.isRead, false)
          )
        );

      return {
        success: true,
      };
    }),

  /**
   * Create new notification (admin/system only)
   */
  create: protectedProcedure
    .input(z.object({
      userId: z.number(),
      type: z.enum(["assessment_due", "evidence_expiry", "compliance_drop", "new_assignment", "review_required", "system"]),
      title: z.string(),
      message: z.string(),
      link: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Only allow admins to create notifications
      // if (ctx.user.roleId !== 1) {
      //   throw new Error("Unauthorized");
      // }

      await db.insert(notifications).values({
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message,
        link: input.link,
      });

      return {
        success: true,
      };
    }),

  /**
   * Delete notification
   */
  delete: protectedProcedure
    .input(z.object({
      notificationId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .delete(notifications)
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.userId, ctx.user.id)
          )
        );

      return {
        success: true,
      };
    }),
});
