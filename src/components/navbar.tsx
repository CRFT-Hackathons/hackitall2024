"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk } from "@clerk/nextjs";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="w-full bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="/placeholder.svg?height=32&width=32"
                alt="LinkedIn"
              />
            </Link>
            <div className="ml-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-5 border-none outline-none bg-muted-background text-foreground rounded-md focus:ring-ring focus:border-ring block w-full sm:text-sm shadow-none bg-white/5 "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <NavItem icon={<Home />} label="Home" href="/" />
            <NavItem icon={<Users />} label="My Network" href="/mynetwork" />
            <NavItem icon={<Briefcase />} label="Jobs" href="/jobs" />
            <NavItem
              icon={<MessageSquare />}
              label="Messaging"
              href="/messaging"
            />
            <NavItem
              icon={<Bell />}
              label="Notifications"
              href="/notifications"
            />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:text-foreground focus:bg-accent"
    >
      <div className="flex flex-col items-center">
        {icon}
        <span className="mt-1">{label}</span>
      </div>
    </Link>
  );
}

function UserMenu() {
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-4 flex flex-col items-center text-sm font-medium text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground">
          <Avatar className="w-7 h-7">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="ml-1">Me ▼</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectUrl: "/" })}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
