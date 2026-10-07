"use client";

import React, { useEffect, useRef, useState } from "react";

interface Reveal3DProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds */
  delay?: number;
}

/** Folds up out of the page with perspective as it scrolls into view. */
export function Reveal3D({ children, className, delay = 0 }: Reveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown
          ? "perspective(1000px) rotateX(0deg) translateY(0)"
          : "perspective(1000px) rotateX(14deg) translateY(36px)",
        transformOrigin: "50% 100%",
        transition: `opacity 1s ease-out ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
