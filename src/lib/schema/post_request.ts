import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const post_requests = table("post_requests", {
  id: t.integer().generatedAlwaysAsIdentity(),
  post_id: t.integer().notNull(),
  post_owner_id: t.integer().notNull(),
  joiner_id: t.integer().notNull(),
  requestedAt: t.date().defaultNow(),
});
