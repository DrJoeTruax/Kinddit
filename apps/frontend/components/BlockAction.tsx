"use client";

import { useState } from "react";

interface BlockActionProps {
  onBlock?: (reason: string) => Promise<void> | void;
}

export function BlockAction({ onBlock }: BlockActionProps) {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleBlock() {
    setStatus("pending");
    try {
      await onBlock?.(reason);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-red-500/40 bg-red-500/5 p-4">
      <p className="text-sm font-medium text-red-200">Block-Lock a participant from this subtree.</p>
      <textarea
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
        placeholder="Describe why this block is necessary"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <button
        type="button"
        onClick={handleBlock}
        className="rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-red-950"
      >
        Block user
      </button>
      {status === "success" && <p className="text-xs text-emerald-400">Block recorded.</p>}
      {status === "error" && <p className="text-xs text-red-300">Block failed, try again.</p>}
      {status === "pending" && <p className="text-xs text-slate-300">Submitting...</p>}
    </div>
  );
}
