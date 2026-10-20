import { services } from "@/data/studio";
import { getAdminServiceImages } from "@/lib/serviceImages";
import { ServiceImagesEditor } from "@/components/admin/ServiceImagesEditor";

export default async function ServicesAdminPage() {
  const images = await getAdminServiceImages();
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight">Service page photos</h1>
        <p className="mt-1 text-[13px] text-[#736E67]">
          The photo strip on each Services tab. Add, reorder, hide, describe or delete photos, then press Save for that service.
        </p>
      </div>
      {services.map((s) => (
        <ServiceImagesEditor key={s.id} serviceId={s.id} title={s.title} initial={images[s.id]} />
      ))}
    </div>
  );
}
