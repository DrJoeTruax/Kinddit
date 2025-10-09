import TicketCard from "@/components/TicketCard";
import { tickets } from "@/lib/mockData";

export default function TicketDashboard() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <p className="text-xs uppercase tracking-wide text-slate-500">Public safety operations</p>
        <h1 className="mt-2 text-3xl font-display font-semibold text-slate-100">Ticket transparency log</h1>
        <p className="mt-2 text-sm text-slate-400">
          Every moderation review is published with a summary card. Open tickets invite public accountability.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
