import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { normalisePathname, pathNesting } from '@utils/general';
import { useAppDispatch, useAppSelector } from '@hooks/useDispatchSelector';
import type { AppDispatch, RootState } from '@services/state/store';
import { fetchPageBySlug, resetPage } from '@services/state/page/slice';
import type { Page } from '@models/interfaces';

interface Props {
  page: Page | null;
  error: Error | null;
  pending: boolean;
  isNested: boolean;
  parts: string[];
}

const usePage = (): Props => {
  const dispatch = useAppDispatch<AppDispatch>();
  const page: Page = useAppSelector((state: RootState) => state.page.page);
  const error: Error | null = useAppSelector(
    (state: RootState) => state.page.error,
  );
  const pending: boolean = useAppSelector(
    (state: RootState) => state.page.pending,
  );
  const { pathname } = useLocation();
  const normalisedPathname: string = normalisePathname(pathname);
  const { isNested, parts } = pathNesting(normalisedPathname);

  useEffect((): (() => void) => {
    dispatch(fetchPageBySlug(normalisedPathname ?? 'index'));

    return resetPage;
  }, [dispatch, normalisedPathname]);

  return { page, error, isNested, parts, pending };
};

export default usePage;
