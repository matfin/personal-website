import styled, { keyframes } from 'styled-components';

import { LoadingSpinner as LoadingSpinnerSVG } from '@components/svgicons';
import { layers } from '@styles/vars';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled(LoadingSpinnerSVG)`
  z-index: ${layers.top};
  width: 128px;
  height: 128px;
  animation: ${rotate} 750ms linear infinite;
`;
