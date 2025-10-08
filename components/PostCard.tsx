"use client";


import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2, Bookmark, Flag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export type Post = {
  id: string;
  title: string;
  community: string;
  author: string;
  createdAt: string;
  body?: string;
  image?: string;
  votes: number;
  comments: number;
  ticketSummary?: string;
};

export function PostCard({
  post,
  layout = "card"
}: {
  post: Post;
  layout?: "card" | "compact";
}) {
  return (
    <motion.article
      layout
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/60 shadow-xl shadow-slate-950/40"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/c/${post.community}`} className="text-xs font-semibold uppercase tracking-wide text-teal-300">
              {post.community}
            </Link>
            <h2 className="mt-2 text-lg font-semibold text-slate-100 transition group-hover:text-teal-200">{post.title}</h2>
            <p className="mt-1 text-xs text-slate-400">Posted by {post.author} • {post.createdAt}</p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-slate-900/60 p-2 text-slate-300">
            <button className="text-teal-300 transition hover:text-teal-200">
              <ArrowBigUp className="h-6 w-6" />
            </button>
            <span className="text-sm font-semibold text-slate-100">{post.votes}</span>
            <button className="transition hover:text-slate-200">
              <ArrowBigDown className="h-6 w-6" />
            </button>
          </div>
        </div>
        {post.body && layout === "card" && <p className="text-sm leading-relaxed text-slate-200">{post.body}</p>}
        {post.image && <img src={post.image} alt="" className="h-64 w-full rounded-2xl object-cover" />}
        {post.ticketSummary && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            <p className="font-semibold">Safety Summary</p>
            <p className="mt-1 text-amber-100/80">{post.ticketSummary}</p>
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 px-4 py-2 transition hover:border-teal-500/60 hover:text-teal-200">
            <MessageSquare className="h-4 w-4" /> {post.comments}
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 px-4 py-2 transition hover:border-teal-500/60 hover:text-teal-200">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 px-4 py-2 transition hover:border-teal-500/60 hover:text-teal-200">
            <Bookmark className="h-4 w-4" /> Save
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 px-4 py-2 transition hover:border-teal-500/60 hover:text-teal-200">
            <Flag className="h-4 w-4" /> Report
          </button>
        </div>
      </div>
    </motion.article>
  );
}
