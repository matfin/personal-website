import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useApp, useAppearanceChange } from '@hooks';
import { ThemeType } from '@models';
import Page from '@views/page';
import { day, GlobalStyle, night } from '@styles';

const App = (): React.ReactNode => {
  const { currentTheme, updateTheme } = useApp();
  const themes = {
    day,
    night,
  };

  useAppearanceChange((theme: ThemeType): void => updateTheme(theme));

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
