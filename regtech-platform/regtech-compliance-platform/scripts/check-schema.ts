import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

async function checkSchema() {
  const conn = await mysql.createConnection(DATABASE_URL);
  
  try {
    const [rows] = await conn.query("DESCRIBE frameworks");
    console.log("Frameworks table columns:");
    console.log(rows);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await conn.end();
  }
}

checkSchema().catch(console.error);
