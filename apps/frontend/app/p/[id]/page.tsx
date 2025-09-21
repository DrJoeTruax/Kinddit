interface Params {
  params: { id: string };
}

async function fetchPost(id: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  const res = await fetch(`${base}/posts`, { next: { revalidate: 30 } });
  if (!res.ok) {
    return null;
  }
  const posts = (await res.json()) as Array<any>;
  return posts.find((post) => String(post.id) === id) ?? null;
}

async function fetchComments(postId: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  const res = await fetch(`${base}/comments?post_id=${postId}`, { next: { revalidate: 15 } });
  return res.ok ? ((await res.json()) as Array<any>) : [];
}

export default async function PostPage({ params }: Params) {
  const post = await fetchPost(params.id);
  const comments = post ? await fetchComments(params.id) : [];

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-slate-400">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-16">
      <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h1 className="text-3xl font-semibold text-white">{post.title}</h1>
        {post.body && <p className="mt-3 whitespace-pre-wrap text-slate-200">{post.body}</p>}
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
          <span>Score: {post.score}</span>
        </div>
      </article>
      <section className="space-y-3">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Comments</h2>
          <button className="rounded-md border border-brand/40 px-3 py-1 text-sm text-brand hover:bg-brand/10">
            Open ticket
          </button>
        </header>
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400">Be the first to comment.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <p className="text-sm text-slate-200">{comment.body}</p>
                <p className="mt-2 text-xs text-slate-500">Score: {comment.score}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
