import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { communities, posts } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const community = communities.find((item) => item.slug === params.slug);
  if (!community) return notFound();
  const communityPosts = posts.filter((post) => post.community.slug === community.slug);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <p className="text-sm uppercase tracking-wide text-slate-500">Community</p>
        <h1 className="mt-2 text-3xl font-display font-semibold text-slate-100">{community.name}</h1>
        <p className="mt-2 text-sm text-slate-400">{community.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="rounded-full bg-slate-800/60 px-3 py-1">
            {formatNumber(community.members)} members
          </span>
          {community.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800/60 px-3 py-1 uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {communityPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
