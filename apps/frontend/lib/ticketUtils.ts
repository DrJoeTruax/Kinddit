import { type Ticket } from "./types";

export function ticketStatusTheme(status: Ticket["status"]): string {
  switch (status) {
    case "closed":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "in_review":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    default:
      return "bg-sky-500/15 text-sky-400 border-sky-500/30";
  }
}
