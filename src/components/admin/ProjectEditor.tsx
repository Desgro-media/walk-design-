"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";
import { deleteProject, saveProject } from "@/lib/admin/actions";
import { CATEGORIES, type CategoryKey, type ProjectInput } from "@/lib/admin/types";
import { btn, btnDanger, btnGhost, card, input, label } from "./ui";

type Photo = { src: string; w: number; h: number };

const MAX_EDGE = 2400;

// Shrink big phone/camera photos before upload: faster, cheaper, and the site loads quicker
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.86));
  if (!blob) throw new Error(`Could not read ${file.name}`);
  return { blob, w, h };
}

export function ProjectEditor({ project, published = true }: { project?: Project; published?: boolean }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, startSave] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: project?.title ?? "",
    categoryKey: (project?.categoryKey ?? "architecture") as CategoryKey,
    location: project?.location ?? "",
    year: project?.year ?? "",
    status: project?.status ?? "",
    brief: project?.brief ?? "",
    response: project?.response ?? "",
    materials: project?.materials ?? "",
    comingSoon: project?.comingSoon ?? false,
    published,
  });
  const [gallery, setGallery] = useState<Photo[]>(project?.gallery ?? []);

  // New projects get an id on first save; photos go in a folder named after it (or a temp one before that)
  const [folder] = useState(() => project?.id ?? `new-${Math.random().toString(36).slice(2, 8)}`);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    setUploading(true);
    try {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const prepared = await Promise.all(list.map(prepare));
      const added: Photo[] = [];
      for (const p of prepared) {
        const body = new FormData();
        body.append("file", new File([p.blob], "photo.webp", { type: "image/webp" }));
        body.append("folder", folder);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Upload failed");
        added.push({ src: data.url, w: p.w, h: p.h });
      }
      setGallery((g) => [...g, ...added]);
      setSaved(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const move = (i: number, to: number) => {
    if (to < 0 || to >= gallery.length) return;
    setGallery((g) => {
      const next = [...g];
      [next[i], next[to]] = [next[to], next[i]];
      return next;
    });
    setSaved(false);
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startSave(async () => {
      const input: ProjectInput = { id: project?.id, ...form, gallery };
      const res = await saveProject(input);
      if (!res.ok) return setError(res.error);
      setSaved(true);
      if (!project) router.replace(`/admin/projects/${res.id}`);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className={`${card} p-5 sm:p-6 space-y-5`}>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={label}>Project name *</label>
            <input id="title" required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} placeholder="Private Villa, Lusail" />
          </div>
          <div>
            <label htmlFor="cat" className={label}>Category *</label>
            <select id="cat" value={form.categoryKey} onChange={(e) => set("categoryKey", e.target.value as CategoryKey)} className={input}>
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <option key={k} value={k}>{v.en}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="loc" className={label}>Location</label>
            <input id="loc" value={form.location} onChange={(e) => set("location", e.target.value)} className={input} placeholder="Lusail, Qatar" />
          </div>
          <div>
            <label htmlFor="year" className={label}>Year</label>
            <input id="year" value={form.year} onChange={(e) => set("year", e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="status" className={label}>Status</label>
            <input id="status" value={form.status} onChange={(e) => set("status", e.target.value)} className={input} placeholder="Completed" />
          </div>
        </div>
        <div>
          <label htmlFor="brief" className={label}>Description</label>
          <textarea id="brief" rows={4} value={form.brief} onChange={(e) => set("brief", e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="resp" className={label}>Design response</label>
          <textarea id="resp" rows={3} value={form.response} onChange={(e) => set("response", e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="mat" className={label}>Materials</label>
          <input id="mat" value={form.materials} onChange={(e) => set("materials", e.target.value)} className={input} />
        </div>
        <div className="flex flex-wrap gap-6 text-[13px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
            Show on the website
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.comingSoon} onChange={(e) => set("comingSoon", e.target.checked)} />
            Mark as “Coming soon”
          </label>
        </div>
      </section>

      <section className={`${card} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#736E67]">Photos ({gallery.length})</h2>
            <p className="text-[12px] text-[#736E67] mt-1">The first photo is the cover. Large photos are resized automatically.</p>
          </div>
          <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} className={btnGhost}>
            {uploading ? "Uploading…" : "+ Add photos"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
        </div>

        {gallery.length === 0 ? (
          <p className="text-[14px] text-[#736E67] border border-dashed border-[#1A1A1A]/20 p-8 text-center">No photos yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((g, i) => (
              <li key={g.src} className="border border-[#1A1A1A]/10">
                <div className="relative aspect-[4/3] bg-[#EBE6DF]">
                  <Image src={g.src} alt="" fill sizes="240px" className="object-cover" />
                  {i === 0 && <span className="absolute top-2 left-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.18em] uppercase px-2 py-1">Cover</span>}
                </div>
                <div className="flex items-center justify-between p-1.5 text-[12px]">
                  <span className="flex gap-1">
                    <button type="button" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)} className="w-7 h-7 border border-[#1A1A1A]/20 disabled:opacity-30 cursor-pointer">←</button>
                    <button type="button" aria-label="Move later" disabled={i === gallery.length - 1} onClick={() => move(i, i + 1)} className="w-7 h-7 border border-[#1A1A1A]/20 disabled:opacity-30 cursor-pointer">→</button>
                  </span>
                  <span className="flex gap-2">
                    {i > 0 && <button type="button" onClick={() => move(i, 0)} className="underline cursor-pointer">Make cover</button>}
                    <button type="button" onClick={() => { setGallery((x) => x.filter((_, j) => j !== i)); setSaved(false); }} className="text-[#9B2C2C] underline cursor-pointer">Remove</button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {error && <p role="alert" className="text-[13px] text-[#9B2C2C]">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={saving || uploading} className={btn}>{saving ? "Saving…" : "Save project"}</button>
        {saved && <span className="text-[13px] text-[#2F6B3A]">Saved. The website is updated.</span>}
        {project && (
          <button
            type="button"
            className={`${btnDanger} ml-auto`}
            onClick={() => {
              if (confirm(`Delete “${project.title}” from the website? This can't be undone.`)) startSave(() => deleteProject(project.id));
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
