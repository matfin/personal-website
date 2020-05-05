import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ConnectedPage from 'app/views/page/ConnectedPage';
import { GlobalStyle } from 'app/styles';

const App = (): JSX.Element => (
  <ThemeProvider theme={{}}>
    <Switch>
      <Route path="/:slug?" exact component={ConnectedPage} />
    </Switch>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
