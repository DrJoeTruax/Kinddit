import { Flame, TrendingUp } from "lucide-react";

const trendingPosts = [
  {
    title: "How Block-Lock kept our launch day civil",
    community: "r/Kinddit",
    score: 4250
  },
  {
    title: "AutoModerator YAML templates for fast onboarding",
    community: "r/ModSquad",
    score: 2987
  },
  {
    title: "Tickets transparency dashboard sneak peek",
    community: "r/Product",
    score: 2211
  }
];

const trendingCommunities = [
  {
    name: "r/SafetyBuilders",
    members: "12.4k",
    growth: "+240%"
  },
  {
    name: "r/KindEconomy",
    members: "7.9k",
    growth: "+180%"
  },
  {
    name: "r/TransparencyLab",
    members: "4.2k",
    growth: "+150%"
  }
];

export function RightSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 space-y-6 border-l border-slate-800/60 bg-slate-950/40 px-5 py-6 xl:block">
      <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/20">
        <header className="flex items-center gap-2 text-sm font-semibold text-teal-200">
          <Flame className="h-4 w-4" />
          Top Posts
        </header>
        <ul className="mt-4 space-y-4">
          {trendingPosts.map((post) => (
            <li key={post.title} className="rounded-xl bg-slate-950/40 p-3 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">{post.title}</p>
              <p className="mt-1 text-xs text-slate-400">{post.community}</p>
              <p className="mt-1 text-xs text-teal-300">{post.score.toLocaleString()} upvotes</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/20">
        <header className="flex items-center gap-2 text-sm font-semibold text-teal-200">
          <TrendingUp className="h-4 w-4" />
          Trending Communities
        </header>
        <ul className="mt-4 space-y-3 text-sm">
          {trendingCommunities.map((community) => (
            <li key={community.name} className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2">
              <div>
                <p className="font-semibold text-slate-100">{community.name}</p>
                <p className="text-xs text-slate-400">{community.members} members</p>
              </div>
              <span className="text-xs font-semibold text-teal-300">{community.growth}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
