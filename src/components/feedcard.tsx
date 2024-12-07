"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  ThumbsUp,
  MessageSquare,
  Share2,
  ArrowUp,
  HeartHandshake,
  Send,
} from "lucide-react";

export interface FeedCardProps {
  name: string;
  title: string;
  description: string;
  avatar?: string;
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
  name,
  title,
  description,
  avatar,
}: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isOverflowing = useIsOverflowing(descriptionRef, 3);

  return (
    <div className="w-[26rem] mx-auto">
      <div className="bg-card text-card-foreground shadow rounded-md overflow-hidden">
        <div className="p-5">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>
          <div className="mb-4">
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
          <div className="grid grid-cols-4 items-center pt-2 border-t border-border">
            <button className="flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md">
              <ThumbsUp className="h-6 w-6 scale-x-[-1]" />
            </button>
            <button className="flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-gray-100 dark:hover:bg-white/5 py-3 rounded-md">
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
    </div>
  );
}
