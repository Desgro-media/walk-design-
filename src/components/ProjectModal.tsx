"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { projectsData } from "@/data/projects";

export function ProjectModal() {
  const { selectedProjectId, setSelectedProjectId, language, t } = useLanguage();

  const project = projectsData.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedProjectId]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setSelectedProjectId(null)}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl h-full bg-[#F4F1EC] text-[#1A1A1A] overflow-y-auto p-8 sm:p-12 md:p-16 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6 mb-8">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-light text-[#736E67]">
              {language === "EN" ? "PROJECT DOSSIER" : "EXPEDIENTE DE PROYECTO"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#1A1A1A] mt-1">
              {language === "EN" ? project.title : project.titleEs}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProjectId(null)}
            className="text-[11px] tracking-[0.2em] uppercase font-light text-[#1A1A1A] px-4 py-2 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
          >
            {t.projects.closeDossier} <span className="hidden sm:inline">[ESC]</span><span className="sm:hidden">✕</span>
          </button>
        </div>

        {/* Gallery Carousel / Stack */}
        <div className="space-y-6 mb-12">
          {project.gallery.map((img, idx) => (
            <div key={img.src} className="relative w-full overflow-hidden bg-[#E8E3DC]">
              <Image
                src={img.src}
                alt={`${project.title} - View ${idx + 1}`}
                width={img.w}
                height={img.h}
                sizes="(max-width: 1024px) 100vw, 896px"
                loading={idx < 2 ? "eager" : "lazy"}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Specifications Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-[#1A1A1A]/10 text-[11px] tracking-[0.16em] uppercase font-light">
          <div>
            <span className="text-[#736E67] block">{t.projects.location}</span>
            <p className="mt-1 font-normal text-[#1A1A1A]">
              {language === "EN" ? project.location : project.locationEs}
            </p>
          </div>
          {project.year && (
            <div>
              <span className="text-[#736E67] block">{t.projects.year}</span>
              <p className="mt-1 font-normal text-[#1A1A1A]">{project.year}</p>
            </div>
          )}
          <div>
            <span className="text-[#736E67] block">{t.projects.typology}</span>
            <p className="mt-1 font-normal text-[#1A1A1A]">
              {language === "EN" ? project.category : project.categoryEs}
            </p>
          </div>
          {project.status && (
            <div>
              <span className="text-[#736E67] block">{t.projects.status}</span>
              <p className="mt-1 font-normal text-[#1A1A1A]">
                {language === "EN" ? project.status : project.statusEs}
              </p>
            </div>
          )}
        </div>

        {/* Narrative & Materiality (each part only when the project has it) */}
        {(project.brief || project.response || project.materials) && (
          <div className="py-10 space-y-8">
            {project.brief && (
              <div>
                <h4 className="text-[11px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                  {language === "EN" ? "PROJECT BRIEF" : "EL ENCARGO"}
                </h4>
                <p className="text-[15px] font-light leading-relaxed text-[#1A1A1A]">
                  {language === "EN" ? project.brief : project.briefEs ?? project.brief}
                </p>
              </div>
            )}

            {project.response && (
              <div>
                <h4 className="text-[11px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                  {language === "EN" ? "OUR ARCHITECTURAL RESPONSE" : "NUESTRA RESPUESTA ARQUITECTÓNICA"}
                </h4>
                <p className="text-[15px] font-light leading-relaxed text-[#1A1A1A]">
                  {language === "EN" ? project.response : project.responseEs ?? project.response}
                </p>
              </div>
            )}

            {project.materials && (
              <div>
                <h4 className="text-[11px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                  {t.projects.materials}
                </h4>
                <p className="text-[13.5px] font-light tracking-[0.04em] text-[#A9876B]">
                  {language === "EN" ? project.materials : project.materialsEs ?? project.materials}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer in Drawer */}
        <div className="border-t border-[#1A1A1A]/10 pt-6 flex justify-between items-center text-[11px] tracking-[0.16em] uppercase font-light text-[#736E67]">
          <span>WALK IN DESIGN • ARCHIVES</span>
          <button
            onClick={() => setSelectedProjectId(null)}
            className="hover:text-[#1A1A1A] cursor-pointer"
          >
            ← {language === "EN" ? "RETURN TO WORKS" : "VOLVER A PROYECTOS"}
          </button>
        </div>
      </div>
    </div>
  );
}
