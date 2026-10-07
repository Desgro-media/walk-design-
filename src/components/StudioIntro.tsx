"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export function StudioIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const { t, setIsStudioModalOpen } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle fade/slide-up reveal on scroll for text blocks (trigger at 80% viewport)
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        metaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio-intro"
      ref={containerRef}
      className="relative w-full bg-[#F4F1EC] text-[#1A1A1A] py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Kicker */}
        <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-12 sm:mb-16">
          {t.studioIntro.kicker}
        </p>

        {/* Large Quiet Statement Paragraph */}
        <p
          ref={textRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-light leading-[1.38] tracking-[-0.015em] text-[#1A1A1A] will-change-transform"
        >
          {t.studioIntro.statement}
        </p>

        {/* Studio Link */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
          <button
            onClick={() => setIsStudioModalOpen(true)}
            className="group inline-flex items-center space-x-3 text-[12px] sm:text-[13px] tracking-[0.2em] font-light uppercase text-[#1A1A1A] relative py-1 cursor-pointer transition-opacity duration-300 hover:opacity-50"
          >
            <span>{t.studioIntro.studioLink}</span>
            <span className="w-0 h-[1px] bg-[#1A1A1A] absolute bottom-0 left-0 transition-all duration-300 group-hover:w-full" />
          </button>
          {[
            { href: "/services", label: "SERVICES →" },
            { href: "/projects", label: "PROJECTS →" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[12px] sm:text-[13px] tracking-[0.2em] font-light uppercase text-[#1A1A1A] py-1 transition-opacity duration-300 hover:opacity-50"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Architectural Metadata Columns */}
        <div
          ref={metaRef}
          className="mt-24 sm:mt-32 pt-12 border-t border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14"
        >
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67]">
              01 / {t.studioIntro.pill1Label}
            </span>
            <p className="text-[14px] sm:text-[15px] font-light leading-relaxed text-[#1A1A1A]">
              {t.studioIntro.pill1Val}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67]">
              02 / {t.studioIntro.pill2Label}
            </span>
            <p className="text-[14px] sm:text-[15px] font-light leading-relaxed text-[#1A1A1A]">
              {t.studioIntro.pill2Val}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67]">
              03 / {t.studioIntro.pill3Label}
            </span>
            <p className="text-[14px] sm:text-[15px] font-light leading-relaxed text-[#1A1A1A]">
              {t.studioIntro.pill3Val}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
