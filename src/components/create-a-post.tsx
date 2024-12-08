"use client";

import { useClerk } from "@clerk/nextjs";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { VideoIcon, ImageIcon, FileTextIcon } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { CreateEventPostModal } from "./post-modal";

export function CreatePost() {
  const { user } = useClerk();
  return (
    <Card className="min-w-96 p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12">
          <img
            src={user?.imageUrl}
            alt="User avatar"
            className="rounded-full"
          />
        </Avatar>
        <CreateEventPostModal
          trigger={
            <Button
              variant="outline"
              className="w-full justify-start text-gray-500 font-normal rounded-full p-6 hover:bg-black/5 hover:text-black dark:hover:bg-background dark:hover:text-gray-400 border-black/40"
            >
              Start a post
            </Button>
          }
        />
      </div>
      <div className="flex justify-between">
        <MediaOption icon={VideoIcon} label="Video" />
        <MediaOption icon={ImageIcon} label="Photo" />
        <MediaOption icon={FileTextIcon} label="Write a post" />
      </div>
    </Card>
  );
}

interface MediaOptionProps {
  icon: LucideIcon;
  label: string;
}

export function MediaOption({ icon: Icon, label }: MediaOptionProps) {
  return (
    <Button variant="ghost" className="flex items-center space-x-2">
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Button>
  );
}
