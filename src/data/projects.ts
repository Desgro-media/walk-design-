export interface Project {
  id: string;
  title: string;
  titleEs: string;
  category: string;
  categoryEs: string;
  categoryKey: "architecture" | "interior" | "landscape";
  location: string;
  locationEs: string;
  year: string;
  area: string;
  status: string;
  statusEs: string;
  image: string;
  gallery: string[];
  materials: string;
  materialsEs: string;
  brief: string;
  briefEs: string;
  response: string;
  responseEs: string;
  aspect?: string; // for asymmetric masonry sizing
  comingSoon?: boolean; // shown grayscale with a "Coming soon" overlay, not clickable
}

export const projectsData: Project[] = [
  {
    id: "villa-lusail",
    title: "VILLA LUSAIL",
    titleEs: "VILLA LUSAIL",
    category: "ARCHITECTURE & INTERIOR",
    categoryEs: "ARQUITECTURA E INTERIORISMO",
    categoryKey: "architecture",
    location: "Lusail Marina, Qatar",
    locationEs: "Marina de Lusail, Catar",
    year: "2024",
    area: "1,450 m²",
    status: "Completed",
    statusEs: "Completado",
    image: "/images/works/villa-lusail-living.webp",
    gallery: [
      "/images/works/villa-lusail-living.webp",
      "/images/works/villa-lusail-dining.webp",
      "/images/works/arch-lusail-exterior.webp",
      "/images/hero/hero-02-oak-lounge.jpg",
    ],
    materials: "Tivoli Roman Travertine, Bleached White Oak, Greige Microcement",
    materialsEs: "Travertino Romano Tivoli, Roble Blanco Blanqueado, Microcemento Greige",
    brief:
      "A private family villa requiring an atmosphere of total architectural quietude, natural daylight, and deeply shaded thresholds protected from the desert sun.",
    briefEs:
      "Una villa unifamiliar privada que requería una atmósfera de sosiego arquitectónico total, luz natural diurna y umbrales en sombra protegidos del sol del desierto.",
    response:
      "We conceived a monolithic stone envelope organized around quiet internal atriums. Tactile surfaces and custom fluted joinery ground every space in warmth and proportion.",
    responseEs:
      "Concebimos una envolvente pétrea monolítica articulada en torno a serenos atrios interiores. Las superficies táctiles y la ebanistería estriada dotan a cada estancia de calidez y proporción.",
    aspect: "tall",
  },
  {
    id: "casa-travertino",
    title: "CASA TRAVERTINO",
    titleEs: "CASA TRAVERTINO",
    category: "ARCHITECTURE",
    categoryEs: "ARQUITECTURA",
    categoryKey: "architecture",
    location: "Al Rayyan, Qatar",
    locationEs: "Al Rayyan, Catar",
    year: "2024",
    area: "1,180 m²",
    status: "Completed",
    statusEs: "Completado",
    image: "/images/hero/hero-01-vestibule.jpg",
    gallery: [
      "/images/hero/hero-01-vestibule.jpg",
      "/images/hero/hero-03-travertine-dining.jpg",
      "/images/interiors/interior-02-kitchen-island.jpg",
    ],
    materials: "Navona Travertine, Raw Cast Bronze, Textured Mineral Plaster",
    materialsEs: "Travertino Navona, Bronce Fundido Crudo, Yeso Mineral Texturizado",
    brief:
      "An exploration into monolithic stone massing, continuous horizontal sightlines, and sculptural transitions of shadow across double-height volumes.",
    briefEs:
      "Una exploración de la volumetría pétrea monolítica, visuales horizontales continuas y transiciones escultóricas de sombra a través de dobles alturas.",
    response:
      "Sculpted from massive travertine blocks with recessed clerestory glass that washes walls with soft ambient light throughout the shifting day.",
    responseEs:
      "Esculpida en bloques masivos de travertino con claraboyas continuas que bañan los paramentos con una luz rasante suave durante el transcurso del día.",
    aspect: "wide",
  },
  {
    id: "al-khor-residence",
    title: "AL KHOR RESIDENCE",
    titleEs: "RESIDENCIA AL KHOR",
    category: "INTERIOR DESIGN",
    categoryEs: "INTERIORISMO",
    categoryKey: "interior",
    location: "Al Khor Coast, Qatar",
    locationEs: "Costa de Al Khor, Catar",
    year: "2023",
    area: "890 m²",
    status: "Completed",
    statusEs: "Completado",
    image: "/images/works/villa-alkhor-lounge.webp",
    gallery: [
      "/images/works/villa-alkhor-lounge.webp",
      "/images/interiors/interior-01-fireplace.jpg",
      "/images/hero/hero-06-linen-sanctuary.jpg",
    ],
    materials: "Smoked Oak Paneling, Natural Belgian Linen, Fluted Pietra Serena",
    materialsEs: "Panelado de Roble Ahumado, Lino Belga Natural, Pietra Serena Estriada",
    brief:
      "Complete interior architecture for a coastal residence emphasizing acoustic softness, understated luxury, and tactile material purity.",
    briefEs:
      "Arquitectura interior integral para una residencia costera con énfasis en la suavidad acústica, el lujo sobrio y la pureza material táctil.",
    response:
      "Integrated floor-to-ceiling timber joinery hides technical utilities, while low-slung linen furniture invites relaxed contemplation.",
    responseEs:
      "Ebanistería integrada de suelo a techo que oculta las instalaciones técnicas, mientras el mobiliario bajo de lino invita a una pausa sosegada.",
    aspect: "tall",
  },
  {
    id: "pavilion-duhail",
    title: "PAVILION DUHAIL",
    titleEs: "PABELLÓN DUHAIL",
    category: "LANDSCAPE & ARCHITECTURE",
    categoryEs: "PAISAJISMO Y ARQUITECTURA",
    categoryKey: "landscape",
    location: "Duhail, Qatar",
    locationEs: "Duhail, Catar",
    year: "2024",
    area: "1,600 m²",
    status: "Completed",
    statusEs: "Completado",
    image: "/images/hero/hero-05-courtyard-olive.jpg",
    gallery: [
      "/images/hero/hero-05-courtyard-olive.jpg",
      "/images/works/landscape-courtyard.webp",
      "/images/works/villa-duhail-suite.webp",
    ],
    materials: "Cream Limestone Pavers, Centuries-old Olive Tree, Charred Accoya",
    materialsEs: "Pavimento de Caliza Crema, Olivo Centenario, Madera Accoya Quemada",
    brief:
      "Fusing indoor living quarters with an outdoor sanctuary garden resilient to regional climate, offering contemplative water surfaces and shaded groves.",
    briefEs:
      "Integrar las estancias interiores con un jardín santuario exterior resistente al clima, con láminas de agua contemplativas y sombras perennes.",
    response:
      "Colonnaded limestone walkways surround a peaceful reflection courtyard centered on a sculptural green olive tree, breaking the mineral monochrome with vibrant organic life.",
    responseEs:
      "Paseos columnados en piedra caliza rodean un patio de reflexión centrado en un olivo escultural, rompiendo el monocromo mineral con vida vegetal serena.",
    aspect: "wide",
  },
  {
    id: "atelier-al-waab",
    title: "ATELIER AL WAAB",
    titleEs: "ATELIER AL WAAB",
    category: "ARCHITECTURE",
    categoryEs: "ARQUITECTURA",
    categoryKey: "architecture",
    location: "Al Waab, Qatar",
    locationEs: "Al Waab, Catar",
    year: "2025",
    area: "1,320 m²",
    status: "Under Construction",
    statusEs: "En Construcción",
    image: "/images/works/arch-alwaab-facade.webp",
    gallery: [
      "/images/works/arch-alwaab-facade.webp",
      "/images/hero/hero-04-microcement-gallery.jpg",
      "/images/interiors/interior-03-staircase.jpg",
    ],
    materials: "Cast White Concrete, Fluted Travertine, Smoked Grey Glass",
    materialsEs: "Hormigón Blanco Visto, Travertino Acanalado, Vidrio Gris Ahumado",
    brief:
      "A sculptural private residence exploring monolithic geometric volumes, deep privacy screens, and rhythmic facade apertures.",
    briefEs:
      "Residencia unifamiliar escultural que explora volúmenes geométricos puros, pantallas de privacidad y celosías rítmicas de fachada.",
    response:
      "Generous cantilevers provide passive shade while framing private courtyards and skylit gallery hallways finished in warm microcement.",
    responseEs:
      "Generosos voladizos proporcionan sombra pasiva mientras enmarcan patios privados y galerías cenitales revestidas en microcemento cálido.",
    aspect: "tall",
  },
  {
    id: "desert-sanctuary",
    title: "DESERT SANCTUARY",
    titleEs: "SANTUARIO DEL DESIERTO",
    category: "INTERIOR DESIGN",
    categoryEs: "INTERIORISMO",
    categoryKey: "interior",
    location: "Emirates Hills, UAE",
    locationEs: "Emirates Hills, EAU",
    year: "2025",
    area: "1,750 m²",
    status: "Completed",
    statusEs: "Completado",
    image: "/images/works/villa-uae-hall.webp",
    gallery: [
      "/images/works/villa-uae-hall.webp",
      "/images/hero/hero-07-stone-bath.jpg",
      "/images/interiors/interior-05-bathroom-niche.jpg",
    ],
    materials: "Honed Iranian Travertine, Hand-patinated Bronze, Raw Linen Drapery",
    materialsEs: "Travertino Iraní Apomazado, Bronce Envejecido a Mano, Lino Crudo",
    brief:
      "Grand interior architecture designed around understated monumental symmetry, tactile warmth, and peaceful residential intimacy.",
    briefEs:
      "Arquitectura interior noble diseñada en torno a la simetría monumental serena, la calidez táctil y la intimidad residencial.",
    response:
      "Monolithic fireplaces, fluted stone portals, and custom textured joinery deliver an unbroken sense of timeless architectural harmony.",
    responseEs:
      "Chimeneas monolíticas, portales de piedra estriada y carpintería artesanal texturizada aportan una armonía espacial serena y atemporal.",
    aspect: "wide",
  },
];
