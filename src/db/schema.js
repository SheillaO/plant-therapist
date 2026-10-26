const { pgTable, serial, varchar } = require('drizzle-orm/pg-core');

const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 254 }).notNull().unique(),
});

module.exports = { subscribers };
