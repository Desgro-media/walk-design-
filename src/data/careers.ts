export interface OpenPosition {
  title: string;
  type: string; // e.g. "Full-time"
  location: string; // e.g. "Doha, Qatar"
  summary: string; // one or two sentences about the role
}

// Add roles here when the studio is hiring; they appear in the Careers panel next to the enquiry form.
// Leave the list empty to show the "no open positions" message.
//
// Example:
//   { title: "Architect", type: "Full-time", location: "Doha, Qatar", summary: "Residential villa projects, concept to execution." },
export const openPositions: OpenPosition[] = [];

export const careersHeading = "Design your future with us.";

export const careersIntro =
  "At Walk In Design Studio, we create thoughtful spaces through architecture, interior design, and landscape design. We welcome creative people who share our passion for design, detail, and collaboration.";

export const noPositionsText = "There are no open positions at the moment. Future opportunities will be listed here.";

export const careersCta =
  "Interested in joining our team? Share your CV and portfolio for consideration for future opportunities.";

export const careersWhatsApp = "97451753798";
