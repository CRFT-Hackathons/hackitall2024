"use server";

import { db } from "~/lib/db"
import { posts } from "~/lib/schema"
import { desc } from 'drizzle-orm'

export async function getPosts(page: number) {
  const pageSize = 5
  const offset = page * pageSize

  const fetchedPosts = await db.select().from(posts)
    .orderBy(desc(posts.created_at))
    .limit(pageSize)
    .offset(offset)

  return fetchedPosts.map(post => ({
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
  }))
}