export default function CreatePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display font-semibold text-slate-100">Create on Kinddit</h1>
        <p className="mt-2 text-sm text-slate-400">
          Launch a new community, draft a post, or file a transparency ticket. Full creation flows will wire into Supabase in a future iteration.
        </p>
      </header>
      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 card-shadow">
        <p className="text-sm text-slate-300">
          The MVP prioritizes read-only demos. Use the navigation to explore communities, posts, and safety tooling.
        </p>
      </section>
    </div>
  );
}
