import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./user";
import { conversations } from "./conversation";

export const messages = table("messages", {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(), // Primary key for the message
  content: t.varchar({ length: 1024 }).notNull(), // Message content (increase size if needed)
  sendAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(), // Timestamp when the message was sent
  sender_id: t
    .varchar({ length: 256 })
    .notNull()
    .references(() => users.id), // Foreign key to `users.id`
  conversation_id: t
    .integer()
    .notNull()
    .references(() => conversations.id), // Foreign key to `conversations.id`
});
