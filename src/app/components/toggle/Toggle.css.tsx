import styled, { css } from 'styled-components';
import { animationCurve, blackEmoji, layers } from 'app/styles';

interface IToggleIndicatorStProps {
  switchedon?: boolean;
}

const iconStyle = css`
  position: absolute;
  font-size: 0.75rem;
  line-height: 1.5rem;
  ${blackEmoji}
  top: -2px;
`;

export const ToggleTrackSt = styled.div`
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
    right: 2px;
    content: '🌙';
  }
`;

export const ToggleIndicatorSt = styled.div<IToggleIndicatorStProps>`
  z-index: ${layers.upper};
  position: absolute;
  top: -2px;
  left: ${(props) => (props.switchedon ? '1.5rem' : '-2px')};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${(props) => props?.theme?.colours?.primary};

  transition: left 200ms ${animationCurve};
`;
