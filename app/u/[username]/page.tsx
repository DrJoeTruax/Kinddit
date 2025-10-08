import { summarizeBlocks, type BlockEvent } from "@/lib/blockUtils";
import type { Ticket } from "@/lib/ticketUtils";

const ticketsFiled: Ticket[] = [
  {
    id: "310",
    reporter: "alex",
    targetType: "post",
    targetId: "p-202",
    reason: "Harassment",
    status: "closed",
    summary: "Content removed, Block-Lock applied.",
    createdAt: "3d ago"
  }
];

const ticketsReceived: Ticket[] = [
  {
    id: "401",
    reporter: "mel",
    targetType: "comment",
    targetId: "c-77",
    reason: "Spam",
    status: "open",
    createdAt: "1d ago"
  }
];

const blockEvents: BlockEvent[] = [
  {
    blocker: "alex",
    blocked: "toxic_user",
    context: "comment:991",
    reason: "Targeted harassment",
    createdAt: "2d ago"
  },
  {
    blocker: "alex",
    blocked: "ad_bot",
    context: "post:880",
    reason: "Spam flood",
    createdAt: "5d ago"
  }
];

export default function ProfilePage({ params }: { params: { username: string } }) {
  const profileName = params.username;
  const blockSummary = summarizeBlocks(blockEvents);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500/60 to-teal-300/80 text-3xl font-bold text-slate-950">
            {profileName.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{profileName}</h1>
            <p className="text-sm text-slate-300">Joined February 2024 • Karma 12,420</p>
            <p className="max-w-xl text-sm text-slate-200/90">
              Building transparent communities. I file tickets when norms are broken and default to kindness-first escalations.
            </p>
          </div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6">
          <h2 className="text-xl font-semibold text-slate-100">Tickets Filed</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {ticketsFiled.map((ticket) => (
              <li key={ticket.id} className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-4">
                <p className="font-semibold text-slate-100">#{ticket.id} — {ticket.reason}</p>
                <p className="mt-1 text-xs text-slate-400">Target {ticket.targetType} {ticket.targetId}</p>
                <p className="mt-2 text-xs text-teal-200">Status: {ticket.status}</p>
                {ticket.summary && <p className="mt-1 text-xs text-emerald-300">{ticket.summary}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6">
          <h2 className="text-xl font-semibold text-slate-100">Tickets Received</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {ticketsReceived.map((ticket) => (
              <li key={ticket.id} className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-4">
                <p className="font-semibold text-slate-100">#{ticket.id} — {ticket.reason}</p>
                <p className="mt-1 text-xs text-slate-400">Target {ticket.targetType} {ticket.targetId}</p>
                <p className="mt-2 text-xs text-teal-200">Status: {ticket.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Block-Lock Transparency</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {blockSummary.map((block) => (
            <article key={`${block.blocker}-${block.blocked}-${block.createdAt}`} className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
              <p className="font-semibold">{block.blocker} blocked {block.blocked}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-red-200">{block.contextLabel}</p>
              <p className="mt-2 text-xs text-red-100/80">Reason: {block.reason}</p>
              <p className="mt-2 text-xs text-red-100/70">{block.createdAt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
