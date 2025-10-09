"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, MessageSquare, PencilLine } from "lucide-react";
import type { Comment } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import BlockAction from "@/components/BlockAction";

export default function CommentTree({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}

function CommentNode({ comment, depth }: { comment: Comment; depth: number }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const hasChildren = (comment.children?.length ?? 0) > 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex flex-col items-center pt-1 text-slate-700">
          <span className="h-full w-px bg-slate-800/60" />
        </div>
        <div className="flex-1 space-y-2 rounded-3xl border border-slate-800/60 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
            <span className="font-semibold text-slate-300">u/{comment.author.username}</span>
            <span>{formatRelativeTime(comment.createdAt)}</span>
            {comment.editedAt ? (
              <span className="inline-flex items-center gap-1 text-slate-500">
                <PencilLine className="h-3 w-3" /> edited
              </span>
            ) : null}
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">{comment.body}</p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 px-3 py-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {comment.votes} points
            </span>
            {comment.isLocked ? <BlockAction label="Locked" /> : null}
            {hasChildren ? (
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-full border border-slate-800/60 px-2 py-1 transition hover:border-primary/40 hover:text-primary"
              >
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {hasChildren && !isCollapsed ? (
        <div className={cn("ml-6 border-l border-slate-800/40 pl-6", depth > 0 && "ml-4 pl-4")}>
          {comment.children!.map((child) => (
            <CommentNode key={child.id} comment={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
