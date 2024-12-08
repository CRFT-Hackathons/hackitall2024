"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast, useToast } from "~/hooks/use-toast";

export function ChristmasCountdown() {
  const [progress, setProgress] = useState(512);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25); // Month is 0-indexed
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      const difference = christmas.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m until Christmas`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    toast({
      title: "A new gift to a child!",
      description: "You can make the christmas of a needy child better!",
      variant: "success",
    });
  }, [progress]);
  useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 1000 ? prev + 1 : 1000));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-bold">Bring joy to kids this Christmas</h2>
        <Button
          onClick={() => {
            setProgress((prog) => prog + 1);
          }}
          variant="outline"
          size="sm"
          className="h-8 px-3 py-1"
        >
          Help Now
        </Button>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex-grow">
          <Progress value={progress / 10} className="h-5 bg-gray-200" />
        </div>
        <span className="text-sm font-medium whitespace-nowrap">
          {progress}/1000 gifts
        </span>
      </div>
      <div className="text-sm font-bold text-muted-foreground text-center">
        {timeLeft}
      </div>
    </div>
  );
}