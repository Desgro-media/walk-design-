"use client";

import { useState, useTransition } from "react";
import { saveServiceImages } from "@/lib/admin/actions";
import type { ServiceImage } from "@/lib/admin/photos";
import { PhotoManager, type ManagedPhoto } from "./PhotoManager";
import { btn, card } from "./ui";

export function ServiceImagesEditor({ serviceId, title, initial }: { serviceId: string; title: string; initial: ServiceImage[] }) {
  const [photos, setPhotos] = useState<ManagedPhoto[]>(initial);
  const [busy, setBusy] = useState(false);
  const [saving, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  return (
    <section className={`${card} p-5 sm:p-6 space-y-4`}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-light">{title}</h2>
        <button
          className={btn}
          disabled={saving || busy}
          onClick={() =>
            start(async () => {
              const res = await saveServiceImages(serviceId, photos.map((p) => ({ src: p.src, alt: p.alt ?? "", hidden: p.hidden })));
              setMsg(res.ok ? { ok: true, text: "Saved. The Services page is updated." } : { ok: false, text: res.error });
            })
          }
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
      <PhotoManager photos={photos} onChange={(p) => { setPhotos(p); setMsg(null); }} folder={`services-${serviceId}`} withAlt busyChange={setBusy} />
      {msg && <p role={msg.ok ? undefined : "alert"} className={`text-[13px] ${msg.ok ? "text-[#2F6B3A]" : "text-[#9B2C2C]"}`}>{msg.text}</p>}
    </section>
  );
}
