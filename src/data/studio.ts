export interface Service {
  id: string;
  title: string;
  heading: string;
  intro: string;
  scope: { label: string; text: string }[];
  extraTitle: string;
  extra: string;
  deliverables: string;
  closing?: { title: string; text: string };
  images: { src: string; alt: string }[];
}

export const services: Service[] = [
  {
    id: "architecture",
    images: [
      { src: "/images/works/arch-lusail-exterior.webp", alt: "Travertine residence at golden hour" },
      { src: "/images/works/arch-alwaab-facade.webp", alt: "White villa facade with palms and olive trees" },
      { src: "/images/hero/hero-01-vestibule.jpg", alt: "Timber and glass house under a eucalyptus" },
      { src: "/images/hero/hero-03-travertine-dining.jpg", alt: "Pavilion with slatted timber screen at dusk" },
      { src: "/images/interiors/interior-02-kitchen-island.jpg", alt: "Dark cantilevered volume with lit windows" },
      { src: "/images/hero/hero-07-stone-bath.jpg", alt: "Timber and black steel house with entrance court" },
      { src: "/images/hero/hero-05-courtyard-olive.jpg", alt: "Black box volume with warm glazing" },
    ],
    title: "Architecture",
    heading: "Spaces planned for the way you live",
    intro:
      "Our architectural work begins with the relationship between people and space. We study your requirements, site conditions and project priorities to develop layouts and building forms that balance daily function with a clear architectural character.",
    scope: [
      { label: "Brief development and site review", text: "understand project needs, access, orientation, context and opportunities." },
      { label: "Space planning", text: "room relationships, circulation, zoning, privacy, furniture fit and efficient use of available area." },
      { label: "Concept design", text: "initial layouts, building form, design direction and relationships between indoor and outdoor spaces." },
      { label: "Architectural development", text: "floor plans, elevations, sections and coordinated design refinements." },
      { label: "Facade design", text: "proportion, openings, shading, exterior finishes and material combinations." },
      { label: "Design visualization", text: "3D studies and presentation images to communicate space, scale and character." },
      { label: "Detailed drawings", text: "architectural details and schedules appropriate to the agreed project stage." },
      { label: "Renovation and alteration design", text: "review existing layouts and explore improvements to function and appearance." },
      { label: "Consultant coordination", text: "integrate architectural intent with structural and building-services input from appointed specialists." },
      { label: "Execution support", text: "clarify design details, review relevant samples and coordinate site queries within the appointment." },
    ],
    extraTitle: "Planning with context",
    extra:
      "We consider natural light, shade, privacy and circulation as part of a connected planning process. We also discuss your budget and maintenance expectations so that the design can be developed around practical priorities.",
    deliverables:
      "Depending on the appointment: concept plans, developed floor plans, elevations, sections, visualizations, exterior material palettes and architectural detail drawings.",
    closing: {
      title: "From concept to the next stage",
      text: "We agree the required deliverables and coordination responsibilities at the outset. Authority approvals and specialist engineering services, where required, are addressed through the appropriate appointed and authorized parties.",
    },
  },
  {
    id: "interior",
    images: [
      { src: "/images/works/villa-lusail-living.webp", alt: "Living room in travertine, oak and linen" },
      { src: "/images/works/villa-lusail-dining.webp", alt: "Lounge with linear fireplace" },
      { src: "/images/works/villa-alkhor-lounge.webp", alt: "Bedroom with upholstered headboard" },
      { src: "/images/works/villa-duhail-suite.webp", alt: "Suite with timber wall panelling" },
      { src: "/images/works/villa-uae-hall.webp", alt: "Formal reception room" },
      { src: "/images/hero/hero-02-oak-lounge.jpg", alt: "Open lounge with oak and linen" },
      { src: "/images/hero/hero-04-microcement-gallery.jpg", alt: "Living area with timber feature wall" },
      { src: "/images/interiors/interior-01-fireplace.jpg", alt: "Living room with framed gallery wall" },
      { src: "/images/interiors/interior-03-staircase.jpg", alt: "Dining area with floating stair" },
      { src: "/images/interiors/interior-04-courtyard-pivot.jpg", alt: "Kitchen island with timber joinery" },
    ],
    title: "Interior Design",
    heading: "Interiors with character, comfort and purpose",
    intro:
      "We design interiors around how a space will be used and experienced. Layout, light, proportion, texture and furniture are developed together to create rooms that feel coherent, personal and comfortable.",
    scope: [
      { label: "Interior consultation", text: "discuss your requirements, preferences, budget and possible design directions." },
      { label: "Space and furniture planning", text: "layouts that support movement, practical furniture arrangements and everyday activities." },
      { label: "Concept development", text: "mood boards, colour palettes, reference materials and the overall interior character." },
      { label: "Material selection", text: "flooring, wall finishes, stone, timber, veneers, fabrics, decorative surfaces and hardware." },
      { label: "Ceiling and lighting design intent", text: "ceiling composition, lighting atmosphere and coordinated fixture locations." },
      { label: "Custom joinery", text: "kitchens, wardrobes, vanities, wall units, storage and other fitted elements." },
      { label: "Interior detailing", text: "plans, elevations and key details for agreed areas and design elements." },
      { label: "Furniture and decorative selections", text: "furniture, feature lighting, mirrors, rugs and accessories where included." },
      { label: "Kitchen and bathroom design", text: "layouts, finishes, fittings and coordination of specialist requirements." },
      { label: "Supplier and sample coordination", text: "review proposed finishes and samples against the design intent." },
      { label: "Site and execution coordination", text: "respond to design queries and review relevant work at agreed stages." },
    ],
    extraTitle: "Material decisions, made together",
    extra:
      "We help clients compare materials by appearance, texture, suitability, care requirements and budget. Samples are reviewed as a coordinated palette so that individual choices work together across the interior.",
    deliverables:
      "Depending on the appointment: mood boards, furniture layouts, ceiling and lighting intent plans, floor finish plans, interior elevations, joinery details, material schedules and 3D visualizations. Technical electrical, mechanical and plumbing design is coordinated with the appointed specialists.",
  },
  {
    id: "landscape",
    images: [
      { src: "/images/works/landscape-courtyard.webp", alt: "Formal garden courtyard with fountain" },
      { src: "/images/works/arch-alwaab-facade.webp", alt: "Palms and olive trees at a villa entrance" },
      { src: "/images/works/arch-lusail-exterior.webp", alt: "Planted frontage with travertine paving" },
      { src: "/images/hero/hero-01-vestibule.jpg", alt: "Lawn and mature tree beside a house" },
      { src: "/images/hero/hero-07-stone-bath.jpg", alt: "Gravel court with planting" },
      { src: "/images/hero/hero-05-courtyard-olive.jpg", alt: "Courtyard planting against a dark facade" },
    ],
    title: "Landscape Design",
    heading: "Outdoor spaces that belong to the whole design",
    intro:
      "Our landscapes connect the building to its surroundings and create places for arrival, gathering, relaxation and everyday use. We bring planting and built elements together, considering how outdoor spaces look, function and change over time.",
    scope: [
      { label: "Landscape concept and zoning", text: "arrival areas, gardens, courtyards, terraces, seating and outdoor activity spaces." },
      { label: "Hardscape design", text: "paving, pathways, edging, steps, planters and other built landscape elements." },
      { label: "Softscape design", text: "a coordinated arrangement of trees, palms, shrubs, groundcovers and lawn where suitable." },
      { label: "Plant selection", text: "consider local conditions, sun exposure, mature size, water demand and maintenance needs." },
      { label: "Outdoor living", text: "seating areas, shaded spaces, pergola concepts and outdoor dining arrangements." },
      { label: "Material selection", text: "paving, stone, decking and exterior finishes suited to the intended use." },
      { label: "Landscape lighting intent", text: "identify pathways, gathering areas and planting features for lighting coordination." },
      { label: "Irrigation and drainage coordination", text: "communicate landscape requirements to appointed technical specialists." },
      { label: "Landscape drawings", text: "layout plans, planting plans, material schedules and selected details." },
      { label: "Execution support", text: "review plant and material proposals and coordinate landscape design queries during implementation." },
    ],
    extraTitle: "A considered planting approach",
    extra:
      "We select plants as part of the wider design, considering their scale, form, shade and relationship to the architecture. We discuss maintenance and irrigation expectations early so that the planting proposal reflects how the landscape will be cared for.",
    deliverables:
      "Depending on the appointment: landscape concept plans, hardscape layouts, planting plans, plant schedules, material palettes, selected details and 3D views. Pool engineering, structural design, irrigation engineering and other specialist packages are separately defined where required.",
  },
];

export const process = [
  { n: "01", title: "Discover", text: "discuss the site, requirements, style preferences, budget and intended programme." },
  { n: "02", title: "Define", text: "establish the scope, deliverables, responsibilities and design priorities." },
  { n: "03", title: "Explore", text: "develop layouts and concepts, then review them together." },
  { n: "04", title: "Develop", text: "refine the agreed direction through materials, drawings, details and visualization." },
  { n: "05", title: "Coordinate", text: "communicate design requirements to consultants, suppliers and appointed execution teams." },
  { n: "06", title: "Support execution", text: "address design queries and review relevant work or samples at agreed stages." },
];

export const founders = [
  {
    name: "Ar. Mohamed Ramshad",
    photo: "/images/founders/mohamed-ramshad-new.jpg",
    role: "Co-Founder | CEO",
    creds: "B.Arch, MMUP, Intl. Assoc. AIA, RIBA, COA",
    bio: [
      "Ar. Mohamed Ramshad is a senior architect and co-founder of WALK IN DESIGN, bringing over 13 years of experience across residential, hospitality, commercial and cultural projects. Based in Qatar, his work combines thoughtful concept design with the technical understanding needed to carry an idea through to its built form.",
      "His professional experience spans luxury residences, island resorts, mixed-use developments and public spaces in Qatar and internationally. Through senior design and coordination roles, he has developed an approach that connects architecture, interiors and landscape, with close attention to materials, proportion and detail.",
      "Ar. Mohamed Ramshad believes that successful design begins with listening — to the client, the site and the people who will use the space. His work balances a clear architectural identity with everyday comfort, creating places that respond to their surroundings and the lives within them.",
      "At WALK IN DESIGN, he brings this approach to a shared practice with co-founder Ar. Rajeena, shaping spaces that are personal, purposeful and enduring.",
    ],
  },
  {
    name: "Ar. Rajeena",
    photo: "/images/founders/rajeena-new.jpg",
    role: "Co-Founder | Design Director",
    creds: "B.Arch, MMUP, Intl. Assoc. AIA, RIBA, COA",
    bio: [
      "Ar. Rajeena is a senior architect and co-founder of WALK IN DESIGN, with over 13 years of experience in architecture, interior design and project coordination across Qatar and India. Her experience spans private villas, commercial interiors, hospitality, landscape and major infrastructure projects.",
      "Ar. Rajeena brings together creative exploration and technical precision. Her work extends from concept development and space planning to material selection, detailed design and site coordination, maintaining a close connection between the original vision and its execution.",
      "Her design approach centres on the people who inhabit a space. Through considered layouts, natural textures and carefully composed light and colour, she seeks to create environments that feel welcoming, function comfortably and reflect each client’s identity.",
      "At WALK IN DESIGN, Rajeena works alongside co-founder Ar. Mohamed Ramshad, bringing a collaborative spirit and an attentive eye for detail to the studio’s architecture and interiors.",
    ],
  },
];

export const approach = [
  { label: "Listen carefully", text: "understand the brief, priorities and expectations before developing solutions." },
  { label: "Think as a whole", text: "connect the building, its interiors and its landscape." },
  { label: "Design with purpose", text: "balance appearance with function, comfort and maintenance." },
  { label: "Resolve the details", text: "consider materials, junctions and construction coordination early." },
  { label: "Stay involved", text: "support communication between the client, designers, suppliers and execution teams within the agreed scope." },
];
