import { saveClient, deleteClient } from "@/lib/admin/actions";
import type { Client } from "@/lib/admin/types";
import { btn, btnDanger, card, input, label } from "./ui";

export function ClientForm({ client, projects }: { client?: Client; projects: { id: string; label: string }[] }) {
  const field = (name: keyof Client, text: string, type = "text") => (
    <div>
      <label htmlFor={name} className={label}>{text}</label>
      <input id={name} name={name} type={type} defaultValue={(client?.[name] as string | null) ?? ""} required={name === "name"} className={input} />
    </div>
  );
  return (
    <div className="space-y-6">
      <form action={saveClient.bind(null, client?.id ?? null)} className={`${card} p-5 sm:p-6 space-y-5`}>
        <div className="grid sm:grid-cols-2 gap-5">
          {field("name", "Name *")}
          {field("company", "Company")}
          {field("email", "Email", "email")}
          {field("phone", "Phone", "tel")}
          <div className="sm:col-span-2">{field("location", "Location")}</div>
        </div>
        <fieldset>
          <legend className={label}>Projects for this client</legend>
          <div className="max-h-56 overflow-y-auto border border-[#1A1A1A]/10 p-3 grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[13px]">
            {projects.map((p) => (
              <label key={p.id} className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" name="project_ids" value={p.id} defaultChecked={client?.project_ids.includes(p.id)} className="mt-1" />
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="notes" className={label}>Notes</label>
          <textarea id="notes" name="notes" rows={5} defaultValue={client?.notes ?? ""} className={input} />
        </div>
        <button className={btn}>{client ? "Save client" : "Create client"}</button>
      </form>
      {client && (
        <form action={deleteClient.bind(null, client.id)}>
          <button className={btnDanger}>Delete client</button>
        </form>
      )}
    </div>
  );
}
