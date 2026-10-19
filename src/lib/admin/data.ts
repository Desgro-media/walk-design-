import "server-only";
import { projectsData, type Project } from "@/data/projects";
import { sql } from "./db";
import type { Client, Lead } from "./types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const iso = (d: unknown) => (d instanceof Date ? d.toISOString() : String(d));

// Dates come back as Date objects; the UI works with plain strings
const lead = (r: Record<string, unknown>) => ({ ...r, created_at: iso(r.created_at) }) as Lead;
const client = (r: Record<string, unknown>) => ({ ...r, created_at: iso(r.created_at) }) as Client;

export interface AdminProject {
  project: Project;
  published: boolean;
  sortOrder: number;
}

// Returns null when the database has no projects yet (the site is still showing its built-in list)
export async function getAdminProjects(): Promise<AdminProject[] | null> {
  const rows = await sql()`select data, published, sort_order from projects order by sort_order`;
  if (!rows.length) return null;
  return rows.map((r) => ({ project: r.data as Project, published: r.published, sortOrder: r.sort_order }));
}

export async function getAdminProject(id: string) {
  const [row] = await sql()`select data, published from projects where id = ${id}`;
  return row ? { project: row.data as Project, published: row.published as boolean } : null;
}

export async function getLeads() {
  return (await sql()`select *, follow_up::text as follow_up from leads order by created_at desc`).map(lead);
}

export async function getLead(id: string) {
  if (!UUID.test(id)) return null;
  const [row] = await sql()`select *, follow_up::text as follow_up from leads where id = ${id}`;
  return row ? lead(row) : null;
}

export async function getClients() {
  return (await sql()`select * from clients order by created_at desc`).map(client);
}

export async function getClient(id: string) {
  if (!UUID.test(id)) return null;
  const [row] = await sql()`select * from clients where id = ${id}`;
  return row ? client(row) : null;
}

// For pickers: every project the site could show, with its name
export async function getProjectOptions() {
  const rows = await getAdminProjects();
  const list = rows ? rows.map((r) => r.project) : projectsData;
  return list.map((p) => ({ id: p.id, label: `${p.title} — ${p.location}` }));
}

