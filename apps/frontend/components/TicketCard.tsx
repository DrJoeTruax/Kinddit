import Link from "next/link";
import type { Ticket } from "@/lib/types";
import { ticketStatusTheme } from "@/lib/ticketUtils";
import { formatRelativeTime } from "@/lib/utils";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      href={ticket.link}
      className="block rounded-3xl border border-slate-800/60 bg-slate-900/50 p-4 transition hover:border-primary/40 hover:text-primary"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide">
        <span className="font-semibold text-slate-300">{ticket.id}</span>
        <span className={`rounded-full border px-2 py-0.5 ${ticketStatusTheme(ticket.status)}`}>{ticket.status}</span>
      </div>
      <p className="mt-2 text-sm text-slate-100">{ticket.reason}</p>
      {ticket.summary ? <p className="mt-1 text-xs text-slate-400">{ticket.summary}</p> : null}
      <p className="mt-3 text-xs text-slate-500">Filed {formatRelativeTime(ticket.createdAt)}</p>
    </Link>
  );
}
