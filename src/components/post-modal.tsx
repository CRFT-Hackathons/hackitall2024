"use client";
import { toast, useToast } from "~/hooks/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { analyzeInputAnnotate } from "~/lib/helpers/textLanguage";
import { db } from "~/lib/db";
import { posts } from "~/lib/schema/post";
import { useClerk } from "@clerk/nextjs";
import { handlePostSubmit } from "./server/handlePostSubmit";

interface CreateEventPostModalProps {
  trigger: React.ReactNode;
}

export function CreateEventPostModal({ trigger }: CreateEventPostModalProps) {
  const { user } = useClerk();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState<
    Date | undefined
  >(undefined);
  const [registrationEndDate, setRegistrationEndDate] = useState<
    Date | undefined
  >(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID: string = user?.id as string;
    const { success, error } = await handlePostSubmit({
      userID,
      title,
      description,
      mediaUrl,
      volunteersNeeded,
      registrationStartDate,
      registrationEndDate,
    });

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }

    if (success) {
      toast({
        title: "Event Posted Successfully",
        description: "Your event has been created and posted successfully!",
        variant: "default",
      });
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setVolunteersNeeded("");
    setRegistrationStartDate(undefined);
    setRegistrationEndDate(undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Event Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your event"
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              id="mediaUrl"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="Enter a URL for an image or video"
              type="url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volunteersNeeded">
              Number of Volunteers Needed
            </Label>
            <Input
              id="volunteersNeeded"
              value={volunteersNeeded}
              onChange={(e) => setVolunteersNeeded(e.target.value)}
              placeholder="Enter number of volunteers needed"
              type="number"
              min="1"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Registration Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !registrationStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {registrationStartDate ? (
                    format(registrationStartDate, "dd.MM.yyyy")
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={registrationStartDate}
                  onSelect={setRegistrationStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Registration End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !registrationEndDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {registrationEndDate ? (
                    format(registrationEndDate, "dd.MM.yyyy")
                  ) : (
                    <span>Pick an end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={registrationEndDate}
                  onSelect={setRegistrationEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full">
            Create Event Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
