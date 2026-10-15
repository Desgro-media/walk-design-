"use client";

import React, { useState } from "react";
import { services, process } from "@/data/studio";
import { useLanguage } from "@/context/LanguageContext";
import { ImageRail } from "@/components/ImageRail";
import { Reveal3D } from "@/components/Reveal3D";

export function ServicesSection() {
  const [activeId, setActiveId] = useState(services[0].id);
  const { setIsContactModalOpen } = useLanguage();
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF8F5] text-[#1A1A1A] py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-[#1A1A1A]/8"
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-4">
          02 / SERVICES
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight max-w-3xl">
          One vision, inside and out
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#736E67]">
          A well-designed space should feel connected: the way you arrive, move through its rooms and step into the
          landscape beyond. We consider architecture, interiors and outdoor spaces together, creating a consistent
          design language while responding to your priorities, lifestyle and budget.
        </p>

        {/* Tabs */}
        <div role="tablist" className="mt-14 flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-3 border-b border-[#1A1A1A]/10">
          {services.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activeId}
              onClick={() => setActiveId(s.id)}
              className={`pb-4 -mb-px text-[12px] tracking-[0.2em] uppercase font-light cursor-pointer border-b transition-colors ${
                s.id === activeId
                  ? "border-[#1A1A1A] text-[#1A1A1A]"
                  : "border-transparent text-[#736E67] hover:text-[#1A1A1A]"
              }`}
            >
              <span className="sm:hidden">{s.title.split(" ")[0]}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active service: a row of images */}
        <div className="mt-10" key={`rail-${active.id}`}>
          <ImageRail images={active.images} />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" key={active.id}>
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight">{active.heading}</h3>
            <p className="mt-5 text-[15px] font-light leading-relaxed text-[#1A1A1A]/85">{active.intro}</p>

            <div className="mt-10">
              <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">
                {active.extraTitle}
              </span>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-[#1A1A1A]/85">{active.extra}</p>
            </div>

            <div className="mt-8">
              <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">
                Typical deliverables
              </span>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-[#1A1A1A]/85">{active.deliverables}</p>
            </div>

            {active.closing && (
              <div className="mt-8">
                <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block">
                  {active.closing.title}
                </span>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-[#1A1A1A]/85">{active.closing.text}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[#736E67] block mb-4">
              Scope of services
            </span>
            <ul className="border-t border-[#1A1A1A]/10">
              {active.scope.map((item) => (
                <li key={item.label} className="py-4 border-b border-[#1A1A1A]/10 text-[14px] font-light leading-relaxed">
                  <span className="font-normal">{item.label}</span>
                  <span className="text-[#736E67]">: {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div id="process" className="mt-28 sm:mt-36 pt-14 border-t border-[#1A1A1A]/10">
          <p className="text-[11px] tracking-[0.24em] uppercase font-light text-[#736E67] mb-4">
            03 / OUR PROCESS
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
            A clear path from brief to execution
          </h3>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A]/10 border border-[#1A1A1A]/10">
            {process.map((step, i) => (
              <Reveal3D key={step.n} delay={(i % 3) * 0.1} className="bg-[#FAF8F5] p-6 sm:p-8">
                <span className="text-[11px] tracking-[0.22em] text-[#A9876B] font-mono">
                  {step.n} / {step.title.toUpperCase()}
                </span>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-[#1A1A1A]/85">
                  {step.text.charAt(0).toUpperCase() + step.text.slice(1)}
                </p>
              </Reveal3D>
            ))}
          </div>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="mt-12 inline-flex items-center space-x-3 text-[12px] tracking-[0.22em] font-light uppercase px-8 py-4 border border-[#1A1A1A]/30 hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
          >
            <span>Send Project Enquiry</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
