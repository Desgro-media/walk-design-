import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Projects — Walk In Design",
  description: "A selection of architectural, interior and landscape work by Walk In Design.",
};

export default function ProjectsPage() {
  return <PortfolioGrid />;
}
