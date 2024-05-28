import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { commonButtonStyle } from '@styles/common';
import { media } from '@styles/mixins';

export const BackSt = styled(Link)`
  ${commonButtonStyle}

  left: 1rem;
  background: ${(props) => props?.theme?.colours?.secondary};

  ${media.md(css`
    position: absolute;
    top: -1.25rem;
    left: -0.125rem;
  `)}

  &::before {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '<';
    font-size: 1.5rem;
  }
`;

export const ErrorSt = styled.div`
  grid-area: main;
`;
