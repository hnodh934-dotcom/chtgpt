# توثيق APIs | API Documentation

> دليل شامل لجميع APIs في منصة الامتثال القانوني والتقني

---

## 📡 نظرة عامة

المنصة تستخدم **tRPC** لبناء APIs type-safe. جميع APIs موثقة بـ Zod schemas وآمنة بـ TypeScript.

**Base URL:** `/api/trpc`

**Authentication:** جميع APIs (ما عدا public) تتطلب تسجيل دخول عبر Manus OAuth

---

## 🔐 المصادقة (Authentication)

### `auth.me`

**الوصف:** الحصول على معلومات المستخدم الحالي

**النوع:** Query

**الصلاحيات:** Public

**Input:** لا يوجد

**Output:**
```typescript
{
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  roleId: number | null;
  organizationId: number | null;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
} | null
```

**مثال:**
```typescript
const { data: user } = trpc.auth.me.useQuery();
```

---

### `auth.logout`

**الوصف:** تسجيل الخروج

**النوع:** Mutation

**الصلاحيات:** Public

**Input:** لا يوجد

**Output:**
```typescript
{
  success: true
}
```

**مثال:**
```typescript
const logout = trpc.auth.logout.useMutation();
await logout.mutateAsync();
```

---

## 👥 الأدوار (Roles)

### `roles.list`

**الوصف:** الحصول على قائمة الأدوار

**النوع:** Query

**الصلاحيات:** `role:read`

**Input:** لا يوجد

**Output:**
```typescript
Array<{
  id: number;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: roles } = trpc.roles.list.useQuery();
```

---

### `roles.getById`

**الوصف:** الحصول على دور بالمعرف

**النوع:** Query

**الصلاحيات:** `role:read`

**Input:**
```typescript
{
  id: number;
}
```

**Output:**
```typescript
{
  id: number;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  level: number;
  createdAt: Date;
  updatedAt: Date;
} | undefined
```

**مثال:**
```typescript
const { data: role } = trpc.roles.getById.useQuery({ id: 1 });
```

---

## 🔑 الصلاحيات (Permissions)

### `permissions.list`

**الوصف:** الحصول على قائمة الصلاحيات

**النوع:** Query

**الصلاحيات:** `permission:read`

**Input:** لا يوجد

**Output:**
```typescript
Array<{
  id: number;
  roleId: number;
  resource: string;
  action: string;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: permissions } = trpc.permissions.list.useQuery();
```

---

### `permissions.getByRole`

**الوصف:** الحصول على صلاحيات دور معين

**النوع:** Query

**الصلاحيات:** `permission:read`

**Input:**
```typescript
{
  roleId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  roleId: number;
  resource: string;
  action: string;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: permissions } = trpc.permissions.getByRole.useQuery({ roleId: 1 });
```

---

## 📁 المشاريع (Projects)

### `projects.list`

**الوصف:** الحصول على قائمة المشاريع

**النوع:** Query

**الصلاحيات:** `project:read`

**Input:**
```typescript
{
  organizationId: number;
  status?: string;
}
```

**Output:**
```typescript
Array<{
  id: number;
  organizationId: number;
  name: string;
  description: string | null;
  type: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: string | null;
  managerId: number | null;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: projects } = trpc.projects.list.useQuery({
  organizationId: 1,
  status: 'active'
});
```

---

### `projects.getById`

**الوصف:** الحصول على مشروع بالمعرف

**النوع:** Query

**الصلاحيات:** `project:read`

**Input:**
```typescript
{
  id: number;
}
```

**Output:**
```typescript
{
  id: number;
  organizationId: number;
  name: string;
  description: string | null;
  type: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: string | null;
  managerId: number | null;
  createdAt: Date;
  updatedAt: Date;
} | undefined
```

**مثال:**
```typescript
const { data: project } = trpc.projects.getById.useQuery({ id: 1 });
```

---

### `projects.create`

**الوصف:** إنشاء مشروع جديد

**النوع:** Mutation

**الصلاحيات:** `project:create`

**Input:**
```typescript
{
  organizationId: number;
  name: string;
  description?: string;
  type: string; // 'assessment' | 'implementation' | 'review' | 'consulting' | 'training'
  status?: string; // 'lead' | 'proposal' | 'contracted' | 'kickoff' | 'in_progress' | 'review' | 'completed' | 'on_hold' | 'cancelled'
  startDate?: Date;
  endDate?: Date;
  budget?: string;
  managerId?: number;
}
```

**Output:**
```typescript
{
  id: number;
  organizationId: number;
  name: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createProject = trpc.projects.create.useMutation();
await createProject.mutateAsync({
  organizationId: 1,
  name: 'مشروع الامتثال لـ PDPL',
  type: 'assessment',
  status: 'kickoff'
});
```

---

### `projects.update`

**الوصف:** تحديث مشروع

**النوع:** Mutation

**الصلاحيات:** `project:update`

**Input:**
```typescript
{
  id: number;
  name?: string;
  description?: string;
  type?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: string;
  managerId?: number;
}
```

**Output:**
```typescript
{
  id: number;
  // ... الحقول المحدثة
}
```

**مثال:**
```typescript
const updateProject = trpc.projects.update.useMutation();
await updateProject.mutateAsync({
  id: 1,
  status: 'in_progress'
});
```

---

## ✅ المهام (Tasks)

### `tasks.list`

**الوصف:** الحصول على قائمة المهام

**النوع:** Query

**الصلاحيات:** `task:read`

**Input:**
```typescript
{
  projectId: number;
  status?: string;
}
```

**Output:**
```typescript
Array<{
  id: number;
  projectId: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignedTo: number | null;
  dueDate: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: tasks } = trpc.tasks.list.useQuery({
  projectId: 1,
  status: 'in_progress'
});
```

---

### `tasks.create`

**الوصف:** إنشاء مهمة جديدة

**النوع:** Mutation

**الصلاحيات:** `task:create`

**Input:**
```typescript
{
  projectId: number;
  title: string;
  description?: string;
  status?: string; // 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'
  priority?: string; // 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: number;
  dueDate?: Date;
}
```

**Output:**
```typescript
{
  id: number;
  projectId: number;
  title: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createTask = trpc.tasks.create.useMutation();
await createTask.mutateAsync({
  projectId: 1,
  title: 'مراجعة سياسة الخصوصية',
  priority: 'high',
  dueDate: new Date('2025-02-01')
});
```

---

## 📄 الوثائق (Documents)

### `documents.list`

**الوصف:** الحصول على قائمة الوثائق

**النوع:** Query

**الصلاحيات:** `document:read`

**Input:**
```typescript
{
  projectId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  projectId: number;
  name: string;
  type: string;
  fileUrl: string;
  fileSize: number | null;
  uploadedBy: number;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: documents } = trpc.documents.list.useQuery({ projectId: 1 });
```

---

### `documents.create`

**الوصف:** إنشاء وثيقة جديدة

**النوع:** Mutation

**الصلاحيات:** `document:create`

**Input:**
```typescript
{
  projectId: number;
  name: string;
  type: string; // 'policy' | 'procedure' | 'report' | 'contract' | 'other'
  fileUrl: string;
  fileSize?: number;
  uploadedBy: number;
}
```

**Output:**
```typescript
{
  id: number;
  projectId: number;
  name: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createDocument = trpc.documents.create.useMutation();
await createDocument.mutateAsync({
  projectId: 1,
  name: 'سياسة حماية البيانات',
  type: 'policy',
  fileUrl: 'https://storage.example.com/docs/policy.pdf',
  uploadedBy: 1
});
```

---

## 📦 الباقات (Packages)

### `packages.list`

**الوصف:** الحصول على قائمة الباقات

**النوع:** Query

**الصلاحيات:** Public

**Input:** لا يوجد

**Output:**
```typescript
Array<{
  id: number;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  priceMin: string;
  priceMax: string | null;
  features: string | null;
  featuresEn: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: packages } = trpc.packages.list.useQuery();
```

---

## 🔄 الاشتراكات (Subscriptions)

### `subscriptions.list`

**الوصف:** الحصول على قائمة الاشتراكات

**النوع:** Query

**الصلاحيات:** `subscription:read`

**Input:**
```typescript
{
  organizationId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  organizationId: number;
  packageId: number;
  status: string;
  startDate: Date;
  endDate: Date | null;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: subscriptions } = trpc.subscriptions.list.useQuery({
  organizationId: 1
});
```

---

### `subscriptions.create`

**الوصف:** إنشاء اشتراك جديد

**النوع:** Mutation

**الصلاحيات:** `subscription:create`

**Input:**
```typescript
{
  organizationId: number;
  packageId: number;
  status?: string; // 'active' | 'expired' | 'cancelled' | 'pending'
  startDate: Date;
  endDate?: Date;
  autoRenew?: boolean;
}
```

**Output:**
```typescript
{
  id: number;
  organizationId: number;
  packageId: number;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createSubscription = trpc.subscriptions.create.useMutation();
await createSubscription.mutateAsync({
  organizationId: 1,
  packageId: 2,
  startDate: new Date(),
  autoRenew: true
});
```

---

## 💰 الفواتير (Invoices)

### `invoices.list`

**الوصف:** الحصول على قائمة الفواتير

**النوع:** Query

**الصلاحيات:** `invoice:read`

**Input:**
```typescript
{
  organizationId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  organizationId: number;
  subscriptionId: number | null;
  invoiceNumber: string;
  amount: string;
  tax: string | null;
  total: string;
  status: string;
  issuedAt: Date;
  dueDate: Date;
  paidAt: Date | null;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: invoices } = trpc.invoices.list.useQuery({
  organizationId: 1
});
```

---

### `invoices.create`

**الوصف:** إنشاء فاتورة جديدة

**النوع:** Mutation

**الصلاحيات:** `invoice:create`

**Input:**
```typescript
{
  organizationId: number;
  subscriptionId?: number;
  invoiceNumber: string;
  amount: string;
  tax?: string;
  total: string;
  status?: string; // 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled'
  issuedAt: Date;
  dueDate: Date;
}
```

**Output:**
```typescript
{
  id: number;
  organizationId: number;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createInvoice = trpc.invoices.create.useMutation();
await createInvoice.mutateAsync({
  organizationId: 1,
  subscriptionId: 1,
  invoiceNumber: 'INV-2025-001',
  amount: '200000',
  tax: '30000',
  total: '230000',
  issuedAt: new Date(),
  dueDate: new Date('2025-02-01')
});
```

---

## 💳 المدفوعات (Payments)

### `payments.list`

**الوصف:** الحصول على قائمة المدفوعات

**النوع:** Query

**الصلاحيات:** `payment:read`

**Input:**
```typescript
{
  organizationId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  invoiceId: number;
  amount: string;
  method: string;
  transactionId: string | null;
  status: string;
  paidAt: Date;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: payments } = trpc.payments.list.useQuery({
  organizationId: 1
});
```

---

### `payments.create`

**الوصف:** إنشاء دفعة جديدة

**النوع:** Mutation

**الصلاحيات:** `payment:create`

**Input:**
```typescript
{
  invoiceId: number;
  amount: string;
  method: string; // 'credit_card' | 'bank_transfer' | 'cash' | 'other'
  transactionId?: string;
  status?: string; // 'pending' | 'completed' | 'failed' | 'refunded'
  paidAt: Date;
}
```

**Output:**
```typescript
{
  id: number;
  invoiceId: number;
  amount: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createPayment = trpc.payments.create.useMutation();
await createPayment.mutateAsync({
  invoiceId: 1,
  amount: '230000',
  method: 'bank_transfer',
  transactionId: 'TXN-2025-001',
  paidAt: new Date()
});
```

---

## 📅 الاجتماعات (Meetings)

### `meetings.list`

**الوصف:** الحصول على قائمة الاجتماعات

**النوع:** Query

**الصلاحيات:** `meeting:read`

**Input:**
```typescript
{
  projectId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  projectId: number;
  title: string;
  description: string | null;
  meetingDate: Date;
  duration: number | null;
  location: string | null;
  attendees: string | null;
  notes: string | null;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: meetings } = trpc.meetings.list.useQuery({ projectId: 1 });
```

---

### `meetings.create`

**الوصف:** إنشاء اجتماع جديد

**النوع:** Mutation

**الصلاحيات:** `meeting:create`

**Input:**
```typescript
{
  projectId: number;
  title: string;
  description?: string;
  meetingDate: Date;
  duration?: number; // بالدقائق
  location?: string;
  attendees?: string; // JSON array
  notes?: string;
}
```

**Output:**
```typescript
{
  id: number;
  projectId: number;
  title: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createMeeting = trpc.meetings.create.useMutation();
await createMeeting.mutateAsync({
  projectId: 1,
  title: 'اجتماع بداية المشروع',
  meetingDate: new Date('2025-01-15T10:00:00'),
  duration: 60,
  location: 'قاعة الاجتماعات A'
});
```

---

## 🎫 تذاكر الدعم (Support Tickets)

### `supportTickets.list`

**الوصف:** الحصول على قائمة تذاكر الدعم

**النوع:** Query

**الصلاحيات:** `support_ticket:read`

**Input:**
```typescript
{
  organizationId: number;
  status?: string;
}
```

**Output:**
```typescript
Array<{
  id: number;
  organizationId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: tickets } = trpc.supportTickets.list.useQuery({
  organizationId: 1,
  status: 'open'
});
```

---

### `supportTickets.create`

**الوصف:** إنشاء تذكرة دعم جديدة

**النوع:** Mutation

**الصلاحيات:** `support_ticket:create`

**Input:**
```typescript
{
  organizationId: number;
  userId: number;
  subject: string;
  description: string;
  status?: string; // 'open' | 'in_progress' | 'resolved' | 'closed'
  priority?: string; // 'low' | 'medium' | 'high' | 'urgent'
}
```

**Output:**
```typescript
{
  id: number;
  organizationId: number;
  userId: number;
  subject: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createTicket = trpc.supportTickets.create.useMutation();
await createTicket.mutateAsync({
  organizationId: 1,
  userId: 1,
  subject: 'مشكلة في الوصول للوثائق',
  description: 'لا أستطيع تحميل الوثائق من المشروع',
  priority: 'high'
});
```

---

## 💬 ردود الدعم (Support Replies)

### `supportReplies.list`

**الوصف:** الحصول على قائمة ردود الدعم

**النوع:** Query

**الصلاحيات:** `support_reply:read`

**Input:**
```typescript
{
  ticketId: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  ticketId: number;
  userId: number;
  message: string;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: replies } = trpc.supportReplies.list.useQuery({ ticketId: 1 });
```

---

### `supportReplies.create`

**الوصف:** إنشاء رد على تذكرة دعم

**النوع:** Mutation

**الصلاحيات:** `support_reply:create`

**Input:**
```typescript
{
  ticketId: number;
  userId: number;
  message: string;
}
```

**Output:**
```typescript
{
  id: number;
  ticketId: number;
  userId: number;
  message: string;
  createdAt: Date;
}
```

**مثال:**
```typescript
const createReply = trpc.supportReplies.create.useMutation();
await createReply.mutateAsync({
  ticketId: 1,
  userId: 2,
  message: 'تم حل المشكلة، يرجى المحاولة مرة أخرى'
});
```

---

## 🎯 العملاء المحتملين (Leads)

### `leads.list`

**الوصف:** الحصول على قائمة العملاء المحتملين

**النوع:** Query

**الصلاحيات:** `lead:read`

**Input:**
```typescript
{
  status?: string;
}
```

**Output:**
```typescript
Array<{
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  companySize: string | null;
  industry: string | null;
  interestedPackage: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: leads } = trpc.leads.list.useQuery({ status: 'new' });
```

---

### `leads.create`

**الوصف:** إنشاء عميل محتمل جديد (Public - نموذج الاتصال)

**النوع:** Mutation

**الصلاحيات:** Public

**Input:**
```typescript
{
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  companySize?: string;
  industry?: string;
  interestedPackage?: string;
  message?: string;
  status?: string; // 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
}
```

**Output:**
```typescript
{
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  // ... باقي الحقول
}
```

**مثال:**
```typescript
const createLead = trpc.leads.create.useMutation();
await createLead.mutateAsync({
  companyName: 'شركة التقنية المتقدمة',
  contactName: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+966501234567',
  interestedPackage: 'Growth'
});
```

---

## 📝 سجلات التدقيق (Audit Logs)

### `auditLogs.list`

**الوصف:** الحصول على قائمة سجلات التدقيق

**النوع:** Query

**الصلاحيات:** `audit_log:read`

**Input:**
```typescript
{
  organizationId?: number;
  userId?: number;
  resource?: string;
  action?: string;
  limit?: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  userId: number | null;
  organizationId: number | null;
  resource: string;
  resourceId: number | null;
  action: string;
  changes: any | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: string;
  createdAt: Date;
}>
```

**مثال:**
```typescript
const { data: logs } = trpc.auditLogs.list.useQuery({
  organizationId: 1,
  resource: 'project',
  limit: 50
});
```

---

### `auditLogs.getById`

**الوصف:** الحصول على سجل تدقيق بالمعرف

**النوع:** Query

**الصلاحيات:** `audit_log:read`

**Input:**
```typescript
{
  id: number;
}
```

**Output:**
```typescript
{
  id: number;
  userId: number | null;
  organizationId: number | null;
  resource: string;
  resourceId: number | null;
  action: string;
  changes: any | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: string;
  createdAt: Date;
} | undefined
```

**مثال:**
```typescript
const { data: log } = trpc.auditLogs.getById.useQuery({ id: 1 });
```

---

## 📚 الأطر التنظيمية (Frameworks) - Public

### `frameworks.list`

**الوصف:** الحصول على قائمة الأطر التنظيمية

**النوع:** Query

**الصلاحيات:** Public

**Input:** لا يوجد

**Output:**
```typescript
Array<{
  id: number;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  authority: string;
  authorityEn: string;
  version: string | null;
  effectiveDate: Date | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: frameworks } = trpc.frameworks.list.useQuery();
```

---

## 🎯 الضوابط (Controls) - Public

### `controls.list`

**الوصف:** الحصول على قائمة الضوابط

**النوع:** Query

**الصلاحيات:** Public

**Input:**
```typescript
{
  frameworkId?: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  frameworkId: number;
  controlId: string | null;
  name: string;
  nameEn: string;
  description: string | null;
  descriptionEn: string | null;
  category: string | null;
  categoryEn: string | null;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: controls } = trpc.controls.list.useQuery({ frameworkId: 1 });
```

---

## 📖 المواد القانونية (Articles) - Public

### `articles.list`

**الوصف:** الحصول على قائمة المواد القانونية

**النوع:** Query

**الصلاحيات:** Public

**Input:**
```typescript
{
  frameworkId?: number;
}
```

**Output:**
```typescript
Array<{
  id: number;
  frameworkId: number;
  articleNumber: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string | null;
  createdAt: Date;
  updatedAt: Date;
}>
```

**مثال:**
```typescript
const { data: articles } = trpc.articles.list.useQuery({ frameworkId: 1 });
```

---

## ⚠️ معالجة الأخطاء

### أكواد الأخطاء

| الكود | الوصف |
|------|-------|
| `UNAUTHORIZED` | غير مسجل دخول |
| `FORBIDDEN` | لا يوجد صلاحية |
| `NOT_FOUND` | المورد غير موجود |
| `BAD_REQUEST` | بيانات خاطئة |
| `INTERNAL_SERVER_ERROR` | خطأ في الخادم |

### مثال معالجة الخطأ

```typescript
const createProject = trpc.projects.create.useMutation({
  onError: (error) => {
    if (error.data?.code === 'FORBIDDEN') {
      toast.error('ليس لديك صلاحية لإنشاء مشروع');
    } else if (error.data?.code === 'UNAUTHORIZED') {
      toast.error('يرجى تسجيل الدخول أولاً');
    } else {
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى');
    }
  }
});
```

---

## 📞 الدعم

للاستفسارات عن APIs:
- البريد الإلكتروني: api@regtech-platform.sa
- التوثيق: https://docs.regtech-platform.sa/api

---

**آخر تحديث:** 2025-01-02
