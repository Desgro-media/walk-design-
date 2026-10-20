"use client";

import React, { createContext, useContext } from "react";
import { projectsData, type Project } from "@/data/projects";
import { services } from "@/data/studio";

type ServiceImages = Record<string, { src: string; alt: string }[]>;

const builtInServiceImages: ServiceImages = Object.fromEntries(services.map((s) => [s.id, s.images]));

const ProjectsContext = createContext<Project[]>(projectsData);
const ServiceImagesContext = createContext<ServiceImages>(builtInServiceImages);

// Content the admin can edit: the project list and the photos on each service page
export function ProjectsProvider({
  projects,
  serviceImages,
  children,
}: {
  projects: Project[];
  serviceImages: ServiceImages;
  children: React.ReactNode;
}) {
  return (
    <ProjectsContext.Provider value={projects}>
      <ServiceImagesContext.Provider value={serviceImages}>{children}</ServiceImagesContext.Provider>
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}

export function useServiceImages() {
  return useContext(ServiceImagesContext);
}
