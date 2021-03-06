import styled, { keyframes } from 'styled-components';
import { LoadingSpinner } from 'app/components/svgicons';
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

export const LoadingSpinnerSt = styled(LoadingSpinner)`
  z-index: ${layers.top};
  width: 128px;
  height: 128px;
  animation: ${rotate} 750ms linear infinite;
`;
