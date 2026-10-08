"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MARK_FRAME, MARK_FRAME_PATH, MARK_PANEL, MARK_PANEL_POINTS } from "@/components/LogoMark";

const SEEN_KEY = "wid-intro-seen";

// Footprints lying flat on the ground, walking diagonally from the left toward the open door (viewBox units)
const WALK_ANGLE = 18; // degrees, direction of travel on screen
const PRINT_COUNT = 10;
const STEPS = Array.from({ length: PRINT_COUNT }, (_, i) => {
  const t = i / (PRINT_COUNT - 1);
  const a = (WALK_ANGLE * Math.PI) / 180;
  const side = i % 2 === 0 ? -1 : 1; // alternate left / right foot
  const x = 0 + t * 760 - side * Math.sin(a) * 15;
  const y = 548 + t * 236 + side * Math.cos(a) * 15;
  return { x, y, r: WALK_ANGLE + side * 4, s: 1.15 + t * 0.4 };
});

/** Intro splash: the door frame draws itself, then the door swings open, then the page is revealed. */
export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<SVGPathElement>(null);
  const panelRef = useRef<SVGPolygonElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Visit /?intro to replay the animation at any time
    const forced = new URLSearchParams(window.location.search).has("intro");
    if ((seen && !forced) || reduced) {
      // Hide without a state update; the node is removed on the next navigation-free render
      if (overlayRef.current) overlayRef.current.style.display = "none";
      return;
    }

    document.body.style.overflow = "hidden";
    let tl: gsap.core.Timeline | undefined;
    let cancelled = false;

    const done = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      document.body.style.overflow = "";
      gsap.ticker.lagSmoothing(0); // restore the site-wide setting (see SmoothScroll)
      setVisible(false);
    };

    const play = () => {
      if (cancelled) return;
      // While the page is still busy, never let the animation jump ahead of what has been painted
      gsap.ticker.lagSmoothing(200, 16);
      gsap.set(frameRef.current, { strokeDasharray: 1, strokeDashoffset: 1.05 });
      // svgOrigin pins the swing to the door's hinge edge (x=693 in viewBox units)
      gsap.set(panelRef.current, { scaleX: 0, opacity: 0, svgOrigin: "693 450" });
      gsap.set(nameRef.current, { opacity: 0, y: 8 });
      gsap.set(stepRefs.current, { opacity: 0 });
      gsap.set(stageRef.current, { transformPerspective: 1200, rotateY: -32, rotateX: 12, scale: 0.92 });

      const STEP_GAP = 0.45; // seconds between steps
      const LAST_LAND = (STEPS.length - 1) * STEP_GAP + 0.3;

      tl = gsap
        .timeline({ onComplete: done })
        // 1. frame draws on
        .to(frameRef.current, { strokeDashoffset: 0, duration: 2, ease: "sine.inOut" })
        // 2. door swings open from the frame
        .to(panelRef.current, { scaleX: 1, opacity: 1, duration: 1.5, ease: "sine.inOut" }, "-=0.3")
        .addLabel("walk", "-=0.9")
        // 3. footprints land one at a time at full strength...
        .to(stepRefs.current, { opacity: 1, duration: 0.3, ease: "power2.out", stagger: STEP_GAP }, "walk")
        // 4. ...and each one erases itself a moment after it lands
        .to(stepRefs.current, { opacity: 0, duration: 1, ease: "sine.inOut", stagger: STEP_GAP }, `walk+=${1.1}`)
        // 5. name appears once the last step has landed
        .to(nameRef.current, { opacity: 1, y: 0, duration: 1.1, ease: "sine.out" }, `walk+=${LAST_LAND}`)
        // 6. hold, then reveal the page
        .to(overlayRef.current, { opacity: 0, duration: 1.1, ease: "sine.inOut" }, `walk+=${LAST_LAND + 2.4}`)
        // 3D camera sweep runs alongside everything: starts angled, settles face-on
        .to(stageRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 6, ease: "sine.inOut" }, 0);
    };

    // Start only after the page has finished loading and painted, so the first seconds aren't lost to jank
    const start = () => requestAnimationFrame(() => requestAnimationFrame(play));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      tl?.kill();
      gsap.ticker.lagSmoothing(0);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4F1EC]"
    >
      <div ref={stageRef} style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
      <svg viewBox="-60 80 880 740" className="h-64 sm:h-80 w-auto" fill="none">
        <path
          ref={frameRef}
          d={MARK_FRAME_PATH}
          pathLength={1}
          stroke={MARK_FRAME}
          strokeWidth="20"
          strokeLinejoin="miter"
          style={{ strokeDasharray: 1, strokeDashoffset: 1.05 }}
        />
        {STEPS.map((st, i) => (
          <g
            key={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            transform={`translate(${st.x} ${st.y}) rotate(${st.r}) scale(${st.s})`}
            fill={MARK_FRAME}
            style={{ opacity: 0 }}
          >
            {/* flat shoe print: sole ahead, heel behind, squashed for perspective */}
            <ellipse cx="14" cy="0" rx="21" ry="9.5" />
            <ellipse cx="-22" cy="0" rx="9" ry="7" />
          </g>
        ))}
        <polygon
          ref={panelRef}
          points={MARK_PANEL_POINTS}
          fill={MARK_PANEL}
          style={{ opacity: 0 }}
        />
      </svg>
      </div>
      <p ref={nameRef} className="mt-10 text-[18px] sm:text-[26px] tracking-[0.45em] uppercase font-light text-[#4A543B] opacity-0">
        Walk In Design
      </p>
    </div>
  );
}
