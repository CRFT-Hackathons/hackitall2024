import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { posts } from "./post";
import { users } from "./user";

export const accessToInfos = table(
  "access_to_infos",
  {
    post_id: t
      .integer()
      .notNull()
      .references(() => posts.id), // Foreign key to `posts.id`
    volunteer_id: t
      .integer()
      .notNull()
      .references(() => users.id), // Foreign key to `users.id`
  },
  (accessToInfos) => ({
    compositePk: t.primaryKey(
      accessToInfos.post_id,
      accessToInfos.volunteer_id
    ), // Composite primary key
  })
);
