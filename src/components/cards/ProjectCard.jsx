import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: rgba(17, 25, 40, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(124, 58, 237, 0.5);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 280px; /* Increased from 200px */
  overflow: hidden;
  position: relative;
  border-radius: 0 0 20px 20px; /* Radius on bottom left and bottom right */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 0 0 20px 20px; /* Radius on bottom corners */
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || '#FFFFFF'};
  margin: 0;
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || 'rgba(255, 255, 255, 0.7)'};
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(124, 58, 237, 0.1);
  color: #C084FC;
  border: 1px solid rgba(124, 58, 237, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  width: 100%;
`;

const Button = styled.a`
  flex: 1 1 auto;
  min-width: 100px;
  text-align: center;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${({ variant }) => variant === "demo" ? `
    background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
    }
  ` : variant === "github" ? `
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(124, 58, 237, 0.3);
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: rgba(124, 58, 237, 0.1);
      border-color: rgba(124, 58, 237, 0.6);
      transform: translateY(-2px);
    }
  ` : `
    background: rgba(124, 58, 237, 0.15);
    border: 1px solid rgba(124, 58, 237, 0.4);
    color: #C084FC;
    
    &:hover {
      background: rgba(124, 58, 237, 0.25);
      border-color: rgba(124, 58, 237, 0.8);
      transform: translateY(-2px);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

const ProjectCard = ({ project, setOpenModal }) => {
  const handleCardClick = () => {
    setOpenModal({ state: true, project: project });
  };

  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    if (action === 'details') {
      setOpenModal({ state: true, project: project });
    }
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageWrapper>
        <Image src={project.image} alt={project.title} />
        <TypeBadge>{project.type || 'Project'}</TypeBadge>
      </ImageWrapper>
      
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description.slice(0, 120)}...</Description>
        
        <Tags>
          {project.tags?.slice(0, 3).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          {project.tags?.length > 3 && (
            <Tag>+{project.tags.length - 3}</Tag>
          )}
        </Tags>
        
        <ButtonGroup>
          {project.github && (
            <Button 
              href={project.github} 
              target="_blank" 
              variant="github"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Code
            </Button>
          )}
          {project.webapp && (
            <Button 
              href={project.webapp} 
              target="_blank" 
              variant="demo"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </Button>
          )}
          <Button 
            variant="details"
            onClick={(e) => handleButtonClick(e, 'details')}
          >
            Details
          </Button>
        </ButtonGroup>
      </Content>
    </Card>
  );
};

export default ProjectCard;