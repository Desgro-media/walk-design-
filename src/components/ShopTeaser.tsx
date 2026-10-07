"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const shopItems = [
  {
    id: "item-01",
    nameEn: "PLINTH TABLE 01 — TRAVERTINE",
    nameEs: "MESA PLINTO 01 — TRAVERTINO",
    materialEn: "Honed Tivoli Travertine • Monolithic block",
    materialEs: "Travertino Tivoli Apomazado • Bloque monolítico",
    editionEn: "EDITION OF 12",
    editionEs: "EDICIÓN DE 12",
    image: "/images/shop/shop-01-travertine-table.jpg",
  },
  {
    id: "item-02",
    nameEn: "SALON CHAIR 02 — OAK & LINEN",
    nameEs: "BUTACA SALÓN 02 — ROBLE & LINO",
    materialEn: "Solid European Oak • Natural Belgian Linen",
    materialEs: "Roble Europeo Macizo • Lino Belga Natural",
    editionEn: "MADE TO ORDER",
    editionEs: "BAJO PEDIDO",
    image: "/images/shop/shop-02-linen-lounge.jpg",
  },
  {
    id: "item-03",
    nameEn: "WALL SCONCE 03 — CAST BRONZE",
    nameEs: "APLIQUE 03 — BRONCE FUNDIDO",
    materialEn: "Lost-wax cast bronze • Hand-patinated finish",
    materialEs: "Bronce a la cera perdida • Pátina artesanal",
    editionEn: "EDITION OF 25",
    editionEs: "EDICIÓN DE 25",
    image: "/images/shop/shop-03-bronze-sconce.jpg",
  },
  {
    id: "item-04",
    nameEn: "VESSEL 04 — FLUTED CERAMIC",
    nameEs: "VASIJA 04 — CERÁMICA ESTRIADA",
    materialEn: "Wheel-thrown terracotta • Mineral chalk glaze",
    materialEs: "Terracota al torno • Esmalte mineral mate",
    editionEn: "UNIQUE PIECES",
    editionEs: "PIEZAS ÚNICAS",
    image: "/images/shop/shop-04-stone-vessel.jpg",
  },
];

export function ShopTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language, t, setIsContactModalOpen } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      id="shop-teaser"
      ref={containerRef}
      className="relative w-full bg-[#F4F1EC] text-[#1A1A1A] py-28 sm:py-36 md:py-40 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-3">
              04 / {t.shop.heading}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A]">
              {language === "EN" ? "Spatial Objects & Editions" : "Objetos Espaciales y Ediciones"}
            </h2>
            <p className="mt-3 text-[14px] font-light text-[#736E67] max-w-md">
              {t.shop.subheading}
            </p>
          </div>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="group inline-flex items-center space-x-2 text-[12px] tracking-[0.2em] uppercase font-light text-[#1A1A1A] relative py-1 cursor-pointer transition-opacity duration-300 hover:opacity-50"
          >
            <span>{language === "EN" ? "ACQUIRE PIECE →" : "ADQUIRIR PIEZA →"}</span>
            <span className="w-0 h-[1px] bg-[#1A1A1A] absolute bottom-0 left-0 transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* Product Grid: 4 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {shopItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              onClick={() => setIsContactModalOpen(true)}
              className="group flex flex-col cursor-pointer select-none"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#E8E3DC]">
                <Image
                  src={item.image}
                  alt={item.nameEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 text-[9px] tracking-[0.22em] font-light uppercase text-[#1A1A1A] bg-[#F4F1EC]/85 px-2 py-0.5 border border-[#1A1A1A]/10 backdrop-blur-xs">
                  {language === "EN" ? item.editionEn : item.editionEs}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex flex-col space-y-1 border-t border-[#1A1A1A]/10 pt-3">
                <h3 className="text-[12px] font-light tracking-[0.16em] uppercase text-[#1A1A1A] group-hover:opacity-60 transition-opacity">
                  {language === "EN" ? item.nameEn : item.nameEs}
                </h3>
                <p className="text-[11px] font-light text-[#736E67]">
                  {language === "EN" ? item.materialEn : item.materialEs}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-light text-[#1A1A1A] group-hover:underline">
                    {t.shop.inquire} →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
