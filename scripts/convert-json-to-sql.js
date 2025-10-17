// Convert JSON database exports to SQL seed file
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const oldDbPath = join(__dirname, '../../Old databases');
const outputPath = join(__dirname, '../supabase-seed-complete.sql');

// Helper to escape SQL strings
function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'boolean') return str;
  if (typeof str === 'number') return str;
  if (typeof str === 'object') return `'${JSON.stringify(str).replace(/'/g, "''")}'`;
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Helper to format SQL values
function formatValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val;
  if (typeof val === 'object' && Array.isArray(val)) {
    return `ARRAY[${val.map(v => escapeSql(v)).join(', ')}]`;
  }
  if (typeof val === 'object') {
    return escapeSql(JSON.stringify(val));
  }
  return escapeSql(val);
}

let sql = `-- Uptune Complete Seed Data
-- Generated from JSON exports
-- Run this AFTER the migration to populate all tables with real data

SET client_encoding = 'UTF8';

`;

// Load and convert each JSON file
const tables = [
  { file: 'journeys.json', table: 'journeys', idSeq: 'journeys_id_seq' },
  { file: 'community_lists.json', table: 'community_lists', idSeq: 'community_lists_id_seq' },
  { file: 'community_mixtapes.json', table: 'community_mixtapes', idSeq: 'community_mixtapes_id_seq' },
  { file: 'list_entries.json', table: 'list_entries', idSeq: 'list_entries_id_seq' },
  { file: 'entry_votes.json', table: 'entry_votes', idSeq: 'entry_votes_id_seq' },
  { file: 'game_rooms.json', table: 'game_rooms', idSeq: 'game_rooms_id_seq' },
  { file: 'players.json', table: 'players', idSeq: 'players_id_seq' },
  { file: 'songs.json', table: 'songs', idSeq: 'songs_id_seq' },
  { file: 'teams_waitlist.json', table: 'teams_waitlist', idSeq: 'teams_waitlist_id_seq' }
];

for (const { file, table, idSeq } of tables) {
  try {
    const filePath = join(oldDbPath, file);
    const data = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!Array.isArray(data) || data.length === 0) {
      console.log(`⏭️  Skipping ${file} - no data`);
      continue;
    }

    sql += `\n-- =====================================================\n`;
    sql += `-- ${table.toUpperCase()} (${data.length} records)\n`;
    sql += `-- =====================================================\n\n`;

    // Get column names from first record
    const columns = Object.keys(data[0]);

    // Convert snake_case to match DB
    const dbColumns = columns.map(col => {
      return col.replace(/([A-Z])/g, '_$1').toLowerCase();
    });

    sql += `INSERT INTO ${table} (${dbColumns.join(', ')}) VALUES\n`;

    // Add each record
    const values = data.map((record, index) => {
      const vals = columns.map(col => formatValue(record[col]));
      const isLast = index === data.length - 1;
      return `(${vals.join(', ')})${isLast ? ';' : ','}`;
    });

    sql += values.join('\n');
    sql += `\n\n-- Reset sequence\n`;
    sql += `SELECT setval('${idSeq}', (SELECT MAX(id) FROM ${table}));\n`;

    console.log(`✅ Converted ${file} - ${data.length} records`);

  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

sql += `\n-- =====================================================\n`;
sql += `-- SEED COMPLETE\n`;
sql += `-- =====================================================\n\n`;
sql += `DO $$\nBEGIN\n  RAISE NOTICE '✅ All seed data loaded successfully!';\nEND $$;\n`;

// Write the SQL file
writeFileSync(outputPath, sql, 'utf8');
console.log(`\n🎉 Complete seed file created: ${outputPath}`);
