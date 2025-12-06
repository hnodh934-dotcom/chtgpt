import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function cleanup() {
  try {
    const connection = await pool.getConnection();
    
    // Drop both tables
    await connection.query('DROP TABLE IF EXISTS analysisResults;');
    await connection.query('DROP TABLE IF EXISTS evidence_controls;');
    console.log('✅ Dropped analysisResults and evidence_controls tables');
    
    // Show remaining tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('\nRemaining tables:');
    tables.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`  - ${tableName}`);
    });
    
    connection.release();
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

cleanup();
