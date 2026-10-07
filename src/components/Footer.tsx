"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language, setLanguage, t, setIsContactModalOpen } = useLanguage();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#141312] text-[#F4F1EC] pt-28 sm:pt-36 pb-16 px-6 sm:px-10 md:px-14 lg:px-20 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: Large Quiet Commission Banner */}
        <div className="border-b border-[#F4F1EC]/12 pb-20 sm:pb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] tracking-[0.24em] uppercase font-light text-[#C9BFB1] mb-4 block">
              07 / {language === "EN" ? "CONTACT" : "CONTACTO"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#F4F1EC]">
              {t.footer.inquirePrompt}
            </h2>
          </div>

          <div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center space-x-3 text-[12px] tracking-[0.22em] font-light uppercase px-8 py-4 border border-[#F4F1EC]/30 hover:border-[#F4F1EC] hover:bg-[#F4F1EC] hover:text-[#141312] transition-all duration-300 cursor-pointer"
            >
              <span>{t.footer.inquireCta}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 4 Column Info Grid — thin uppercase type as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 py-20 text-[11.5px] tracking-[0.16em] uppercase font-light leading-relaxed text-[#C9BFB1]">
          {/* Col 1: Studio */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#F4F1EC] font-normal tracking-[0.2em] mb-1">
              WALK IN DESIGN
            </span>
            <p>{language === "EN" ? "QATAR & INDIA" : "CATAR E INDIA"}</p>
            <p>{language === "EN" ? "ARCHITECTURE • INTERIORS • LANDSCAPE" : "ARQUITECTURA • INTERIORES • PAISAJE"}</p>
          </div>

          {/* Col 2: Telephone & WhatsApp */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#F4F1EC] font-normal tracking-[0.2em] mb-1">
              {language === "EN" ? "TELEPHONE & WHATSAPP" : "TELÉFONO Y WHATSAPP"}
            </span>
            <a href="https://wa.me/97430510534" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F1EC] transition-colors">
              +974 3051 0534
            </a>
            <a href="https://wa.me/97431368043" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F1EC] transition-colors">
              +974 3136 8043
            </a>
          </div>

          {/* Col 3: Office hours */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#F4F1EC] font-normal tracking-[0.2em] mb-1">
              {t.footer.hoursTitle}
            </span>
            <p>{t.footer.hours}</p>
          </div>

          {/* Col 4: Social Links & Language Switch Repeated */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#F4F1EC] font-normal tracking-[0.2em] mb-1">
              {language === "EN" ? "LANGUAGE" : "IDIOMA"}
            </span>
            {/* Language Switch Repeated */}
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.18em]">
              <button
                onClick={() => setLanguage("EN")}
                className={`cursor-pointer ${
                  language === "EN" ? "text-[#F4F1EC] underline font-normal" : "text-[#C9BFB1] hover:text-[#F4F1EC]"
                }`}
              >
                EN
              </button>
              <span className="text-[#736E67]">|</span>
              <button
                onClick={() => setLanguage("ES")}
                className={`cursor-pointer ${
                  language === "ES" ? "text-[#F4F1EC] underline font-normal" : "text-[#C9BFB1] hover:text-[#F4F1EC]"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-t border-[#F4F1EC]/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] tracking-[0.2em] uppercase font-light text-[#736E67]">
          <p>{t.footer.rights}</p>
          <button
            onClick={scrollToTop}
            className="hover:text-[#F4F1EC] transition-colors cursor-pointer"
          >
            {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
