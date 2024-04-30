import { AppReduxAction, AppReducerState, ThemeType } from 'models';
import { SWITCH_THEME } from './types';

export const defaultState: AppReducerState = {
  currentTheme: ThemeType.DAY,
};

export const appState = (
  state: AppReducerState = defaultState,
  action: AppReduxAction,
): AppReducerState => {
  const { payload, type } = action;
  switch (type) {
    case SWITCH_THEME: {
      return {
        ...state,
        currentTheme: payload,
      };
    }
    default: {
      return state;
    }
  }
};
