import { ReduxAction, AppReducerState, ThemeType } from 'common/models';
import { SWITCH_THEME } from './types';

export const defaultState: AppReducerState = {
  currentTheme: ThemeType.DAY,
};

export const appState = (
  state: AppReducerState = defaultState,
  action: ReduxAction
): AppReducerState => {
  const { payload, type } = action;

  switch (type) {
    case SWITCH_THEME: {
      return {
        ...defaultState,
        currentTheme: payload,
      };
    }
    default: {
      return state;
    }
  }
};
