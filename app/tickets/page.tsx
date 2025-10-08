import { TicketCard } from "@/components/TicketCard";
import type { Ticket } from "@/lib/ticketUtils";

const tickets: Ticket[] = [
  {
    id: "550",
    reporter: "noah",
    targetType: "user",
    targetId: "u-toxic_user",
    reason: "Harassment",
    status: "open",
    createdAt: "12m ago"
  },
  {
    id: "551",
    reporter: "nina",
    targetType: "post",
    targetId: "p-331",
    reason: "Other",
    status: "investigating",
    summary: "Awaiting mod follow-up",
    createdAt: "36m ago"
  },
  {
    id: "552",
    reporter: "dylan",
    targetType: "comment",
    targetId: "c-222",
    reason: "Spam",
    status: "closed",
    summary: "Removed by AutoModerator",
    createdAt: "1h ago"
  }
];

export default function TicketPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-100">Transparency Tickets</h1>
        <p className="text-sm text-slate-300">
          Every ticket is public. Actions and summaries are logged automatically so the community knows what happened.
        </p>
      </header>
      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
