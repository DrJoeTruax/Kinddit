type Comment = { id:number; body:string; author_id?:number|null; parent_id?:number|null };
export default function CommentItem({ c }: { c: Comment }) {
  return (
    <div className="card p-3">
      <div className="text-sm">{c.body}</div>
      <div className="mt-2 text-xs text-[color:var(--muted)]">u/{c.author_id ?? "anon"}</div>
    </div>
  );
}
