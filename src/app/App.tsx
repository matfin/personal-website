import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CombinedAppState, ThemeType } from 'common/models';
import ConnectedPage from 'app/views/page/ConnectedPage';
import Meta from 'app/components/meta/Meta';
import { day, GlobalStyle, night } from 'app/styles';

const mapStateToProps = (state: CombinedAppState) => ({
  currentTheme: state.appState.currentTheme,
});

export interface Props {
  currentTheme: ThemeType;
}

const App = ({ currentTheme }: Props): JSX.Element => {
  const themes = {
    day,
    night,
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Meta
        description="Matt Finucane is a Dublin based software engineer."
        title="Matt Finucane - Software engineer"
        slug="/"
      />
      <Switch>
        <Route
          component={ConnectedPage}
          exact
          path="/:slug(404|about|cv|now|projects)?"
        />
        <Route component={ConnectedPage} exact path="/projects/:slug" />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default connect(mapStateToProps)(App);
