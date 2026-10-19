import Link from "next/link";
import Image from "next/image";
import { getAdminProjects } from "@/lib/admin/data";
import { importBuiltInProjects } from "@/lib/admin/actions";
import { projectsData } from "@/data/projects";
import { btn, btnGhost, card } from "@/components/admin/ui";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function ProjectsPage() {
  const rows = await getAdminProjects();

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-light tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className={btn}>+ New project</Link>
      </div>

      {!rows ? (
        <div className={`${card} p-6 space-y-4`}>
          <p className="text-[14px] leading-relaxed">
            The website is currently showing its {projectsData.length} built-in projects. Import them once to make every project and photo editable here.
            Nothing changes on the site until you edit something.
          </p>
          <form action={importBuiltInProjects}>
            <button className={btn}>Import {projectsData.length} existing projects</button>
          </form>
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map(({ project: p, published }, i) => (
            <li key={p.id} className={`${card} flex items-center gap-4 p-3`}>
              <div className="relative w-24 h-16 shrink-0 bg-[#EBE6DF] overflow-hidden">
                <Image src={p.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] truncate">{p.title}</p>
                <p className="text-[12px] text-[#736E67] truncate">
                  {p.category} · {p.location} · {p.gallery.length} photos
                  {!published && <span className="ml-2 text-[#9B2C2C]">· hidden</span>}
                  {p.comingSoon && <span className="ml-2">· coming soon</span>}
                </p>
              </div>
              <MoveButtons id={p.id} first={i === 0} last={i === rows.length - 1} />
              <Link href={`/admin/projects/${p.id}`} className={btnGhost}>Edit</Link>
              <DeleteProjectButton id={p.id} title={p.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
