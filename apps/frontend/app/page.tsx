import Link from "next/link";
import AutoModSettings from "@/components/AutoModSettings";
import PostCard from "@/components/PostCard";
import TicketCard from "@/components/TicketCard";
import { posts, tickets } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <header>
          <h1 className="text-3xl font-display font-semibold text-slate-100">Today on Kinddit</h1>
          <p className="mt-2 text-sm text-slate-400">
            A safety-first feed showing Block-Lock in action, transparency ticket summaries, and community wins.
          </p>
        </header>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Latest tickets</h2>
            <p className="text-xs text-slate-500">Public moderation receipts filed by the community.</p>
          </div>
          <Link href="/tickets" className="text-sm text-primary underline underline-offset-4">
            View all
          </Link>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {tickets.slice(0, 2).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </section>

      <AutoModSettings />
    </div>
  );
}
