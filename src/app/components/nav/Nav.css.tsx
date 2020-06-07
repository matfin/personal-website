import styled, { css } from 'styled-components';
import { animationCurve, layers } from 'app/styles';
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
  flex: 0 1 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding-left: 0.5rem;
  transition: all 200ms ${animationCurve};
  transition-property: color padding;

  &::after {
    z-index: ${layers.lower};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${props => props?.theme?.colours?.primary};
    transition: all 200ms ${animationCurve};
    transition-property: background height;
    content: "";
  }

  &:hover {
    color: ${props => props?.theme?.colours?.secondary};

    &::after {
      height: 100%;
      background: ${props => props?.theme?.colours?.primary};
    }
  }

  ${(props) => props.isactive === 'true' && css`
    color: ${props => props?.theme?.colours?.secondary};

    &::after {
      height: 100%;
      background: ${props => props?.theme?.colours?.primary};
    }
  `};
`;
