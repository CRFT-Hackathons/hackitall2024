"use server";

import { db } from "~/lib/db";
import { posts } from "~/lib/schema/post";
import { analyzeInputAnnotate } from "~/lib/helpers/textLanguage";
import { useClerk } from "@clerk/nextjs";
import { matchCategory } from "~/lib/category";

export async function handlePostSubmit({
  userID,
  title,
  description,
  mediaUrl,
  volunteersNeeded,
  registrationStartDate,
  registrationEndDate,
}: {
  userID: string;
  title: string;
  description: string;
  mediaUrl: string;
  volunteersNeeded: string;
  registrationStartDate: Date | undefined;
  registrationEndDate: Date | undefined;
}) {
  if (
    !title ||
    !description ||
    !volunteersNeeded ||
    !registrationStartDate ||
    !registrationEndDate
  ) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (registrationEndDate < registrationStartDate) {
    return {
      success: false,
      error: "Registration end date must be after the start date.",
    };
  }

  try {
    const analyzeText: any = await analyzeInputAnnotate(
      title + ". " + description
    );

    if (analyzeText.isToxicText) {
      return {
        success: false,
        error: "Your description or title contains inappropriate language.",
      };
    } else {
      const categoryLocal = await matchCategory(title, description);
      await db.insert(posts).values({
        owner_id: userID,
        title,
        description,
        category: categoryLocal,
        is_open: true,
        registration_start: registrationStartDate,
        registration_end: registrationEndDate,
        media_url: mediaUrl,
        required_people: parseInt(volunteersNeeded) || null,
      });

      return { success: true, error: "" };
    }
  } catch (err) {
    console.error("Unable to call the API for verifying text", err);
    return { success: false, error: "Unable to verify text." };
  }
}
