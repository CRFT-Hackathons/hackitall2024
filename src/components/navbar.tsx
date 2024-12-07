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

import Image from "next/image";
import Logo from "../../public/logo.svg";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="w-full bg-background border-b border-border fixed">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="h-10 w-10 rounded"
                src={Logo}
                alt="CRFT"
                width={32}
                height={32}
              />
            </Link>
            <div className="relative ml-4 hidden sm:block">
              <Input
                type="text"
                placeholder="Search"
                className="hidden sm:block pl-10 pr-4 py-5 border-none outline-none bg-muted-background text-foreground rounded-md focus:ring-ring focus:border-ring w-full sm:text-sm shadow-none dark:bg-white/5 bg-black/5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NavItem icon={<Home />} label="Home" href="/" />
            <NavItem icon={<Users />} label="My Network" href="#" />
            <NavItem icon={<Briefcase />} label="Jobs" href="#" />
            <NavItem icon={<MessageSquare />} label="Messaging" href="#" />
            <NavItem icon={<Bell />} label="Notifications" href="#" />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { usePathname } from "next/navigation";

function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link
      href={href}
      className={
        `px-3 py-2 text-sm font-medium text-muted-foreground hover:text-black dark:hover:text-white focus:outline-none focus:text-foreground` +
        (isActive
          ? " bg-white/5 dark:bg-black/5 rounded-none text-black dark:text-white border-b dark:border-white border-black"
          : "")
      }
    >
      <div className="flex flex-col items-center">
        {icon}
        <span className="mt-1 text-sm hidden md:block text-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
}

function UserMenu() {
  const { signOut, user } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-4 flex flex-col items-center text-sm font-medium text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground focus:bg-transparent">
          <Avatar className="w-7 h-7">
            <AvatarImage src={user?.imageUrl} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="ml-1 text-nowrap hidden md:block">Me ▼</span>
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
