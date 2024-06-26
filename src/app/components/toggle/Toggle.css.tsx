import styled, { css } from 'styled-components';

import { animationCurve, layers } from '@styles/vars';
import { blackEmoji } from '@styles/mixins';

interface ToggleIndicator {
  $switchedon?: boolean | string;
}

const iconStyle = css`
  position: absolute;
  font-size: 0.75rem;
  line-height: 1.5rem;
  ${blackEmoji}
  top: -2px;
`;

export const ToggleTrack = styled.button`
  position: relative;
  border: 2px solid ${(props) => props?.theme?.colours?.primary};
  width: 3rem;
  height: 1.5rem;
  border-radius: 2.75rem;

  &::before {
    ${iconStyle}
    left: 4px;
    content: '☀️';
  }

  &::after {
    ${iconStyle}
    right: 4px;
    content: '🌙';
  }
`;

export const ToggleIndicator = styled.div<ToggleIndicator>`
  z-index: ${layers.upper};
  position: absolute;
  top: -2px;
  left: ${({ $switchedon }) => ($switchedon ? '1.5rem' : '-2px')};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme?.colours?.primary};
  transition: left 200ms ${animationCurve};
`;
