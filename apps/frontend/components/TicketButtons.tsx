"use client";

interface TicketButtonsProps {
  onOpen: (kind: "crisis" | "mod") => Promise<void> | void;
}

export function TicketButtons({ onOpen }: TicketButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onOpen("crisis")}
        className="rounded-md border border-red-400/60 px-3 py-1 text-sm font-medium text-red-200 hover:bg-red-500/10"
      >
        Open crisis ticket
      </button>
      <button
        type="button"
        onClick={() => onOpen("mod")}
        className="rounded-md border border-blue-400/60 px-3 py-1 text-sm font-medium text-blue-200 hover:bg-blue-500/10"
      >
        Open mod ticket
      </button>
    </div>
  );
}
