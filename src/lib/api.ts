"use server";

import { db } from "~/lib/db";
import { posts, users } from "~/lib/schema";
import { desc, sql, eq, notInArray } from "drizzle-orm";

interface categoryMapI {
  [key: string]: number;
}

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

  const userData = await db
    .select({ recommand_score: users.recommand_score })
    .from(users)
    .where(eq(users.id, userId))
    .then((rows) => rows[0]?.recommand_score || 0);

  const currentRecomandationScore: number = userData as number;
  const fetchedPosts = await db
    .select()
    .from(posts)
    .where(
      // Use notInArray for excluding posts
      excludedPostIds.length > 0
        ? notInArray(posts.id, excludedPostIds)
        : undefined
    ) // Exclude posts by IDs
    .orderBy(
      sql`ABS(${currentRecomandationScore} - 
        CASE 
          WHEN ${posts.category} = 'food_support' THEN 1.0
          WHEN ${posts.category} = 'medical_aid' THEN 2.0
          WHEN ${posts.category} = 'education' THEN 3.0
          WHEN ${posts.category} = 'housing_support' THEN 4.0
          WHEN ${posts.category} = 'emotional_support' THEN 5.0
          WHEN ${posts.category} = 'elderly_care' THEN 6.0
          WHEN ${posts.category} = 'child_care' THEN 7.0
          WHEN ${posts.category} = 'disaster_relief' THEN 8.0
          WHEN ${posts.category} = 'job_training' THEN 9.0
          WHEN ${posts.category} = 'environmental_protection' THEN 10.0
          ELSE 0.0
        END
      )`
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
