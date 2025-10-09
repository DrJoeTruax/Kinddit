import { notFound } from "next/navigation";
import { profileSummary } from "@/lib/mockData";
import { formatDate, formatNumber } from "@/lib/utils";
import TicketCard from "@/components/TicketCard";

export default function ProfilePage({ params }: { params: { username: string } }) {
  if (params.username !== profileSummary.user.username) return notFound();
  const { user, bio, joinedAt, communities, transparency } = profileSummary;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <p className="text-xs uppercase tracking-wide text-slate-500">Transparency-first profile</p>
        <h1 className="mt-2 text-3xl font-display font-semibold text-slate-100">u/{user.username}</h1>
        <p className="mt-2 text-sm text-slate-300">{bio}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span>Joined {formatDate(joinedAt)}</span>
          <span>{formatNumber(user.karma)} karma</span>
          <span>{transparency.blockedByCount} users blocked them</span>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow space-y-4">
        <header>
          <h2 className="text-xl font-semibold text-slate-100">Communities</h2>
          <p className="text-xs text-slate-500">Public memberships for accountability.</p>
        </header>
        <ul className="grid gap-3 md:grid-cols-2">
          {communities.map((community) => (
            <li key={community.slug} className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-4">
              <p className="text-sm font-semibold text-slate-200">{community.name}</p>
              <p className="mt-1 text-xs text-slate-500">{community.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
          <header>
            <h2 className="text-xl font-semibold text-slate-100">Tickets filed</h2>
            <p className="text-xs text-slate-500">Full transparency on reports initiated by this account.</p>
          </header>
          <div className="space-y-3">
            {transparency.ticketsFiled.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
          <header>
            <h2 className="text-xl font-semibold text-slate-100">Tickets received</h2>
            <p className="text-xs text-slate-500">Public receipts for issues raised against this account.</p>
          </header>
          <div className="space-y-3">
            {transparency.ticketsReceived.length > 0 ? (
              transparency.ticketsReceived.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <p className="text-sm text-slate-400">No tickets yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <header>
          <h2 className="text-xl font-semibold text-slate-100">Block-Lock log</h2>
          <p className="text-xs text-slate-500">Every block is public and includes context.</p>
        </header>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          {transparency.blocksIssued.map((event) => (
            <li key={event.id} className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                <span>{event.context}</span>
                <span>{formatDate(event.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-200">
                {event.blocker} blocked {event.blocked} — {event.reason}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
