import { createGlobalStyle } from 'styled-components';
import { colours, defaultFont } from './vars';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    color: ${colours.primary};
    background: ${colours.secondary};
    font-family: ${defaultFont};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    border: none;
    background-color: inherit;

    &:focus {
      outline: 0;
    }
  }
`;

export default GlobalStyle;
