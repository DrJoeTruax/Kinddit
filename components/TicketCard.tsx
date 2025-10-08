import { CalendarClock, CheckCircle2, MessageCircleWarning } from "lucide-react";
import { Ticket, statusLabel, ticketBadgeColor } from "@/lib/ticketUtils";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <article className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">{ticket.targetType}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">Ticket #{ticket.id}</h3>
          <p className="mt-1 text-sm text-slate-300">{ticket.reason}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ticketBadgeColor(ticket.status)}`}>
          {statusLabel(ticket.status)}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <MessageCircleWarning className="h-4 w-4 text-amber-400" /> Reporter: {ticket.reporter}
        </span>
        <span className="inline-flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-slate-300" /> {ticket.createdAt}
        </span>
        {ticket.summary && (
          <span className="inline-flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> {ticket.summary}
          </span>
        )}
      </div>
    </article>
  );
}
