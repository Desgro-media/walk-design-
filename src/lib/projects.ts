import "server-only";
import { projectsData, type Project } from "@/data/projects";
import { dbConfigured, publicSql } from "@/lib/admin/db";

// Projects shown on the public site: the admin's database when it has any, otherwise the built-in list.
export async function getProjects(): Promise<Project[]> {
  if (!dbConfigured()) return projectsData;
  try {
    const rows = await publicSql()`select data from projects where published order by sort_order`;
    // Photos hidden in the admin stay in the database but are not shown on the site
    return rows.length
      ? rows.map((r) => {
          const p = r.data as Project;
          return { ...p, gallery: p.gallery.filter((g) => !g.hidden) };
        })
      : projectsData;
  } catch {
    return projectsData;
  }
}
