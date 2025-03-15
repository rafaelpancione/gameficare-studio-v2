import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  top: 0;
  width: 100%;
  background-color: transparent;
  box-shadow: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
  /* Header posicionado no fluxo normal da página */
  position: relative;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    theme.spacing
      ? `${theme.spacing(1.25)} ${theme.spacing(2.5)}`
      : '10px 20px'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1001;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 768px) {
    &:hover > div {
      visibility: hidden;
      opacity: 0;
    }
  }
`;

export const Logo = styled.img`
  width: 50px;
  height: auto;
  cursor: pointer;
`;

export const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  width: 200px;
  background-color: ${({ theme }) => theme.colors?.yellow || 'var(--yellow)'};
  color: ${({ theme }) => theme.colors?.black || '#000'};
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '5px'};
  box-shadow: 5px 5px 0 ${({ theme }) => theme.colors?.black || '#000'};
  font-family: ${({ theme }) => theme.fonts?.body || "'Roboto', sans-serif"};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing?.(1.25) || '10px'};
  position: absolute;
  left: ${({ theme }) => theme.spacing?.(7.5) || '60px'};
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s ease-in-out;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent
      ${({ theme }) => theme.colors?.yellow || 'var(--yellow)'}
      transparent transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      flex-direction: column;
      width: 100%;
      padding: 20px;
      margin-top: 40px;

      a {
        width: 100%;
        text-align: center;
        padding: 15px 0;
        margin: 5px 0;
      }
    `}

  @media (max-width: 768px) {
    display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'none')};
  }
`;

export const MobileMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.colors?.dark || '#111'};
  transition: right 0.3s ease-in-out;
  z-index: 1002;
  padding: 20px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  cursor: pointer;
  z-index: 1002;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  cursor: pointer;
`;

export const MenuItem = styled(Link)`
  font-family: ${({ theme }) =>
    theme.fonts?.heading || "'Press Start 2P', cursive"};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  text-decoration: none;
  margin-left: ${({ theme }) => theme.spacing?.(2.5) || '20px'};
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.yellow || 'var(--yellow)'};
  }

  &:focus {
    outline: 2px dashed ${({ theme }) => theme.colors?.yellow || 'var(--yellow)'};
    outline-offset: 2px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    background: ${({ theme }) => theme.colors?.yellow || 'var(--yellow)'};
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 1.2rem;
    padding: 10px 0;

    &:after {
      display: none;
    }
  }
`;
