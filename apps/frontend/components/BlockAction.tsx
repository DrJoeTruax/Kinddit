import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlockAction({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-sm text-rose-300",
        "transition hover:border-rose-400/60"
      )}
      title="Block-Lock prevents further edits to protect this conversation"
    >
      <Lock className="h-4 w-4" />
      {label}
    </span>
  );
}
