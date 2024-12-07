"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  ThumbsUp,
  MessageSquare,
  HeartHandshake,
  Send,
  Dot,
  Users,
  CalendarDays,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { useClerk } from "@clerk/nextjs";
import {
  updateUserRecomandationScoreOnLike,
  updateUserRecomandationScoreOnPost,
} from "~/lib/helpers/updateRecommandationScore";

export interface FeedCardProps {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  description: string;
  registrationStart?: string | undefined | null; // Assuming ISO string, adjust type if necessary
  registrationEnd?: string | undefined | null; // Assuming ISO string, adjust type if necessary
  isOpen: boolean;
  requiredPeople?: number | undefined | null;
  mediaUrl?: string | undefined | null;
}

function useIsOverflowing(ref: React.RefObject<HTMLElement>, lines: number) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const lineHeight = parseInt(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * lines;
      setIsOverflowing(element.scrollHeight > maxHeight);
    }
  }, [ref, lines]);

  return isOverflowing;
}

export default function FeedCard({
  title,
  description,
  category,
  registrationStart,
  registrationEnd,
  isOpen,
  requiredPeople,
  mediaUrl,
}: FeedCardProps) {
  const { user } = useClerk();
  const [isExpanded, setIsExpanded] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [offered, setOffered] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isOverflowing = useIsOverflowing(descriptionRef, 3);

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

  useEffect(() => {
    setLikesCount(Math.floor(Math.random() * 100));
    setVolunteersCount(Math.floor(Math.random() * (requiredPeople || 100)));
    setRepostCount(Math.floor(Math.random() * 100));
  }, []);

  return (
    <div className="min-w-96">
      <div className="bg-card text-card-foreground shadow-sm border border-border rounded-md overflow-hidden">
        <div>
          <div className="flex items-center mb-4 p-4 pb-0">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
          </div>
          <div className="mb-2 px-4">
            <p
              ref={descriptionRef}
              className={`text-foreground ${!isExpanded && "line-clamp-3"}`}
            >
              {description}
            </p>
            {isOverflowing && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-accent hover:text-accent-hover mt-2 text-sm font-medium"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
          {mediaUrl && (
            <div className="pb-2">
              <img
                src={mediaUrl}
                alt="Post media"
                className="w-full max-h-96 object-cover rounded-none"
              />
            </div>
          )}
          <div className="px-4 text-sm text-muted-foreground py-2">
            <div className="flex justify-start items-center">
              {registrationStart && registrationEnd && (
                <div className="flex items-center -space-x-1">
                  <p>
                    <b>Registration Period</b>:{" "}
                    {new Date(registrationStart).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                    {" - "}
                    {new Date(registrationEnd).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between py-4">
              <StatusBadge isOpen={isOpen} />
              {requiredPeople && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{requiredPeople} people required</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm px-4 pb-2 items-center">
            <div className="flex gap-1 items-center">
              <div className="bg-blue-500 p-1 rounded-full">
                <ThumbsUp className="w-3 h-3 -rotate-12 text-white" />
              </div>
              <span>{likesCount}</span>
            </div>
            <div className="flex items-center">
              <div>{volunteersCount} volunteers gathered</div>
              <Dot className="opacity-90 h-4 w-4" />
              <div>{repostCount} reposts</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center pt-2 border-t border-border p-4 pb-2">
          <button
            className={`flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md ${
              liked ? "text-blue-500" : ""
            }`}
            onClick={async () => {
              const postScore = 0;
              type Category = keyof typeof categoryMap;
              console.error(category, categoryMap[category as Category]);
              await updateUserRecomandationScoreOnLike(
                user?.id as string,
                categoryMap[category as Category]
              );
              setLikesCount(liked ? likesCount - 1 : likesCount + 1);
              setLiked(!liked);
            }}
          >
            <ThumbsUp className="h-6 w-6 scale-x-[-1]" />
          </button>
          <button
            className={`flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md ${
              offered ? "text-red-600" : ""
            }`}
            onClick={async () => {
              type Category = keyof typeof categoryMap;
              await updateUserRecomandationScoreOnPost(
                user?.id as string,
                categoryMap[category as Category]
              );
              setVolunteersCount(
                offered ? volunteersCount - 1 : volunteersCount + 1
              );
              setOffered(!offered);
            }}
          >
            <HeartHandshake className="h-6 w-6" />
          </button>
          <button className="flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md">
            <MessageSquare className="h-6 w-6" />
          </button>
          <button className="flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
