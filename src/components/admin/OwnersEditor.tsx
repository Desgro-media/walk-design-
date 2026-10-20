"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { saveOwners } from "@/lib/admin/actions";
import type { Owner } from "@/lib/admin/owners";
import { uploadImage } from "./upload";
import { btn, btnGhost, card, input, label } from "./ui";

export function OwnersEditor({ initial }: { initial: Owner[] }) {
  const [items, setItems] = useState<Owner[]>(initial);
  const [saving, start] = useTransition();
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadFor = useRef<string | null>(null);

  const change = (next: Owner[]) => { setItems(next); setMsg(null); };
  const patch = (id: string, p: Partial<Owner>) => change(items.map((i) => (i.id === id ? { ...i, ...p } : i)));
  const move = (idx: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[idx], next[to]] = [next[to], next[idx]];
    change(next);
  };

  async function onFile(file: File | undefined) {
    const id = uploadFor.current;
    if (!file || !id) return;
    setUploadingId(id);
    try {
      const { url } = await uploadImage(file, "owners");
      patch(id, { photo: url });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Upload failed" });
    } finally {
      setUploadingId(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const small = "h-7 px-2 border border-[#1A1A1A]/20 text-[11px] cursor-pointer hover:bg-[#1A1A1A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <div className="space-y-5">
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

      <ul className="space-y-4">
        {items.map((o, idx) => (
          <li key={o.id} className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row gap-5 ${o.hidden ? "opacity-70" : ""}`}>
            <div className="sm:w-44 shrink-0 space-y-2">
              <div className="relative aspect-[4/5] bg-[#EBE6DF] overflow-hidden">
                {o.photo ? (
                  <Image src={o.photo} alt={o.name} fill sizes="176px" className={`object-cover object-top ${o.hidden ? "grayscale" : ""}`} />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[12px] text-[#736E67]">No photo</span>
                )}
                {o.hidden && <span className="absolute top-2 right-2 bg-[#9B2C2C] text-white text-[9px] tracking-[0.18em] uppercase px-2 py-1">Hidden</span>}
              </div>
              <button
                type="button"
                disabled={uploadingId === o.id}
                onClick={() => { uploadFor.current = o.id; fileRef.current?.click(); }}
                className={`${small} w-full !h-8`}
              >
                {uploadingId === o.id ? "Uploading…" : o.photo ? "Change photo" : "Upload photo"}
              </button>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor={`n-${o.id}`}>Name *</label>
                  <input id={`n-${o.id}`} value={o.name} onChange={(e) => patch(o.id, { name: e.target.value })} className={input} />
                </div>
                <div>
                  <label className={label} htmlFor={`r-${o.id}`}>Role</label>
                  <input id={`r-${o.id}`} value={o.role} onChange={(e) => patch(o.id, { role: e.target.value })} className={input} />
                </div>
              </div>
              <div>
                <label className={label} htmlFor={`c-${o.id}`}>Qualifications</label>
                <input id={`c-${o.id}`} value={o.creds} onChange={(e) => patch(o.id, { creds: e.target.value })} className={input} />
              </div>
              <div>
                <label className={label} htmlFor={`b-${o.id}`}>About (leave a blank line between paragraphs)</label>
                <textarea
                  id={`b-${o.id}`}
                  rows={6}
                  value={o.bio.join("\n\n")}
                  onChange={(e) => patch(o.id, { bio: e.target.value.split(/\n\s*\n/) })}
                  className={input}
                />
              </div>
              <div className="flex flex-wrap items-center gap-1">
                <button type="button" aria-label="Move up" disabled={idx === 0} onClick={() => move(idx, idx - 1)} className={small}>↑</button>
                <button type="button" aria-label="Move down" disabled={idx === items.length - 1} onClick={() => move(idx, idx + 1)} className={small}>↓</button>
                <button type="button" onClick={() => patch(o.id, { hidden: !o.hidden })} className={small}>{o.hidden ? "Show" : "Hide"}</button>
                <button
                  type="button"
                  onClick={() => confirm(`Delete “${o.name || "this person"}”? It is gone after you save.`) && change(items.filter((i) => i.id !== o.id))}
                  className={`${small} ml-auto !text-[#9B2C2C] hover:!bg-[#9B2C2C] hover:!text-white`}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnGhost} onClick={() => change([...items, { id: crypto.randomUUID(), name: "", role: "", creds: "", photo: "", bio: [] }])}>
          + Add person
        </button>
        <button
          type="button"
          className={btn}
          disabled={saving || uploadingId !== null}
          onClick={() =>
            start(async () => {
              const res = await saveOwners(items.map((o) => ({ ...o, bio: o.bio.map((p) => p.trim()).filter(Boolean) })));
              setMsg(res.ok ? { ok: true, text: "Saved. The website is updated (while the switch is on)." } : { ok: false, text: res.error });
            })
          }
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {msg && <span role={msg.ok ? undefined : "alert"} className={`text-[13px] ${msg.ok ? "text-[#2F6B3A]" : "text-[#9B2C2C]"}`}>{msg.text}</span>}
      </div>
    </div>
  );
}
