import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./user"; // Assuming users is imported

export const notifications = table("notifications", {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(), // Primary key for the notification
  user_id: t
    .integer()
    .notNull()
    .references(() => users.id), // Foreign key to `users.id`
  message: t.varchar({ length: 256 }).notNull(), // Message content for the notification
  send_at: t.timestamp({ withTimezone: true }).defaultNow().notNull(), // Timestamp for when the notification is sent
});
