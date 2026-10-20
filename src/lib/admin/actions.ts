"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { projectsData, type Project } from "@/data/projects";
import { requireAdmin } from "./auth";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, passwordMatches } from "./session";
import { PROJECTS_TAG, sql } from "./db";
import { SERVICE_IMAGES_KEY, validPhotoSrc, type ServiceImage } from "./photos";
import { services } from "@/data/studio";
import { CATEGORIES, LEAD_STATUSES, type ActionResult, type CategoryKey, type ProjectInput } from "./types";

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string): ActionResult => ({ ok: false, error });

// ---------- Session ----------

let failedLogins = 0;
let lockedUntil = 0;

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  if (Date.now() < lockedUntil) return { error: "Too many attempts. Wait a minute and try again." };
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return { error: "Admin isn't configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." };
  }
  if (!passwordMatches(str(formData.get("password"), 200))) {
    if (++failedLogins >= 5) {
      failedLogins = 0;
      lockedUntil = Date.now() + 60_000;
    }
    return { error: "Incorrect password." };
  }
  failedLogins = 0;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- Projects ----------

function refreshSite() {
  updateTag(PROJECTS_TAG);
  revalidatePath("/", "layout");
}

const slug = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "project";

export async function saveProject(input: ProjectInput): Promise<ActionResult> {
  await requireAdmin();
  const title = str(input.title, 120);
  const location = str(input.location, 120);
  if (!title) return fail("Project name is required.");
  if (!(input.categoryKey in CATEGORIES)) return fail("Choose a category.");
  const gallery = (Array.isArray(input.gallery) ? input.gallery : []).slice(0, 40).map((g) => ({
    src: str(g?.src, 500),
    w: Math.round(Number(g?.w)) || 1600,
    h: Math.round(Number(g?.h)) || 900,
    ...(g?.hidden ? { hidden: true } : {}),
  }));
  if (!gallery.length) return fail("Add at least one photo (the first one is the cover).");
  if (gallery.some((g) => !validPhotoSrc(g.src))) return fail("One of the photos has an invalid address. Re-upload it.");
  const firstShown = gallery.find((g) => !g.hidden);
  if (!firstShown) return fail("At least one photo must be visible. To hide the whole project, untick “Show on the website”.");

  const categoryKey = input.categoryKey as CategoryKey;
  const id = input.id || `${categoryKey}-${slug(title)}-${Math.random().toString(36).slice(2, 6)}`;

  const [existingRow] = await sql()`select data, sort_order from projects where id = ${id}`;
  const old = existingRow?.data as Project | undefined;
  // Keep a hand-written Spanish text unless the English one was changed
  const es = (en: string, oldEn: string | undefined, oldEs: string | undefined) => (oldEs && oldEn === en ? oldEs : en);

  const opt = (v: unknown, max: number) => str(v, max) || undefined;
  const brief = opt(input.brief, 2000);
  const response = opt(input.response, 2000);
  const materials = opt(input.materials, 500);
  const status = opt(input.status, 80);

  const project: Project = {
    id,
    title,
    titleEs: es(title, old?.title, old?.titleEs),
    category: CATEGORIES[categoryKey].en,
    categoryEs: CATEGORIES[categoryKey].es,
    categoryKey,
    location,
    locationEs: es(location, old?.location, old?.locationEs),
    year: opt(input.year, 20),
    status,
    statusEs: status && es(status, old?.status, old?.statusEs),
    image: firstShown.src, // cover = first visible photo
    gallery,
    materials,
    materialsEs: materials && es(materials, old?.materials, old?.materialsEs),
    brief,
    briefEs: brief && es(brief, old?.brief, old?.briefEs),
    response,
    responseEs: response && es(response, old?.response, old?.responseEs),
    comingSoon: input.comingSoon || undefined,
  };

  let sortOrder = existingRow?.sort_order as number | undefined;
  if (sortOrder === undefined) {
    const [last] = await sql()`select coalesce(max(sort_order), -1) + 1 as next from projects`;
    sortOrder = last.next;
  }

  try {
    await sql()`
      insert into projects (id, data, sort_order, published, updated_at)
      values (${id}, ${JSON.stringify(project)}::jsonb, ${sortOrder}, ${input.published}, now())
      on conflict (id) do update set data = excluded.data, published = excluded.published, updated_at = now()`;
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Could not save.");
  }
  refreshSite();
  return { ok: true, id };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await sql()`delete from projects where id = ${id}`;
  refreshSite();
  redirect("/admin/projects");
}

export async function moveProject(id: string, direction: -1 | 1) {
  await requireAdmin();
  const rows = await sql()`select id from projects order by sort_order, id`;
  const ids = rows.map((r) => r.id as string);
  const i = ids.indexOf(id);
  const j = i + direction;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  // Rewrite sort_order 0..n so duplicate values can never leave the order ambiguous
  await sql()`update projects p set sort_order = o.pos - 1 from unnest(${ids}::text[]) with ordinality as o(id, pos) where p.id = o.id`;
  refreshSite();
  revalidatePath("/admin/projects");
}

// One-time: copy the projects that are built into the website into the database so they can be edited
export async function importBuiltInProjects() {
  await requireAdmin();
  const [{ count }] = await sql()`select count(*)::int as count from projects`;
  if (count) return;
  await sql()`
    insert into projects (id, data, sort_order)
    select p->>'id', p, ord - 1
    from jsonb_array_elements(${JSON.stringify(projectsData)}::jsonb) with ordinality as t(p, ord)`;
  refreshSite();
  revalidatePath("/admin/projects");
}

// ---------- Leads ----------

export async function updateLead(id: string, patch: { status?: string; notes?: string; follow_up?: string | null }) {
  await requireAdmin();
  if (patch.status !== undefined && !(LEAD_STATUSES as readonly string[]).includes(patch.status)) return fail("Invalid status.");
  const followUp = patch.follow_up ? str(patch.follow_up, 10) : null;
  if (followUp && !/^\d{4}-\d{2}-\d{2}$/.test(followUp)) return fail("Invalid date.");
  try {
    await sql()`
      update leads set
        status = coalesce(${patch.status ?? null}, status),
        notes = case when ${patch.notes !== undefined} then ${str(patch.notes, 8000)} else notes end,
        follow_up = case when ${patch.follow_up !== undefined} then ${followUp}::date else follow_up end
      where id = ${id}`;
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Could not save.");
  }
  revalidatePath("/admin", "layout");
  return { ok: true } as ActionResult;
}

export async function deleteLead(id: string) {
  await requireAdmin();
  await sql()`delete from leads where id = ${id}`;
  redirect("/admin/leads");
}

export async function convertLeadToClient(id: string) {
  await requireAdmin();
  const [lead] = await sql()`select * from leads where id = ${id}`;
  if (!lead) redirect("/admin/leads");
  let clientId = lead.client_id as string | null;
  if (!clientId) {
    const [client] = await sql()`
      insert into clients (name, email, phone, location, notes)
      values (${lead.name}, ${lead.email}, ${lead.phone}, ${lead.location}, ${lead.message ?? ""})
      returning id`;
    clientId = client.id as string;
    await sql()`update leads set client_id = ${clientId}, status = 'won' where id = ${id}`;
  }
  redirect(`/admin/clients/${clientId}`);
}

// ---------- Clients ----------

export async function saveClient(id: string | null, formData: FormData) {
  await requireAdmin();
  const name = str(formData.get("name"), 120);
  if (!name) return;
  const company = str(formData.get("company"), 120) || null;
  const email = str(formData.get("email"), 200) || null;
  const phone = str(formData.get("phone"), 60) || null;
  const location = str(formData.get("location"), 120) || null;
  const notes = str(formData.get("notes"), 8000);
  const projectIds = formData.getAll("project_ids").map((v) => str(v, 200)).filter(Boolean);
  if (id) {
    await sql()`
      update clients set name = ${name}, company = ${company}, email = ${email}, phone = ${phone},
        location = ${location}, notes = ${notes}, project_ids = ${projectIds}::text[]
      where id = ${id}`;
    revalidatePath("/admin", "layout");
    redirect(`/admin/clients/${id}`);
  }
  const [row] = await sql()`
    insert into clients (name, company, email, phone, location, notes, project_ids)
    values (${name}, ${company}, ${email}, ${phone}, ${location}, ${notes}, ${projectIds}::text[])
    returning id`;
  redirect(`/admin/clients/${row.id}`);
}

export async function deleteClient(id: string) {
  await requireAdmin();
  await sql()`update leads set client_id = null where client_id = ${id}`;
  await sql()`delete from clients where id = ${id}`;
  redirect("/admin/clients");
}

// ---------- Project visibility (quick toggle from the list) ----------

export async function setProjectPublished(id: string, published: boolean) {
  await requireAdmin();
  await sql()`update projects set published = ${published}, updated_at = now() where id = ${id}`;
  refreshSite();
  revalidatePath("/admin/projects");
}

// ---------- Service page photos ----------

export async function saveServiceImages(serviceId: string, images: ServiceImage[]): Promise<ActionResult> {
  await requireAdmin();
  if (!services.some((s) => s.id === serviceId)) return fail("Unknown service.");
  const clean = (Array.isArray(images) ? images : []).slice(0, 40).map((i) => ({
    src: str(i?.src, 500),
    alt: str(i?.alt, 200),
    ...(i?.hidden ? { hidden: true } : {}),
  }));
  if (clean.some((i) => !validPhotoSrc(i.src))) return fail("One of the photos has an invalid address. Re-upload it.");
  if (clean.length && clean.every((i) => i.hidden)) return fail("Show at least one photo, or the service page will have an empty strip.");
  try {
    // Merge into the single settings row so the other services keep their photos
    await sql()`
      insert into site_settings (key, value) values (${SERVICE_IMAGES_KEY}, ${JSON.stringify({ [serviceId]: clean })}::jsonb)
      on conflict (key) do update set value = site_settings.value || excluded.value, updated_at = now()`;
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Could not save.");
  }
  refreshSite();
  revalidatePath("/admin/services");
  return { ok: true };
}
