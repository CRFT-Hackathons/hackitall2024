"use server";
import { db } from "../db";
import { eq } from "drizzle-orm";

import { users } from "../schema/user";
const ALPHA = 0.5;

/**
 * Calculate the next recomandation score (Tn+1)
 * @param tn - Actual recomandation score (Tn)
 * @param Tn - Previous predicted recomandation score
 * @returns The predicted next recomandation score (Tn+1)
 */
function calculateNextRecomanadationScore(tn: number, Tn: number): number {
  return ALPHA * tn + (1 - ALPHA) * Tn;
}

// const tn = 10;
// const Tn = 8;
// const TnPlus1 = calculateNextRecomanadationScore(tn, Tn);
// console.log(`The predicted next recomandation score (Tn+1) is: ${TnPlus1}`);
export async function updateUserRecomandationScoreOnLike(
  userID: string,
  postScore: number
): Promise<void> {
  const currentRecommandationScore = await db
    .select({ recommand_score: users.recommand_score })
    .from(users)
    .where(eq(users.id, userID))
    .then((rows) => rows[0]?.recommand_score || 0);

  let updateScore = currentRecommandationScore as number;
  updateScore += postScore;
  updateScore /= 2;

  const newScore: number = calculateNextRecomanadationScore(
    currentRecommandationScore as number,
    updateScore
  );

  console.error(updateScore);
  console.error(
    "Post score",
    postScore,
    "Current string ",
    currentRecommandationScore,
    "Current number",
    currentRecommandationScore as number,
    "New",
    newScore
  );
  await db
    .update(users)
    .set({ recommand_score: String(newScore) })
    .where(eq(users.id, userID));
}

export async function updateUserRecomandationScoreOnScroll(
  userID: string
): Promise<void> {
  const currentRecommandationScore = await db
    .select({ recommand_score: users.recommand_score })
    .from(users)
    .where(eq(users.id, userID))
    .then((rows) => rows[0]?.recommand_score || 0);

  const newScore: number = calculateNextRecomanadationScore(
    currentRecommandationScore as number,
    Math.random() * 10
  );
  console.error("Current", currentRecommandationScore, "New", newScore);
  await db
    .update(users)
    .set({ recommand_score: String(newScore) })
    .where(eq(users.id, userID));
}

export async function updateUserRecomandationScoreOnPost(
  userID: string,
  postScore: number
): Promise<void> {
  const currentRecommandationScore = await db
    .select({ recommand_score: users.recommand_score })
    .from(users)
    .where(eq(users.id, userID))
    .then((rows) => rows[0]?.recommand_score || 0);
  const newScore: number = calculateNextRecomanadationScore(
    currentRecommandationScore as number,
    postScore
  );
  console.error("Current", currentRecommandationScore, "New", newScore);
  await db
    .update(users)
    .set({ recommand_score: String(newScore) })
    .where(eq(users.id, userID));
}
