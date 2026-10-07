"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { approach, founders, process } from "@/data/studio";

export function StudioModal() {
  const { isStudioModalOpen, setIsStudioModalOpen, language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsStudioModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsStudioModalOpen]);

  if (!isStudioModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setIsStudioModalOpen(false)}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl h-full bg-[#F4F1EC] text-[#1A1A1A] overflow-y-auto p-8 sm:p-12 md:p-16 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6 mb-8">
            <span className="text-[10px] tracking-[0.24em] uppercase font-light text-[#736E67]">
              WALK IN DESIGN • OUR STORY
            </span>
            <button
              onClick={() => setIsStudioModalOpen(false)}
              className="text-[11px] tracking-[0.2em] uppercase font-light text-[#1A1A1A] px-4 py-2 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">[ESC]</span>
              <span className="sm:hidden">{language === "EN" ? "CLOSE ✕" : "CERRAR ✕"}</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            {language === "EN" ? "Design begins with understanding" : "El diseño comienza con la comprensión"}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] font-light text-[#736E67] leading-relaxed">
            {language === "EN" ? (
              <>
                <p>
                  Established in Qatar in 2025, Walk In Design was founded by senior architects Mohamed Ramshad and
                  Rajeena. The practice brings architecture, interior design and landscape design into a closely
                  connected process, with the founders personally involved from early ideas through execution
                  coordination.
                </p>
                <p>
                  Our name expresses an invitation: to walk into a space that feels right for you. We begin by
                  listening to how you live, what you value and what you need your space to achieve. These
                  conversations guide the layouts, materials, details and outdoor experiences we develop.
                </p>
                <p>
                  We believe good design must work in everyday life. Alongside appearance, we consider movement,
                  privacy, comfort, maintenance and the practical demands of construction. Each decision contributes
                  to a complete environment, from the overall plan to the smallest junction between materials.
                </p>
              </>
            ) : (
              <p>
                Fundado en Catar en 2025 por los arquitectos sénior Mohamed Ramshad y Rajeena, Walk In Design aúna
                arquitectura, interiorismo y paisajismo en un proceso estrechamente conectado.
              </p>
            )}
          </div>

          {/* Mission & Vision */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-[#EBE6DF]">
              <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">Our mission</span>
              <p className="mt-2 text-[13px] font-light leading-relaxed">
                To create thoughtful, functional and enduring spaces through personal collaboration, careful design and
                close attention to execution.
              </p>
            </div>
            <div className="p-5 bg-[#EBE6DF]">
              <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">Our vision</span>
              <p className="mt-2 text-[13px] font-light leading-relaxed">
                To build a studio known for spaces that connect people, architecture and nature, and for a process
                clients can understand and participate in.
              </p>
            </div>
          </div>

          {/* Approach */}
          <div className="mt-10">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block mb-3">Our approach</span>
            <ul className="border-t border-[#1A1A1A]/10">
              {approach.map((a) => (
                <li key={a.label} className="py-3 border-b border-[#1A1A1A]/10 text-[13px] font-light leading-relaxed">
                  <span className="font-normal">{a.label}</span>
                  <span className="text-[#736E67]">: {a.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Founders */}
          <div className="mt-12 space-y-12 border-t border-[#1A1A1A]/10 pt-8">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">
              {language === "EN" ? "MEET THE FOUNDERS" : "CONOZCA A LOS FUNDADORES"}
            </span>
            {founders.map((f) => (
              <div key={f.name}>
                <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">
                  {f.role}
                </span>
                <h3 className="text-xl font-light tracking-tight text-[#1A1A1A] mt-1">{f.name}</h3>
                <p className="text-[11px] tracking-[0.14em] uppercase text-[#A9876B] mt-0.5">{f.creds}</p>
                <div className="mt-3 space-y-3 text-[14px] font-light leading-relaxed text-[#1A1A1A]/90">
                  {f.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mt-14 border-t border-[#1A1A1A]/10 pt-8">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block mb-6">
              {language === "EN" ? "OUR PROCESS" : "NUESTRO PROCESO"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[12px] font-light">
              {process.map((step) => (
                <div key={step.n} className="p-4 bg-[#EBE6DF]">
                  <span className="text-[#A9876B] font-mono block text-[11px]">
                    {step.n} / {step.title.toUpperCase()}
                  </span>
                  <p className="mt-1 text-[#1A1A1A]">{step.text.charAt(0).toUpperCase() + step.text.slice(1)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#1A1A1A]/10 text-[10.5px] tracking-[0.18em] uppercase font-light text-[#736E67] flex justify-between items-center">
          <span>QATAR & INDIA</span>
          <button
            onClick={() => setIsStudioModalOpen(false)}
            className="hover:text-[#1A1A1A] cursor-pointer"
          >
            ← {language === "EN" ? "BACK" : "VOLVER"}
          </button>
        </div>
      </div>
    </div>
  );
}
