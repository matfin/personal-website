import { IAction, IAppState, ThemeType } from 'common/interfaces';
import { SWITCH_THEME } from './types';

export const defaultState: IAppState = {
  currentTheme: ThemeType.DAY,
};

export const appState = (
  state: IAppState = defaultState,
  action: IAction,
): IAppState => {
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
