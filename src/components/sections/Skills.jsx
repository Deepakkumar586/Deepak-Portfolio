import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";

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
  black: '#0A0A0A',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 30px;
  background: ${colors.black};
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 12px;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${colors.white};
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${colors.whiteDim};
  max-width: 700px;
  margin-bottom: 50px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 30px;
  justify-content: center;
`;

const SkillCard = styled.div`
  width: 100%;
  max-width: 550px;
  background: rgba(17, 25, 40, 0.95);
    color: rgb(255, 255, 255);
    box-shadow: rgba(124, 58, 237, 0.15) 0px 4px 24px;
    /* backdrop-filter: blur(10px); */
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${colors.purplePrimary},
      ${colors.indigoPrimary},
      ${colors.purplePrimary}
    );

    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    border-color: ${colors.purplePrimary};
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.2);
    background: rgba(124, 58, 237, 0.08);
  }

  &:hover::before {
    transform: scaleX(1);
  }


  @media (max-width: 768px) {
    max-width: 500px;
    padding: 24px;
  }

  @media (max-width: 500px) {
    max-width: 100%;
    padding: 20px;
  }
`;

const SkillTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: ${colors.white};
  background-clip: text;
  position: relative;
  display: inline-block;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 25px;
  }
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 10px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.whiteMuted};
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 50px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(124, 58, 237, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 100px;
  
  &:hover {
    background: rgba(124, 58, 237, 0.15);
    border-color: ${colors.purpleLight};
    color: ${colors.white};
    box-shadow: 0 5px 15px rgba(124, 58, 237, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
    gap: 10px;
    min-width: 90px;
  }
  
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 8px 16px;
    gap: 8px;
    min-width: 80px;
  }
`;

const SkillImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 60px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
`;

const Skills = () => {
  const floatingIcons = [
    { icon: "💻", top: "10%", left: "5%" },
    { icon: "⚡", top: "20%", right: "8%" },
    { icon: "🚀", bottom: "15%", left: "10%" },
    { icon: "🎨", bottom: "25%", right: "12%" },
    { icon: "📱", top: "50%", left: "3%" },
    { icon: "🔧", bottom: "40%", right: "5%" },
  ];

  return (
    <Container id="Skills">
      <Wrapper>
        <Title>
          Technical Skills
        </Title>
        
        <Desc>
          A collection of technologies and tools I have actively used in building 
          real-world web applications, continuously improving my development and 
          problem-solving abilities over the past 1.5+ years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <SkillCard key={index}>
              <SkillTitle>
                {skill.title}
              </SkillTitle>
              <SkillList>
                {skill.skills.map((item, idx) => (
                  <SkillItem key={idx}>
                    {item.image && (
                      <SkillImage 
                        src={item.image} 
                        alt={item.name}
                      />
                    )}
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillsContainer>
      </Wrapper>

      {floatingIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          {item.icon}
        </FloatingIcon>
      ))}
    </Container>
  );
};

export default Skills;