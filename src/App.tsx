import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'app/common/styles';
import ConnectedList from 'app/components/list/ConnectedList';
import ConnectedStory from 'app/components/story/ConnectedStory';
import ContainerSt, {
  FooterSt,
  HeaderSt,
  HeadingSt,
  MainSt,
} from './App.css';

const App = () => (
  <ThemeProvider theme={{}}>
    <ContainerSt>
      <HeaderSt>
        <Link to="/">
          <HeadingSt>
            React &amp; Typescript Showcase
          </HeadingSt>
        </Link>
      </HeaderSt>
      <MainSt>
        <Switch>
          <Route path="/" exact component={ConnectedList} />
          <Route path="/story/:slug">
            <ConnectedStory />
          </Route>
        </Switch>
      </MainSt>
      <FooterSt />
    </ContainerSt>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
