import { STATUS_STYLE } from "./ui";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase ${STATUS_STYLE[status] ?? "bg-[#EBE6DF]"}`}>
      {status}
    </span>
  );
}
