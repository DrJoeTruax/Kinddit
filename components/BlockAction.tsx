"use client";


import { ShieldBan } from "lucide-react";
import { motion } from "framer-motion";

export function BlockAction({ onBlock }: { onBlock?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:border-red-300/70 hover:bg-red-500/20"
      onClick={onBlock}
    >
      <ShieldBan className="h-4 w-4" /> Block & Lock
    </motion.button>
  );
}
