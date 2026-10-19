import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-light tracking-tight">New project</h1>
      <ProjectEditor />
    </div>
  );
}
