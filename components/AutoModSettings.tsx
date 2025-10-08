"use client";


import { motion } from "framer-motion";

const rules = [
  {
    id: "1",
    pattern: "/buy followers/i",
    action: "remove",
    description: "Blocks spam campaigns for fake followers"
  },
  {
    id: "2",
    pattern: "/(?<!kind)ness/i",
    action: "flag",
    description: "Highlights context-less references to 'kindness' for human review"
  },
  {
    id: "3",
    pattern: "/harass|threat|dox/i",
    action: "delay",
    description: "Adds a 10 minute buffer before publishing to reduce escalation"
  }
];

export function AutoModSettings() {
  return (
    <section className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/30">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">AutoModerator</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">Keyword Rules</h3>
          <p className="mt-1 text-sm text-slate-300">Visualize how Automod keeps conversations constructive.</p>
        </div>
        <button className="rounded-full border border-teal-500/40 px-4 py-2 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/10">
          Edit YAML
        </button>
      </header>
      <div className="mt-6 space-y-4">
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            layout
            className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 text-sm text-slate-200"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <code className="rounded-xl bg-slate-950/70 px-3 py-1 font-mono text-xs text-teal-300">{rule.pattern}</code>
              <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
                Action: {rule.action}
              </span>
            </div>
            <p className="mt-3 text-slate-300/90">{rule.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
