"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogoMark, MARK_FRAME, MARK_PANEL } from "@/components/LogoMark";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { language, t, setIsContactModalOpen, setIsStudioModalOpen } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  // Only the home page has a hero photo ([data-hero]); inner pages always get the solid white header
  const hasHero = pathname === "/";
  const isPastHero = !hasHero || scrolledPastHero || isMobileMenuOpen;

  useEffect(() => {
    if (!hasHero) return;
    const handleScroll = () => {
      const heroElement = document.querySelector("[data-hero]");
      // Past the hero once its bottom is near the top of the viewport
      setScrolledPastHero(heroElement ? heroElement.getBoundingClientRect().bottom <= 80 : true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    // the new page's hero may mount just after the route changes
    const t = window.setTimeout(handleScroll, 150);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(t);
    };
  }, [hasHero, pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 sm:px-10 md:px-14 py-5 md:py-6 flex items-center justify-between ${
          isPastHero
            ? "bg-white text-[#1A1A1A] border-b border-[#1A1A1A]/8"
            : "bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Left: Studio Wordmark */}
        <div className="flex-1 max-w-[420px]">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center gap-3 group select-none">
            <LogoMark
              className="h-14 sm:h-[5.5rem] w-auto"
              frameColor={isPastHero ? MARK_FRAME : "#FFFFFF"}
              panelColor={isPastHero ? MARK_PANEL : "rgba(255,255,255,0.65)"}
            />
            <Image
              src={isPastHero ? "/images/brand/wordmark-color.png" : "/images/brand/wordmark-white.png"}
              alt="Walk In Design — Architecture, Interiors, Landscape"
              width={1200}
              height={432}
              priority
              className="h-14 sm:h-[5.5rem] w-auto transition-opacity duration-300 group-hover:opacity-60"
            />
          </Link>
        </div>

        {/* Center-Left Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-9 xl:space-x-12">
          <Link
            href="/services"
            className="text-[11.5px] tracking-[0.16em] font-light uppercase relative py-1 transition-opacity duration-300 hover:opacity-50 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
            >
            {language === "EN" ? "SERVICES" : "SERVICIOS"}
          </Link>
          <Link
            href="/projects"
            className="text-[11.5px] tracking-[0.16em] font-light uppercase relative py-1 transition-opacity duration-300 hover:opacity-50 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
            >
            {language === "EN" ? "PROJECTS" : "PROYECTOS"}
          </Link>
        </nav>

        {/* Right Nav Links & Language Switch (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
          <button
            onClick={() => setIsStudioModalOpen(true)}
            className="text-[11.5px] tracking-[0.16em] font-light uppercase relative py-1 transition-opacity duration-300 hover:opacity-50 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.studio}
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="text-[11.5px] tracking-[0.16em] font-light uppercase relative py-1 transition-opacity duration-300 hover:opacity-50 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-11 h-11 -mr-2 flex flex-col justify-center items-end pr-2 space-y-1.5 focus:outline-none cursor-pointer"
          >
            <span
              className={`block h-[1px] bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "w-6 -rotate-45 translate-y-[3.5px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[1px] bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "w-6 rotate-45 -translate-y-[3.5px]" : "w-4"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-40 overflow-y-auto bg-white text-[#1A1A1A] flex flex-col justify-between p-8 sm:p-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="pt-20">
          <p className="text-[10px] tracking-[0.26em] uppercase text-[#736E67] mb-8 font-light">
            WALK IN DESIGN • ATELIER
          </p>
          <nav className="flex flex-col space-y-6">
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase transition-opacity hover:opacity-50"
              >
              {language === "EN" ? "SERVICES" : "SERVICIOS"}
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase transition-opacity hover:opacity-50"
              >
              {language === "EN" ? "PROJECTS" : "PROYECTOS"}
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsStudioModalOpen(true);
              }}
              className="text-left text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase transition-opacity hover:opacity-50"
            >
              {t.nav.studio}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }}
              className="text-left text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase transition-opacity hover:opacity-50"
            >
              {t.nav.contact}
            </button>
          </nav>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-6 pb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-[11px] tracking-[0.18em] font-light text-[#736E67]">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p>QATAR · WEST BAY</p>
              <p className="mt-1">+974 5175 3798</p>
              <p className="mt-1">+974 5175 3799</p>
            </div>
            <div>
              <p>INDIA · TIRUR, MALAPPURAM</p>
              <p className="mt-1">+91 9747397043</p>
              <p className="mt-1">+91 8330095919</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
