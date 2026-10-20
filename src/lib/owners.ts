import "server-only";
import { dbConfigured, publicSql, sql } from "@/lib/admin/db";
import { OWNERS_ENABLED_KEY, OWNERS_ITEMS_KEY, builtInOwners, type Owner, type Owners } from "@/lib/admin/owners";

const KEYS = [OWNERS_ENABLED_KEY, OWNERS_ITEMS_KEY];

function parse(rows: Record<string, unknown>[]): Owners {
  const byKey = Object.fromEntries(rows.map((r) => [r.key as string, r.value]));
  return {
    enabled: byKey[OWNERS_ENABLED_KEY] !== false, // shown unless the admin switched it off
    items: Array.isArray(byKey[OWNERS_ITEMS_KEY]) ? (byKey[OWNERS_ITEMS_KEY] as Owner[]) : builtInOwners,
  };
}

// The owners the website shows. Empty when the switch is off, so no name or photo appears anywhere.
export async function getOwners(): Promise<Owner[]> {
  if (!dbConfigured()) return builtInOwners;
  try {
    const { enabled, items } = parse(await publicSql()`select key, value from site_settings where key = any(${KEYS}::text[])`);
    return enabled ? items.filter((o) => !o.hidden) : [];
  } catch {
    return builtInOwners;
  }
}

// For the admin: the switch state and every person, including hidden ones
export async function getAdminOwners(): Promise<Owners> {
  return parse(await sql()`select key, value from site_settings where key = any(${KEYS}::text[])`);
}
