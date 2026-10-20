import { absoluteUrl, site, siteDescription } from "@/lib/site";
import { joinNames, type Owner } from "@/lib/admin/owners";

/** Structured data so Google understands the business: what it is, where it works, who runs it. */
export function JsonLd({ owners }: { owners: Owner[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#studio"),
    name: site.name,
    legalName: site.legalName,
    description: siteDescription(owners.length ? joinNames(owners) : undefined),
    slogan: site.tagline,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.ogImage),
    foundingDate: site.founded,
    // Owners appear here only while they are switched on in the admin
    ...(owners.length ? { founder: owners.map((o) => ({ "@type": "Person", name: o.name, jobTitle: o.role.replace(/\s*\|\s*/g, " & ") })) } : {}),
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: ["Architecture", "Interior design", "Landscape design", "Villa design", "Commercial interiors"],
    makesOffer: ["Architecture", "Interior Design", "Landscape Design"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, provider: { "@id": absoluteUrl("/#studio") } },
    })),
    location: site.offices.map((o) => ({
      "@type": "Place",
      name: o.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: o.locality,
        addressRegion: o.region,
        addressCountry: o.country,
      },
      telephone: o.phones,
    })),
    contactPoint: site.offices.map((o) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: o.phones[0],
      areaServed: o.country,
      availableLanguage: ["English"],
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:30",
      closes: "18:00",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
