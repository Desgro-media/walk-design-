import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead } from "@/lib/admin/data";
import { convertLeadToClient, deleteLead } from "@/lib/admin/actions";
import { LeadEditor } from "@/components/admin/LeadEditor";
import { btn, btnDanger, card } from "@/components/admin/ui";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  const rows: [string, string | null][] = [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Location", lead.location],
    ["Service", lead.service],
    ["Scope", lead.scope],
    ["Received", new Date(lead.created_at).toLocaleString()],
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/leads" className="text-[11px] tracking-[0.18em] uppercase underline">← All leads</Link>
      <h1 className="text-2xl font-light tracking-tight">{lead.name}</h1>

      <section className={`${card} p-5 sm:p-6 space-y-4`}>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
          {rows.filter(([, v]) => v).map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[#736E67]">{k}</dt>
              <dd className="break-words">
                {k === "Email" ? <a className="underline" href={`mailto:${v}`}>{v}</a> : k === "Phone" ? <a className="underline" href={`tel:${v}`}>{v}</a> : v}
              </dd>
            </div>
          ))}
        </dl>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#736E67] mb-1">Message</p>
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{lead.message}</p>
        </div>
      </section>

      <LeadEditor id={lead.id} status={lead.status} notes={lead.notes} followUp={lead.follow_up} />

      <div className="flex flex-wrap gap-3">
        {lead.client_id ? (
          <Link href={`/admin/clients/${lead.client_id}`} className={btn}>View client</Link>
        ) : (
          <form action={convertLeadToClient.bind(null, lead.id)}>
            <button className={btn}>Convert to client</button>
          </form>
        )}
        <form action={deleteLead.bind(null, lead.id)} className="ml-auto">
          <button className={btnDanger}>Delete lead</button>
        </form>
      </div>
    </div>
  );
}
