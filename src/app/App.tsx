import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useApp from '@hooks/useApp';
import useAppearanceChange from '@hooks/useAppearanceChange';
import { ThemeType } from '@models/enums';
import Page from '@views/page';
import { day, night } from './styles/themes';
import { GlobalStyle } from '@styles/global';

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
