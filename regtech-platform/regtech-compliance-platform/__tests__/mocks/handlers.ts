import { http, HttpResponse } from "msw";
import { mockLLMResponses } from "./llm";

/**
 * MSW Handlers للـ API mocking
 */
export const handlers = [
  // Mock tRPC endpoints
  http.post("/api/trpc/*", async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // استخراج اسم الـ procedure
    const procedureName = pathname.split("/").pop();

    // Mock responses بناءً على الـ procedure
    switch (procedureName) {
      case "regadvisor.ask":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.regAdvisor.simpleQuestion.choices[0].message.content
          }
        });

      case "regadvisor.analyzeDocument":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.regAdvisor.documentAnalysis.choices[0].message.content
          }
        });

      case "regdrafter.draftPolicy":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.regDrafter.policyDraft.choices[0].message.content
          }
        });

      case "regdrafter.reviewPolicy":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.regDrafter.policyReview.choices[0].message.content
          }
        });

      case "raac.exportRules":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.raac.rulesExport.choices[0].message.content
          }
        });

      case "raac.validateData":
        return HttpResponse.json({
          result: {
            data: mockLLMResponses.raac.dataValidation.choices[0].message.content
          }
        });

      // Mock authentication
      case "auth.me":
        return HttpResponse.json({
          result: {
            data: {
              id: 1,
              openId: "test-user-1",
              name: "Test User",
              email: "test@example.com",
              role: "user"
            }
          }
        });

      case "auth.logout":
        return HttpResponse.json({
          result: {
            data: { success: true }
          }
        });

      // Mock frameworks
      case "frameworks.list":
        return HttpResponse.json({
          result: {
            data: [
              {
                id: 1,
                code: "PDPL",
                nameAr: "نظام حماية البيانات الشخصية",
                nameEn: "Personal Data Protection Law",
                authority: "SDAIA",
                sector: "General",
                status: "active"
              },
              {
                id: 2,
                code: "ECC",
                nameAr: "الضوابط الأساسية للأمن السيبراني",
                nameEn: "Essential Cybersecurity Controls",
                authority: "NCA",
                sector: "Cybersecurity",
                status: "active"
              }
            ]
          }
        });

      // Mock controls
      case "controls.list":
        return HttpResponse.json({
          result: {
            data: {
              controls: [
                {
                  id: 1,
                  frameworkId: 1,
                  code: "PDPL-1",
                  titleAr: "حماية البيانات الشخصية",
                  titleEn: "Personal Data Protection",
                  category: "Data Protection",
                  priority: "high"
                },
                {
                  id: 2,
                  frameworkId: 1,
                  code: "PDPL-2",
                  titleAr: "الموافقة على معالجة البيانات",
                  titleEn: "Consent for Data Processing",
                  category: "Consent",
                  priority: "high"
                }
              ],
              pagination: {
                page: 1,
                limit: 10,
                total: 2,
                totalPages: 1
              }
            }
          }
        });

      // Mock articles
      case "articles.list":
        return HttpResponse.json({
          result: {
            data: {
              articles: [
                {
                  id: 1,
                  frameworkId: 1,
                  code: "Article-1",
                  titleAr: "المادة الأولى: التعريفات",
                  titleEn: "Article 1: Definitions",
                  chapter: "Chapter 1"
                },
                {
                  id: 2,
                  frameworkId: 1,
                  code: "Article-2",
                  titleAr: "المادة الثانية: نطاق التطبيق",
                  titleEn: "Article 2: Scope of Application",
                  chapter: "Chapter 1"
                }
              ],
              pagination: {
                page: 1,
                limit: 10,
                total: 2,
                totalPages: 1
              }
            }
          }
        });

      // Mock notifications
      case "notifications.list":
        return HttpResponse.json({
          result: {
            data: {
              notifications: [
                {
                  id: 1,
                  userId: 1,
                  type: "info",
                  title: "مرحباً بك",
                  message: "تم إنشاء حسابك بنجاح",
                  isRead: false,
                  createdAt: new Date().toISOString()
                }
              ],
              pagination: {
                page: 1,
                limit: 10,
                total: 1,
                totalPages: 1
              },
              unreadCount: 1
            }
          }
        });

      default:
        return HttpResponse.json({
          result: {
            data: null
          }
        }, { status: 404 });
    }
  }),

  // Mock LLM API
  http.post("*/llm/chat/completions", async () => {
    return HttpResponse.json(mockLLMResponses.regAdvisor.simpleQuestion);
  }),

  // Mock Storage API
  http.put("*/storage/*", async () => {
    return HttpResponse.json({
      url: "https://storage.example.com/test-file.pdf",
      key: "test-file.pdf"
    });
  }),

  http.get("*/storage/*", async () => {
    return HttpResponse.json({
      url: "https://storage.example.com/test-file.pdf",
      key: "test-file.pdf"
    });
  })
];

/**
 * Error handlers للاختبارات
 */
export const errorHandlers = [
  http.post("/api/trpc/*", () => {
    return HttpResponse.json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error"
      }
    }, { status: 500 });
  })
];

/**
 * Unauthorized handlers للاختبارات
 */
export const unauthorizedHandlers = [
  http.post("/api/trpc/*", () => {
    return HttpResponse.json({
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized"
      }
    }, { status: 401 });
  })
];

/**
 * Rate limit handlers للاختبارات
 */
export const rateLimitHandlers = [
  http.post("/api/trpc/*", () => {
    return HttpResponse.json({
      error: {
        code: "TOO_MANY_REQUESTS",
        message: "Rate limit exceeded"
      }
    }, { status: 429 });
  })
];
