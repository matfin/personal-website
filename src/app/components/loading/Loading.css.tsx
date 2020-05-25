import styled, { keyframes } from 'styled-components';
import { layers } from 'app/styles';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSt = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinnerSt = styled.img`
  z-index: ${layers.top};
  width: 64px;
  height: 64px;
  animation: ${rotate} 750ms linear infinite;
`;
