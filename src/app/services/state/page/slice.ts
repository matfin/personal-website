import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Page } from '@models/interfaces';
import { fetchPageBySlug } from './api';
import { normalisePageContent } from './utils';
import { PageState } from './types';

export const initialState: PageState = {
  error: null,
  pending: false,
  page: null,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state: PageState, action: PayloadAction<Page>): void => {
      state.page = normalisePageContent(action);
    },
    resetPage: (): PageState => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchPageBySlug.pending, (state: PageState) => {
      state.error = null;
      state.page = null;
      state.pending = true;
    });
    // success
    builder.addCase(
      fetchPageBySlug.fulfilled,
      (state: PageState, action: PayloadAction<Page>) => {
        state.page = normalisePageContent(action);
        state.pending = false;
        state.error = null;
      },
    );
    // failed
    builder.addCase(fetchPageBySlug.rejected, (state: PageState, action) => {
      state.pending = false;
      state.error = new Error(action.payload?.errorMessage);
      state.page = null;
    });
  },
});

export const { resetPage, setPage } = pageSlice.actions;
export { fetchPageBySlug };
export default pageSlice.reducer;
