import Layout from "@/components/Layout";
import CommentItem from "@/components/Comment";

async function getPost(id: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const [p, cs] = await Promise.all([
    fetch(`${base}/posts`).then((r) => r.json()),
    fetch(`${base}/comments`).then((r) => r.json()),
  ]);
  const post = p.find((x: any) => String(x.id) === id);
  const comments = cs.filter((c: any) => String(c.post_id) === id);
  return { post, comments };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { post, comments } = await getPost(params.id);
  return (
    <Layout sidebar={<div className="card p-4"><div className="text-sm">Post tools coming soon.</div></div>}>
      {!post ? (
        <div className="card p-6">Post not found.</div>
      ) : (
        <>
          <article className="card p-5">
            <h1 className="text-xl font-semibold">{post.title}</h1>
            <p className="text-sm text-[color:var(--muted)] mt-1">c/{post.community_id} • u/{post.author_id ?? "anon"}</p>
            <div className="prose prose-invert mt-4">{post.body}</div>
          </article>
          <section className="space-y-3">
            <h3 className="mt-4 font-semibold">Comments</h3>
            {comments.length === 0 ? (
              <div className="card p-4 text-sm text-[color:var(--muted)]">No comments yet.</div>
            ) : comments.map((c: any) => (<CommentItem key={c.id} c={c} />))}
          </section>
        </>
      )}
    </Layout>
  );
}
