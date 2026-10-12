"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Real project photos, one per scroll step: [project id, which photo of its gallery, horizontal focus %]
// The focus keeps the main subject (entrance, fireplace, fountain, pool...) in view when a phone crops the photo
const HERO_PICKS: [string, number, number][] = [
  ["architecture-01-lusail-qatar", 0, 47],
  ["interior-01-lusail-qatar", 0, 50],
  ["landscape-01-al-waab-qatar", 0, 50],
  ["architecture-06-al-waab-qatar", 0, 50],
  ["interior-07-al-kheesa-qatar", 0, 50],
  ["landscape-03-al-khor-qatar", 0, 50],
  ["interior-02-al-rayyan-qatar", 0, 50],
];

const heroImages = HERO_PICKS.map(([id, photo, focus], i) => {
  const project = projectsData.find((p) => p.id === id);
  if (!project) throw new Error(`Hero project not found: ${id}`);
  const n = `${String(i + 1).padStart(2, "0")} / ${String(HERO_PICKS.length).padStart(2, "0")}`;
  const label = `${n} — ${project.category} · ${project.location}`.toUpperCase();
  return {
    src: project.gallery[photo].src,
    focus,
    alt: `${project.title}, ${project.location}`,
    roomEn: label,
    roomEs: `${n} — ${project.categoryEs} · ${project.locationEs}`.toUpperCase(),
  };
});

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const innerImages = imageInnerRefs.current.filter(Boolean) as HTMLDivElement[];
      const count = slides.length;

      // Master scrubbed timeline across the 450vh container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const index = Math.min(
              count - 1,
              Math.floor(self.progress * count)
            );
            setActiveRoomIndex(index);
          },
        },
      });

      // Initially set slide 0 visible, others 0
      gsap.set(slides[0], { opacity: 1, zIndex: 1 });
      for (let i = 1; i < count; i++) {
        gsap.set(slides[i], { opacity: 0, zIndex: i + 1 });
      }

      // Each photo holds for most of its turn, then crossfades quickly into the next one
      // (long crossfades made two photos overlap, like a double exposure, at almost every scroll position)
      const SLOT = 2; // timeline units per photo
      const HOLD = 1.5; // still time before the next crossfade starts
      const FADE = 0.5; // crossfade length

      slides.forEach((slide, i) => {
        if (i === 0) return;

        const timeSlot = (i - 1) * SLOT + HOLD;

        // Next photo fades in over the previous one
        tl.to(slide, { opacity: 1, ease: "power1.inOut", duration: FADE }, timeSlot);

        // Subtle slow cinematic camera push (1.04 to 1.0)
        if (innerImages[i]) {
          tl.fromTo(
            innerImages[i],
            { scale: 1.04 },
            { scale: 1.0, ease: "power1.out", duration: SLOT },
            timeSlot
          );
        }

        // Once the new photo is fully opaque, drop the one underneath (saves compositing work)
        if (slides[i - 1]) {
          tl.to(slides[i - 1], { opacity: 0, duration: 0.05 }, timeSlot + FADE);
        }
      });

      // Let the last photo hold before the pinned section ends
      tl.to({}, { duration: HOLD }, (count - 2) * SLOT + HOLD + FADE);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-[450svh] bg-[#121110]"
      aria-label="Walkthrough Architectural Image Sequence"
    >
      {/* Sticky Full-Viewport Viewport (100vh) */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden select-none">
        {heroImages.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              slidesRef.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full will-change-[opacity,transform]"
            style={{
              opacity: index === 0 ? 1 : 0,
            }}
          >
            <div
              ref={(el) => {
                imageInnerRefs.current[index] = el;
              }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index < 2}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: `${image.focus}% 50%` }}
                quality={90}
              />
              {/* Warm architectural atmospheric grading overlay */}
              <div className="absolute inset-0 bg-[#1A1816]/15 pointer-events-none" />
              {/* Subtle film grain tone */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25 pointer-events-none" />
            </div>
          </div>
        ))}

        {/* Minimal Quiet Room Indicator & Scroll Hint — pinned at bottom corners, pure & non-intrusive */}
        <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-10 md:left-14 right-20 sm:right-52 z-20 flex justify-between items-end pointer-events-none text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          {/* Left: Active Room Progression */}
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] sm:text-[11px] tracking-[0.24em] font-light uppercase transition-all duration-500">
              {language === "EN"
                ? heroImages[activeRoomIndex]?.roomEn
                : heroImages[activeRoomIndex]?.roomEs}
            </span>
            <div className="w-24 sm:w-36 h-[1px] bg-white/25 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: `${((activeRoomIndex + 1) / heroImages.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Right: Scroll Prompt */}
          <div className="hidden sm:flex items-center space-x-3 text-[10.5px] tracking-[0.22em] font-light uppercase text-white/70">
            <span>{t.hero.scrollPrompt}</span>
            <span className="inline-block animate-bounce text-xs">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
