"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "~/hooks/use-toast";

import confetti from "canvas-confetti";

export function ChristmasCountdown() {
  const [progress, setProgress] = useState(512);
  const [timeLeft, setTimeLeft] = useState("");

  const handleClick = (event: React.MouseEvent) => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      origin: {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      },
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.55,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 200);
    setTimeout(shoot, 400);
  };

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

      setTimeLeft(`${days}d ${hours}h ${minutes}m until Christmas 🎅`);
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
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://cdn.hswstatic.com/gif/volunteer-christmas-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-white text-card-foreground rounded-lg shadow-md p-4 flex flex-col gap-3 border border-border relative"
    >
      <div className="relative flex justify-between items-center">
        <h2 className="text-md font-bold">
          🎄 Bring joy to kids this Christmas
        </h2>
        <Button
          onClick={(e) => {
            setProgress((prog) => prog + 1);
            handleClick(e);
          }}
          variant="default"
          size="sm"
          className="h-8 px-3 py-1 font-bold hover:bg-black hover:text-white focus:scale-105 ease-in-out transition-transform dark:bg-white dark:text-black"
        >
          Help Now 🎁
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
      <div className="text-sm font-bold text-white text-center">{timeLeft}</div>
    </div>
  );
}
