"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ImageRailProps {
  images: { src: string; alt: string }[];
}

/** Sideways-scrolling image strip: black and white, colour on hover, drag with mouse, swipe on touch. */
export function ImageRail({ images }: ImageRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !railRef.current) return;
    drag.current = { startX: e.clientX, startLeft: railRef.current.scrollLeft };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !railRef.current) return;
    railRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => setIsDragging(false);

  return (
    <div className="relative sm:pr-10">
      <div
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`flex gap-2 sm:gap-3 overflow-x-auto overscroll-x-contain pb-3 no-scrollbar select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab scroll-smooth snap-x snap-proximity"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <div
            key={img.src + i}
            className="group relative shrink-0 snap-start w-[78%] sm:w-[46%] lg:w-[36%] aspect-[4/3] overflow-hidden bg-[#E8E5E0]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              draggable={false}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 460px"
              className="object-cover [filter:grayscale(1)] [@media(hover:none)]:[filter:grayscale(0)] transition-[filter,transform] duration-300 ease-linear group-hover:[filter:grayscale(0)] group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
