"use client";


import { Bell, Search, PlusSquare, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-6 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-teal-300">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-200 shadow-inner shadow-teal-500/40">
          ❤
        </span>
        Kinddit
      </Link>
      <div className="hidden max-w-xl flex-1 items-center gap-4 px-8 md:flex">
        <div className="relative flex-1">
          <input
            className="w-full rounded-full border border-slate-800 bg-slate-900/80 px-10 py-2 text-sm text-slate-100 shadow-inner placeholder:text-slate-400 focus:border-teal-500 focus:outline-none"
            placeholder="Search communities, posts, tickets"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-teal-500/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/40 transition hover:bg-teal-400">
          <PlusSquare className="h-4 w-4" /> Create
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden rounded-full border border-slate-800/80 bg-slate-900/70 p-2 text-slate-300 transition hover:border-teal-500/80 hover:text-teal-200 md:flex">
          <ShieldCheck className="h-5 w-5" />
        </button>
        <button className="rounded-full border border-slate-800/80 bg-slate-900/70 p-2 text-slate-300 transition hover:border-teal-500/80 hover:text-teal-200">
          <Bell className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-1 text-sm text-slate-200 md:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/40 to-teal-300/60 text-slate-950">JD</span>
          <div>
            <p className="font-semibold leading-tight">jordan</p>
            <p className="text-xs text-slate-400">Transparency: 100%</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
