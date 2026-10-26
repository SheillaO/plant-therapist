require('dotenv/config');
const { join } = require('node:path');
const { closeDb, isBrowserSandbox } = require('./index.js');

async function runMigrations() {
  const migrationsFolder = join(__dirname, '../../drizzle/migrations');

  try {
    const { migrate } = isBrowserSandbox()
      ? require('drizzle-orm/neon-http/migrator')
      : require('drizzle-orm/node-postgres/migrator');

    let db;
    if (isBrowserSandbox()) {
      const { neon } = require('@neondatabase/serverless');
      const { drizzle } = require('drizzle-orm/neon-http');
      db = drizzle({
        client: neon(
          process.env.MIGRATION_DATABASE_URL || process.env.DATABASE_URL,
        ),
      });
    } else {
      const { Pool } = require('pg');
      const { drizzle } = require('drizzle-orm/node-postgres');
      const connectionString =
        process.env.MIGRATION_DATABASE_URL || process.env.DATABASE_URL;
      const isLocalDb = /localhost|127\.0\.0\.1/.test(connectionString);

      const pool = new Pool({
        connectionString,
        ssl: isLocalDb ? false : { rejectUnauthorized: false },
      });
      db = drizzle({ client: pool });
    }

    await migrate(db, { migrationsFolder });
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Migration failed', error);
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
}

runMigrations();
