"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useProjects } from "@/context/ProjectsContext";

export function InteriorStrip() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  // One tile per interior project, using its cover photo
  const interiorDetails = useProjects()
    .filter((p) => p.categoryKey === "interior")
    .map((p) => ({
      id: p.id,
      titleEn: p.title,
      titleEs: p.titleEs,
      subEn: p.location,
      subEs: p.locationEs,
      image: p.image,
    }));
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startLeft: 0, moved: false });

  // Mouse drag-to-scroll (touch already scrolls natively)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !scrollContainerRef.current) return;
    drag.current = { startX: e.clientX, startLeft: scrollContainerRef.current.scrollLeft, moved: false };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    scrollContainerRef.current.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => setIsDragging(false);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -450 : 450;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="interior-strip"
      className="relative w-full bg-[#EBE6DF] text-[#1A1A1A] py-28 sm:py-36 md:py-40 overflow-hidden border-b border-[#1A1A1A]/8"
    >
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 mb-12 sm:mb-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-3">
            03 / {t.interiorStrip.heading}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A]">
            {language === "EN" ? "Tactile Craft & Atmosphere" : "Oficio Táctil y Atmósfera"}
          </h2>
          <p className="mt-3 text-[14px] font-light text-[#736E67] max-w-md">
            {t.interiorStrip.subheading}
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center space-x-6 text-[11px] tracking-[0.18em] font-light uppercase">
          <span className="hidden sm:inline text-[#736E67] text-[10.5px]">
            {t.interiorStrip.dragHint}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scrollByAmount("left")}
              aria-label="Scroll left"
              className="w-10 h-10 border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              aria-label="Scroll right"
              className="w-10 h-10 border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Strip Container */}
      <div
        ref={scrollContainerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // No data-lenis-prevent here: letting the page's smooth scroll handle the wheel keeps vertical
        // scrolling consistent over the gallery. Horizontal gestures still scroll the strip natively.
        className={`flex space-x-8 sm:space-x-12 overflow-x-auto overscroll-x-contain px-6 sm:px-10 md:px-14 lg:px-20 pb-8 no-scrollbar ${
          isDragging ? "cursor-grabbing" : "cursor-grab scroll-smooth"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {interiorDetails.map((detail, index) => (
          <div
            key={detail.id}
            className="group flex-shrink-0 w-[300px] sm:w-[420px] md:w-[480px] flex flex-col select-none"
          >
            {/* Image Tile */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#D8D2C7]">
              <Image
                src={detail.image}
                alt={detail.titleEn}
                fill
                sizes="(max-width: 768px) 300px, 480px"
                className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] font-light uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1">
                0{index + 1}
              </div>
            </div>

            {/* Label */}
            <div className="mt-5 border-t border-[#1A1A1A]/10 pt-3">
              <h3 className="text-[12.5px] sm:text-[13px] font-light tracking-[0.16em] uppercase text-[#1A1A1A] group-hover:opacity-60 transition-opacity">
                {language === "EN" ? detail.titleEn : detail.titleEs}
              </h3>
              <p className="mt-1 text-[11px] font-light tracking-[0.14em] text-[#736E67]">
                {language === "EN" ? detail.subEn : detail.subEs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
