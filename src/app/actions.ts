import { ThemeType } from 'common/interfaces';
import { SWITCH_THEME } from './types';

export interface ISwitchThemeType {
  type: typeof SWITCH_THEME,
  payload: ThemeType,
}

export type AppActionTypes = ISwitchThemeType;

export const switchTheme = (theme: ThemeType): AppActionTypes => ({
  type: SWITCH_THEME,
  payload: theme,
});
