"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "./upload";
import { btnGhost, input } from "./ui";

export type ManagedPhoto = { src: string; w?: number; h?: number; alt?: string; hidden?: boolean };

interface Props {
  photos: ManagedPhoto[];
  onChange: (photos: ManagedPhoto[]) => void;
  folder: string;
  withAlt?: boolean; // show a description box under each photo
  coverLabel?: boolean; // mark the first visible photo as the cover
  busyChange?: (busy: boolean) => void;
}

// Upload, reorder, hide/show, edit the description of and remove photos. Used by projects and service pages.
export function PhotoManager({ photos, onChange, folder, withAlt, coverLabel, busyChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const coverIndex = coverLabel ? photos.findIndex((p) => !p.hidden) : -1;

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    setUploading(true);
    busyChange?.(true);
    try {
      const added: ManagedPhoto[] = [];
      for (const f of Array.from(files).filter((f) => f.type.startsWith("image/"))) {
        const { url, w, h } = await uploadImage(f, folder);
        added.push({ src: url, w, h, ...(withAlt ? { alt: "" } : {}) });
      }
      onChange([...photos, ...added]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      busyChange?.(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const patch = (i: number, p: Partial<ManagedPhoto>) => onChange(photos.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const move = (i: number, to: number) => {
    if (to < 0 || to >= photos.length) return;
    const next = [...photos];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };

  const small = "h-7 px-2 border border-[#1A1A1A]/20 text-[11px] cursor-pointer hover:bg-[#1A1A1A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[12px] text-[#736E67]">
          {photos.length} photo{photos.length === 1 ? "" : "s"} · {photos.filter((p) => p.hidden).length} hidden. Large photos are resized automatically.
        </p>
        <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} className={btnGhost}>
          {uploading ? "Uploading…" : "+ Add photos"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      </div>

      {error && <p role="alert" className="text-[13px] text-[#9B2C2C]">{error}</p>}

      {photos.length === 0 ? (
        <p className="text-[14px] text-[#736E67] border border-dashed border-[#1A1A1A]/20 p-8 text-center">No photos yet.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <li key={p.src + i} className={`border border-[#1A1A1A]/10 bg-white ${p.hidden ? "opacity-70" : ""}`}>
              <div className="relative aspect-[4/3] bg-[#EBE6DF]">
                <Image src={p.src} alt={p.alt ?? ""} fill sizes="240px" className={`object-cover ${p.hidden ? "grayscale" : ""}`} />
                {i === coverIndex && <span className="absolute top-2 left-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.18em] uppercase px-2 py-1">Cover</span>}
                {p.hidden && <span className="absolute top-2 right-2 bg-[#9B2C2C] text-white text-[9px] tracking-[0.18em] uppercase px-2 py-1">Hidden</span>}
              </div>
              {withAlt && (
                <input
                  value={p.alt ?? ""}
                  onChange={(e) => patch(i, { alt: e.target.value })}
                  placeholder="Describe the photo"
                  aria-label="Photo description"
                  className={`${input} !border-x-0 !border-t-0 !text-[12px] !py-1.5`}
                />
              )}
              <div className="flex flex-wrap items-center gap-1 p-1.5">
                <button type="button" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)} className={small}>←</button>
                <button type="button" aria-label="Move later" disabled={i === photos.length - 1} onClick={() => move(i, i + 1)} className={small}>→</button>
                <button type="button" onClick={() => patch(i, { hidden: !p.hidden })} className={small}>{p.hidden ? "Show" : "Hide"}</button>
                <button
                  type="button"
                  onClick={() => confirm("Remove this photo? It will be gone after you save.") && onChange(photos.filter((_, j) => j !== i))}
                  className={`${small} ml-auto !text-[#9B2C2C] hover:!bg-[#9B2C2C] hover:!text-white`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
