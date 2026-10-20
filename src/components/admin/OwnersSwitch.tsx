"use client";

import { useOptimistic, useTransition } from "react";
import { setOwnersEnabled } from "@/lib/admin/actions";
import { card } from "./ui";

// Master switch for the owners' names, photos and details on the whole website
export function OwnersSwitch({ enabled }: { enabled: boolean }) {
  const [on, setOn] = useOptimistic(enabled);
  const [pending, start] = useTransition();

  return (
    <div className={`${card} p-5 sm:p-6 flex items-center justify-between gap-6`}>
      <div>
        <p className="text-[15px]">{on ? "Owners are shown on the website" : "Owners are hidden from the website"}</p>
        <p className="mt-1 text-[13px] text-[#736E67]">
          {on
            ? "Their names, photos and details appear in the Studio panel and on the home page. Switch off to remove all of it at once."
            : "No owner name, photo or detail appears anywhere on the website. Switch on to bring it all back exactly as you left it."}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Show the owners on the website"
        disabled={pending}
        onClick={() => start(async () => { setOn(!on); await setOwnersEnabled(!on); })}
        className={`relative shrink-0 h-9 w-[4.5rem] rounded-full transition-colors cursor-pointer disabled:opacity-60 ${on ? "bg-[#2F6B3A]" : "bg-[#1A1A1A]/25"}`}
      >
        <span className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-all ${on ? "left-[2.25rem]" : "left-1"}`} />
        <span className={`absolute top-1/2 -translate-y-1/2 text-[10px] tracking-[0.14em] font-medium ${on ? "left-2.5 text-white" : "right-2.5 text-[#1A1A1A]/60"}`}>
          {on ? "ON" : "OFF"}
        </span>
      </button>
    </div>
  );
}
