"use client";

import React from "react";
import { careersIntro, careersWhatsApp, openPositions } from "@/data/careers";

const waLink = (text: string) => `https://wa.me/${careersWhatsApp}?text=${encodeURIComponent(text)}`;

/** Careers block shown beside / below the enquiry form. `onDark` = light text for the dimmed backdrop. */
export function CareersPanel({ onDark = false }: { onDark?: boolean }) {
  const text = onDark ? "text-[#F4F1EC]" : "text-[#1A1A1A]";
  const muted = onDark ? "text-[#F4F1EC]/85" : "text-[#736E67]";
  const line = onDark ? "border-[#F4F1EC]/20" : "border-[#1A1A1A]/10";
  const btn = onDark
    ? "border-[#F4F1EC]/40 hover:bg-[#F4F1EC] hover:text-[#141312]"
    : "border-[#1A1A1A]/30 hover:bg-[#1A1A1A] hover:text-[#F4F1EC]";

  return (
    <section aria-labelledby="careers-heading" className={text}>
      <p className={`text-[10px] tracking-[0.24em] uppercase font-light ${muted}`}>Careers</p>
      <h3 id="careers-heading" className="mt-3 text-2xl md:text-3xl font-light tracking-tight">
        Join the studio
      </h3>
      <p className={`mt-4 text-[14px] font-light leading-relaxed ${muted}`}>{careersIntro}</p>

      <div className={`mt-8 border-t ${line} pt-6`}>
        <p className={`text-[10px] tracking-[0.24em] uppercase font-light ${muted}`}>Open positions</p>

        {openPositions.length === 0 ? (
          <p className="mt-3 text-[14px] font-light leading-relaxed">No open positions right now. New roles will be listed here.</p>
        ) : (
          <ul className="mt-2">
            {openPositions.map((p) => (
              <li key={p.title} className={`py-4 border-b ${line} last:border-b-0`}>
                <p className="text-[15px] font-normal">{p.title}</p>
                <p className={`mt-0.5 text-[11px] tracking-[0.14em] uppercase ${muted}`}>
                  {p.type} · {p.location}
                </p>
                <p className="mt-2 text-[13.5px] font-light leading-relaxed">{p.summary}</p>
                <a
                  href={waLink(`Hello Walk In Design, I'd like to apply for the ${p.title} position.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-block border px-4 py-2 text-[10.5px] tracking-[0.2em] uppercase font-light transition-colors ${btn}`}
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`mt-8 border-t ${line} pt-6`}>
        <p className={`text-[13.5px] font-light leading-relaxed ${muted}`}>
          Interested in future roles? Send us a message with your portfolio and CV.
        </p>
        <a
          href={waLink("Hello Walk In Design, I'd like to be considered for future openings.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-block border px-5 py-3 text-[11px] tracking-[0.22em] uppercase font-light transition-colors ${btn}`}
        >
          Get in touch on WhatsApp →
        </a>
      </div>
    </section>
  );
}
