import styled, { css } from 'styled-components';

import { LinePlacement } from '@models/enums';
import { animationCurve } from '@styles/vars';

interface LineProps {
  $placement: LinePlacement;
  $revealed?: string;
}

const transformTo = (placement: LinePlacement) => {
  switch (placement) {
    case LinePlacement.TOP: {
      return css`
        transform: translate3d(0, 12px, 0) rotate(-45deg);
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
};

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colours.secondary};
`;

export const Line = styled.span<LineProps>`
  width: 2rem;
  height: 1px;
  background: ${(props) => props?.theme?.colours?.primary};
  transform-origin: center center;
  transition:
    transform 0.5s ${animationCurve},
    rotate 0.5s ${animationCurve};

  ${({ $revealed, $placement }) => $revealed && transformTo($placement)}
`;
