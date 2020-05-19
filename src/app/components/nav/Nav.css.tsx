import styled, { css } from 'styled-components';
import { animationCurve, colours } from 'app/styles';
import { Link } from 'react-router-dom';

interface ILinkStProps {
  isactive?: string
}

export const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const LinkSt = styled(Link)<ILinkStProps>`
  position: relative;
  flex: 0 1 5rem;
  display: flex;
  align-items: center;

  &::after {
    position: absolute;
    bottom: 30%;
    left: 0;
    width: 0;
    height: 0.125rem;
    background-color: ${colours.primary};
    transition: width 200ms ${animationCurve};
    content: "";
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }

  ${(props) => props.isactive === 'true' && css`
    &::after {
      width: 100%;
    }
  `};
`;
