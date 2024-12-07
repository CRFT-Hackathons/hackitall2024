import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  isOpen: boolean;
}

export function StatusBadge({ isOpen }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5",
        isOpen
          ? "border-green-200 text-green-700 bg-green-50"
          : "border-red-200 text-red-700 bg-red-50"
      )}
    >
      {isOpen ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5" />
      )}
      {isOpen ? "Open" : "Closed"}
    </Badge>
  );
}
