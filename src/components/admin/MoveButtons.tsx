"use client";

import { useTransition } from "react";
import { moveProject } from "@/lib/admin/actions";

export function MoveButtons({ id, first, last }: { id: string; first: boolean; last: boolean }) {
  const [pending, start] = useTransition();
  const cls = "w-8 h-8 border border-[#1A1A1A]/20 text-sm hover:bg-[#1A1A1A] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit cursor-pointer";
  return (
    <div className="hidden sm:flex gap-1" aria-label="Change order">
      <button aria-label="Move up" disabled={first || pending} onClick={() => start(() => moveProject(id, -1))} className={cls}>↑</button>
      <button aria-label="Move down" disabled={last || pending} onClick={() => start(() => moveProject(id, 1))} className={cls}>↓</button>
    </div>
  );
}
