import "server-only";
import { projectsData, type Project } from "@/data/projects";
import { dbConfigured, publicSql } from "@/lib/admin/db";

// Projects shown on the public site: the admin's database when it has any, otherwise the built-in list.
export async function getProjects(): Promise<Project[]> {
  if (!dbConfigured()) return projectsData;
  try {
    const rows = await publicSql()`select data from projects where published order by sort_order`;
    return rows.length ? rows.map((r) => r.data as Project) : projectsData;
  } catch {
    return projectsData;
  }
}
