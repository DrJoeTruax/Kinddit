"use client";

import { useState } from "react";

interface PostComposerProps {
  onSubmit?: (title: string, body: string) => void;
}

export function PostComposer({ onSubmit }: PostComposerProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <form
      className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(title, body);
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-200" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-brand focus:outline-none"
          placeholder="Share something meaningful"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-brand focus:outline-none"
          rows={4}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">
          Post
        </button>
      </div>
    </form>
  );
}
