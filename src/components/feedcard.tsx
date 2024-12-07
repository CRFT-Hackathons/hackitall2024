"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  ThumbsUp,
  MessageSquare,
  HeartHandshake,
  Send,
  Dot,
} from "lucide-react";
import { set } from "date-fns";

export interface FeedCardProps {
  name: string;
  title: string;
  description: string;
  avatar?: string;
  image?: string;
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
  const [likesCount, setLikesCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isOverflowing = useIsOverflowing(descriptionRef, 3);

  useEffect(() => {
    setLikesCount(Math.floor(Math.random() * 100));
    setVolunteersCount(Math.floor(Math.random() * 100));
    setRepostCount(Math.floor(Math.random() * 100));
  }, []);

  return (
    <div className="w-96 mx-auto">
      <div className="bg-card text-card-foreground shadow-sm border border-border rounded-md overflow-hidden">
        <div>
          <div className="flex items-center mb-4 p-4 pb-0">
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
          <div className="pb-2">
            <img
              src="https://picsum.photos/600/200"
              alt=""
              className="w-full h-48 object-cover rounded-none"
            />
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
  );
}
