"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowBigDown, ArrowBigUp, Bookmark, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "@/lib/types";
import { cn, formatNumber, formatRelativeTime } from "@/lib/utils";
import BlockAction from "@/components/BlockAction";

export default function PostCard({ post, variant = "card" }: { post: Post; variant?: "card" | "compact" }) {
  return (
    <motion.article
      layout
      className={cn(
        "rounded-3xl border border-slate-800/60 bg-slate-900/40 p-5 card-shadow",
        variant === "compact" && "flex items-start gap-4"
      )}
      whileHover={{ translateY: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
        <span className="font-semibold text-slate-300">{post.community.name}</span>
        <span>• Posted by u/{post.author.username}</span>
        <span>{formatRelativeTime(post.createdAt)}</span>
        {post.flair ? <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary">{post.flair}</span> : null}
      </div>

      <Link href={`/p/${post.id}`} className="mt-3 block space-y-3">
        <h3 className="text-xl font-semibold text-slate-100">{post.title}</h3>
        {post.body ? <p className="text-sm text-slate-300 leading-relaxed">{post.body}</p> : null}
        {post.imageUrl ? (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800/50">
            <Image src={post.imageUrl} alt="Post media" fill className="object-cover" />
          </div>
        ) : null}
        {post.url ? (
          <p className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-2">
            {post.url}
          </p>
        ) : null}
      </Link>

      {post.ticketSummary ? (
        <div className="mt-3 rounded-2xl border border-primary/40 bg-primary/10 p-3 text-xs text-slate-200">
          <p className="font-medium text-primary">Transparency Ticket</p>
          <p className="mt-1 text-slate-300">{post.ticketSummary}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <VoteButton direction="up" value={post.votes} />
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 px-3 py-1">
          <MessageCircle className="h-4 w-4" />
          {formatNumber(post.comments)} comments
        </span>
        <ActionButton icon={<Share2 className="h-4 w-4" />} label="Share" />
        <ActionButton icon={<Bookmark className="h-4 w-4" />} label="Save" />
        {post.isLocked ? <BlockAction label="Locked due to abuse" /> : null}
      </div>
    </motion.article>
  );
}

function VoteButton({ direction, value }: { direction: "up" | "down"; value: number }) {
  const Icon = direction === "up" ? ArrowBigUp : ArrowBigDown;
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 px-3 py-1 text-sm text-slate-200 transition hover:border-primary/50 hover:text-primary"
    >
      <Icon className="h-5 w-5" />
      {formatNumber(value)}
    </button>
  );
}

function ActionButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 px-3 py-1 transition hover:border-primary/40 hover:text-primary"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}
