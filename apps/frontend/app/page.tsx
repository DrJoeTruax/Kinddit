import Link from "next/link";

async function fetchPosts() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
    const response = await fetch(`${base}/posts`, { next: { revalidate: 30 } });
    if (!response.ok) {
      return [] as Array<any>;
    }
    return (await response.json()) as Array<any>;
  } catch (error) {
    console.error(error);
    return [] as Array<any>;
  }
}

export default async function HomePage() {
  const posts = await fetchPosts();
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16">
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Kinddit</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Public, safe-by-design communities with transparent moderation tools. No direct messages—safety is the
          product.
        </p>
      </section>
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest posts</h2>
          <Link className="text-sm text-brand hover:text-brand/80" href="/c/demo">
            Visit demo community
          </Link>
        </header>
        <div className="grid gap-3">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-400">
              Seed content via the API to see it appear here once your Docker Compose stack is running.
            </p>
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
      </section>
    </main>
  );
}
