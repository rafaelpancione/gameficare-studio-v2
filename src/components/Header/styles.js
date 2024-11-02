// src/components/Header/styles.js

import styled from 'styled-components';
//import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ $scrolled }) => ($scrolled ? 'var(--dark-blue)' : 'transparent')};
  z-index: 1000;
  transition: box-shadow 0.3s ease-in-out;

  ${({ scrolled }) =>
    scrolled &&
    `
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  `}
`;

export const HeaderContent = styled.div`
  max-width: 1200px; /* Ajuste conforme a largura do seu container principal */
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    visibility: visible;
    opacity: 1;
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
  background-color: var(--yellow);
  color: #000;
  text-align: center;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  padding: 10px;
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s ease-in-out;
  z-index: 1;

  /* Seta do tooltip */
  &::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent var(--yellow) transparent transparent;
  }
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  position: relative;

  &:hover {
    color: var(--yellow);
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    background: var(--yellow);
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
