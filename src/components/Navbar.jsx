import React, { useState, useEffect } from "react";
import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";
import { Bio } from "../data/constants";

// Single color palette - Indigo Purple only
const colors = {
  darkBg: '#0A0A0A',
  navBg: 'rgba(10, 10, 10, 0.95)',
  indigoPrimary: '#6366f1',
  indigoLight: '#818cf8',
  indigoDark: '#4f46e5',
  indigoGlow: 'rgba(99, 102, 241, 0.3)',
  indigoBorder: 'rgba(99, 102, 241, 0.2)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
};

const Nav = styled.div`
  background: ${colors.navBg};
  backdrop-filter: blur(10px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white;
  border-bottom: 1px solid ${colors.indigoBorder};
  transition: all 0.3s ease;

  &.scrolled {
    height: 70px;
    background: rgba(10, 10, 10, 0.98);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: ${colors.textPrimary};
  font-weight: 700;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${colors.indigoPrimary}, ${colors.indigoDark});
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, ${colors.textPrimary}, ${colors.indigoLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 24px;
  font-weight: 800;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ active }) => active ? colors.indigoPrimary : colors.textSecondary};
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 15px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  & i {
    font-size: 16px;
  }

  &:hover {
    color: ${colors.indigoLight};
    background: rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
  }

  ${({ active }) => active && `
    background: rgba(99, 102, 241, 0.15);
    
    &::before {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background: ${colors.indigoPrimary};
      border-radius: 2px;
    }
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  background: linear-gradient(135deg, ${colors.indigoPrimary}, ${colors.indigoDark});
  color: ${colors.textPrimary};
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;

  & i {
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${colors.indigoGlow};
  }
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  color: ${colors.textPrimary};
  transition: all 0.3s ease;
  z-index: 1001;
  font-size: 24px;

  &:hover {
    color: ${colors.indigoPrimary};
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 100px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-left: 1px solid ${colors.indigoBorder};

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  color: ${({ active }) => active ? colors.indigoPrimary : colors.textSecondary};
  font-size: 18px;
  font-weight: ${({ active }) => active ? '600' : '500'};
  text-decoration: none;
  padding: 12px 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;

  & i {
    width: 24px;
    font-size: 18px;
  }

  &:hover {
    color: ${colors.indigoLight};
    background: rgba(99, 102, 241, 0.1);
    transform: translateX(8px);
  }

  ${({ active }) => active && `
    background: rgba(99, 102, 241, 0.15);
  `}
`;

const MobileGithubButton = styled(GithubButton)`
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  padding: 12px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  z-index: 999;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('About');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];
      const scrollPosition = window.scrollY + 120;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'About' },
    { name: 'Skills' },
    { name: 'Experience' },
    { name: 'Projects' },
    { name: 'Education' },
    { name: 'Contact' }
  ];

  return (
    <>
      <Nav className={scrolled ? 'scrolled' : ''}>
        <NavbarContainer>
          <NavLogo to="/">
            <LogoIcon>DK</LogoIcon>
            <LogoText>Deepak Kumar</LogoText>
          </NavLogo>

          <NavItems>
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                href={`#${item.name}`}
                active={activeSection === item.name ? 1 : 0}
              >
                {/* <i className={item.icon}></i> */}
                {item.name}
              </NavLink>
            ))}
          </NavItems>

          <ButtonContainer>
            <GithubButton href={Bio.github} target="_Blank">
              {/* <i className="fab fa-github"></i> */}
              GitHub Profile
            </GithubButton>
          </ButtonContainer>

          <MobileIcon onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </MobileIcon>
        </NavbarContainer>
      </Nav>

      <Overlay isOpen={isOpen} onClick={closeMenu} />
      
      <MobileMenu isOpen={isOpen}>
        {navItems.map((item) => (
          <MobileNavLink 
            key={item.name}
            href={`#${item.name}`}
            onClick={closeMenu}
            active={activeSection === item.name ? 1 : 0}
          >
            <i className={item.icon}></i>
            {item.name}
          </MobileNavLink>
        ))}
        <MobileGithubButton href={Bio.github} target="_Blank" onClick={closeMenu}>
          <i className="fab fa-github"></i>
          GitHub Profile
        </MobileGithubButton>
      </MobileMenu>
    </>
  );
};

export default Navbar;