import type { Metadata } from "next";
import { ServicesSection } from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "Services — Walk In Design",
  description:
    "Architecture, interior design and landscape design from Walk In Design: one vision, inside and out.",
};

export default function ServicesPage() {
  return <ServicesSection />;
}
