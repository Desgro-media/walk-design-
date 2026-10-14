export interface OpenPosition {
  title: string;
  type: string; // e.g. "Full-time"
  location: string; // e.g. "Doha, Qatar"
  summary: string; // one or two sentences about the role
}

// Add roles here when the studio is hiring; they appear in the Careers panel next to the enquiry form.
// Leave the list empty to show "No open positions right now".
//
// Example:
//   { title: "Architect", type: "Full-time", location: "Doha, Qatar", summary: "Residential villa projects, concept to execution." },
export const openPositions: OpenPosition[] = [];

export const careersIntro =
  "Walk In Design is a young studio working across Qatar and India. When positions open, they will be listed here.";

export const careersWhatsApp = "97451753798";
