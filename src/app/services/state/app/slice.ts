import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ThemeType } from 'models';
import { AppState } from './types';

const initialState: AppState = {
  currentTheme: ThemeType.DAY,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state: AppState, action: PayloadAction<ThemeType>): void => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
