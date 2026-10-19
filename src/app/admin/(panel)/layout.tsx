import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { dbConfigured } from "@/lib/admin/db";
import { logout } from "@/lib/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="md:w-56 shrink-0 bg-[#1A1A1A] text-[#F4F1EC] md:min-h-screen p-5 flex md:flex-col gap-4 md:gap-8 items-center md:items-stretch justify-between md:justify-start">
        <div>
          <p className="text-[10px] tracking-[0.24em] uppercase text-[#F4F1EC]/60">Walk In Design</p>
          <p className="text-lg font-light">Studio admin</p>
        </div>
        <AdminNav />
        <div className="md:mt-auto flex md:flex-col gap-2 text-[11px] tracking-[0.18em] uppercase">
          <Link href="/" target="_blank" className="text-[#F4F1EC]/70 hover:text-white">View site ↗</Link>
          <form action={logout}>
            <button className="text-[#F4F1EC]/70 hover:text-white uppercase tracking-[0.18em] cursor-pointer">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10">
        {!dbConfigured() ? (
          <div role="alert" className="mb-6 border border-[#9B2C2C]/40 bg-[#F6E7E4] p-4 text-[13px]">
            The database isn’t connected yet, so nothing can be saved. Set DATABASE_URL in the environment and run npm run db:setup.
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
