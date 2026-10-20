import "server-only";
import { services } from "@/data/studio";
import { dbConfigured, publicSql, sql } from "@/lib/admin/db";
import { SERVICE_IMAGES_KEY, type ServiceImage } from "@/lib/admin/photos";

type ImageMap = Record<string, ServiceImage[]>;

const builtIn = (): ImageMap => Object.fromEntries(services.map((s) => [s.id, s.images]));

function merge(saved: ImageMap | undefined): ImageMap {
  return Object.fromEntries(services.map((s) => [s.id, saved?.[s.id] ?? s.images]));
}

// Photos each service page shows: the admin's saved list, otherwise the built-in photos. Hidden ones are left out.
export async function getServiceImages(): Promise<Record<string, { src: string; alt: string }[]>> {
  let saved: ImageMap | undefined;
  if (dbConfigured()) {
    try {
      const [row] = await publicSql()`select value from site_settings where key = ${SERVICE_IMAGES_KEY}`;
      saved = row?.value as ImageMap | undefined;
    } catch {}
  }
  const all = saved ? merge(saved) : builtIn();
  return Object.fromEntries(Object.entries(all).map(([id, list]) => [id, list.filter((i) => !i.hidden).map(({ src, alt }) => ({ src, alt }))]));
}

// For the admin: everything, including hidden photos
export async function getAdminServiceImages(): Promise<ImageMap> {
  const [row] = await sql()`select value from site_settings where key = ${SERVICE_IMAGES_KEY}`;
  return merge(row?.value as ImageMap | undefined);
}
