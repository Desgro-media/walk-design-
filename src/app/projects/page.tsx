import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Projects — Villas, Interiors & Landscapes in Qatar & India",
  description:
    "Selected architecture, interior and landscape projects by Walk In Design: private villas in Lusail, Al Rayyan, Duhail and Al Waab, a mosque in Thrissur, landscaped gardens and commercial salon interiors.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Projects | Walk In Design", images: [{ url: "/images/projects/landscape/landscape-04-lusail-qatar/01.webp" }] },
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="sr-only">Architecture, interior and landscape projects by Walk In Design in Qatar and India</h1>
      <PortfolioGrid />
    </>
  );
}
