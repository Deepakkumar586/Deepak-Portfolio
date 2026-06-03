import React, { useState } from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

// Purple and Indigo colors
const colors = {
  purplePrimary: '#7C3AED',
  purpleLight: '#A855F7',
  purpleExtraLight: '#C084FC',
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
  gap: 16px;
  align-items: center;
`;

const Image = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.purplePrimary};
  transition: all 0.3s ease;
  background: ${colors.purplePrimary};

  &:hover {
    transform: scale(1.05);
    border-color: ${colors.purpleLight};
  }

  @media only screen and (max-width: 768px) {
    height: 55px;
    width: 55px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 6px;
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.purpleLight};
  margin-bottom: 6px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.whiteDim};
  margin-bottom: 4px;

  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const GradeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 20px;
  padding: 6px 14px;
  margin: 8px 0;
  width: fit-content;
  
  @media only screen and (max-width: 768px) {
    padding: 4px 12px;
  }
`;

const GradeLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.purpleLight};
  
  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const GradeValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.white};
  
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.whiteDim};
  margin-top: 8px;
  line-height: 1.6;
  text-align: justify;

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
  margin-bottom: 8px;
  
  &::marker {
    color: ${colors.purpleLight};
  }
  
  @media only screen and (max-width: 768px) {
    font-size: 12px;
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

const EducationCard = ({ education }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate bullet points from description
  const generateBulletPoints = (desc) => {
    if (!desc) return [];
    
    const points = desc.split(/\.(?=\s*[A-Z]|$)/);
    const cleanPoints = points
      .map(point => point.trim())
      .filter(point => point.length > 20)
      .map(point => point.endsWith('.') ? point : point + '.');
    
    return cleanPoints;
  };

  const bulletPoints = generateBulletPoints(education.desc);
  const displayPoints = isExpanded ? bulletPoints : bulletPoints.slice(0, 3);
  const hasMorePoints = bulletPoints.length > 3;

  return (
    <VerticalTimelineElement
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgba(17, 25, 40, 0.95)",
        color: "#fff",
        boxShadow: "rgba(124, 58, 237, 0.15) 0px 4px 24px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(124, 58, 237, 0.25)",
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.3s ease",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(124, 58, 237, 0.4)",
      }}
      date={education.date}
      iconStyle={{
        background: `linear-gradient(135deg, ${colors.purplePrimary}, ${colors.indigoPrimary})`,
        color: "#fff",
        boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.3)",
      }}
    >
      <Top>
        <Image src={education.img} alt={education.school} />
        <Body>
          <Name>{education.school}</Name>
          <Degree>{education.degree}</Degree>
          <Date>{education.date}</Date>
        </Body>
      </Top>
      
      <GradeWrapper>
        <GradeLabel>
          {education.grade ? "Grade" : " Percentage"}:
        </GradeLabel>
        <GradeValue>
          {education.grade ? education.grade : education.percentage}
        </GradeValue>
      </GradeWrapper>
      
      <Description>
        {bulletPoints.length > 0 ? (
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
        ) : (
          <span>{education.desc}</span>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default EducationCard;