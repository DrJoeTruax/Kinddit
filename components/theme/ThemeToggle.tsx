"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-16 items-center rounded-full bg-slate-800/80 p-1 text-slate-100 shadow-inner ring-1 ring-slate-700/60 transition hover:ring-teal-500"
      aria-label="Toggle theme"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 shadow"
      >
        {theme === "dark" ? <MoonStar className="h-4 w-4 text-teal-400" /> : <Sun className="h-4 w-4 text-amber-400" />}
      </motion.span>
    </button>
  );
}
