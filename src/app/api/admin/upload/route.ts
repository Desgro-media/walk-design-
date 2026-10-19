import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/admin/auth";

const MAX_BYTES = 4 * 1024 * 1024; // photos are resized in the browser first; Vercel caps request bodies at ~4.5 MB

// One photo per request. Stored in Vercel Blob; without a Blob token, local dev falls back to public/uploads.
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in." }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "misc").replace(/[^a-z0-9-]/gi, "").slice(0, 80) || "misc";
  if (!(file instanceof File) || !file.type.startsWith("image/")) return Response.json({ error: "Send an image." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Photo is too large (max 4 MB after resizing)." }, { status: 413 });

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`projects/${folder}/${name}`, file, { access: "public", contentType: "image/webp" });
    return Response.json({ url: blob.url });
  }

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return Response.json({ url: `/uploads/${folder}/${name}` });
  }

  return Response.json({ error: "Photo storage isn't set up. Add a Vercel Blob store (BLOB_READ_WRITE_TOKEN)." }, { status: 503 });
}
