import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';

import type { RootState } from '@services/state/store';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchPageBySlug, resetPage } from '@services/state/page';
import usePage from './usePage';

vi.mock('@hooks', async () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@services/state/page', async () => ({
  fetchPageBySlug: vi.fn(),
  resetPage: vi.fn(),
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
    vi.clearAllMocks();
  });

  it('calls to fetch a page by the default slug, then resets the page on unmount', (): void => {
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

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
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );
    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

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
