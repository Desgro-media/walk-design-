"use client";

import React, { useRef } from "react";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
}

const canTilt = () =>
  window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tilts toward the pointer in 3D. Disabled on touch devices and for reduced-motion users. */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 120ms ease-out";
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale3d(1.02,1.02,1.02)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
