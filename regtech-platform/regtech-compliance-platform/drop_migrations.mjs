import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);

async function dropMigrations() {
  try {
    const connection = await pool.getConnection();
    await connection.query('DROP TABLE IF EXISTS `__drizzle_migrations`;');
    console.log('✅ Dropped __drizzle_migrations table');
    connection.release();
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

dropMigrations();
