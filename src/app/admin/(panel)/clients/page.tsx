import Link from "next/link";
import { getClients } from "@/lib/admin/data";
import { btn, card } from "@/components/admin/ui";

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-light tracking-tight">Clients</h1>
        <Link href="/admin/clients/new" className={btn}>+ New client</Link>
      </div>
      {clients.length === 0 ? (
        <div className={`${card} p-8 text-center text-[14px] text-[#736E67]`}>
          No clients yet. Add one, or convert a lead once they hire you.
        </div>
      ) : (
        <ul className={`${card} divide-y divide-[#1A1A1A]/10`}>
          {clients.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/clients/${c.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-[#F4F1EC]/60">
                <span className="min-w-0">
                  <span className="block text-[15px] truncate">{c.name}{c.company ? ` · ${c.company}` : ""}</span>
                  <span className="block text-[12px] text-[#736E67] truncate">{[c.email, c.phone, c.location].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="text-[12px] text-[#736E67] whitespace-nowrap">{c.project_ids.length} project{c.project_ids.length === 1 ? "" : "s"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
