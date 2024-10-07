import styled from 'styled-components';

export const Button = styled.button`
  background-color: var(--yellow);
  color: #000;
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 15px 30px;
  position: relative;
  box-shadow: 5px 5px 0 #000;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: var(--white);
    top: 5px;
    left: 5px;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;
