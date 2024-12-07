import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const conversations = table("conversations", {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(), // Primary key for conversation
  name: t.varchar({ length: 256 }).notNull(), // Conversation name
  created_at: t.timestamp({ withTimezone: true }).defaultNow().notNull(), // Timestamp for when the conversation was created
});
