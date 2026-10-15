import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Projects — Walk In Design",
  description: "A selection of architectural, interior and landscape work by Walk In Design.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        image="/images/projects/landscape/landscape-04-lusail-qatar/01.webp"
        alt="Classical villa garden with a swimming pool"
        eyebrow="Qatar & India"
        title="Selected Work"
      />
      <PortfolioGrid />
    </>
  );
}
