interface PublicSummaryCardProps {
  summary: string;
  updatedAt: string;
}

export function PublicSummaryCard({ summary, updatedAt }: PublicSummaryCardProps) {
  return (
    <aside className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Public summary</h3>
      <p className="mt-2 text-sm text-emerald-100">{summary}</p>
      <p className="mt-3 text-xs text-emerald-300/80">Updated {new Date(updatedAt).toLocaleString()}</p>
    </aside>
  );
}
