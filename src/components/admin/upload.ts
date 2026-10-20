const MAX_EDGE = 2400;

// Shrink big phone/camera photos before upload: faster, cheaper, and the site loads quicker
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.86));
  if (!blob) throw new Error(`Could not read ${file.name}`);
  return { blob, w, h };
}


// Resize in the browser, then store it (Vercel Blob in production, public/uploads in local dev)
export async function uploadImage(file: File, folder: string): Promise<{ url: string; w: number; h: number }> {
  const { blob, w, h } = await prepare(file);
  const body = new FormData();
  body.append("file", new File([blob], "photo.webp", { type: "image/webp" }));
  body.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return { url: data.url as string, w, h };
}
