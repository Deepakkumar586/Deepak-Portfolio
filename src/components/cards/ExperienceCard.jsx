import React, { useState } from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

// Purple and Indigo colors
const colors = {
  purplePrimary: '#7C3AED',
  purpleLight: '#A855F7',
  indigoPrimary: '#4F46E5',
  indigoLight: '#818CF8',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255, 255, 255, 0.85)',
  whiteDim: 'rgba(255, 255, 255, 0.6)',
};

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.white};
  margin-bottom: 4px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.purpleLight};
  margin-bottom: 6px;

  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.whiteDim};

  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.whiteDim};
  margin-bottom: 15px;
  line-height: 1.6;
  
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const BulletList = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
  list-style: disc;
`;

const BulletPoint = styled.li`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.whiteDim};
  margin-bottom: 10px;
  
  &::marker {
    color: ${colors.purpleLight};
  }
  
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const Skills = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid rgba(124, 58, 237, 0.2);
`;

const SkillsTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.white};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 20px;
  color: ${colors.purpleLight};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(124, 58, 237, 0.25);
    transform: translateY(-2px);
  }
  
  @media only screen and (max-width: 768px) {
    font-size: 11px;
    padding: 3px 10px;
  }
`;

const ExpandButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.purplePrimary};
  border-radius: 6px;
  padding: 6px 14px;
  color: ${colors.purpleLight};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  
  &:hover {
    background: rgba(124, 58, 237, 0.1);
    transform: translateY(-2px);
  }
`;



const ExperienceCard = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const generateBulletPoints = (desc) => {
    if (!desc) return [];
    

    const points = desc.split(/\.(?=\s*[A-Z]|$)/);
    const cleanPoints = points
      .map(point => point.trim())
      .filter(point => point.length > 20)
      .map(point => point.endsWith('.') ? point : point + '.');
    
    return cleanPoints;
  };

  const bulletPoints = generateBulletPoints(experience.desc);
  const displayPoints = isExpanded ? bulletPoints : bulletPoints.slice(0, 3);
  const hasMorePoints = bulletPoints.length > 3;
  
  const displaySkills = isExpanded ? experience.skills : experience.skills?.slice(0, 6);
  const hasMoreSkills = experience.skills?.length > 6;

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgba(17, 25, 40, 0.95)",
        color: "#fff",
        boxShadow: "rgba(124, 58, 237, 0.15) 0px 4px 24px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
        borderRadius: "12px",
        padding: "20px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(124, 58, 237, 0.3)",
      }}
      date={experience.date}
      iconStyle={{
        background: colors.purplePrimary,
        color: "#fff",
        boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.3)",
      }}
    >
      <Top>
        <Body>
          <Role>{experience.role}</Role>
          <Company>{experience.company}</Company>
          <Date>{experience.date}</Date>
        </Body>
      </Top>

      <Description>
        {/* Bullet Points Section */}
        {bulletPoints.length > 0 && (
          <>
            <BulletList>
              {displayPoints.map((point, index) => (
                <BulletPoint key={index}>{point}</BulletPoint>
              ))}
            </BulletList>
            
            {hasMorePoints && (
              <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "− Show Less" : `+ Show More (${bulletPoints.length - 3} more)`}
              </ExpandButton>
            )}
          </>
        )}

        {/* Skills Section */}
        {experience.skills && experience.skills.length > 0 && (
          <Skills>
            <SkillsTitle>
              <span></span> Tech Stack
            </SkillsTitle>
            <ItemWrapper>
              {displaySkills.map((skill, index) => (
                <Skill key={index}>{skill}</Skill>
              ))}
              {hasMoreSkills && !isExpanded && (
                <Skill 
                  as="button"
                  onClick={() => setIsExpanded(true)}
                  style={{ cursor: 'pointer' }}
                >
                  +{experience.skills.length - 6} more
                </Skill>
              )}
            </ItemWrapper>
          </Skills>
        )}
      </Description>

      
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;