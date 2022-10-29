import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { AppReducerState, ThemeType } from 'models';
import { SWITCH_THEME } from './types';

export interface ISwitchThemeType {
  type: typeof SWITCH_THEME;
  payload: ThemeType;
}

export type AppActionTypes = ISwitchThemeType;

export type AppDispatch = ThunkDispatch<AppReducerState, void, Action<string>>;

export const switchTheme = (theme: ThemeType): AppActionTypes => ({
  type: SWITCH_THEME,
  payload: theme,
});
