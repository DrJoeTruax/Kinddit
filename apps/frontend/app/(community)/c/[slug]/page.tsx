import Link from "next/link";

interface Params {
  params: { slug: string };
}

async function fetchCommunityPosts(slug: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  const communityRes = await fetch(`${base}/communities?slug=${slug}`, { next: { revalidate: 60 } });
  if (!communityRes.ok) {
    return { posts: [], community: null };
  }
  const communities = (await communityRes.json()) as Array<any>;
  const community = communities.find((entry) => entry.slug === slug) ?? null;
  if (!community) {
    return { posts: [], community: null };
  }
  const postsRes = await fetch(`${base}/posts?community_id=${community.id}`, { next: { revalidate: 30 } });
  const posts = postsRes.ok ? ((await postsRes.json()) as Array<any>) : [];
  return { posts, community };
}

export default async function CommunityPage({ params }: Params) {
  const { posts, community } = await fetchCommunityPosts(params.slug);
  if (!community) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-slate-400">Community not found.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-white">c/{community.slug}</h1>
        <p className="mt-2 text-slate-300">{community.name}</p>
      </header>
      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-slate-400">No posts yet. Be the first to share.</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <Link href={`/p/${post.id}`} className="text-lg font-medium text-white hover:text-brand">
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-slate-300">Score: {post.score}</p>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
