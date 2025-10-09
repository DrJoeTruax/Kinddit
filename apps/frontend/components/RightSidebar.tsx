import Link from "next/link";
import { Flame, MessageCircle, TrendingUp } from "lucide-react";
import { posts, tickets } from "@/lib/mockData";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import { ticketStatusTheme } from "@/lib/ticketUtils";

export default function RightSidebar() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 card-shadow">
        <header className="flex items-center gap-2 text-sm font-semibold">
          <Flame className="h-4 w-4 text-primary" />
          <span>Trending posts</span>
        </header>
        <div className="mt-4 space-y-4 text-sm">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/p/${post.id}`} className="block rounded-2xl border border-transparent p-3 transition hover:border-primary/40 hover:bg-slate-900/60">
              <p className="font-semibold text-slate-100">{post.title}</p>
              <p className="mt-1 text-xs text-slate-400">
                {post.community.name} • {formatNumber(post.votes)} votes • {formatNumber(post.comments)} comments
              </p>
              <p className="mt-1 text-xs text-slate-500">{formatRelativeTime(post.createdAt)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 card-shadow">
        <header className="flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>Trending communities</span>
        </header>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          {posts.slice(0, 4).map((post) => (
            <li key={post.id} className="flex justify-between gap-2">
              <span>{post.community.name}</span>
              <span className="text-xs text-slate-500">↑ {formatNumber(post.votes)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 card-shadow">
        <header className="flex items-center gap-2 text-sm font-semibold">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span>Ticket log</span>
        </header>
        <div className="mt-4 space-y-3 text-sm">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={ticket.link}
              className="block rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3 transition hover:border-primary/40 hover:text-primary"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide">
                <span className="font-semibold text-slate-300">{ticket.id}</span>
                <span className={`rounded-full border px-2 py-0.5 ${ticketStatusTheme(ticket.status)}`}>{ticket.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-200">{ticket.reason}</p>
              {ticket.summary ? <p className="mt-1 text-xs text-slate-400">{ticket.summary}</p> : null}
              <p className="mt-2 text-xs text-slate-500">{formatRelativeTime(ticket.createdAt)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
