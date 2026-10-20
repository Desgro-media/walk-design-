// Single source of truth for SEO: change the domain/contact details here.
// Set NEXT_PUBLIC_SITE_URL (e.g. https://www.yourdomain.com) in the hosting environment once you have a custom domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.walkndesign.com").replace(/\/$/, "");

export const site = {
  name: "Walk In Design",
  legalName: "Walk In Design Studio",
  tagline: "Architecture, Interiors & Landscape",
  founded: "2025",
  ogImage: "/images/projects/architecture/architecture-01-lusail-qatar/01.webp",
  logo: "/apple-icon.png",
  offices: [
    { name: "Walk In Design — Qatar", locality: "West Bay", region: "Doha", country: "QA", phones: ["+97451753798", "+97451753799"] },
    { name: "Walk In Design — India", locality: "Tirur", region: "Malappuram, Kerala", country: "IN", phones: ["+919747397043", "+918330095919"] },
  ],
  areaServed: ["Qatar", "India", "United Arab Emirates"],
  keywords: [
    "architecture studio Qatar",
    "interior design Qatar",
    "landscape design Qatar",
    "villa design Doha",
    "architects in Qatar",
    "architects in Malappuram",
    "interior designers Kerala",
    "luxury villa interior design",
    "commercial interior design salon",
    "Walk In Design",
  ],
};

// The founders' names are only mentioned while the admin has the owners switched on
export const siteDescription = (founderNames?: string) =>
  `Walk In Design is an architecture, interior design and landscape design studio in Qatar and India${founderNames ? `, founded by ${founderNames}` : ""}. Private villas, cultural buildings and commercial interiors, designed as one connected whole.`;

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
