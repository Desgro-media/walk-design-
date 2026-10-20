import type { Project } from "@/data/projects";

export type CategoryKey = Project["categoryKey"];

export const CATEGORIES: Record<CategoryKey, { en: string; es: string }> = {
  architecture: { en: "ARCHITECTURE", es: "ARQUITECTURA" },
  interior: { en: "INTERIOR DESIGN", es: "INTERIORISMO" },
  landscape: { en: "LANDSCAPE", es: "PAISAJISMO" },
  commercial: { en: "COMMERCIAL INTERIOR", es: "INTERIORISMO COMERCIAL" },
};

export const LEAD_STATUSES = ["new", "contacted", "meeting", "proposal", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  service: string | null;
  scope: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  notes: string;
  follow_up: string | null;
  client_id: string | null;
}

export interface Client {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  project_ids: string[];
  notes: string;
}

// What the project editor sends to the server
export interface ProjectInput {
  id?: string; // present when editing
  title: string;
  categoryKey: CategoryKey;
  location: string;
  year: string;
  status: string;
  brief: string;
  response: string;
  materials: string;
  comingSoon: boolean;
  published: boolean;
  gallery: { src: string; w: number; h: number; hidden?: boolean }[];
}

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };
