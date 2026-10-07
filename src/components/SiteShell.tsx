"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { ContactModal } from "@/components/ContactModal";
import { SiteLoader } from "@/components/SiteLoader";
import { StudioModal } from "@/components/StudioModal";

function ScrollToTopOnRoute() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
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
        </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
