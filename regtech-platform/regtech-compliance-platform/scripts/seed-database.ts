import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import mysql from "mysql2/promise";
import { frameworks as frameworksTable, controls as controlsTable, articles as articlesTable, provisions as provisionsTable, edges as edgesTable } from "../drizzle/schema";
import { frameworks, controls, articles, provisions, edges } from "../shared/seed.sample";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

async function seedDatabase() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);
  
  try {
    console.log("🌱 Seeding database with sample data...\n");
    
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.execute(sql`DELETE FROM edges`);
    await db.execute(sql`DELETE FROM provisions`);
    await db.execute(sql`DELETE FROM articles`);
    await db.execute(sql`DELETE FROM controls`);
    await db.execute(sql`DELETE FROM frameworks`);
    console.log("✅ Existing data cleared\n");
    
    // 1. Insert Frameworks
    console.log("📋 Inserting frameworks...");
    const frameworkMap = new Map<string, number>();
    
    for (const fw of frameworks) {
      const [result] = await db.insert(frameworksTable).values({
        code: fw.id,
        name: fw.name,
        nameEn: undefined,
        description: fw.description,
        descriptionEn: undefined,
        authority: fw.regulator,
        authorityEn: undefined,
        sector: fw.sector,
        category: "regulation",
        effectiveDate: fw.effectiveDate ? new Date(fw.effectiveDate) : undefined,
        officialUrl: fw.externalUrl,
        priority: "medium",
        status: "active",
        version: fw.version,
        isPublic: true,
      });
      
      frameworkMap.set(fw.id, Number(result.insertId));
      console.log(`  ✅ ${fw.name} (ID: ${result.insertId})`);
    }
    
    // 2. Insert Controls
    console.log("\n🎯 Inserting controls...");
    const controlMap = new Map<string, number>();
    
    for (const ctl of controls) {
      const frameworkId = frameworkMap.get(ctl.frameworkId);
      if (!frameworkId) {
        console.warn(`  ⚠️  Framework not found for control: ${ctl.code}`);
        continue;
      }
      
      const [result] = await db.insert(controlsTable).values({
        frameworkId,
        code: ctl.id,
        name: ctl.name,
        nameEn: undefined,
        description: ctl.description,
        descriptionEn: undefined,
        category: ctl.category,
        priority: ctl.priority as any,
        implementationGuidance: ctl.implementationGuidance,
        implementationGuidanceEn: undefined,
        evidenceRequirements: undefined,
        evidenceRequirementsEn: undefined,
        isRequired: true,
        order: 0,
      });
      
      controlMap.set(ctl.id, Number(result.insertId));
      console.log(`  ✅ ${ctl.name} (ID: ${result.insertId})`);
    }
    
    // 3. Insert Articles
    console.log("\n📜 Inserting articles...");
    const articleMap = new Map<string, number>();
    
    for (const art of articles) {
      const controlId = controlMap.get(art.controlId || '');
      if (!controlId) {
        console.warn(`  ⚠️  Control not found for article: ${art.id}`);
        continue;
      }
      
      // Get framework from control
      // Find which framework this control belongs to
      const control = controls.find(c => c.id === art.controlId);
      const frameworkId = control ? frameworkMap.get(control.frameworkId || '') : undefined;
      
      if (!frameworkId) {
        console.warn(`  ⚠️  Framework not found for article: ${art.id}`);
        continue;
      }
      
      const [result] = await db.insert(articlesTable).values({
        frameworkId,
        code: art.id,
        name: art.name,
        nameEn: undefined,
        text: art.legalText || '',
        textEn: undefined,
        interpretation: art.description,
        interpretationEn: undefined,
        category: undefined,
        order: 0,
      });
      
      articleMap.set(art.id, Number(result.insertId));
      console.log(`  ✅ ${art.name} (ID: ${result.insertId})`);
    }
    
    // 4. Insert Provisions
    console.log("\n⚖️  Inserting provisions...");
    const provisionMap = new Map<string, number>();
    
    for (const prov of provisions) {
      // Get framework from article
      const articleId = articleMap.get(prov.articleId || '');
      if (!articleId) {
        console.warn(`  ⚠️  Article not found for provision: ${prov.id}`);
        continue;
      }
      
      // Find framework for this article (we need to track this)
      // For now, let's use a simple approach: extract from article ID
      const articleCode = prov.articleId || '';
      let frameworkId: number | undefined;
      
      if (articleCode.includes('pdpl')) {
        frameworkId = frameworkMap.get('fw-pdpl');
      } else if (articleCode.includes('pay')) {
        frameworkId = frameworkMap.get('fw-pay');
      }
      
      if (!frameworkId) {
        console.warn(`  ⚠️  Framework not found for provision: ${prov.id}`);
        continue;
      }
      
      const [result] = await db.insert(provisionsTable).values({
        frameworkId,
        code: prov.id,
        name: prov.name,
        nameEn: undefined,
        text: prov.summary || '',
        textEn: undefined,
        context: prov.description,
        contextEn: undefined,
        type: 'principle',
        order: 0,
      });
      
      provisionMap.set(prov.id, Number(result.insertId));
      console.log(`  ✅ ${prov.name} (ID: ${result.insertId})`);
    }
    
    // 5. Insert Edges (Relationships)
    console.log("\n🔗 Inserting edges (relationships)...");
    
    const getEntityId = (type: string, code: string): number | undefined => {
      switch (type) {
        case "framework":
          return frameworkMap.get(code);
        case "control":
          return controlMap.get(code);
        case "article":
          return articleMap.get(code);
        case "provision":
          return provisionMap.get(code);
        default:
          return undefined;
      }
    };
    
    for (const edge of edges) {
      // Determine entity types from IDs
      const fromType = edge.fromId.startsWith('fw-') ? 'framework' : 
                       edge.fromId.startsWith('ctl-') ? 'control' :
                       edge.fromId.startsWith('art-') ? 'article' : 'provision';
      const toType = edge.toId.startsWith('fw-') ? 'framework' : 
                     edge.toId.startsWith('ctl-') ? 'control' :
                     edge.toId.startsWith('art-') ? 'article' : 'provision';
      
      const fromId = getEntityId(fromType, edge.fromId);
      const toId = getEntityId(toType, edge.toId);
      
      if (!fromId || !toId) {
        console.warn(`  ⚠️  Entity not found for edge: ${edge.fromId} -> ${edge.toId}`);
        continue;
      }
      
      // Map relation types from Arabic to English
      const relationMap: Record<string, string> = {
        'يفسّر': 'interprets',
        'يستند إلى': 'basedOn',
        'يحيل إلى': 'refersTo',
        'يقيّد': 'restricts',
      };
      
      const relationType = relationMap[edge.relation] || 'related';
      
      await db.insert(edgesTable).values({
        fromType: fromType as any,
        fromId,
        toType: toType as any,
        toId,
        relationType: relationType as any,
        description: edge.relation,
        descriptionEn: undefined,
      });
      
      console.log(`  ✅ ${edge.fromId} --[${edge.relation}]--> ${edge.toId}`);
    }
    
    console.log("\n✅ Database seeded successfully!");
    console.log(`\n📊 Summary:`);
    console.log(`   Frameworks: ${frameworkMap.size}`);
    console.log(`   Controls: ${controlMap.size}`);
    console.log(`   Articles: ${articleMap.size}`);
    console.log(`   Provisions: ${provisionMap.size}`);
    console.log(`   Edges: ${edges.length}`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedDatabase().catch(console.error);
