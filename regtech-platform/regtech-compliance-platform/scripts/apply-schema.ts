import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

async function applySchema() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  try {
    console.log("🔧 Applying schema to database...");
    
    // Drop ALL old tables if they exist
    console.log("🗑️  Dropping old tables...");
    await connection.query("DROP TABLE IF EXISTS evidence");
    await connection.query("DROP TABLE IF EXISTS control_assessments");
    await connection.query("DROP TABLE IF EXISTS assessments");
    await connection.query("DROP TABLE IF EXISTS edges");
    await connection.query("DROP TABLE IF EXISTS provisions");
    await connection.query("DROP TABLE IF EXISTS articles");
    await connection.query("DROP TABLE IF EXISTS controls");
    await connection.query("DROP TABLE IF EXISTS frameworks");
    await connection.query("DROP TABLE IF EXISTS risks");
    await connection.query("DROP TABLE IF EXISTS reports");
    await connection.query("DROP TABLE IF EXISTS notifications");
    await connection.query("DROP TABLE IF EXISTS audit_logs");
    await connection.query("DROP TABLE IF EXISTS evidence_controls");
    console.log("✅ Old tables dropped");
    
    // Create organizations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        type ENUM('public', 'private', 'nonprofit', 'government') NOT NULL,
        sector VARCHAR(100),
        size ENUM('small', 'medium', 'large', 'enterprise'),
        country VARCHAR(2) NOT NULL DEFAULT 'SA',
        city VARCHAR(100),
        website VARCHAR(255),
        contactEmail VARCHAR(320),
        contactPhone VARCHAR(20),
        isActive BOOLEAN NOT NULL DEFAULT TRUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX name_idx (name),
        INDEX sector_idx (sector)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ organizations table created");
    
    // Update users table - check if columns exist first
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN organizationId INT`);
    } catch (e: any) {
      if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }
    
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN isActive BOOLEAN NOT NULL DEFAULT TRUE`);
    } catch (e: any) {
      if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }
    
    await connection.query(`ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'assessor', 'reviewer', 'viewer') NOT NULL DEFAULT 'user'`);
    
    try {
      await connection.query(`ALTER TABLE users ADD INDEX organization_idx (organizationId)`);
    } catch (e: any) {
      if (e.code !== 'ER_DUP_KEYNAME') throw e;
    }
    console.log("✅ users table updated");
    
    // Create frameworks table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS frameworks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        description TEXT,
        descriptionEn TEXT,
        authority VARCHAR(255),
        authorityEn VARCHAR(255),
        sector VARCHAR(100),
        category ENUM('law', 'regulation', 'standard', 'guideline', 'policy') NOT NULL,
        effectiveDate TIMESTAMP,
        lastUpdated TIMESTAMP,
        version VARCHAR(20) NOT NULL DEFAULT '1.0',
        status ENUM('draft', 'active', 'archived', 'superseded') NOT NULL DEFAULT 'active',
        officialUrl VARCHAR(500),
        documentUrl VARCHAR(500),
        priority ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
        isPublic BOOLEAN NOT NULL DEFAULT TRUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX code_idx (code),
        INDEX sector_idx (sector),
        INDEX status_idx (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ frameworks table created");
    
    // Create controls table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS controls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        frameworkId INT NOT NULL,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        description TEXT,
        descriptionEn TEXT,
        category VARCHAR(100),
        priority ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
        implementationGuidance TEXT,
        implementationGuidanceEn TEXT,
        evidenceRequirements TEXT,
        evidenceRequirementsEn TEXT,
        isRequired BOOLEAN NOT NULL DEFAULT TRUE,
        \`order\` INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX framework_idx (frameworkId),
        INDEX code_idx (code),
        UNIQUE KEY unique_framework_code (frameworkId, code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ controls table created");
    
    // Create articles table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        frameworkId INT NOT NULL,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        text TEXT NOT NULL,
        textEn TEXT,
        interpretation TEXT,
        interpretationEn TEXT,
        category VARCHAR(100),
        \`order\` INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX framework_idx (frameworkId),
        INDEX code_idx (code),
        UNIQUE KEY unique_framework_code (frameworkId, code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ articles table created");
    
    // Create provisions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS provisions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        frameworkId INT NOT NULL,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        text TEXT NOT NULL,
        textEn TEXT,
        context TEXT,
        contextEn TEXT,
        type ENUM('principle', 'rule', 'exception', 'definition') NOT NULL,
        \`order\` INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX framework_idx (frameworkId),
        INDEX code_idx (code),
        UNIQUE KEY unique_framework_code (frameworkId, code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ provisions table created");
    
    // Create edges table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS edges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fromType ENUM('framework', 'control', 'article', 'provision') NOT NULL,
        fromId INT NOT NULL,
        toType ENUM('framework', 'control', 'article', 'provision') NOT NULL,
        toId INT NOT NULL,
        relationType ENUM('interprets', 'basedOn', 'refersTo', 'restricts', 'implements', 'supersedes', 'related') NOT NULL,
        description TEXT,
        descriptionEn TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX from_idx (fromType, fromId),
        INDEX to_idx (toType, toId),
        INDEX relation_idx (relationType)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ edges table created");
    
    // Create assessments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        organizationId INT NOT NULL,
        frameworkId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        assessorId INT NOT NULL,
        reviewerId INT,
        status ENUM('draft', 'in_progress', 'under_review', 'completed', 'archived') NOT NULL DEFAULT 'draft',
        scope TEXT,
        startDate TIMESTAMP,
        dueDate TIMESTAMP,
        completedDate TIMESTAMP,
        overallScore DECIMAL(5,2),
        complianceLevel ENUM('non_compliant', 'partially_compliant', 'largely_compliant', 'fully_compliant'),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX organization_idx (organizationId),
        INDEX framework_idx (frameworkId),
        INDEX status_idx (status),
        INDEX assessor_idx (assessorId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ assessments table created");
    
    // Create control_assessments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS control_assessments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        assessmentId INT NOT NULL,
        controlId INT NOT NULL,
        status ENUM('not_started', 'in_progress', 'completed') NOT NULL DEFAULT 'not_started',
        complianceStatus ENUM('compliant', 'partial', 'non_compliant', 'not_applicable'),
        implementationLevel INT,
        riskLevel ENUM('low', 'medium', 'high', 'critical'),
        findings TEXT,
        recommendations TEXT,
        assessorNotes TEXT,
        reviewerNotes TEXT,
        assessedBy INT,
        assessedAt TIMESTAMP,
        reviewedBy INT,
        reviewedAt TIMESTAMP,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX assessment_idx (assessmentId),
        INDEX control_idx (controlId),
        UNIQUE KEY unique_assessment_control (assessmentId, controlId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ control_assessments table created");
    
    // Create evidence table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS evidence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        controlAssessmentId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        type ENUM('document', 'screenshot', 'policy', 'procedure', 'log', 'certificate', 'other') NOT NULL,
        fileUrl VARCHAR(500),
        fileKey VARCHAR(500),
        fileName VARCHAR(255),
        fileSize INT,
        mimeType VARCHAR(100),
        uploadedBy INT NOT NULL,
        expiryDate TIMESTAMP,
        isValid BOOLEAN NOT NULL DEFAULT TRUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX control_assessment_idx (controlAssessmentId),
        INDEX uploaded_by_idx (uploadedBy)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ evidence table created");
    
    // Create risks table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS risks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        organizationId INT NOT NULL,
        controlId INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        likelihood ENUM('very_low', 'low', 'medium', 'high', 'very_high') NOT NULL,
        impact ENUM('very_low', 'low', 'medium', 'high', 'very_high') NOT NULL,
        riskScore INT NOT NULL,
        riskLevel ENUM('low', 'medium', 'high', 'critical') NOT NULL,
        status ENUM('identified', 'assessed', 'mitigated', 'accepted', 'transferred', 'closed') NOT NULL DEFAULT 'identified',
        ownerId INT,
        mitigationPlan TEXT,
        residualRisk ENUM('very_low', 'low', 'medium', 'high', 'very_high'),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX organization_idx (organizationId),
        INDEX control_idx (controlId),
        INDEX risk_level_idx (riskLevel)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ risks table created");
    
    // Create reports table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        assessmentId INT NOT NULL,
        type ENUM('executive_summary', 'detailed', 'gap_analysis', 'risk_report', 'compliance_report') NOT NULL,
        format ENUM('pdf', 'docx', 'excel', 'html') NOT NULL,
        fileUrl VARCHAR(500),
        fileKey VARCHAR(500),
        generatedBy INT NOT NULL,
        generatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX assessment_idx (assessmentId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ reports table created");
    
    // Create notifications table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        type ENUM('assessment_due', 'evidence_expiry', 'compliance_drop', 'new_assignment', 'review_required', 'system') NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        link VARCHAR(500),
        isRead BOOLEAN NOT NULL DEFAULT FALSE,
        readAt TIMESTAMP,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX user_idx (userId),
        INDEX is_read_idx (isRead)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ notifications table created");
    
    // Create audit_logs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        entityType VARCHAR(50) NOT NULL,
        entityId INT NOT NULL,
        changes TEXT,
        ipAddress VARCHAR(45),
        userAgent VARCHAR(500),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX user_idx (userId),
        INDEX entity_idx (entityType, entityId),
        INDEX action_idx (action),
        INDEX created_at_idx (createdAt)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✅ audit_logs table created");
    
    console.log("\n✅ Schema applied successfully!");
    
  } catch (error) {
    console.error("❌ Error applying schema:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

applySchema().catch(console.error);
