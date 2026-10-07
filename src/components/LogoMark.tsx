import React from "react";

// Walk In Design door mark, traced from public/images/brand/mark-color.png
export const MARK_FRAME = "#4A543B";
export const MARK_PANEL = "#8B957D";

export const MARK_FRAME_PATH = "M387 711 V250 L632 100 V631";
export const MARK_PANEL_POINTS = "693,219 785,269 785,709 693,657";

interface LogoMarkProps {
  className?: string;
  frameColor?: string;
  panelColor?: string;
}

/** Static mark. The panel eases toward the frame while a parent `group` is hovered. */
export function LogoMark({ className, frameColor = MARK_FRAME, panelColor = MARK_PANEL }: LogoMarkProps) {
  return (
    <svg viewBox="370 80 440 645" className={className} aria-hidden="true" fill="none">
      <path
        d={MARK_FRAME_PATH}
        stroke={frameColor}
        strokeWidth="20"
        strokeLinejoin="miter"
        style={{ transition: "stroke 500ms" }}
      />
      <polygon
        points={MARK_PANEL_POINTS}
        fill={panelColor}
        className="[transform-box:fill-box] origin-left transition-transform duration-500 ease-out group-hover:scale-x-[0.6]"
        style={{ transition: "fill 500ms, transform 500ms" }}
      />
    </svg>
  );
}
