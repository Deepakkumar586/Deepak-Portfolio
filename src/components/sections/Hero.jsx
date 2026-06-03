import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroBgAnimation from "../HeroBgAnimation";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";

// Purple and Indigo color palette
const colors = {
  black: '#0A0A0A',
  purpleDark: '#2E1065',
  purplePrimary: '#7C3AED',
  purpleLight: '#A855F7',
  purpleExtraLight: '#C084FC',
  indigoDark: '#1E1B4B',
  indigoPrimary: '#4F46E5',
  indigoLight: '#818CF8',
  indigoExtraLight: '#A5B4FC',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255, 255, 255, 0.85)',
  whiteDim: 'rgba(255, 255, 255, 0.6)',
};

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 30px;
  background: ${colors.black};
  min-height: 90vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, ${colors.purpleDark} 0%, ${colors.black} 70%);
    opacity: 0.4;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  gap: 60px;

  @media (max-width: 1024px) {
    gap: 40px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  @media (max-width: 968px) {
    align-items: center;
    text-align: center;
  }
`;

const RightContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  
  @media (max-width: 968px) {
    justify-content: center;
    order: -1;
    margin-top: 20px;
  }@media (max-width: 768px) {
   display: none;
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 30px;
  color: ${colors.purpleLight};
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 28px;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 640px) {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

const Title = styled(motion.h1)`
  font-weight: 800;
  font-size: clamp(38px, 8vw, 40px);
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  color: ${colors.white};
  
  .purple-text {
    color: ${colors.purpleLight};
  }
  
  .indigo-text {
    color: ${colors.indigoLight};
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 600;
  margin-bottom: 20px;
  color: ${colors.whiteMuted};
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(15px, 3.5vw, 16px);
  line-height: 1.7;
  margin-bottom: 30px;
  color: ${colors.whiteDim};
  max-width: 500px;
  
  @media (max-width: 968px) {
    max-width: 100%;
    text-align: center;
  }
`;

const ExperienceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 40px;
  padding: 8px 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(124, 58, 237, 0.2);
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const ExpIcon = styled.div`
  width: 10px;
  height: 10px;
  background: ${colors.purpleLight};
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ExpText = styled.span`
  color: ${colors.whiteMuted};
  font-size: 14px;
  font-weight: 500;
  
  strong {
    color: ${colors.purpleLight};
    font-weight: 600;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  text-decoration: none;
  padding: 14px 32px;
  background: ${colors.purplePrimary};
  border-radius: 40px;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.white};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  
  &:hover {
    background: ${colors.purpleLight};
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(motion.a)`
  text-decoration: none;
  padding: 14px 32px;
  background: transparent;
  border: 1.5px solid ${colors.purplePrimary};
  border-radius: 40px;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.purpleLight};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(124, 58, 237, 0.1);
    transform: translateY(-3px);
  }
`;

const CodeCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(46, 16, 101, 0.3), rgba(30, 27, 75, 0.6));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(124, 58, 237, 0.3);
  width: 100%;
  max-width: 480px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    /* background: linear-gradient(90deg, ${colors.purplePrimary}, ${colors.indigoPrimary}); */
  }
  
  @media (max-width: 968px) {
    max-width: 500px;
  }
  
  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(124, 58, 237, 0.2);
`;

const CodeDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const CodeContent = styled.div`
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  
  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

const CodeLine = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 8px;
`;

const LineNumber = styled.span`
  color: ${colors.whiteDim};
  user-select: none;
  min-width: 30px;
`;

const CodeText = styled.span`
  color: ${colors.whiteMuted};
  
  .keyword {
    color: ${colors.purpleLight};
  }
  
  .function {
    color: ${colors.indigoLight};
  }
  
  .string {
    color: ${colors.purpleExtraLight};
  }
  
  .variable {
    color: ${colors.indigoExtraLight};
  }
`;

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  z-index: 10;
  
  @media (max-width: 640px) {
    bottom: 20px;
    display:none;
  }
`;

const ScrollLine = styled.div`
  width: 24px;
  height: 38px;
  border: 1.5px solid ${colors.whiteDim};
  border-radius: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 10px;
    background: ${colors.purpleLight};
    border-radius: 2px;
    animation: scrollMove 2s infinite;
  }
  
  @keyframes scrollMove {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(18px);
    }
  }
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
`;

const Hero = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('projects');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation} style={{ width: '100%', zIndex: 2 }}>
          <HeroInnerContainer>
            <LeftContent>
              <motion.div {...headTextAnimation}>
               
                
                <Title
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hi, I'm <span className="purple-text">Deepak Kumar</span>
                </Title>
                
                <SubTitle
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  
                </SubTitle>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <Description
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {Bio.description}
                </Description>
              </motion.div>

              <ExperienceBadge>
                <ExpIcon />
                <ExpText>
                  <strong>1.5+ years</strong> of professional experience
                </ExpText>
              </ExperienceBadge>

              <ButtonGroup
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <PrimaryButton href={Bio.resume} target="_blank">
                  View My Work →
                </PrimaryButton>
                <SecondaryButton href="#contact">
                  Let's Connect
                </SecondaryButton>
              </ButtonGroup>
            </LeftContent>

            <RightContent>
              <CodeCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <CodeHeader>
                  <CodeDot color="#FF5F56" />
                  <CodeDot color="#FFBD2E" />
                  <CodeDot color="#27C93F" />
                </CodeHeader>
                <CodeContent>
                  <CodeLine>
                    <LineNumber>1</LineNumber>
                    <CodeText>
                      <span className="keyword">import</span> {'{'} useState, useEffect {'}'} <span className="keyword">from</span> <span className="string">'react'</span>;
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>2</LineNumber>
                    <CodeText>
                      <span className="keyword">const</span> <span className="function">Developer</span> = () =&gt; {'{'}
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>3</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;<span className="keyword">const</span> [name, setName] = useState(<span className="string">"Deepak Kumar"</span>);
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>4</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;<span className="keyword">const</span> [skills, setSkills] = useState([
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>5</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"React"</span>, <span className="string">"JavaScript"</span>, <span className="string">"Node.js"</span>,
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>6</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"PHP"</span>, <span className="string">"Laravel"</span>
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>7</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;]);
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>8</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>9</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;<span className="keyword">return</span> (
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>10</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="function">div</span>&gt;Awesome Apps&lt;/<span className="function">div</span>&gt;
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>11</LineNumber>
                    <CodeText>
                      &nbsp;&nbsp;);
                    </CodeText>
                  </CodeLine>
                  <CodeLine>
                    <LineNumber>12</LineNumber>
                    <CodeText>
                      {'}'};
                    </CodeText>
                  </CodeLine>
                </CodeContent>
              </CodeCard>
            </RightContent>
          </HeroInnerContainer>
        </motion.div>

        <ScrollHint
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ScrollLine />
        </ScrollHint>
      </HeroContainer>
    </div>
  );
};

export default Hero;