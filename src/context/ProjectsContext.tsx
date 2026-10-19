"use client";

import React, { createContext, useContext } from "react";
import { projectsData, type Project } from "@/data/projects";

const ProjectsContext = createContext<Project[]>(projectsData);

export function ProjectsProvider({ projects, children }: { projects: Project[]; children: React.ReactNode }) {
  return <ProjectsContext.Provider value={projects}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  return useContext(ProjectsContext);
}
