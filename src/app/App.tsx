import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ConnectedPage from 'app/views/page/ConnectedPage';
import { GlobalStyle } from 'app/styles';
import ContainerSt, { FooterSt, HeaderSt, MainSt } from './App.css';

const App = () => (
  <ThemeProvider theme={{}}>
    <ContainerSt>
      <HeaderSt>
        <Link to="/">
          Home
        </Link>
        <Link to="/projects">
          Projects
        </Link>
        <Link to="/cv">
          CV
        </Link>
      </HeaderSt>
      <MainSt>
        <Switch>
          <Route path="/:slug?" exact component={ConnectedPage} />
        </Switch>
      </MainSt>
      <FooterSt />
    </ContainerSt>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
