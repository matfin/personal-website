import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const LinkSt = styled(Link)`
  flex: 0 1 5em;
  padding-left: 1em;
  display: flex;
  align-items: center;
`;
