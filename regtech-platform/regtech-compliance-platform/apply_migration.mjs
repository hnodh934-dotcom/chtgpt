import mysql from 'mysql2/promise';
import fs from 'fs';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function applyMigration() {
  try {
    const connection = await pool.getConnection();
    
    // قراءة ملف الـ SQL
    const sql = fs.readFileSync('/home/ubuntu/regtech-compliance-platform/drizzle/0000_unknown_zarek.sql', 'utf-8');
    
    // تقسيم الـ SQL إلى statements
    const statements = sql.split('-->').map(s => s.trim()).filter(s => s && !s.startsWith('statement-breakpoint'));
    
    console.log(`Found ${statements.length} SQL statements`);
    
    for (const statement of statements) {
      if (statement) {
        try {
          await connection.query(statement);
          console.log('✅ Executed:', statement.substring(0, 50) + '...');
        } catch (err) {
          console.error('❌ Failed:', err.message);
          console.error('Statement:', statement.substring(0, 100));
        }
      }
    }
    
    connection.release();
    console.log('✅ Migration completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

applyMigration();
