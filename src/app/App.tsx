import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ConnectedPage from 'app/views/page/ConnectedPage';
import { Meta } from 'app/components/meta/Meta';
import { GlobalStyle } from 'app/styles';

const App = (): JSX.Element => (
  <ThemeProvider theme={{}}>
    <Meta
      description="Matt Finucane is a Dublin based software engineer."
      title="Matt Finucane - Software engineer"
      slug="/"
    />
    <Switch>
      <Route path="/:slug?" exact component={ConnectedPage} />
    </Switch>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
