import Link from "next/link";
import { getAdminProjects, getClients, getLeads } from "@/lib/admin/data";
import { projectsData } from "@/data/projects";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { card } from "@/components/admin/ui";
import { LEAD_STATUSES } from "@/lib/admin/types";

export default async function Dashboard() {
  const [projects, leads, clients] = await Promise.all([getAdminProjects(), getLeads(), getClients()]);
  const today = new Date().toISOString().slice(0, 10);
  const open = leads.filter((l) => !["won", "lost"].includes(l.status));
  const due = open.filter((l) => l.follow_up && l.follow_up <= today);

  const stats = [
    { label: "Projects on site", value: projects ? projects.filter((p) => p.published).length : projectsData.length, href: "/admin/projects" },
    { label: "New leads", value: leads.filter((l) => l.status === "new").length, href: "/admin/leads?status=new" },
    { label: "Open leads", value: open.length, href: "/admin/leads" },
    { label: "Clients", value: clients.length, href: "/admin/clients" },
  ];

  return (
    <div className="max-w-5xl space-y-8">
      <h1 className="text-2xl font-light tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${card} p-5 hover:border-[#1A1A1A]/40 transition-colors`}>
            <p className="text-3xl font-light">{s.value}</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#736E67]">{s.label}</p>
          </Link>
        ))}
      </div>

      {!projects && (
        <div className={`${card} p-5 text-[14px]`}>
          Your projects are still the built-in list. <Link href="/admin/projects" className="underline">Open Projects</Link> and import them to start editing photos and names.
        </div>
      )}

      {due.length > 0 && (
        <section className={`${card} p-5`}>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#9B2C2C] mb-3">Follow-ups due ({due.length})</h2>
          <ul className="divide-y divide-[#1A1A1A]/10">
            {due.map((l) => (
              <li key={l.id}>
                <Link href={`/admin/leads/${l.id}`} className="flex justify-between py-2.5 text-[14px] hover:underline">
                  <span>{l.name}</span>
                  <span className="text-[#736E67]">{l.follow_up}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={`${card} p-5`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#736E67]">Latest enquiries</h2>
          <Link href="/admin/leads" className="text-[11px] tracking-[0.16em] uppercase underline">All leads</Link>
        </div>
        {leads.length === 0 ? (
          <p className="text-[14px] text-[#736E67]">No enquiries yet. They appear here when someone uses the contact form.</p>
        ) : (
          <ul className="divide-y divide-[#1A1A1A]/10">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id}>
                <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-4 py-3 hover:bg-[#F4F1EC]/60">
                  <span className="min-w-0">
                    <span className="block text-[14px] truncate">{l.name}</span>
                    <span className="block text-[12px] text-[#736E67] truncate">{l.service} · {new Date(l.created_at).toLocaleDateString()}</span>
                  </span>
                  <StatusBadge status={l.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-[#736E67]">
          {LEAD_STATUSES.map((s) => (
            <span key={s}>{s}: {leads.filter((l) => l.status === s).length}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
