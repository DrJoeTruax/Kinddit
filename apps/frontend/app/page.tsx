import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";

async function getPosts() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const res = await fetch(`${base}/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <Layout>
      {posts.length === 0 ? (
        <div className="card p-6 text-sm text-[color:var(--muted)]">
          No posts yet. Use the API to create one:
          <pre className="mt-3 text-xs bg-black/40 p-3 rounded">
curl -X POST :8000/posts -H 'content-type: application/json' \
-d '{{"community_id":1,"author_id":1,"title":"Hello Kinddit","body":"First post"}}'
          </pre>
        </div>
      ) : posts.map((p: any) => (<PostCard key={p.id} p={p} />))}
    </Layout>
  );
}
