import { notFound } from "next/navigation";
import CommentTree from "@/components/CommentTree";
import PostCard from "@/components/PostCard";
import { posts, sampleComments } from "@/lib/mockData";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = posts.find((item) => item.id === params.id);
  if (!post) return notFound();

  return (
    <div className="space-y-8">
      <PostCard post={post} />
      <section className="space-y-4 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <header>
          <h2 className="text-xl font-semibold text-slate-100">Discussion</h2>
          <p className="text-xs text-slate-500">Nested Block-Lock threads keep harmful edits frozen while the conversation continues.</p>
        </header>
        <CommentTree comments={sampleComments} />
      </section>
    </div>
  );
}
