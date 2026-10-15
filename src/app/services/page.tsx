import type { Metadata } from "next";
import { ServicesSection } from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "Services — Architecture, Interior & Landscape Design",
  description:
    "Architecture, interior design and landscape design from Walk In Design: space planning, concept design, facades, joinery, material selection, planting and hardscape, with execution support in Qatar and India.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Services | Walk In Design", images: [{ url: "/images/projects/interior/interior-01-lusail-qatar/01.webp" }] },
};

export default function ServicesPage() {
  return <ServicesSection />;
}
