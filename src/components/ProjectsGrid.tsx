"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<"all" | "architecture" | "interior" | "landscape">("all");
  const { language, t, setSelectedProjectId } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    return p.categoryKey === activeFilter;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate visible tiles on scroll
      tilesRef.current.forEach((tile) => {
        if (!tile) return;
        gsap.fromTo(
          tile,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#F4F1EC] text-[#1A1A1A] py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Minimalist Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div>
            <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-3">
              02 / {t.projects.heading}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A]">
              {language === "EN" ? "Architecture & Spaces" : "Arquitectura y Espacios"}
            </h2>
            <p className="mt-3 text-[14px] font-light text-[#736E67] max-w-md">
              {t.projects.subheading}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] tracking-[0.18em] font-light uppercase border-b border-[#1A1A1A]/10 pb-3">
            {(
              [
                { key: "all", label: t.projects.all },
                { key: "architecture", label: t.projects.architecture },
                { key: "interior", label: t.projects.interior },
                { key: "landscape", label: t.projects.landscape },
              ] as const
            ).map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative py-1 cursor-pointer transition-opacity duration-300 ${
                  activeFilter === filter.key
                    ? "text-[#1A1A1A] font-normal"
                    : "text-[#736E67] hover:text-[#1A1A1A]"
                }`}
              >
                <span>{filter.label}</span>
                {activeFilter === filter.key && (
                  <span className="absolute bottom-[-13px] left-0 right-0 h-[1px] bg-[#1A1A1A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 2-Column Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          {/* Column 1: Even items */}
          <div className="flex flex-col space-y-16 sm:space-y-24">
            {filteredProjects
              .filter((_, idx) => idx % 2 === 0)
              .map((project, idx) => {
                const globalIndex = idx * 2;
                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      tilesRef.current[globalIndex] = el;
                    }}
                    onClick={() => setSelectedProjectId(project.id)}
                    className="group flex flex-col cursor-pointer select-none"
                  >
                    {/* Image Tile */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E8E3DC]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Subtle floating badge on hover */}
                      <div className="absolute top-5 right-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="bg-[#F4F1EC]/90 backdrop-blur-sm text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 border border-[#1A1A1A]/10">
                          {t.projects.viewProject}
                        </span>
                      </div>
                    </div>

                    {/* Metadata line */}
                    <div className="mt-5 flex items-baseline justify-between border-b border-[#1A1A1A]/10 pb-3">
                      <div>
                        <h3 className="text-[13px] sm:text-[14px] font-light tracking-[0.16em] uppercase text-[#1A1A1A] group-hover:opacity-60 transition-opacity">
                          {language === "EN" ? project.title : project.titleEs}
                        </h3>
                        <p className="mt-1 text-[11px] font-light tracking-[0.14em] uppercase text-[#736E67]">
                          {language === "EN" ? project.category : project.categoryEs}
                        </p>
                      </div>
                      <span className="text-[11px] font-light tracking-[0.16em] text-[#736E67]">
                        {project.year}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Column 2: Odd items with editorial vertical offset */}
          <div className="flex flex-col space-y-16 sm:space-y-24 md:pt-20">
            {filteredProjects
              .filter((_, idx) => idx % 2 === 1)
              .map((project, idx) => {
                const globalIndex = idx * 2 + 1;
                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      tilesRef.current[globalIndex] = el;
                    }}
                    onClick={() => setSelectedProjectId(project.id)}
                    className="group flex flex-col cursor-pointer select-none"
                  >
                    {/* Image Tile */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E8E3DC]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Subtle floating badge on hover */}
                      <div className="absolute top-5 right-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="bg-[#F4F1EC]/90 backdrop-blur-sm text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 border border-[#1A1A1A]/10">
                          {t.projects.viewProject}
                        </span>
                      </div>
                    </div>

                    {/* Metadata line */}
                    <div className="mt-5 flex items-baseline justify-between border-b border-[#1A1A1A]/10 pb-3">
                      <div>
                        <h3 className="text-[13px] sm:text-[14px] font-light tracking-[0.16em] uppercase text-[#1A1A1A] group-hover:opacity-60 transition-opacity">
                          {language === "EN" ? project.title : project.titleEs}
                        </h3>
                        <p className="mt-1 text-[11px] font-light tracking-[0.14em] uppercase text-[#736E67]">
                          {language === "EN" ? project.category : project.categoryEs}
                        </p>
                      </div>
                      <span className="text-[11px] font-light tracking-[0.16em] text-[#736E67]">
                        {project.year}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
