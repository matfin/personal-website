import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks/useDispatchSelector';
import { AppDispatch, RootState } from 'app/services/state/store';
import { setTheme } from 'app/services/state/app';
import { ThemeType } from 'models';

const useApp = (): {
  currentTheme: ThemeType;
  toggleTheme: () => void;
  updateTheme: (theme: ThemeType) => void;
} => {
  const dispatch = useAppDispatch<AppDispatch>();
  const currentTheme: ThemeType = useAppSelector(
    (state: RootState) => state.app.currentTheme,
  );

  const toggleTheme = useCallback((): void => {
    const theme: ThemeType =
      currentTheme === ThemeType.DAY ? ThemeType.NIGHT : ThemeType.DAY;

    dispatch(setTheme(theme));
  }, [currentTheme, dispatch]);

  const updateTheme = useCallback(
    (theme: ThemeType): void => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return { currentTheme, toggleTheme, updateTheme };
};

export default useApp;
