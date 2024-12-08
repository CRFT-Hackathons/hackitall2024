import React from "react";
import { cn } from "~/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-6 w-full overflow-hidden rounded-full border-2 border-red-500",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 transition-all bg-white bg-[length:16px_16px] bg-repeat-x animate-[candycane_5s_linear_infinite]"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundImage:
            "linear-gradient(-45deg, transparent 25%, red 25%, red 50%, transparent 50%, transparent 75%, red 75%, red 100%), linear-gradient(45deg, transparent 25%, white 25%, white 50%, transparent 50%, transparent 75%, white 75%, white 100%)",
          backgroundSize: "16px 16px, 16px 16px",
        }}
      />
    </div>
  );
}
