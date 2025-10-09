import Link from "next/link";
import type { ReactNode } from "react";
import { Compass, Files, ShieldAlert } from "lucide-react";
import { communities } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

export default function Sidebar() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigation</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <NavLink href="/" icon={<Compass className="h-4 w-4" />}>Home feed</NavLink>
          <NavLink href="/explore" icon={<Files className="h-4 w-4" />}>Explore</NavLink>
          <NavLink href="/tickets" icon={<ShieldAlert className="h-4 w-4" />}>Tickets</NavLink>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Communities</h2>
        <div className="mt-3 space-y-3">
          {communities.map((community) => (
            <Link
              key={community.slug}
              href={`/c/${community.slug}`}
              className="block rounded-2xl border border-slate-800/70 bg-slate-900/40 p-3 transition hover:border-primary/40 hover:bg-slate-900/60"
            >
              <p className="text-sm font-semibold text-slate-100">{community.name}</p>
              <p className="mt-1 text-xs text-slate-400">{community.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span>{formatNumber(community.members)} members</span>
                {community.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-800/60 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 transition hover:border-primary/40 hover:text-primary"
    >
      <span className="text-slate-500">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}
