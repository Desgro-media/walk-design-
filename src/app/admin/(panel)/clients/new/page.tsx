import { getProjectOptions } from "@/lib/admin/data";
import { ClientForm } from "@/components/admin/ClientForm";

export default async function NewClientPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-light tracking-tight">New client</h1>
      <ClientForm projects={await getProjectOptions()} />
    </div>
  );
}
