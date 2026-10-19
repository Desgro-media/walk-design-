import "server-only";
import { neon } from "@neondatabase/serverless";

export const PROJECTS_TAG = "projects";

export function dbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

// Admin reads and writes: never cached
export function sql() {
  return neon(process.env.DATABASE_URL!, { fetchOptions: { cache: "no-store" } });
}

// Public site reads: cached and tagged so an admin save can refresh them
export function publicSql() {
  return neon(process.env.DATABASE_URL!, { fetchOptions: { cache: "force-cache", next: { tags: [PROJECTS_TAG] } } });
}
