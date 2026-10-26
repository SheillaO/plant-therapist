let db;
let pool;

function isBrowserSandbox() {
  return (
    process.env.SCRIMBA_BROWSER_SANDBOX === 'true' ||
    !!process.versions?.webcontainer
  );
}

function getDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  return process.env.DATABASE_URL;
}

function createPgDb() {
  const { Pool } = require('pg');
  const { drizzle } = require('drizzle-orm/node-postgres');

  pool = new Pool({
    connectionString: getDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });

  pool.on('error', (err) => {
    console.warn('Idle client error:', err.message);
  });

  return drizzle({ client: pool });
}

function createNeonDb() {
  const { neon } = require('@neondatabase/serverless');
  const { drizzle } = require('drizzle-orm/neon-http');

  const sql = neon(getDatabaseUrl());
  return drizzle({ client: sql });
}

function getDb() {
  if (db) return db;

  // Browser sandboxes cannot open TCP database connections, so use Neon's HTTP driver there.
  db = isBrowserSandbox() ? createNeonDb() : createPgDb();
  return db;
}

async function closeDb() {
  if (pool) {
    await pool.end();
  }

  db = undefined;
  pool = undefined;
}

module.exports = { closeDb, getDb, isBrowserSandbox };
