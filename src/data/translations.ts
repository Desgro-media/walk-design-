export type Language = "EN" | "ES";

export interface Translations {
  nav: {
    architecture: string;
    interiorDesign: string;
    shop: string;
    studio: string;
    news: string;
    contact: string;
  };
  hero: {
    scrollPrompt: string;
    spaces: string[];
  };
  studioIntro: {
    kicker: string;
    statement: string;
    studioLink: string;
    pill1Label: string;
    pill1Val: string;
    pill2Label: string;
    pill2Val: string;
    pill3Label: string;
  };
  projects: {
    heading: string;
    subheading: string;
    all: string;
    architecture: string;
    interior: string;
    landscape: string;
    viewProject: string;
    closeDossier: string;
    status: string;
    location: string;
    year: string;
    typology: string;
    materials: string;
  };
  interiorStrip: {
    heading: string;
    subheading: string;
    dragHint: string;
  };
  shop: {
    heading: string;
    subheading: string;
    viewAll: string;
    edition: string;
    inquire: string;
  };
  news: {
    heading: string;
    subheading: string;
    readMore: string;
  };
  footer: {
    inquirePrompt: string;
    inquireCta: string;
    dohaStudio: string;
    indiaStudio: string;
    madridAtelier: string;
    hoursTitle: string;
    hours: string;
    backToTop: string;
    rights: string;
  };
  contactModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    serviceLabel: string;
    scopeLabel: string;
    messageLabel: string;
    submitBtn: string;
    submitting: string;
    successMsg: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav: {
      architecture: "ARCHITECTURE",
      interiorDesign: "INTERIOR DESIGN",
      shop: "SHOP",
      studio: "STUDIO",
      news: "NEWS",
      contact: "CONTACT",
    },
    hero: {
      scrollPrompt: "SCROLL TO EXPLORE SPACES",
      spaces: [
        "01 / 07 — ATRIUM & MONOLITHIC TRAVERTINE",
        "02 / 07 — RAW OAK PANELING & LINEN SALON",
        "03 / 07 — FLUTED STONE & DINING LOGGIA",
        "04 / 07 — GREIGE MICROCEMENT GALLERY",
        "05 / 07 — INNER COURTYARD & OLIVE LEAF",
        "06 / 07 — BEDROOM SANCTUARY & NATURAL LINEN",
        "07 / 07 — HONED LIMESTONE BATH PAVILION",
      ],
    },
    studioIntro: {
      kicker: "01 / HOME",
      statement:
        "We believe good design begins with understanding — of people, place and the ways we live. Combining clean architectural forms with warmth and carefully considered detail, we create places where life feels at home.",
      studioLink: "DISCOVER THE STUDIO →",
      pill1Label: "OUR APPROACH",
      pill1Val: "Natural light, tactile materials and balanced proportions",
      pill2Label: "LOCATION",
      pill2Val: "Qatar & India • Established 2025",
      pill3Label: "CO-FOUNDERS & PRINCIPAL ARCHITECTS",
    },
    projects: {
      heading: "SELECTED WORKS",
      subheading: "A catalogue of built quietude, monolithic volume, and tactile proportion.",
      all: "ALL",
      architecture: "ARCHITECTURE",
      interior: "INTERIOR DESIGN",
      landscape: "LANDSCAPE",
      viewProject: "VIEW DOSSIER",
      closeDossier: "CLOSE",
      status: "STATUS",
      location: "LOCATION",
      year: "YEAR",
      typology: "TYPOLOGY",
      materials: "KEY MATERIALS",
    },
    interiorStrip: {
      heading: "MATERIAL ATMOSPHERES",
      subheading: "Curated studies in fluted travertine, smoked oak, raw linen, and mineral plaster.",
      dragHint: "DRAG OR SCROLL HORIZONTALLY",
    },
    shop: {
      heading: "COLLECTION 01 — ELEMENTS",
      subheading: "Limited architectural editions, sculptural stone plinths, and bespoke salon furniture.",
      viewAll: "ACQUIRE PIECE",
      edition: "LIMITED EDITION",
      inquire: "INQUIRE OBJECT",
    },
    news: {
      heading: "DISPATCHES & MONOGRAPHS",
      subheading: "Essays on tectonic stillness, published works, and academic lectures.",
      readMore: "READ ESSAY",
    },
    footer: {
      inquirePrompt: "LET’S TALK ABOUT YOUR SPACE",
      inquireCta: "SEND PROJECT ENQUIRY",
      dohaStudio: "QATAR",
      indiaStudio: "INDIA",
      madridAtelier: "",
      hoursTitle: "OFFICE HOURS",
      hours: "Sunday — Thursday / 8.30am — 6.00pm",
      backToTop: "BACK TO TOP ↑",
      rights: "© 2026 WALK IN DESIGN STUDIO. ALL RIGHTS RESERVED.",
    },
    contactModal: {
      title: "LET’S TALK ABOUT YOUR SPACE",
      subtitle: "Whether you are planning a new building, reworking an interior or creating an outdoor space, we would be pleased to hear about your project. Share your ideas and requirements with us to begin the conversation.",
      nameLabel: "NAME",
      emailLabel: "EMAIL",
      phoneLabel: "TELEPHONE OR WHATSAPP",
      locationLabel: "PROJECT LOCATION",
      serviceLabel: "SERVICE REQUIRED",
      scopeLabel: "APPROXIMATE AREA / BUDGET RANGE (OPTIONAL)",
      messageLabel: "PROJECT DESCRIPTION",
      submitBtn: "SEND PROJECT ENQUIRY",
      submitting: "SENDING...",
      successMsg: "Thank you for contacting Walk In Design Studio. Your enquiry has been received, and we will be in touch to discuss your project.",
    },
  },
  ES: {
    nav: {
      architecture: "ARQUITECTURA",
      interiorDesign: "INTERIORISMO",
      shop: "OBJETOS",
      studio: "ESTUDIO",
      news: "NOTICIAS",
      contact: "CONTACTO",
    },
    hero: {
      scrollPrompt: "DESLIZAR PARA EXPLORAR",
      spaces: [
        "01 / 07 — ATRIO & TRAVERTINO MONOLÍTICO",
        "02 / 07 — PANELES DE ROBLE & SALÓN DE LINO",
        "03 / 07 — PIEDRA ACANALADA & LOGIA COMEDOR",
        "04 / 07 — GALERÍA EN MICROCEMENTO GREIGE",
        "05 / 07 — PATIO INTERIOR & HOJA DE OLIVO",
        "06 / 07 — SANTUARIO DORMITORIO & LINO NATURAL",
        "07 / 07 — PABELLÓN DE BAÑO EN PIEDRA CALIZA",
      ],
    },
    studioIntro: {
      kicker: "01 / FILOSOFÍA DE PRÁCTICA",
      statement:
        "Creemos que el buen diseño nace del entendimiento — de las personas, el lugar y las formas serenas en que habitamos el espacio. Combinando contención arquitectónica con una materialidad cálida y táctil, esculpimos espacios que se sienten personales, intencionados y perdurables.",
      studioLink: "DESCUBRIR EL ESTUDIO →",
      pill1Label: "INTENCIÓN TECTÓNICA",
      pill1Val: "Restricción esencial & luz natural serena",
      pill2Label: "ALCANCE GEOGRÁFICO",
      pill2Val: "Catar & India • Fundado en 2025",
      pill3Label: "FUNDADORES Y DIRECTORES",
    },
    projects: {
      heading: "PROYECTOS SELECCIONADOS",
      subheading: "Un catálogo de quietud construida, volumen monolítico y proporción táctil.",
      all: "TODOS",
      architecture: "ARQUITECTURA",
      interior: "INTERIORISMO",
      landscape: "PAISAJISMO",
      viewProject: "VER EXPEDIENTE",
      closeDossier: "CERRAR",
      status: "ESTADO",
      location: "UBICACIÓN",
      year: "AÑO",
      typology: "TIPOLOGÍA",
      materials: "MATERIALES CLAVE",
    },
    interiorStrip: {
      heading: "ATMÓSFERAS MATERIALES",
      subheading: "Estudios curatoriales en travertino acanalado, roble ahumado, lino crudo y cal mineral.",
      dragHint: "ARRASTRAR O DESLIZAR HORIZONTALMENTE",
    },
    shop: {
      heading: "COLECCIÓN 01 — ELEMENTOS",
      subheading: "Ediciones arquitectónicas limitadas, plintos de piedra y mobiliario a medida.",
      viewAll: "ADQUIRIR PIEZA",
      edition: "EDICIÓN LIMITADA",
      inquire: "CONSULTAR OBJETO",
    },
    news: {
      heading: "CRÓNICAS Y MONOGRAFÍAS",
      subheading: "Ensayos sobre quietud tectónica, proyectos publicados y ponencias académicas.",
      readMore: "LEER ENSAYO",
    },
    footer: {
      inquirePrompt: "HABLEMOS SOBRE SU ESPACIO",
      inquireCta: "INICIAR UN PROYECTO",
      dohaStudio: "CATAR",
      indiaStudio: "INDIA",
      madridAtelier: "",
      hoursTitle: "HORARIO DE ESTUDIO",
      hours: "Domingo — Jueves / 8.30 — 18.00",
      backToTop: "VOLVER ARRIBA ↑",
      rights: "© 2026 WALK IN DESIGN STUDIO. TODOS LOS DERECHOS RESERVADOS.",
    },
    contactModal: {
      title: "INICIAR CONSULTA DE PROYECTO",
      subtitle: "Comparta su visión espacial con nuestros directores. Tratamos cada encargo con dedicación personalizada.",
      nameLabel: "NOMBRE Y APELLIDOS",
      emailLabel: "CORREO ELECTRÓNICO",
      phoneLabel: "TELÉFONO / WHATSAPP",
      locationLabel: "UBICACIÓN DEL PROYECTO",
      serviceLabel: "SERVICIO SOLICITADO",
      scopeLabel: "SUPERFICIE APROXIMADA / PRESUPUESTO",
      messageLabel: "MEMORIA Y ASPIRACIONES DEL PROYECTO",
      submitBtn: "ENVIAR SOLICITUD",
      submitting: "ENVIANDO...",
      successMsg: "Gracias por contactar con Walk In Design. Su consulta ha sido recibida con éxito. Nos pondremos en contacto con usted a la brevedad.",
    },
  },
};
