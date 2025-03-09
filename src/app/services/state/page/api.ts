import { createAsyncThunk } from '@reduxjs/toolkit';

import type { FetchError, Page } from '@models/types';

const isIndexSlug = (slug: string): boolean => slug === '/' || slug === '';

export const fetchPageBySlug = createAsyncThunk<
  Page,
  string,
  { rejectValue: FetchError }
>('page/fetchPageBySlug', async (slug: string, thunkApi) => {
  try {
    const url: string = `/pages/${isIndexSlug(slug) ? 'index' : slug}.json`;
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as Page;
  } catch {
    return thunkApi.rejectWithValue({
      errorMessage: `Unable to fetch from slug: ${slug}`,
    } as FetchError);
  }
});
