import { Navbar } from "@/components/navbar";
import FeedCard, { FeedCardProps } from "@/components/feedcard";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Text } from "~/components/ui/typography";
import { CreatePost } from "~/components/create-a-post";
import ProfileSidebar from "~/components/profile-sidebar";
import DiscoverVolunteers from "~/components/discover-volunteers";

const feedCards: FeedCardProps[] = [
  {
    name: "John Doe",
    title: "Frontend Developer",
    description:
      "Passionate about crafting beautiful and efficient user interfaces.Passionate about crafting beautiful and efficient user interfaces.Passionate about crafting beautiful and efficient user interfaces.Passionate about crafting beautiful and efficient user interfaces.Passionate about crafting beautiful and efficient user interfaces.Passionate about crafting beautiful and efficient user interfaces.",
    avatar: "https://example.com/avatars/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    title: "UX Designer",
    description:
      "Loves designing user-friendly experiences and seamless flows.",
    avatar: "https://example.com/avatars/jane-smith.jpg",
  },
  {
    name: "Alex Johnson",
    title: "Backend Engineer",
    description: "Specializes in building robust APIs and scalable systems.",
  },
  {
    name: "Emma Brown",
    title: "Product Manager",
    description:
      "Focused on delivering value through user-centered product development.",
    avatar: "https://example.com/avatars/emma-brown.jpg",
  },
];

export default function Component() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-2">
      <Navbar />
      <div className="mt-12" />
      {/* <ThemeSwitcher /> */}

      {/* <div className="items-center justify-center">
        <div className="w-full grid grid-cols-3 gap-8 justify-between p-6">
          <div className="justify-self-end">
            <ProfileSidebar />
          </div>
          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
            <CreatePost />
            {feedCards.map((card, index) => (
              <FeedCard key={index} {...card} />
            ))}
          </div>
          <div className="hidden lg:block">
            <DiscoverVolunteers />
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-3 gap-8 p-8 place-content-center">
        <div className="hidden sm:flex place-content-end">
          <ProfileSidebar />
        </div>
        <div className="flex flex-col gap-4 col-span-3 sm:col-span-2 lgxl:col-span-1">
          <CreatePost />
          {feedCards.map((card, index) => (
            <FeedCard key={index} {...card} />
          ))}
        </div>
        <div className="hidden lgxl:flex">
          <DiscoverVolunteers />
        </div>
      </div>
    </div>
  );
}
