import { getDb } from '../server/db';
import { controls } from '../drizzle/schema';

const db = await getDb();
if (!db) {
  console.log('Database not available');
  process.exit(1);
}

const allControls = await db.select().from(controls);
console.log('Controls in database:', JSON.stringify(allControls, null, 2));
process.exit(0);
