"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Users, Newspaper, Calendar, Crown } from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export default function ProfileSidebar() {
  const { user } = useClerk();
  return (
    <div className="w-[256px] flex flex-col gap-4">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg" />
            <div className="absolute -bottom-6 left-4">
              <Avatar className="h-16 w-16 border-4 border-white dark:border-[#1A191B]">
                <AvatarImage src={user?.imageUrl} alt="Profile picture" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="p-4 pt-8">
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
            <p className="text-sm text-muted-foreground">Volunteer</p>
            <p className="text-sm text-muted-foreground">Bucharest, RO</p>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Volunteered for</span>
              <span className="text-sm font-semibold text-blue-600">
                17 people
              </span>
            </div>
            <Link
              href="#"
              className="inline-block text-sm text-muted-foreground hover:text-blue-600 hover:underline"
            >
              View all analytics
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Premium Card */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm">Unlock 4x more profile visits</p>
            <Button
              variant="outline"
              className="w-full justify-start text-amber-700 hover:text-amber-800 hover:bg-amber-400"
            >
              <Crown className="mr-2 h-4 w-4" />
              Try Premium
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-4">
          <nav className="space-y-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Bookmark className="h-5 w-5" />
              Saved posts
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Users className="h-5 w-5" />
              Groups
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Newspaper className="h-5 w-5" />
              Newsletters
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Calendar className="h-5 w-5" />
              Events
            </Link>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
