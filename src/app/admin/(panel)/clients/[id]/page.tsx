import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient, getProjectOptions } from "@/lib/admin/data";
import { ClientForm } from "@/components/admin/ClientForm";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [client, projects] = await Promise.all([getClient(id), getProjectOptions()]);
  if (!client) notFound();
  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/clients" className="text-[11px] tracking-[0.18em] uppercase underline">← All clients</Link>
      <h1 className="text-2xl font-light tracking-tight">{client.name}</h1>
      <ClientForm client={client} projects={projects} />
    </div>
  );
}
