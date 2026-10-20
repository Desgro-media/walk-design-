"use client";

import { useTransition } from "react";
import { setProjectPublished } from "@/lib/admin/actions";

export function VisibilityButton({ id, published }: { id: string; published: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setProjectPublished(id, !published))}
      title={published ? "Visible on the website. Click to hide." : "Hidden from the website. Click to show."}
      className={`inline-flex items-center justify-center px-4 py-2.5 border text-[11px] tracking-[0.2em] uppercase font-light transition-colors cursor-pointer disabled:opacity-50 ${
        published ? "border-[#2F6B3A]/40 text-[#2F6B3A] hover:bg-[#2F6B3A] hover:text-white" : "border-[#9B2C2C]/40 text-[#9B2C2C] hover:bg-[#9B2C2C] hover:text-white"
      }`}
    >
      {pending ? "…" : published ? "Visible" : "Hidden"}
    </button>
  );
}
