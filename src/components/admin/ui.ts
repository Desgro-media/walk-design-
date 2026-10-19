// Shared class names for the admin panel (same palette as the public site)
export const input =
  "w-full bg-white border border-[#1A1A1A]/15 px-3 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light";
export const label = "block text-[10px] tracking-[0.2em] uppercase font-normal text-[#736E67] mb-1.5";
export const btn =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-[#F4F1EC] text-[11px] tracking-[0.2em] uppercase font-light hover:opacity-85 transition-opacity cursor-pointer disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#1A1A1A]/25 text-[#1A1A1A] text-[11px] tracking-[0.2em] uppercase font-light hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer disabled:opacity-50";
export const btnDanger =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#9B2C2C]/40 text-[#9B2C2C] text-[11px] tracking-[0.2em] uppercase font-light hover:bg-[#9B2C2C] hover:text-white transition-colors cursor-pointer";
export const card = "bg-white border border-[#1A1A1A]/10";

export const STATUS_STYLE: Record<string, string> = {
  new: "bg-[#1A1A1A] text-[#F4F1EC]",
  contacted: "bg-[#D9CFC0] text-[#1A1A1A]",
  meeting: "bg-[#C9D6D3] text-[#1A1A1A]",
  proposal: "bg-[#E2D3B3] text-[#1A1A1A]",
  won: "bg-[#B9D3B6] text-[#1A1A1A]",
  lost: "bg-[#E4C4C0] text-[#1A1A1A]",
};
