// Check published status of journeys
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkJourneys() {
  const client = await pool.connect();

  try {
    console.log('🔌 Connected to database\n');

    const result = await client.query('SELECT id, title, slug, is_published FROM journeys ORDER BY id');

    if (result.rows.length === 0) {
      console.log('❌ No journeys found in database');
    } else {
      console.log(`Found ${result.rows.length} journeys:\n`);
      result.rows.forEach(journey => {
        const publishedStatus = journey.is_published ? '✅ PUBLISHED' : '❌ NOT PUBLISHED';
        console.log(`  ID ${journey.id}: ${journey.title}`);
        console.log(`      Slug: ${journey.slug}`);
        console.log(`      Status: ${publishedStatus}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Error checking journeys:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

checkJourneys();
