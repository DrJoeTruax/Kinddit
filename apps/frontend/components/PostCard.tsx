type Post = {
  id: number;
  title: string;
  body: string;
  community_id: number;
  author_id?: number | null;
  score: number;
};

export default function PostCard({ p }: { p: Post }) {
  return (
    <article className="card p-4">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center mr-1">
          <button className="btn px-2 py-1">▲</button>
          <span className="text-sm opacity-70">{p.score ?? 0}</span>
          <button className="btn px-2 py-1 mt-1">▼</button>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{p.title}</h2>
          <p className="text-sm text-[color:var(--muted)] mt-1 overflow-hidden text-ellipsis">
            {p.body}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-[color:var(--muted)]">
            <span className="badge">c/{p.community_id}</span>
            <span>by u/{p.author_id ?? "anon"}</span>
            <a className="link" href={`/post/${p.id}`}>
              open
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
