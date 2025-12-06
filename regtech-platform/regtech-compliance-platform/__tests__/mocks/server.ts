import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * MSW Server للاختبارات
 */
export const server = setupServer(...handlers);

/**
 * Setup MSW server قبل جميع الاختبارات
 */
export function setupMSW() {
  // تفعيل MSW server قبل جميع الاختبارات
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "warn" });
  });

  // إعادة تعيين handlers بعد كل اختبار
  afterEach(() => {
    server.resetHandlers();
  });

  // إغلاق MSW server بعد جميع الاختبارات
  afterAll(() => {
    server.close();
  });
}
