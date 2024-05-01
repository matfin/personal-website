import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useAppearanceChange from './hooks/useAppearanceChange';
import { CombinedAppState, ThemeType } from 'models';
import ConnectedPage from 'app/views/page/ConnectedPage';
import Meta from 'app/components/meta/Meta';
import { day, GlobalStyle, night } from 'app/styles';
import { AppDispatch, switchTheme } from 'app/services/app/actions';

export interface Props {
  currentTheme: ThemeType;
  switchTheme: (theme: ThemeType) => void;
}

interface MapDispatchToProps {
  switchTheme: (theme: ThemeType) => void;
}

const mapStateToProps = (state: CombinedAppState) => ({
  currentTheme: state.appState.currentTheme,
});

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToProps => ({
  switchTheme: (theme: ThemeType): void => dispatch(switchTheme(theme)),
});

const App = ({ currentTheme, switchTheme }: Props): React.ReactNode => {
  const themes = {
    day,
    night,
  };

  useAppearanceChange((theme: ThemeType): void => switchTheme(theme));

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Meta
        description="Matt Finucane is a Dublin based software engineer."
        title="Matt Finucane - Software engineer"
        slug="/"
      />
      <Routes>
        <Route path="*" element={<ConnectedPage />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
