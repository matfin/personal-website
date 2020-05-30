import styled, { css } from 'styled-components';
import { animationCurve, layers } from 'app/styles';

interface IToggleIndicatorStProps {
  switchedOn?: boolean
}

const iconStyle = css`
  position: absolute;
  font-size: 1rem;
  line-height: 1.25rem;
  color: transparent;
  text-shadow: 0 0 0 ${props => props?.theme?.colours?.primary};
  top: 0;
`;

export const ToggleTrackSt = styled.div`
  position: relative;
  border: 2px solid ${props => props?.theme?.colours?.primary};
  width: 3rem;
  height: 1.5rem;
  border-radius: 2.75rem;

  &::before {
    ${iconStyle};
    left: 0;
    content: "☀️";
  }

  &::after {
    ${iconStyle};
    right: 0;
    content: "🌙";
  }
`;

export const ToggleIndicatorSt = styled.div<IToggleIndicatorStProps>`
  z-index: ${layers.upper};
  position: absolute;
  top: 0;
  left: ${props => props.switchedOn ? '1.5rem' : 0};
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${props => props?.theme?.colours?.primary};

  transition: left 200ms ${animationCurve};
`;
