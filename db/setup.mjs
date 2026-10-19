import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (run with: node --env-file=.env.local db/setup.mjs)");
const sql = neon(url);
const statements = readFileSync(new URL("./schema.sql", import.meta.url), "utf8")
  .split(";")
  .map((s) => s.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);
for (const s of statements) await sql.query(s);
console.log(`Created tables (${statements.length} statements).`);
