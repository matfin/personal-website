import styled, { css } from 'styled-components';
import { boxShadow, colours, layers, media } from 'app/styles';
import { Nav } from 'app/components/nav/Nav';
import { Footer } from 'app/components/footer/Footer';

interface ISideStProps {
  revealed: boolean,
}

interface IPageStProps {
  navRevealed: boolean
}

export const PageSt = styled.div<IPageStProps>`
  position: relative;
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  grid-template-columns: 1em auto 1em;
  grid-template-rows: auto;
  grid-template-areas:
    ". main .";

  ${(props) => props.navRevealed && css`
    overflow: hidden;
  `};

  ${media.md(css`
    grid-template-columns: 1rem auto 4rem 12.25rem 1rem;
    grid-template-columns: auto 30rem 4rem 12.25rem auto;
    grid-template-areas:
      ". main . side .";
  `)};

  ${media.lg(css`
    grid-template-columns: auto 40rem 4rem 12.25rem auto;
  `)};
`;

export const MainSt = styled.main`
  grid-area: main;
`;

export const SideSt = styled.aside<ISideStProps>`
  z-index: ${layers.top};
  transform: translate3d(60vw, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  width: 60vw;
  height: 100vh;
  background-color: ${colours.secondary};
  box-shadow: none;
  transition-property: box-shadow transform;
  transition-duration: 300ms;

  ${(props) => props.revealed && css`
    ${boxShadow};
    transform: translate3d(0, 0, 0);
  `};

  ${media.md(css`
    position: unset;
    width: unset;
    height: unset;
    grid-area: side;
    transform: unset;
    background: transparent;
  `)};
`

export const NavSt = styled(Nav)`
  position: sticky;
  top: 0;
  left: 0;
`;

export const FooterSt = styled(Footer)`
  display: none;
`;

export const BurgerSt = styled.button`
  z-index: ${layers.upper};
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  font-size: 2.5rem;

  ${media.md(css`
    display: none;
  `)};
`;

export const ErrorSt = styled.div`
`;

export const LoadingSt = styled.div`
`;


