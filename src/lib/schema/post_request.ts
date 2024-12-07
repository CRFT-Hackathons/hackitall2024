import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const post_requests = table("post_requests", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  post_id: t
    .integer()
    .notNull(),
    // .references(() => posts.id), // Foreign key to `posts.id`
  post_owner_id: t
    .varchar()
    .notNull(),
    // .references(() => users.id), // Foreign key to `users.id` (owner of the post)
  joiner_id: t
    .varchar()
    .notNull(),
    // .references(() => users.id), // Foreign key to `users.id` (volunteer applying)
  requested_at: t.timestamp({ withTimezone: true }).defaultNow(), // Renamed for consistency
});
