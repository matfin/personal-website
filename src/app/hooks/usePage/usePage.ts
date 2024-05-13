import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { AppDispatch, RootState } from '@services/state/store';
import { fetchPageBySlug, resetPage } from '@services/state/page';
import { Page } from '@models';

const usePage = (
  slug?: string,
): { page: Page | null; error: Error | null; pending: boolean } => {
  const dispatch = useAppDispatch<AppDispatch>();
  const page: Page = useAppSelector((state: RootState) => state.page.page);
  const error: Error | null = useAppSelector(
    (state: RootState) => state.page.error,
  );
  const pending: boolean = useAppSelector(
    (state: RootState) => state.page.pending,
  );

  useEffect((): (() => void) => {
    dispatch(fetchPageBySlug(slug ?? 'index'));

    return resetPage;
  }, [dispatch, slug]);

  return { page, error, pending };
};

export default usePage;
