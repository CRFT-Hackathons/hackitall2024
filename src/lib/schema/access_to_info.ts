import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const accessToInfos = table(
  "access_to_infos",
  {
    post_id: t
      .integer()
      .notNull(),
      // .references(() => posts.id), // Foreign key to `posts.id`
    volunteer_id: t
      .varchar({ length: 256 })
      .notNull(),
      // .references(() => users.id), // Foreign key to `users.id`
  },
  (accessToInfos) => ({
    compositePk: t.primaryKey(
      accessToInfos.post_id,
      accessToInfos.volunteer_id
    ), // Composite primary key
  })
);
