import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../drizzle/schema";

let testDb: ReturnType<typeof drizzle> | null = null;
let sqliteDb: Database.Database | null = null;

/**
 * إنشاء قاعدة بيانات اختبار في الذاكرة
 */
export function createTestDb() {
  if (testDb) {
    return testDb;
  }

  // إنشاء SQLite database في الذاكرة
  sqliteDb = new Database(":memory:");
  
  // تفعيل foreign keys
  sqliteDb.pragma("foreign_keys = ON");

  // إنشاء drizzle instance
  testDb = drizzle(sqliteDb, { schema });

  // إنشاء الجداول
  createTables();

  return testDb;
}

/**
 * إنشاء جداول قاعدة البيانات
 */
function createTables() {
  if (!sqliteDb) {
    throw new Error("SQLite database not initialized");
  }

  // جدول users
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      openId TEXT NOT NULL UNIQUE,
      name TEXT,
      email TEXT,
      loginMethod TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      lastSignedIn INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
  `);

  // جدول frameworks
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS frameworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      nameAr TEXT NOT NULL,
      nameEn TEXT NOT NULL,
      descriptionAr TEXT,
      descriptionEn TEXT,
      authority TEXT,
      sector TEXT,
      version TEXT,
      effectiveDate INTEGER,
      lastUpdated INTEGER,
      status TEXT NOT NULL DEFAULT 'active',
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
  `);

  // جدول controls
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS controls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frameworkId INTEGER NOT NULL,
      code TEXT NOT NULL,
      titleAr TEXT NOT NULL,
      titleEn TEXT NOT NULL,
      descriptionAr TEXT,
      descriptionEn TEXT,
      category TEXT,
      priority TEXT,
      implementationGuidance TEXT,
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (frameworkId) REFERENCES frameworks(id) ON DELETE CASCADE,
      UNIQUE(frameworkId, code)
    );
  `);

  // جدول articles
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frameworkId INTEGER NOT NULL,
      code TEXT NOT NULL,
      titleAr TEXT NOT NULL,
      titleEn TEXT NOT NULL,
      contentAr TEXT,
      contentEn TEXT,
      chapter TEXT,
      section TEXT,
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (frameworkId) REFERENCES frameworks(id) ON DELETE CASCADE,
      UNIQUE(frameworkId, code)
    );
  `);

  // جدول provisions
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS provisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      articleId INTEGER NOT NULL,
      number TEXT NOT NULL,
      contentAr TEXT NOT NULL,
      contentEn TEXT,
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE
    );
  `);

  // جدول edges (العلاقات بين الضوابط والمواد)
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS edges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      controlId INTEGER NOT NULL,
      articleId INTEGER NOT NULL,
      relationshipType TEXT NOT NULL DEFAULT 'implements',
      strength TEXT NOT NULL DEFAULT 'direct',
      notes TEXT,
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (controlId) REFERENCES controls(id) ON DELETE CASCADE,
      FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
      UNIQUE(controlId, articleId)
    );
  `);

  // إنشاء indexes
  sqliteDb.exec(`
    CREATE INDEX IF NOT EXISTS idx_controls_framework ON controls(frameworkId);
    CREATE INDEX IF NOT EXISTS idx_controls_category ON controls(category);
    CREATE INDEX IF NOT EXISTS idx_articles_framework ON articles(frameworkId);
    CREATE INDEX IF NOT EXISTS idx_provisions_article ON provisions(articleId);
    CREATE INDEX IF NOT EXISTS idx_edges_control ON edges(controlId);
    CREATE INDEX IF NOT EXISTS idx_edges_article ON edges(articleId);
  `);
}

/**
 * تنظيف قاعدة البيانات (حذف جميع البيانات)
 */
export function cleanupTestDb() {
  if (!sqliteDb) {
    return;
  }

  // حذف جميع البيانات من الجداول (بالترتيب الصحيح - من الأطفال إلى الآباء)
  try {
    sqliteDb.exec(`
      DELETE FROM edges;
      DELETE FROM provisions;
      DELETE FROM articles;
      DELETE FROM controls;
      DELETE FROM frameworks;
      DELETE FROM users;
    `);
  } catch (error) {
    console.error("Error cleaning up test database:", error);
    // إذا فشل الحذف، نحاول إعادة إنشاء الجداول من الصفر
    sqliteDb.exec(`
      DROP TABLE IF EXISTS edges;
      DROP TABLE IF EXISTS provisions;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS controls;
      DROP TABLE IF EXISTS frameworks;
      DROP TABLE IF EXISTS users;
    `);
    createTables();
  }
}

/**
 * إغلاق قاعدة البيانات
 */
export function closeTestDb() {
  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
    testDb = null;
  }
}

/**
 * إضافة بيانات تجريبية
 */
export function seedTestDb() {
  if (!testDb) {
    throw new Error("Test database not initialized");
  }

  // إضافة مستخدم تجريبي
  sqliteDb?.exec(`
    INSERT OR IGNORE INTO users (openId, name, email, role)
    VALUES 
      ('test-user-1', 'Test User', 'test@example.com', 'user'),
      ('test-admin-1', 'Test Admin', 'admin@example.com', 'admin');
  `);

  // إضافة إطار تنظيمي تجريبي
  sqliteDb?.exec(`
    INSERT OR IGNORE INTO frameworks (code, nameAr, nameEn, authority, sector, status)
    VALUES 
      ('PDPL', 'نظام حماية البيانات الشخصية', 'Personal Data Protection Law', 'SDAIA', 'General', 'active'),
      ('ECC', 'الضوابط الأساسية للأمن السيبراني', 'Essential Cybersecurity Controls', 'NCA', 'Cybersecurity', 'active');
  `);

  // إضافة ضوابط تجريبية (باستخدام subquery للحصول على framework ID)
  sqliteDb?.exec(`
    INSERT OR IGNORE INTO controls (frameworkId, code, titleAr, titleEn, category, priority)
    SELECT id, 'PDPL-1', 'حماية البيانات الشخصية', 'Personal Data Protection', 'Data Protection', 'high'
    FROM frameworks WHERE code = 'PDPL'
    UNION ALL
    SELECT id, 'PDPL-2', 'الموافقة على معالجة البيانات', 'Consent for Data Processing', 'Consent', 'high'
    FROM frameworks WHERE code = 'PDPL'
    UNION ALL
    SELECT id, 'ECC-1', 'إدارة الأصول', 'Asset Management', 'Asset Management', 'critical'
    FROM frameworks WHERE code = 'ECC'
    UNION ALL
    SELECT id, 'ECC-2', 'التحكم في الوصول', 'Access Control', 'Access Control', 'critical'
    FROM frameworks WHERE code = 'ECC';
  `);

  // إضافة مواد تجريبية (باستخدام subquery)
  sqliteDb?.exec(`
    INSERT OR IGNORE INTO articles (frameworkId, code, titleAr, titleEn, chapter)
    SELECT id, 'Article-1', 'المادة الأولى: التعريفات', 'Article 1: Definitions', 'Chapter 1'
    FROM frameworks WHERE code = 'PDPL'
    UNION ALL
    SELECT id, 'Article-2', 'المادة الثانية: نطاق التطبيق', 'Article 2: Scope of Application', 'Chapter 1'
    FROM frameworks WHERE code = 'PDPL'
    UNION ALL
    SELECT id, 'ECC-Article-1', 'المادة الأولى: الأهداف', 'Article 1: Objectives', 'Chapter 1'
    FROM frameworks WHERE code = 'ECC';
  `);

  // إضافة علاقات تجريبية (باستخدام subquery)
  sqliteDb?.exec(`
    INSERT OR IGNORE INTO edges (controlId, articleId, relationshipType, strength)
    SELECT 
      (SELECT id FROM controls WHERE code = 'PDPL-1' LIMIT 1),
      (SELECT id FROM articles WHERE code = 'Article-1' LIMIT 1),
      'implements', 'direct'
    UNION ALL
    SELECT 
      (SELECT id FROM controls WHERE code = 'PDPL-1' LIMIT 1),
      (SELECT id FROM articles WHERE code = 'Article-2' LIMIT 1),
      'implements', 'direct'
    UNION ALL
    SELECT 
      (SELECT id FROM controls WHERE code = 'PDPL-2' LIMIT 1),
      (SELECT id FROM articles WHERE code = 'Article-2' LIMIT 1),
      'implements', 'direct'
    UNION ALL
    SELECT 
      (SELECT id FROM controls WHERE code = 'ECC-1' LIMIT 1),
      (SELECT id FROM articles WHERE code = 'ECC-Article-1' LIMIT 1),
      'implements', 'direct';
  `);
}

/**
 * الحصول على Test DB instance
 */
export function getTestDb() {
  if (!testDb) {
    throw new Error("Test database not initialized. Call createTestDb() first.");
  }
  return testDb;
}
