"use client";

import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

interface VoteButtonsProps {
  initialScore: number;
}

export function VoteButtons({ initialScore }: VoteButtonsProps) {
  const [score, setScore] = useState(initialScore);

  return (
    <div className="flex items-center gap-2 text-slate-300">
      <button
        type="button"
        onClick={() => setScore((value) => value + 1)}
        className="rounded-full border border-slate-700 p-1 hover:border-brand hover:text-brand"
        aria-label="Upvote"
      >
        <ArrowBigUp className="h-5 w-5" />
      </button>
      <span className="min-w-[2ch] text-center text-sm font-semibold text-white">{score}</span>
      <button
        type="button"
        onClick={() => setScore((value) => value - 1)}
        className="rounded-full border border-slate-700 p-1 hover:border-brand hover:text-brand"
        aria-label="Downvote"
      >
        <ArrowBigDown className="h-5 w-5" />
      </button>
    </div>
  );
}
