import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "WALK IN DESIGN — Architecture, Interiors & Landscape | Qatar & India",
  description:
    "Walk In Design is a Qatar-based architecture, interior design and landscape studio founded by Ar. Mohamed Ramshad and Ar. Rajeena. Architecture, interiors and landscapes shaped around your vision.",
  keywords: [
    "Architecture",
    "Interior Design",
    "Landscape Design",
    "Qatar",
    "India",
    "Walk In Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${workSans.variable} h-full antialiased selection:bg-[#1A1A1A] selection:text-[#F4F1EC]`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F1EC] text-[#1A1A1A]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
