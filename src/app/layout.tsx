import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { JsonLd } from "@/components/JsonLd";
import { site, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Walk In Design — Architecture, Interiors & Landscape | Qatar & India",
    template: "%s | Walk In Design",
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: site.founders.map((f) => ({ name: f.name })),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: "Walk In Design — Architecture, Interiors & Landscape | Qatar & India",
    description: site.description,
    images: [{ url: site.ogImage, width: 1672, height: 941, alt: "Contemporary villa by Walk In Design in Lusail, Qatar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walk In Design — Architecture, Interiors & Landscape",
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
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
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
