"use client";
import { useRouter } from "next/navigation";

export default function Nav() {
  const r = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--bg)]/70 backdrop-blur">
      <div className="container flex items-center gap-3 py-3">
        <button onClick={() => r.push("/")} className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-white/10" />
          <span className="font-semibold">Kinddit</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn">Create Post</button>
          <a className="btn" href="http://localhost:8000/health">API</a>
        </div>
      </div>
    </header>
  );
}
