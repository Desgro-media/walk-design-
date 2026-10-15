"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData, Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { Tilt } from "@/components/Tilt";
import { Reveal3D } from "@/components/Reveal3D";

type Filter = "all" | "architecture" | "interior" | "landscape" | "commercial";
type View = "grid" | "list";

const TITLE = "#4F575B";
const META = "#7C838A";

const filters: { key: Filter; en: string; es: string }[] = [
  { key: "all", en: "All", es: "Todos" },
  { key: "architecture", en: "Architecture", es: "Arquitectura" },
  { key: "interior", en: "Interiors", es: "Interiores" },
  { key: "landscape", en: "Landscape", es: "Paisajismo" },
  { key: "commercial", en: "Commercial", es: "Comercial" },
];

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1.5" y="1.5" width="6" height="6" />
      <rect x="10.5" y="1.5" width="6" height="6" />
      <rect x="1.5" y="10.5" width="6" height="6" />
      <rect x="10.5" y="10.5" width="6" height="6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M1.5 4h15M1.5 9h15M1.5 14h15" />
    </svg>
  );
}

export function PortfolioGrid() {
  const { language, setSelectedProjectId } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const en = language === "EN";

  const items = projectsData.filter((p) => filter === "all" || p.categoryKey === filter);
  const open = (p: Project) => {
    if (!p.comingSoon) setSelectedProjectId(p.id);
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#FAF8F5] py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8 [font-family:var(--font-work-sans),sans-serif]"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-[13px] tracking-[0.24em] uppercase font-light mb-4" style={{ color: META }}>
          04 / {en ? "SELECTED WORK" : "PROYECTOS SELECCIONADOS"}
        </p>
        <p className="max-w-2xl text-[15px] font-light leading-relaxed tracking-[0.02em]" style={{ color: TITLE }}>
          {en
            ? "Explore a selection of our architectural, interior and landscape work. Each project begins with a different brief and develops through a careful response to its spaces, users and setting."
            : "Explore una selección de nuestros trabajos de arquitectura, interiorismo y paisajismo."}
        </p>

        {/* Filters (left) + view toggle (top right) */}
        <div className="mt-12 mb-10 flex items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="text-[13px] tracking-[0.2em] uppercase font-light cursor-pointer transition-colors duration-300"
                style={{ color: f.key === filter ? TITLE : META }}
              >
                {en ? f.en : f.es}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3" role="group" aria-label="View">
            {(["grid", "list"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v === "grid" ? "Grid view" : "List view"}
                aria-pressed={view === v}
                className="cursor-pointer transition-colors duration-300"
                style={{ color: view === v ? TITLE : META }}
              >
                {v === "grid" ? <GridIcon /> : <ListIcon />}
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-[4vw] gap-y-[7vw] sm:gap-x-[2.5vw] sm:gap-y-[3.5vw]">
            {items.map((p, i) => (
              <li key={p.id}>
                <Reveal3D delay={(i % 3) * 0.1}>
                <button
                  type="button"
                  onClick={() => open(p)}
                  disabled={p.comingSoon}
                  className={`group block w-full text-left ${p.comingSoon ? "cursor-default" : "cursor-pointer"}`}
                >
                  {/* Square thumbnail */}
                  <Tilt className="relative w-full aspect-square overflow-hidden bg-[#E8E5E0]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1152px) 33vw, 380px"
                      className={`object-cover [filter:grayscale(1)] [@media(hover:none)]:[filter:grayscale(0)] transition-[filter] duration-300 ease-linear ${
                        p.comingSoon ? "" : "group-hover:[filter:grayscale(0)]"
                      }`}
                    />
                    {p.comingSoon && (
                      <span className="absolute inset-0 flex items-center justify-center text-center text-[10px] sm:text-[12px] tracking-[0.2em] uppercase font-light text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]">
                        {en ? "Coming soon" : "Próximamente"}
                      </span>
                    )}
                  </Tilt>

                  {/* Caption: clipped wrapper, slides down on hover (always visible on touch devices) */}
                  <div className="overflow-y-hidden h-[5.5rem] sm:h-[4.75rem] pt-3 text-[12px] sm:text-[13px]">
                    <div
                      className={`-translate-y-[120%] transition-transform duration-300 ease-linear [@media(hover:none)]:translate-y-0 ${
                        p.comingSoon ? "" : "group-hover:translate-y-0"
                      }`}
                    >
                      <p className="uppercase tracking-[0.18em] font-normal" style={{ color: TITLE }}>
                        {en ? p.title : p.titleEs}
                      </p>
                      <p className="mt-1 tracking-[0.14em] font-light" style={{ color: META }}>
                        {en ? p.location : p.locationEs}{p.year ? ` · ${p.year}` : ""}
                      </p>
                    </div>
                  </div>
                </button>
                </Reveal3D>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="border-t border-[#666E73]/15">
            {items.map((p) => (
              <li key={p.id} className="border-b border-[#666E73]/15">
                <button
                  type="button"
                  onClick={() => open(p)}
                  disabled={p.comingSoon}
                  className={`group w-full flex items-center gap-4 sm:gap-8 py-4 text-left ${
                    p.comingSoon ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden bg-[#E8E5E0]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="80px"
                      className={`object-cover [filter:grayscale(1)] [@media(hover:none)]:[filter:grayscale(0)] transition-[filter] duration-300 ease-linear ${
                        p.comingSoon ? "" : "group-hover:[filter:grayscale(0)]"
                      }`}
                    />
                  </div>
                  <span
                    className="flex-1 text-[14px] sm:text-[16px] uppercase tracking-[0.18em] font-normal"
                    style={{ color: TITLE }}
                  >
                    {en ? p.title : p.titleEs}
                  </span>
                  <span className="hidden sm:block text-[13px] tracking-[0.14em] font-light" style={{ color: META }}>
                    {p.comingSoon ? (en ? "Coming soon" : "Próximamente") : en ? p.location : p.locationEs}
                  </span>
                  <span className="text-[13px] tracking-[0.14em] font-light w-12 text-right" style={{ color: META }}>
                    {p.year ?? ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
