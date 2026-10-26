const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  dialect: 'postgresql',
  out: './drizzle/migrations',
  schema: './src/db/schema.js',
});
