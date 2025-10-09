"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck } from "lucide-react";

const rules = [
  { id: "1", pattern: "(?i)buy followers", action: "remove", type: "spam" },
  { id: "2", pattern: "(?i)giveaway", action: "delay", type: "promotion" },
  { id: "3", pattern: "(?i)kill yourself", action: "flag", type: "harassment" }
];

export default function AutoModSettings() {
  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 card-shadow">
      <header className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <ShieldCheck className="h-5 w-5 text-primary" />
        AutoModerator rules
      </header>
      <p className="mt-2 text-xs text-slate-400">
        Visualize regex-based automations before they go live. Each rule logs actions to transparency reports automatically.
      </p>
      <div className="mt-4 space-y-3 text-sm">
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(rule.id, 10) * 0.05 }}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
              <span>{rule.type}</span>
              <span className="rounded-full bg-slate-800/60 px-2 py-0.5 text-[11px]">{rule.action}</span>
            </div>
            <div className="mt-2 flex items-start gap-2 font-mono text-xs text-slate-300">
              <Code2 className="mt-0.5 h-4 w-4 text-primary" />
              <code>{rule.pattern}</code>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
