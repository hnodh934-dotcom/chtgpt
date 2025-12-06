import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function checkTables() {
  try {
    const connection = await pool.getConnection();
    const [tables] = await connection.query('SHOW TABLES;');
    console.log(`✅ Found ${tables.length} tables:`);
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

checkTables();
