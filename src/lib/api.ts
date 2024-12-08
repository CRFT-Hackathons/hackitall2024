"use server";

import { db } from "~/lib/db";
import { posts, users } from "~/lib/schema";
import { desc, sql, eq } from "drizzle-orm";

export async function getPosts(
  page: number,
  userId: string,
  excludedPostIds: number[]
) {
  const categoryMap = {
    food_support: 0,
    medical_aid: 1,
    education: 2,
    housing_support: 3,
    emotional_support: 4,
    elderly_care: 5,
    child_care: 6,
    disaster_relief: 7,
    job_training: 8,
    environmental_protection: 9,
  };
  type Category = keyof typeof categoryMap;

  const pageSize = 5;
  const offset = page * pageSize;

  const currentRecomandationScore = await db
    .select({ recommand_score: users.recommand_score })
    .from(users)
    .where(eq(users.id, userId))
    .then((rows) => rows[0]?.recommand_score || 0);

  const fetchedPosts = await db
    .select()
    .from(posts)
    .where(sql`${posts.id} NOT IN (${sql.join(excludedPostIds)})`) // Exclude posts by IDs
    .orderBy(
      sql`ABS(${currentRecomandationScore} - ${
        categoryMap[posts.category as unknown as Category]
      })`
    ) // Order by absolute difference
    .limit(pageSize)
    .offset(offset);

  return fetchedPosts.map((post) => ({
    id: post.id,
    ownerId: post.owner_id,
    title: post.title,
    category: post.category,
    description: post.description,
    registrationStart: post.registration_start,
    registrationEnd: post.registration_end,
    isOpen: post.is_open,
    requiredPeople: post.required_people,
    mediaUrl: post.media_url,
  }));
}
