"use client";

import { useTransition } from "react";
import { deleteProject } from "@/lib/admin/actions";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete “${title}” from the website? This can't be undone.`)) start(() => deleteProject(id));
      }}
      className="inline-flex items-center justify-center px-4 py-2.5 border border-[#9B2C2C]/40 text-[#9B2C2C] text-[11px] tracking-[0.2em] uppercase font-light hover:bg-[#9B2C2C] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
