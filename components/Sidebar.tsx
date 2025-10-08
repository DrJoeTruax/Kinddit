import { Hash, Compass, Ticket, ShieldAlert, Layers3, LineChart } from "lucide-react";
import Link from "next/link";

const primaryLinks = [
  { icon: Hash, label: "Communities", href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Ticket, label: "Tickets", href: "/tickets" }
];

const safetyLinks = [
  { icon: ShieldAlert, label: "Transparency", href: "/transparency" },
  { icon: Layers3, label: "Block-Lock", href: "/policies/block-lock" },
  { icon: LineChart, label: "Safety Metrics", href: "/metrics" }
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 space-y-6 border-r border-slate-800/60 bg-slate-950/60 px-5 py-6 lg:block">
      <nav className="space-y-4 text-sm">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</p>
          <ul className="space-y-2">
            {primaryLinks.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-slate-900/40 px-3 py-2 font-medium text-slate-200 transition hover:border-teal-500/60 hover:bg-slate-900/80 hover:text-teal-200"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Safety Suite</p>
          <ul className="space-y-2">
            {safetyLinks.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-slate-300 transition hover:border-teal-500/60 hover:bg-slate-900/80 hover:text-teal-200"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-4 text-sm text-slate-200 shadow-lg shadow-teal-500/10">
        <p className="font-semibold text-teal-200">Safety Spotlight</p>
        <p className="mt-2 text-sm text-slate-300">
          Block-Lock protects communities by freezing abusive threads while preserving context for moderators.
        </p>
      </div>
    </aside>
  );
}
