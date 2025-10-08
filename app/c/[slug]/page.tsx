import { PostCard, type Post } from "@/components/PostCard";
import { BlockAction } from "@/components/BlockAction";

const communityPosts: Record<string, Post[]> = {
  safety: [
    {
      id: "p-201",
      title: "Weekly moderation wins",
      community: "safety",
      author: "lina",
      createdAt: "3h ago",
      body: "Share the top interventions and learnings from your community safety pilots.",
      votes: 780,
      comments: 54
    }
  ],
  default: [
    {
      id: "p-202",
      title: "Welcome to your new community",
      community: "kinddit",
      author: "team-kinddit",
      createdAt: "just now",
      body: "Use this space to introduce your mission, set norms, and highlight Block-Lock settings.",
      votes: 1,
      comments: 0
    }
  ]
};

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const posts = communityPosts[params.slug] ?? communityPosts.default;
  const hero = params.slug.replace(/-/g, " ");

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-500/20 via-slate-950 to-slate-950 p-8 text-slate-100 shadow-lg shadow-teal-500/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-200">Community</p>
        <h1 className="mt-2 text-3xl font-bold capitalize">{hero}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200/90">
          This space is testing Kinddit’s Block-Lock and transparency primitives. Every interaction is public and civility-first.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-200">
          <span className="rounded-full border border-teal-500/60 bg-teal-500/10 px-4 py-1 font-semibold text-teal-100">3.4k members</span>
          <span className="rounded-full border border-slate-700/80 px-4 py-1">Safety score: 98</span>
          <BlockAction />
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-100">Posts</h2>
        <div className="grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
