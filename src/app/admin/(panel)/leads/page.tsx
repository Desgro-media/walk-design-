import Link from "next/link";
import { getLeads } from "@/lib/admin/data";
import { LEAD_STATUSES } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { card } from "@/components/admin/ui";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status, q } = await searchParams;
  const all = await getLeads();
  const needle = q?.toLowerCase().trim();
  const leads = all.filter(
    (l) =>
      (!status || l.status === status) &&
      (!needle || [l.name, l.email, l.phone, l.location, l.message].some((v) => v?.toLowerCase().includes(needle)))
  );

  const tab = (active: boolean) =>
    `px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase border ${active ? "bg-[#1A1A1A] text-[#F4F1EC] border-[#1A1A1A]" : "border-[#1A1A1A]/20 hover:border-[#1A1A1A]"}`;

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-2xl font-light tracking-tight">Leads</h1>
      <p className="text-[13px] text-[#736E67]">Every enquiry from the website contact form lands here.</p>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/admin/leads" className={tab(!status)}>All ({all.length})</Link>
        {LEAD_STATUSES.map((s) => (
          <Link key={s} href={`/admin/leads?status=${s}`} className={tab(status === s)}>
            {s} ({all.filter((l) => l.status === s).length})
          </Link>
        ))}
        <form className="ml-auto">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q} placeholder="Search…" className="bg-white border border-[#1A1A1A]/15 px-3 py-1.5 text-[13px] w-44" />
        </form>
      </div>

      {leads.length === 0 ? (
        <div className={`${card} p-8 text-center text-[14px] text-[#736E67]`}>No leads here.</div>
      ) : (
        <ul className={`${card} divide-y divide-[#1A1A1A]/10`}>
          {leads.map((l) => (
            <li key={l.id}>
              <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-[#F4F1EC]/60">
                <span className="min-w-0">
                  <span className="block text-[15px] truncate">{l.name}</span>
                  <span className="block text-[12px] text-[#736E67] truncate">
                    {[l.service, l.location, new Date(l.created_at).toLocaleDateString()].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <StatusBadge status={l.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
