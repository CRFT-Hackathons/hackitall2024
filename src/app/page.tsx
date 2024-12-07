import { Navbar } from "@/components/navbar";
import { SignOutButton } from "~/components/SignOutButton";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Text } from "~/components/ui/typography";

export default function Component() {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-2">
      <Navbar />
      <Text>Hello world</Text>
      <ThemeSwitcher />
      <SignOutButton />
    </div>
  );
}
