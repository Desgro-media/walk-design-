"use client";

import React, { createContext, useContext } from "react";
import { projectsData, type Project } from "@/data/projects";
import { services } from "@/data/studio";
import type { Owner } from "@/lib/admin/owners";
import { builtInOwners } from "@/lib/admin/owners";

type ServiceImages = Record<string, { src: string; alt: string }[]>;

const builtInServiceImages: ServiceImages = Object.fromEntries(services.map((s) => [s.id, s.images]));

const ProjectsContext = createContext<Project[]>(projectsData);
const ServiceImagesContext = createContext<ServiceImages>(builtInServiceImages);
const OwnersContext = createContext<Owner[]>(builtInOwners);

// Content the admin can edit: projects, service-page photos and the owners
export function ProjectsProvider({
  projects,
  serviceImages,
  owners,
  children,
}: {
  projects: Project[];
  serviceImages: ServiceImages;
  owners: Owner[];
  children: React.ReactNode;
}) {
  return (
    <ProjectsContext.Provider value={projects}>
      <ServiceImagesContext.Provider value={serviceImages}>
        <OwnersContext.Provider value={owners}>{children}</OwnersContext.Provider>
      </ServiceImagesContext.Provider>
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}

// The owners to show on the site: empty when the admin has switched them off
export function useOwners() {
  return useContext(OwnersContext);
}

export function useServiceImages() {
  return useContext(ServiceImagesContext);
}
