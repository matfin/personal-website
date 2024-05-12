import { renderHook } from '@testing-library/react';

import type { RootState } from 'app/services/state/store';
import { useAppDispatch, useAppSelector } from 'app/hooks/useDispatchSelector';
import { fetchPageBySlug, resetPage } from 'app/services/state/page';
import usePage from './usePage';

jest.mock('app/hooks/useDispatchSelector', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('app/services/state/page', () => ({
  fetchPageBySlug: jest.fn(),
  resetPage: jest.fn(),
}));

const state: RootState = {
  page: {
    page: null,
    error: null,
    pending: false,
  },
};

describe('usePage hook', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('calls to fetch a page by the default slug, then resets the page on unmount', (): void => {
    const spyDispatch = jest.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as jest.Mock).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as jest.Mock).mockReturnValueOnce(spyDispatch);

    const {
      unmount,
      result: {
        current: { page, error, pending },
      },
    } = renderHook(() => usePage());

    expect(fetchPageBySlug).toHaveBeenCalledTimes(1);
    expect(fetchPageBySlug).toHaveBeenCalledWith('index');
    expect(page).toBeNull();
    expect(error).toBeNull();
    expect(pending).toBeFalsy();

    unmount();
    expect(resetPage).toHaveBeenCalledTimes(1);
  });

  it('calls to fetch a page with a specified slug, then resets the page on unmount', (): void => {
    const spyDispatch = jest.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as jest.Mock).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as jest.Mock).mockReturnValueOnce(spyDispatch);

    const {
      unmount,
      result: {
        current: { page, error, pending },
      },
    } = renderHook(() => usePage('test-content'));

    expect(fetchPageBySlug).toHaveBeenCalledTimes(1);
    expect(fetchPageBySlug).toHaveBeenCalledWith('test-content');
    expect(page).toBeNull();
    expect(error).toBeNull();
    expect(pending).toBeFalsy();

    unmount();
    expect(resetPage).toHaveBeenCalledTimes(1);
  });
});
