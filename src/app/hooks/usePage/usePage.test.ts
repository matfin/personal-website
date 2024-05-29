import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';

import type { RootState } from '@services/state/store';
import { useAppDispatch, useAppSelector } from '@hooks/useDispatchSelector';
import { fetchPageBySlug, resetPage } from '@services/state/page/slice';
import usePage from './index';

vi.mock('react-router-dom', async () => ({
  useLocation: vi.fn().mockReturnValue({ pathname: 'test' }),
}));

vi.mock('@hooks/useDispatchSelector', async () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@services/state/page/slice', async () => ({
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

    (useLocation as unknown as MockInstance).mockReturnValue({
      pathname: 'index',
    });

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );

    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

    const {
      unmount,
      result: {
        current: { page, error, pending, parts, isNested },
      },
    } = renderHook(() => usePage());

    expect(fetchPageBySlug).toHaveBeenCalledTimes(1);
    expect(fetchPageBySlug).toHaveBeenCalledWith('index');
    expect(page).toBeNull();
    expect(error).toBeNull();
    expect(pending).toBeFalsy();
    expect(parts).toEqual(['index']);
    expect(isNested).toBe(false);

    unmount();
    expect(resetPage).toHaveBeenCalledTimes(1);
  });

  it('calls to fetch a page with a specified slug, then resets the page on unmount', (): void => {
    const spyDispatch = vi.fn().mockReturnValue((cb: () => void) => cb());

    (useLocation as unknown as MockInstance).mockReturnValue({
      pathname: 'test-content/nested',
    });

    (useAppSelector as unknown as MockInstance).mockImplementation(
      (cb: (state: RootState) => void) => cb(state),
    );

    (useAppDispatch as unknown as MockInstance).mockReturnValueOnce(
      spyDispatch,
    );

    const {
      unmount,
      result: {
        current: { page, error, pending, parts, isNested },
      },
    } = renderHook(() => usePage());

    expect(fetchPageBySlug).toHaveBeenCalledTimes(1);
    expect(fetchPageBySlug).toHaveBeenCalledWith('test-content/nested');
    expect(page).toBeNull();
    expect(error).toBeNull();
    expect(pending).toBeFalsy();
    expect(parts).toEqual(['test-content', 'nested']);
    expect(isNested).toBe(true);

    unmount();
    expect(resetPage).toHaveBeenCalledTimes(1);
  });
});
