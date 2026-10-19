import { notFound } from "next/navigation";
import { getAdminProject } from "@/lib/admin/data";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getAdminProject(id);
  if (!row) notFound();
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-light tracking-tight">Edit project</h1>
      <ProjectEditor project={row.project} published={row.published} />
    </div>
  );
}
