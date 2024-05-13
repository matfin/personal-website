import { renderHook } from '@testing-library/react';

import { ThemeType } from '@models';
import type { RootState } from '@services/state/store';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setTheme } from '@services/state/app';
import useApp from './useApp';

jest.mock('app/hooks/useDispatchSelector', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('app/services/state/app', () => ({
  setTheme: jest.fn(),
}));

const state: RootState = {
  app: {
    currentTheme: ThemeType.DAY,
  },
};

describe('useApp hook', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('calls a dispatch to toggle the theme to NIGHT.', (): void => {
    const spyDispatch = jest.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as jest.Mock).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as jest.Mock).mockReturnValueOnce(spyDispatch);

    const {
      result: {
        current: { toggleTheme },
      },
    } = renderHook(() => useApp());

    toggleTheme();
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith(ThemeType.NIGHT);
  });

  it('calls a dispatch to toggle the theme to DAY.', (): void => {
    const spyDispatch = jest.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as jest.Mock).mockImplementation(
      (cb: (state: RootState) => void) =>
        cb({ ...state, app: { currentTheme: ThemeType.NIGHT } }),
    );
    (useAppDispatch as jest.Mock).mockReturnValueOnce(spyDispatch);

    const {
      result: {
        current: { toggleTheme },
      },
    } = renderHook(() => useApp());

    toggleTheme();
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith(ThemeType.DAY);
  });

  it('calls a dispatch to set the theme.', (): void => {
    const spyDispatch = jest.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as jest.Mock).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as jest.Mock).mockReturnValueOnce(spyDispatch);

    const {
      result: {
        current: { updateTheme },
      },
    } = renderHook(() => useApp());

    updateTheme(ThemeType.NIGHT);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith(ThemeType.NIGHT);
  });
});
