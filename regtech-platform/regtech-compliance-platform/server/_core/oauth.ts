import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ensureUserOnboarded } from "./onboarding";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    const error = getQueryParam(req, "error");
    const errorDescription = getQueryParam(req, "error_description");

    // Handle OAuth errors from provider
    if (error) {
      console.error("[OAuth] Provider error:", error, errorDescription);
      return res.redirect(302, `/?oauth_error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      console.error("[OAuth] Missing code or state");
      return res.redirect(302, "/?oauth_error=missing_params");
    }

    try {
      console.log("[OAuth] Exchanging code for token...");
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      console.log("[OAuth] Token received, getting user info...");
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        console.error("[OAuth] openId missing from user info");
        return res.redirect(302, "/?oauth_error=no_openid");
      }

      console.log("[OAuth] User info received, starting onboarding...");
      // Onboarding: إنشاء مؤسسة وتعيين دور للمستخدم الجديد
      await ensureUserOnboarded(
        userInfo.openId,
        userInfo.name || null,
        userInfo.email ?? null
      );

      // تحديث lastSignedIn
      await db.upsertUser({
        openId: userInfo.openId,
        lastSignedIn: new Date(),
      });

      console.log("[OAuth] Creating session token...");
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      console.log("[OAuth] Authentication successful, redirecting to home");
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed:", error);
      const errorMsg = error instanceof Error ? error.message : "unknown_error";
      res.redirect(302, `/?oauth_error=${encodeURIComponent(errorMsg)}`);
    }
  });

  // Health check endpoint
  app.get("/api/oauth/health", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "OAuth service is running" });
  });
}
