import { PostCard, type Post } from "@/components/PostCard";
import { AutoModSettings } from "@/components/AutoModSettings";
import { TicketCard } from "@/components/TicketCard";
import type { Ticket } from "@/lib/ticketUtils";

const posts: Post[] = [
  {
    id: "p-101",
    title: "Block-Lock beta recap: 97% reduction in harassment escalations",
    community: "safety",
    author: "alex",
    createdAt: "2h ago",
    body: "We shipped Block-Lock to 30 pioneer communities last week. Here’s the moderation data, feedback, and roadmap tweaks we’re prioritizing next.",
    votes: 2431,
    comments: 182,
    ticketSummary: "Ticket #442 reviewed for harassment. Decision: Post restored with Block-Lock applied to offending branch."
  },
  {
    id: "p-102",
    title: "Show & Tell: Transparency profiles designed for clarity",
    community: "design",
    author: "mara",
    createdAt: "6h ago",
    body: "Sneak peek of the profile transparency tab featuring tickets filed, received, and Block-Lock history.",
    votes: 1320,
    comments: 97
  },
  {
    id: "p-103",
    title: "Community spotlight: r/KindEconomy",
    community: "kindconomy",
    author: "team-kinddit",
    createdAt: "1d ago",
    body: "How a finance community turned kindness into KPIs using AutoModerator delay rules.",
    votes: 987,
    comments: 63
  }
];

const tickets: Ticket[] = [
  {
    id: "442",
    reporter: "sofia",
    targetType: "post",
    targetId: "p-101",
    reason: "Harassment",
    status: "closed",
    summary: "Content reviewed: Block-Lock applied to abusive thread.",
    createdAt: "2h ago"
  },
  {
    id: "443",
    reporter: "lin",
    targetType: "comment",
    targetId: "c-991",
    reason: "Spam",
    status: "investigating",
    createdAt: "4h ago"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-100">Today on Kinddit</h1>
          <p className="text-sm text-slate-300">Curated highlights from communities proving the future of safe social.</p>
        </header>
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-slate-100">Open Transparency Tickets</h2>
          <p className="text-sm text-slate-300">Every moderation action is logged for the community to review.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </section>
      <AutoModSettings />
    </div>
  );
}
