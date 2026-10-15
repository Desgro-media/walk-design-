import type { Metadata } from "next";
import { ServicesSection } from "@/components/ServicesSection";
import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Services — Walk In Design",
  description:
    "Architecture, interior design and landscape design from Walk In Design: one vision, inside and out.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        image="/images/projects/interior/interior-01-lusail-qatar/01.webp"
        alt="Living room with a linear fireplace and travertine wall"
        eyebrow="Architecture • Interiors • Landscape"
        title="Our Services"
      />
      <ServicesSection />
    </>
  );
}
