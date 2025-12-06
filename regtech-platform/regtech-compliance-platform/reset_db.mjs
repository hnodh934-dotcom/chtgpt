import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function resetDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Drop all tables
    await connection.query('SET FOREIGN_KEY_CHECKS=0;');
    
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('Dropping tables...');
    
    for (const row of tables) {
      const tableName = Object.values(row)[0];
      if (tableName !== '__drizzle_migrations') {
        try {
          await connection.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
          console.log(`✅ Dropped ${tableName}`);
        } catch (err) {
          console.log(`⚠️ Failed to drop ${tableName}: ${err.message}`);
        }
      }
    }
    
    await connection.query('SET FOREIGN_KEY_CHECKS=1;');
    
    console.log('\n✅ Database reset complete!');
    connection.release();
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

resetDatabase();
