import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "./constant";
import ProjectCard from "./ProjectCard";

const Container = styled.div`
  padding: 40px 20px;
  background: ${({ theme }) => theme.bg || '#0A0A0A'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 700;
  background: linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary || 'rgba(255, 255, 255, 0.7)'};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 32px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  background: ${({ active, theme }) => 
    active ? 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ active }) => active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  border: ${({ active }) => 
    active ? 'none' : '1px solid rgba(124, 58, 237, 0.3)'};
  
  &:hover {
    background: ${({ active }) => 
      active ? 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)' : 'rgba(124, 58, 237, 0.15)'};
    color: #fff;
    transform: translateY(-2px);
    border-color: ${({ active }) => 
      active ? 'transparent' : 'rgba(124, 58, 237, 0.6)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 16px;
  padding: 16px 24px;
  text-align: center;
  min-width: 150px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    min-width: 120px;
  }
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #7C3AED 0%, #C084FC 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.2);
  
  h3 {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 12px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
  }
`;

const ProjectsSection = ({ setOpenModal }) => {
  const [activeTab, setActiveTab] = useState("FullStack");

  // Filter projects based on active tab - handle undefined or null types
  const filteredProjects = projects.filter((p) => {
    if (!p.type) return false; // Skip projects without type
    return p.type.toLowerCase() === activeTab.toLowerCase();
  });

  // Calculate stats - only count projects with valid types
  const fullStackCount = projects.filter(p => p.type?.toLowerCase() === "fullstack").length;
  const frontendCount = projects.filter(p => p.type?.toLowerCase() === "frontend").length;
  const totalValidProjects = fullStackCount + frontendCount;

  // Debug logging
  console.log("All projects:", projects.map(p => ({ title: p.title, type: p.type })));
  console.log("FullStack count:", fullStackCount);
  console.log("Frontend count:", frontendCount);
  console.log("Filtered projects for", activeTab, ":", filteredProjects.length);

  const tabs = [
    { id: "FullStack", label: "Full Stack", icon: "", count: fullStackCount },
    { id: "Frontend", label: "Frontend", icon: "", count: frontendCount }
  ];

  return (
    <Container id="projects">
      <Wrapper>
        <Header>
          <Title>Featured Projects</Title>
          <Subtitle>
            A showcase of my recent work including full-stack applications 
            and frontend projects built with modern technologies
          </Subtitle>
        </Header>

        <StatsContainer>
          <StatCard>
            <StatNumber>{totalValidProjects}</StatNumber>
            <StatLabel>Total Projects</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{fullStackCount}</StatNumber>
            <StatLabel>Full Stack Apps</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{frontendCount}</StatNumber>
            <StatLabel>Frontend Apps</StatLabel>
          </StatCard>
        </StatsContainer>

        <TabsContainer>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
              <span style={{ 
                marginLeft: '8px', 
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(124,58,237,0.2)',
                padding: '2px 8px',
                borderRadius: '20px',
                fontSize: '12px'
              }}>
                {tab.count}
              </span>
            </TabButton>
          ))}
        </TabsContainer>

        {filteredProjects.length > 0 ? (
          <Grid>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id || index} 
                project={project} 
                setOpenModal={setOpenModal}
              />
            ))}
          </Grid>
        ) : (
          <EmptyState>
            <h3>No projects found</h3>
            <p>Try switching tabs or check back soon for more projects!</p>
          </EmptyState>
        )}
      </Wrapper>
    </Container>
  );
};

export default ProjectsSection;