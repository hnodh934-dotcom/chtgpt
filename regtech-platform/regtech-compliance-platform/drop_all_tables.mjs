import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function dropAllTables() {
  try {
    const connection = await pool.getConnection();
    
    // الحصول على جميع الجداول
    const [tables] = await connection.query('SHOW TABLES;');
    
    // تعطيل الـ foreign keys
    await connection.query('SET FOREIGN_KEY_CHECKS=0;');
    
    // حذف جميع الجداول
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      await connection.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
      console.log(`✅ Dropped table: ${tableName}`);
    }
    
    // إعادة تفعيل الـ foreign keys
    await connection.query('SET FOREIGN_KEY_CHECKS=1;');
    
    connection.release();
    console.log('✅ All tables dropped!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

dropAllTables();
