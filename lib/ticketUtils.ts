export type Ticket = {
  id: string;
  reporter: string;
  targetType: "post" | "comment" | "user";
  targetId: string;
  reason: string;
  status: "open" | "investigating" | "closed";
  summary?: string;
  createdAt: string;
};

export function statusLabel(status: Ticket["status"]) {
  switch (status) {
    case "open":
      return "Open";
    case "investigating":
      return "Investigating";
    case "closed":
      return "Closed";
    default:
      return "Unknown";
  }
}

export function ticketBadgeColor(status: Ticket["status"]) {
  switch (status) {
    case "open":
      return "bg-amber-500/20 text-amber-300 border border-amber-400/40";
    case "investigating":
      return "bg-sky-500/20 text-sky-300 border border-sky-400/40";
    case "closed":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40";
    default:
      return "bg-slate-500/20 text-slate-200 border border-slate-400/40";
  }
}
