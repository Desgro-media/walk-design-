"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language, t, setIsContactModalOpen } = useLanguage();

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
      className="relative w-full bg-white text-[#141312] pt-12 sm:pt-16 pb-8 px-6 sm:px-10 md:px-14 lg:px-20 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: Large Quiet Commission Banner */}
        <div className="border-b border-[#141312]/15 pb-8 sm:pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] tracking-[0.24em] uppercase font-light text-[#4A4A4A] mb-3 block">
              07 / {language === "EN" ? "CONTACT" : "CONTACTO"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight leading-[1.15] text-[#141312]">
              {t.footer.inquirePrompt}
            </h2>
          </div>

          <div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center space-x-3 text-[12px] tracking-[0.22em] font-light uppercase px-7 py-3.5 border border-[#141312]/40 hover:border-[#141312] hover:bg-[#141312] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span>{t.footer.inquireCta}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 4 Column Info Grid — thin uppercase type as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-10 text-[11.5px] tracking-[0.16em] uppercase font-light leading-relaxed text-[#4A4A4A]">
          {/* Col 1: Studio */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#141312] font-normal tracking-[0.2em] mb-1">
              WALK IN DESIGN
            </span>
            <p>{language === "EN" ? "QATAR & INDIA" : "CATAR E INDIA"}</p>
            <p>{language === "EN" ? "ARCHITECTURE • INTERIORS • LANDSCAPE" : "ARQUITECTURA • INTERIORES • PAISAJE"}</p>
          </div>

          {/* Col 2: Qatar office */}
          <div className="flex flex-col items-center text-center space-y-3 normal-case tracking-normal text-[12.5px] text-[#141312]">
            <span className="font-semibold uppercase tracking-[0.04em] mb-1">QATAR</span>
            <p className="uppercase">West Bay , Qatar</p>
            <p>
              <a href="https://wa.me/97451753798" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                +974 51753798
              </a>
              {" | "}
              <a href="https://wa.me/97451753799" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                +974 51753799
              </a>
            </p>
          </div>

          {/* Col 3: India office */}
          <div className="flex flex-col items-center text-center space-y-3 normal-case tracking-normal text-[12.5px] text-[#141312]">
            <span className="font-semibold uppercase tracking-[0.04em] mb-1">INDIA</span>
            <p className="uppercase">Tirur , Malappuram</p>
            <p>
              <a href="tel:+919747397043" className="hover:opacity-60 transition-opacity">
                +91 9747397043
              </a>
              {" | "}
              <a href="tel:+918330095919" className="hover:opacity-60 transition-opacity">
                +91 8330095919
              </a>
            </p>
          </div>

          {/* Col 4: Office hours */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#141312] font-normal tracking-[0.2em] mb-1">
              {t.footer.hoursTitle}
            </span>
            <p>{t.footer.hours}</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-t border-[#141312]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] tracking-[0.2em] uppercase font-light text-[#6B6B6B]">
          <p>{t.footer.rights}</p>
          <button
            onClick={scrollToTop}
            className="hover:text-[#141312] transition-colors cursor-pointer"
          >
            {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
