import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "./constant";
import ProjectCard from "./ProjectCard";

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : theme.card};
  color: ${({ active, theme }) => (active ? "#fff" : theme.text_secondary)};
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
`;

const ProjectsSection = ({ setOpenModal }) => {
  const [activeTab, setActiveTab] = useState("company");

  const filteredProjects = projects.filter(
    (p) => p.type === activeTab
  );
   // ✅ debug here
  console.log("all projects:", projects);
  console.log("filtered projects:", filteredProjects);

  return (
    <div>
      {/* Tabs */}
     

      {/* Project Cards */}
      <Grid>
        
        {filteredProjects.map((project, i) => (
            
          <ProjectCard key={i} project={project} setOpenModal={setOpenModal} />
        ))}
      </Grid>
    </div>
  );
};

export default ProjectsSection;
