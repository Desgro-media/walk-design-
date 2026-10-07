"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const newsEntries = [
  {
    id: "news-01",
    number: "01",
    dateEn: "28 OCT 2026",
    dateEs: "28 OCT 2026",
    titleEn: "Monograph: The Silent Language of Travertine & Light",
    titleEs: "Monografía: El Lenguaje Silencioso del Travertino y la Luz",
    categoryEn: "STUDIO ESSAY",
    categoryEs: "ENSAYO DE ESTUDIO",
    tagEn: "READING TIME 6 MIN",
    tagEs: "LECTURA 6 MIN",
  },
  {
    id: "news-02",
    number: "02",
    dateEn: "14 AUG 2026",
    dateEs: "14 AGO 2026",
    titleEn: "Private Villa Lusail featured in Architectural Digest Middle East",
    titleEs: "Villa Lusail destacada en Architectural Digest Oriente Medio",
    categoryEn: "EDITORIAL FEATURE",
    categoryEs: "PUBLICACIÓN EDITORIAL",
    tagEn: "PRESS ARCHIVE",
    tagEs: "ARCHIVO DE PRENSA",
  },
  {
    id: "news-03",
    number: "03",
    dateEn: "02 JUN 2026",
    dateEs: "02 JUN 2026",
    titleEn: "Studio Lecture: Tectonic Restraint at the Venice Architecture Biennale",
    titleEs: "Ponencia de Estudio: Contención Tectónica en la Bienal de Arquitectura de Venecia",
    categoryEn: "SYMPOSIUM KEYNOTE",
    categoryEs: "CONFERENCIA MAGISTRAL",
    tagEn: "PROCEEDINGS",
    tagEs: "ACTAS DEL COLOQUIO",
  },
];

export function NewsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="news"
      ref={containerRef}
      className="relative w-full bg-[#F4F1EC] text-[#1A1A1A] py-28 sm:py-36 md:py-40 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-3">
            05 / {t.news.heading}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A]">
            {language === "EN" ? "Chronicles & Journal" : "Crónicas y Publicaciones"}
          </h2>
          <p className="mt-3 text-[14px] font-light text-[#736E67] max-w-md">
            {t.news.subheading}
          </p>
        </div>

        {/* Minimal List Style Entries */}
        <div className="border-t border-[#1A1A1A]/10">
          {newsEntries.map((entry, index) => (
            <div
              key={entry.id}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
              className="group border-b border-[#1A1A1A]/10 py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors duration-300 hover:bg-[#EBE6DF]/40 px-2 sm:px-4"
            >
              {/* Left: Index & Date */}
              <div className="flex items-center space-x-6 md:w-1/4">
                <span className="text-[11px] tracking-[0.2em] font-light text-[#736E67]">
                  {entry.number}
                </span>
                <span className="text-[11px] tracking-[0.18em] font-light text-[#736E67] uppercase">
                  {language === "EN" ? entry.dateEn : entry.dateEs}
                </span>
              </div>

              {/* Center: Title & Category */}
              <div className="md:w-1/2 flex flex-col space-y-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-[-0.01em] text-[#1A1A1A] transition-opacity duration-300 group-hover:opacity-60">
                  {language === "EN" ? entry.titleEn : entry.titleEs}
                </h3>
                <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67]">
                  {language === "EN" ? entry.categoryEn : entry.categoryEs}
                </span>
              </div>

              {/* Right: Tag & Arrow */}
              <div className="md:w-1/4 flex items-center justify-between md:justify-end space-x-6 text-[10.5px] tracking-[0.18em] uppercase font-light text-[#736E67]">
                <span className="hidden sm:inline">
                  {language === "EN" ? entry.tagEn : entry.tagEs}
                </span>
                <span className="text-base text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
