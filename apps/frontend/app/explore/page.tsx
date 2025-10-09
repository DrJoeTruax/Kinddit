import Link from "next/link";
import { communities } from "@/lib/mockData";

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display font-semibold text-slate-100">Explore Kinddit</h1>
        <p className="mt-2 text-sm text-slate-400">
          Browse emerging communities and discover moderation experiments powered by Block-Lock and transparent tickets.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {communities.map((community) => (
          <Link
            key={community.slug}
            href={`/c/${community.slug}`}
            className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 transition hover:border-primary/40 hover:bg-slate-900/60"
          >
            <h2 className="text-lg font-semibold text-slate-100">{community.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{community.description}</p>
            <p className="mt-3 text-xs text-slate-500">Tap to view the community feed.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
