import { createAsyncThunk } from '@reduxjs/toolkit';

import { FetchError, Page } from '@models';

export const fetchPageBySlug = createAsyncThunk<
  Page,
  string,
  { rejectValue: FetchError }
>('page/fetchPageBySlug', async (slug: string, thunkApi) => {
  try {
    const url = `/pages/${slug === '/' ? 'index' : slug}.json`;
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as Page;
  } catch (e) {
    return thunkApi.rejectWithValue({
      errorMessage: `Unable to fetch from slug: ${slug}`,
    } as FetchError);
  }
});
