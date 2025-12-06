import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function checkOrgTable() {
  try {
    const connection = await pool.getConnection();
    const [tables] = await connection.query('DESCRIBE `organizations`;');
    console.log('✅ Organizations table columns:');
    tables.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type}`);
    });
    connection.release();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

checkOrgTable();
