import * as t from "drizzle-orm/pg-core";

const userTypes = t.pgEnum("user_types", ["voluntar", "organizatie", "user"]);

export const users = t.pgTable("users", {
  id: t.varchar({ length: 1024 }).primaryKey(),
  first_name: t.varchar({ length: 128 }).notNull(),
  last_name: t.varchar({ length: 128 }).notNull(),
  email: t.varchar({ length: 320 }).notNull().unique(),
  phone_number: t.varchar({ length: 20 }).notNull(), // Example length for phone numbers
  recommand_score: t.numeric({ precision: 5, scale: 2 }),
  user_type: userTypes().notNull(),
  created_at: t.timestamp({ withTimezone: true }).defaultNow(),
});
