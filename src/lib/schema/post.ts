import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./user"; // Import users table for the foreign key

const categoryEnum = pgEnum("post_categories", [
  "food_support",
  "medical_aid",
  "education",
  "housing_support",
  "emotional_support",
  "elderly_care",
  "child_care",
  "disaster_relief",
  "job_training",
  "environmental_protection",
]);

export const posts = table("posts", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  owner_id: t
    .varchar({ length: 256 })
    .notNull()
    .references(() => users.id), // Foreign key to `users.id`
  title: t.varchar({ length: 1024 }).notNull(),
  category: categoryEnum().notNull(),
  description: t.varchar({ length: 1024 }).notNull(),
  created_at: t.timestamp({ withTimezone: true }).defaultNow().notNull(), // Using timestamp for precision
  registration_start: t
    .timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
  registration_end: t.timestamp({ withTimezone: true }).notNull(),
  is_open: t.boolean().notNull().default(true),
  required_people: t.integer().notNull(),
});
