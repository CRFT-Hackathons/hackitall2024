import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Info } from "lucide-react";

export default function DiscoverVolunteers() {
  return (
    <Card className="w-[256px] max-h-fit flex flex-col gap-4">
      <CardHeader className="flex flex-row justify-between items-start pb-0 pl-6">
        <CardTitle className="text-xl">Discover Volunteers</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/1200px-Flag_of_the_Red_Cross.svg.png"
                alt="Red Cross"
                className="object-cover"
              />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Red Cross</h3>
              <p className="text-sm text-muted-foreground">
                Humanitarian Organization • First Aid
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://avatar.iran.liara.run/public/girl"
                alt="Volunteer"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground">
                Community Leader | Environmental Activist 🌱
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Connect
          </Button>
        </div>

        {/* Event Organizer */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://static.wixstatic.com/media/095ac7_21e344bf105e44faad4ef52f1c3b59c5~mv2.png/v1/fill/w_234,h_234,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design%20(18).png"
                alt="Event Organizer"
                className="bg-white"
              />
              <AvatarFallback>EO</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Local Food Bank</h3>
              <p className="text-sm text-muted-foreground">
                Food Security • Community Support
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="link" className="w-full text-foreground">
          View all recommendations →
        </Button>
        <Separator />
        <div className="grid w-full grid-cols-2 gap-2 text-center text-xs text-muted-foreground">
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Help Center
          </Link>
          <Link href="#" className="hover:underline">
            Privacy & Terms
          </Link>
          <Link href="#" className="hover:underline">
            Advertising
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2024 CRFT Volunteer Connect
        </p>
      </CardFooter>
    </Card>
  );
}
