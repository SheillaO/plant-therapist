const { pgTable, serial, varchar } = require('drizzle-orm/pg-core');

const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  emailAddress: varchar('email_address', { length: 254 }).notNull().unique(),
});

module.exports = { subscribers };
