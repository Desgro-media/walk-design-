import { absoluteUrl, site } from "@/lib/site";

/** Structured data so Google understands the business: what it is, where it works, who runs it. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#studio"),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.ogImage),
    foundingDate: site.founded,
    founder: site.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
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
