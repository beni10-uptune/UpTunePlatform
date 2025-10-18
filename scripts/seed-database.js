// Seed the database with the generated SQL file
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('🔌 Connected to database');

    // Read the SQL file
    const sqlPath = join(__dirname, '../supabase-seed-complete.sql');
    const sql = readFileSync(sqlPath, 'utf8');

    console.log('📄 Executing seed SQL...');

    // Execute the SQL
    await client.query(sql);

    console.log('✅ Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
