import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F4F1EC] text-[#1A1A1A] font-[family-name:var(--font-work-sans)]">{children}</div>;
}
