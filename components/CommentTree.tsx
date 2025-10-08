"use client";


import { ArrowBigDown, ArrowBigUp, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CommentNode = {
  id: string;
  author: string;
  createdAt: string;
  body: string;
  votes: number;
  isLocked?: boolean;
  children?: CommentNode[];
};

export function CommentTree({ comments }: { comments: CommentNode[] }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentBranch key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}

function CommentBranch({ comment, depth }: { comment: CommentNode; depth: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div
        className={cn(
          "relative rounded-3xl border border-slate-800/80 bg-slate-950/60 p-5 text-sm text-slate-200",
          comment.isLocked && "border-red-500/30 bg-red-500/10"
        )}
        style={{ marginLeft: depth * 24 }}
      >
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">{comment.author}</span>
          <span>•</span>
          <span>{comment.createdAt}</span>
          {comment.isLocked && (
            <span className="inline-flex items-center gap-1 rounded-full border border-red-400/50 bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-200">
              <Lock className="h-3 w-3" /> Locked due to abuse
            </span>
          )}
        </div>
        <p className="leading-relaxed">{comment.body}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-300">
          <button className="inline-flex items-center gap-1 rounded-full border border-slate-800/70 px-3 py-1 transition hover:border-teal-500/60 hover:text-teal-200">
            <ArrowBigUp className="h-4 w-4" />
          </button>
          <span>{comment.votes}</span>
          <button className="inline-flex items-center gap-1 rounded-full border border-slate-800/70 px-3 py-1 transition hover:border-teal-500/60 hover:text-teal-200">
            <ArrowBigDown className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-slate-800/70 px-3 py-1 text-xs transition hover:border-teal-500/60 hover:text-teal-200">
            Reply
          </button>
        </div>
      </div>
      {comment.children?.length ? (
        <div className="space-y-4">
          {comment.children.map((child) => (
            <CommentBranch key={child.id} comment={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
