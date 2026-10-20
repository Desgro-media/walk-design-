import { founders } from "@/data/studio";

// The owners / founders shown on the website (photo, name, role, credentials, bio)
export interface Owner {
  id: string;
  name: string;
  role: string;
  creds: string;
  photo: string;
  bio: string[];
  hidden?: boolean;
}

export interface Owners {
  enabled: boolean;
  items: Owner[];
}

export const OWNERS_ITEMS_KEY = "owners";
export const OWNERS_ENABLED_KEY = "owners-enabled";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// What the site shows until the admin saves its own list
export const builtInOwners: Owner[] = founders.map((f) => ({ id: slug(f.name), ...f, bio: [...f.bio] }));

const plain = (name: string) => name.replace(/^Ar\.?\s*/i, "").trim();

// "Ar. Mohamed Ramshad and Ar. Rajeena" as entered, or without the "Ar." title for running text
export function joinNames(owners: Owner[], withoutTitle = false) {
  const names = owners.map((o) => (withoutTitle ? plain(o.name) : o.name));
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : (names[0] ?? "");
}
