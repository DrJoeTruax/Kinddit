"use client";

import { useState } from "react";

interface AutomodSettingsProps {
  initialMode?: "assist" | "soft" | "hard" | "safety";
}

export function AutomodSettings({ initialMode = "assist" }: AutomodSettingsProps) {
  const [mode, setMode] = useState(initialMode);
  const [threshold, setThreshold] = useState(0.5);

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">AutoModerator Mode</span>
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as AutomodSettingsProps["initialMode"])}
          className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
        >
          <option value="assist">Assist</option>
          <option value="soft">Soft</option>
          <option value="hard">Hard</option>
          <option value="safety">Safety</option>
        </select>
      </div>
      <label className="block text-sm text-slate-300">
        Fusion score threshold: {threshold.toFixed(2)}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
          className="mt-2 w-full"
        />
      </label>
      <p className="text-xs text-slate-400">
        Configure how Kinddit’s AutoModerator collaborates with community guidelines today, while keeping room for
        future ML scoring from the proprietary safety-pack.
      </p>
    </div>
  );
}
