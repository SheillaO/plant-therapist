require('dotenv/config');
const { join } = require('node:path');
const { closeDb, getDb, isBrowserSandbox } = require('./index.js');

async function runMigrations() {
  const migrationsFolder = join(__dirname, '../../drizzle/migrations');

  try {
    const { migrate } = isBrowserSandbox()
      ? require('drizzle-orm/neon-http/migrator')
      : require('drizzle-orm/node-postgres/migrator');

    await migrate(getDb(), { migrationsFolder });
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Migration failed', error);
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
}

runMigrations();
