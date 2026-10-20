"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProjectsProvider } from "@/context/ProjectsContext";
import type { Project } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { ContactModal } from "@/components/ContactModal";
import { SiteLoader } from "@/components/SiteLoader";
import { StudioModal } from "@/components/StudioModal";
import { ChatBot } from "@/components/ChatBot";

function ScrollToTopOnRoute() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

type ServiceImages = Record<string, { src: string; alt: string }[]>;

export function SiteShell({ children, projects, serviceImages }: { children: React.ReactNode; projects: Project[]; serviceImages: ServiceImages }) {
  const pathname = usePathname();
  // The admin panel has its own chrome: no site header, footer, loader or chatbot
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <ProjectsProvider projects={projects} serviceImages={serviceImages}>
    <LanguageProvider>
      <SmoothScroll>
        <SiteLoader />
        <ScrollToTopOnRoute />
        <div className="relative min-h-screen bg-[#F4F1EC] text-[#1A1A1A] antialiased overflow-x-clip">
          <Header />
          <main>{children}</main>
          <Footer />
          <ProjectModal />
          <ContactModal />
          <StudioModal />
          <ChatBot />
        </div>
      </SmoothScroll>
    </LanguageProvider>
    </ProjectsProvider>
  );
}
