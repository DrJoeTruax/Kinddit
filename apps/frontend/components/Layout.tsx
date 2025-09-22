import type { ReactNode } from "react";
import Nav from "./Nav";

export default function Layout({ children, sidebar }: { children: ReactNode; sidebar?: ReactNode; }) {
  return (
    <div>
      <Nav />
      <main className="container grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
        <section className="lg:col-span-8 space-y-4">{children}</section>
        <aside className="lg:col-span-4 space-y-4">
          {sidebar ?? (
            <div className="card p-4">
              <h3 className="font-semibold mb-2">Welcome</h3>
              <p className="text-sm text-[color:var(--muted)]">
                Seed a user, community, and post via the API to see content here.
              </p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
