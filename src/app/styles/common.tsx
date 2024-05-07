import { css } from 'styled-components';

export const commonButtonStyle = css`
  position: fixed;
  top: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border: 0.125rem solid ${(props) => props?.theme?.colours?.primary};
`;
