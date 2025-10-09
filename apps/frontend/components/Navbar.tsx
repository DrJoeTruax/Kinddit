"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Heart, Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const baseLinkClasses = "inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 transition hover:border-primary/50 hover:text-primary";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto flex h-16 items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <motion.span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <Heart className="h-5 w-5" />
          </motion.span>
          <span className="hidden sm:inline font-display tracking-wide">Kinddit</span>
        </Link>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Discover communities, tickets, keywords..."
            className="w-full rounded-full border border-slate-800 bg-slate-900/70 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <nav className="ml-auto flex items-center gap-3 text-sm font-medium">
          <Link href="/tickets" className={baseLinkClasses}>
            <ShieldIcon />
            <span className="hidden lg:inline">Tickets</span>
          </Link>
          <Link href="/create" className={cn(baseLinkClasses, "bg-primary/15 text-primary border-primary/50")}> 
            <Plus className="h-4 w-4" />
            <span className="hidden lg:inline">Create</span>
          </Link>
          <button className={baseLinkClasses} type="button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 2 4 5v6c0 5.25 3.438 9.712 8 11 4.562-1.288 8-5.75 8-11V5l-8-3z"
        className="fill-current"
      />
      <path d="m9.5 11 1.5 2 3.5-4" className="stroke-slate-950 dark:stroke-white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
