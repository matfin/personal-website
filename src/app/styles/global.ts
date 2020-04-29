import { createGlobalStyle } from 'styled-components';
import { colours, defaultFont } from './vars';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${colours.primary};
    font-family: ${defaultFont};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
