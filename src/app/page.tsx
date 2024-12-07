import { Navbar } from "@/components/navbar";
import FeedCard, { FeedCardProps } from "@/components/feedcard";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Text } from "~/components/ui/typography";

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
      <div className="mt-20" />

      <div className="flex flex-col gap-4">
        {feedCards.map((card, index) => (
          <FeedCard key={index} {...card} />
        ))}
      </div>

      <Text>Hello world</Text>
      <ThemeSwitcher />
    </div>
  );
}
