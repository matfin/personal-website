import styled, { css } from 'styled-components';
import {
  colours,
  fontSizes,
  Heading,
  media,
} from 'app/common/styles';
import Header from 'app/components/header/Header';
import Footer from 'app/components/footer/Footer';

const ContainerSt = styled.div`
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: min-content auto 64px;
  grid-template-areas:
    "hd hd"
    "mn mn"
    "ft ft";

  ${media.md(css`
    grid-template-areas:
      "mn hd"
      "mn hd"
      "ft ft";
  `)};
`;

export const HeaderSt = styled(Header)`
  grid-area: hd;
`;

export const MainSt = styled.main`
  grid-area: mn;
`;

export const FooterSt = styled(Footer)`
  grid-area: ft;
`;

export const HeadingSt = styled(Heading)`
  color: ${colours.secondary};
  font-size: ${fontSizes.heading};

  ${media.md(css`
    position: sticky;
    top: 0;
    right: 0;
  `)};
`;

export default ContainerSt;
