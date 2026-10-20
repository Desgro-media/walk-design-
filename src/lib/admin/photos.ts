// Photos are either bundled with the site, uploaded to Vercel Blob, or (local dev only) saved under /uploads
export function validPhotoSrc(src: string) {
  return (
    src.startsWith("/images/") ||
    src.startsWith("/uploads/") ||
    /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(src)
  );
}

export interface ServiceImage {
  src: string;
  alt: string;
  hidden?: boolean;
}

export const SERVICE_IMAGES_KEY = "service-images";
