import { getAdminOwners } from "@/lib/owners";
import { OwnersSwitch } from "@/components/admin/OwnersSwitch";
import { OwnersEditor } from "@/components/admin/OwnersEditor";

export default async function OwnersPage() {
  const { enabled, items } = await getAdminOwners();
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight">Owners</h1>
        <p className="mt-1 text-[13px] text-[#736E67]">
          The owners’ names, photos and details shown on the website (Studio panel and home page). Use the switch to hide or show all of it.
        </p>
      </div>
      <OwnersSwitch enabled={enabled} />
      <OwnersEditor initial={items} />
    </div>
  );
}
