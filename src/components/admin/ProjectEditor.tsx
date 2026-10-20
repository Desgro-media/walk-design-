"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";
import { deleteProject, saveProject } from "@/lib/admin/actions";
import { CATEGORIES, type CategoryKey, type ProjectInput } from "@/lib/admin/types";
import { PhotoManager, type ManagedPhoto } from "./PhotoManager";
import { btn, btnDanger, card, input, label } from "./ui";

export function ProjectEditor({ project, published = true }: { project?: Project; published?: boolean }) {
  const router = useRouter();
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
  const [gallery, setGallery] = useState<ManagedPhoto[]>(project?.gallery ?? []);

  // New projects get an id on first save; photos go in a folder named after it (or a temp one before that)
  const [folder] = useState(() => project?.id ?? `new-${Math.random().toString(36).slice(2, 8)}`);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startSave(async () => {
      const input: ProjectInput = {
        id: project?.id,
        ...form,
        gallery: gallery.map((g) => ({ src: g.src, w: g.w ?? 1600, h: g.h ?? 900, hidden: g.hidden })),
      };
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
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#736E67]">Photos</h2>
          <p className="text-[12px] text-[#736E67] mt-1">The first visible photo is the cover. Hidden photos stay here but are not shown on the website.</p>
        </div>
        <PhotoManager
          photos={gallery}
          onChange={(g) => { setGallery(g); setSaved(false); }}
          folder={folder}
          coverLabel
          busyChange={setUploading}
        />
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
