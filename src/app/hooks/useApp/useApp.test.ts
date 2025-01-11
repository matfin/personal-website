import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import { renderHook } from '@testing-library/react';

import { ThemeType } from '@models/enums';
import type { RootState } from '@services/state/store';
import { useAppDispatch, useAppSelector } from '@hooks/useDispatchSelector';
import { setTheme } from '@services/state/app/slice';
import useApp from './index';

vi.mock('@hooks/useDispatchSelector', async () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@services/state/app/slice', async () => ({
  setTheme: vi.fn(),
}));

const state: RootState = {
  app: {
    currentTheme: ThemeType.DAY,
  },
};

describe('useApp hook', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('calls a dispatch to toggle the theme to NIGHT.', (): void => {
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

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
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) =>
        cb({ ...state, app: { currentTheme: ThemeType.NIGHT } }),
    );
    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

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
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

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
