# منصة الامتثال القانوني والتقني | RegTech Compliance Platform

> منصة سعودية متكاملة لإدارة الامتثال التنظيمي والتقني للمؤسسات المالية والتقنية

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

---

## 📋 نظرة عامة

منصة RegTech متخصصة في مساعدة المؤسسات السعودية على الامتثال للأنظمة واللوائح التنظيمية. تغطي المنصة 7 أطر تنظيمية رئيسية:

- **PDPL** - نظام حماية البيانات الشخصية
- **ECC** - الضوابط الأساسية للأمن السيبراني
- **AML/CFT** - مكافحة غسل الأموال وتمويل الإرهاب
- **نظام المدفوعات** - تنظيم خدمات الدفع
- **مختبر التقنية المالية** - تعليمات Fintech Lab
- **التمويل الجماعي** - قواعد Crowdfunding
- **نظام الشركات** - قانون الشركات السعودي

---

## 🏗️ البنية التقنية

### Stack الأساسي

**Frontend:**
- React 19 + TypeScript 5.7
- Tailwind CSS 4 + shadcn/ui
- tRPC Client + React Query
- Wouter (Routing)

**Backend:**
- Node.js 22 + Express 4
- tRPC 11 (Type-safe APIs)
- Drizzle ORM + MySQL/TiDB
- Manus OAuth (Authentication)

**Infrastructure:**
- Multi-tenancy (عزل كامل للبيانات)
- RBAC (9 أدوار + صلاحيات مفصلة)
- Audit Logging (تسجيل شامل)
- Feature Flags (تحكم في الميزات)

### قاعدة البيانات

**21 جدول** منظم في 5 مجموعات:

1. **Core** - users, organizations, roles, permissions
2. **Business** - projects, tasks, documents, meetings
3. **Commercial** - packages, subscriptions, invoices, payments
4. **Support** - support_tickets, support_replies, leads
5. **Regulatory** - frameworks, controls, articles, provisions, edges
6. **Audit** - audit_logs

---

## 🚀 التشغيل السريع

### المتطلبات

- Node.js 22+
- pnpm 9+
- MySQL 8+ أو TiDB
- حساب Manus (للـ OAuth)

### التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd regtech-compliance-platform

# 2. تثبيت الحزم
pnpm install

# 3. إعداد البيئة
cp .env.example .env
# عدّل .env بالقيم الصحيحة

# 4. تطبيق Schema
pnpm db:push

# 5. Seed البيانات الأولية
pnpm tsx server/seed-commercial.ts
pnpm tsx server/seed-regulatory.ts

# 6. تشغيل المشروع
pnpm dev
```

المشروع سيعمل على `http://localhost:3000`

---

## 🔐 المصادقة والأدوار

### نظام OAuth

المنصة تستخدم **Manus OAuth** للمصادقة. عند أول تسجيل دخول:
- يُنشأ مؤسسة تلقائياً للمستخدم
- المالك يحصل على دور "مدير النظام"
- المستخدمون الآخرون يحصلون على دور "عميل"

### الأدوار (9 أدوار)

| الدور | Level | الوصف |
|------|-------|-------|
| مدير النظام | 10 | صلاحيات كاملة على كل شيء |
| مدير المؤسسة | 8 | إدارة المؤسسة والمستخدمين |
| محامي رئيسي | 7 | إدارة الاستشارات القانونية |
| استشاري تقني رئيسي | 7 | إدارة الاستشارات التقنية |
| مدير مشروع | 6 | إدارة المشاريع والمهام |
| محامي | 5 | استشارات قانونية |
| استشاري تقني | 5 | استشارات تقنية |
| دعم فني | 4 | دعم العملاء |
| عميل | 2 | الوصول الأساسي |

**راجع `PERMISSIONS_MATRIX.md` للتفاصيل الكاملة**

---

## 📡 APIs

### بنية tRPC

جميع APIs موثقة بـ **Zod schemas** وآمنة بـ **TypeScript**.

```typescript
// مثال: استدعاء API من Frontend
const { data } = trpc.projects.list.useQuery({
  organizationId: 1,
  status: 'active'
});
```

### المجموعات الرئيسية

- `auth.*` - المصادقة
- `roles.*` - الأدوار
- `permissions.*` - الصلاحيات
- `projects.*` - المشاريع
- `tasks.*` - المهام
- `documents.*` - الوثائق
- `packages.*` - الباقات
- `subscriptions.*` - الاشتراكات
- `invoices.*` - الفواتير
- `payments.*` - المدفوعات
- `meetings.*` - الاجتماعات
- `supportTickets.*` - تذاكر الدعم
- `supportReplies.*` - ردود الدعم
- `leads.*` - العملاء المحتملين
- `auditLogs.*` - سجلات التدقيق
- `frameworks.*` - الأطر التنظيمية (public)
- `controls.*` - الضوابط (public)
- `articles.*` - المواد القانونية (public)

**راجع `API_DOCUMENTATION.md` للتفاصيل الكاملة**

---

## 🔒 الأمان

### Multi-tenancy

- **عزل كامل** للبيانات بين المؤسسات
- كل API محمي بـ `organizationId`
- منع الوصول للبيانات عبر المؤسسات

### RBAC (Role-Based Access Control)

- كل API محمي بصلاحيات
- 4 أنواع صلاحيات: `read`, `create`, `update`, `delete`
- التحقق التلقائي من الصلاحيات في كل طلب

### Audit Logging

- تسجيل شامل لكل العمليات الحساسة
- معلومات مسجلة: user, organization, resource, action, changes, IP, timestamp
- API للاستعلام عن السجلات

---

## 🧪 الاختبارات

### تشغيل الاختبارات

```bash
# جميع الاختبارات
pnpm test

# اختبارات محددة
pnpm test server/e2e.test.ts
```

### التغطية

- ✅ 18 اختبار E2E
- ✅ Database Connection
- ✅ Roles & Permissions
- ✅ Packages System
- ✅ Regulatory Frameworks
- ✅ Controls System

---

## 📦 الباقات التجارية

### 3 باقات

| الباقة | السعر | الميزات |
|--------|-------|---------|
| **Starter** | 50-100K SAR | للشركات الصغيرة |
| **Growth** | 150-300K SAR | للشركات المتوسطة |
| **Enterprise** | 500K+ SAR | للمؤسسات الكبيرة |

---

## 🗂️ هيكل المشروع

```
regtech-compliance-platform/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/         # صفحات التطبيق
│   │   ├── components/    # مكونات UI
│   │   ├── lib/           # tRPC client
│   │   └── hooks/         # React hooks
│   └── public/            # ملفات ثابتة
├── server/                # Backend (Node.js + tRPC)
│   ├── routers.ts         # tRPC routers
│   ├── db.ts              # Database functions
│   ├── _core/             # Core utilities
│   │   ├── oauth.ts       # OAuth handling
│   │   ├── permissions.ts # Permissions helpers
│   │   ├── audit.ts       # Audit logging
│   │   └── onboarding.ts  # User onboarding
│   ├── seed-commercial.ts # Seed: roles, packages
│   └── seed-regulatory.ts # Seed: frameworks, controls
├── drizzle/               # Database schema
│   └── schema.ts          # جميع الجداول
├── tests/                 # اختبارات E2E
└── docs/                  # توثيق إضافي
```

---

## 🌍 Environment Variables

### المتغيرات المطلوبة

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# OAuth (Manus)
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
JWT_SECRET=your_jwt_secret

# Owner Info
OWNER_OPEN_ID=owner_open_id
OWNER_NAME=Owner Name

# App Info
VITE_APP_TITLE=منصة الامتثال القانوني والتقني
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# Manus Built-in APIs
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your_api_key
VITE_FRONTEND_FORGE_API_KEY=your_frontend_key
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
```

**راجع `.env.example` للقائمة الكاملة**

---

## 📚 التوثيق الإضافي

- [`PERMISSIONS_MATRIX.md`](./PERMISSIONS_MATRIX.md) - مصفوفة الصلاحيات الكاملة
- [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) - توثيق APIs بالتفصيل
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - دليل النشر
- [`CHANGELOG.md`](./CHANGELOG.md) - سجل التغييرات

---

## 🛠️ التطوير

### الأوامر المتاحة

```bash
# تطوير
pnpm dev              # تشغيل dev server
pnpm build            # بناء للإنتاج
pnpm preview          # معاينة البناء

# قاعدة البيانات
pnpm db:push          # تطبيق schema
pnpm db:studio        # Drizzle Studio

# اختبارات
pnpm test             # تشغيل الاختبارات
pnpm test:watch       # وضع المراقبة

# جودة الكود
pnpm lint             # فحص الكود
pnpm type-check       # فحص TypeScript
```

### المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📄 الترخيص

هذا المشروع **ملكية خاصة** ومحمي بحقوق النشر. جميع الحقوق محفوظة.

---

## 📞 الدعم

للدعم الفني أو الاستفسارات:
- البريد الإلكتروني: support@regtech-platform.sa
- الموقع: https://regtech-platform.sa
- الدعم الفني: https://help.regtech-platform.sa

---

## 🙏 شكر وتقدير

تم بناء هذه المنصة باستخدام:
- [React](https://react.dev/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Manus Platform](https://manus.im/)

---

**Built with ❤️ in Saudi Arabia**
