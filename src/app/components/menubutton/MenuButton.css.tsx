import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { animationCurve } from 'app/styles';

export enum LinePlacement {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

interface ListStProps {
  placement: LinePlacement,
  revealed: boolean,
}

const transformTo = (placement: LinePlacement): FlattenSimpleInterpolation => {
  switch(placement) {
    case LinePlacement.TOP: {
      return css`
        transform: translate3d(0, 10px, 0) rotate(-45deg);
      `;
    }
    case LinePlacement.BOTTOM: {
      return css`
        transform: translate3d(0, -11px, 0) rotate(45deg);
      `;
    }
    default: {
      return css`
        transform: rotate(135deg);
      `;
    }
  }
}

export const MenuButtonSt = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
  background-color: ${props => props?.theme?.colours?.secondary};
`;

export const LineSt = styled.span<ListStProps>`
  width: 2rem;
  height: 1px;
  background: ${props => props?.theme?.colours?.primary};
  transform-origin: center center;
  transition: transform 0.5s ${animationCurve}, rotate 0.5s ${animationCurve};

  ${({ revealed, placement }) => revealed && transformTo(placement)};
`;
