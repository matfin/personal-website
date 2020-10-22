import { ThemeType } from 'common/models';
import { SWITCH_THEME } from './types';
import { defaultState, appState } from './reducer';

describe('app reducer tests', () => {
  it('updates the state when the current theme is set', () => {
    const state = appState(undefined, {
      type: SWITCH_THEME,
      payload: ThemeType.DAY,
    });
    const check = {
      ...defaultState,
      currentTheme: ThemeType.DAY,
    };

    expect(state).toEqual(check);
  });
});
