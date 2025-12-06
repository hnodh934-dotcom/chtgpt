import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function dropOrgTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query('DROP TABLE IF EXISTS `organizations`;');
    console.log('✅ Dropped organizations table');
    connection.release();
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

dropOrgTable();
