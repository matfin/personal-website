import { ThemeType } from 'models';
import { SWITCH_THEME } from './types';
import { defaultState, appState } from './reducer';

describe('app reducer tests', (): void => {
  it('updates the state when the current theme is set', (): void => {
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

  it('returns the default state', (): void => {
    const state = appState(undefined, { type: '', payload: ThemeType.DAY });

    expect(state).toEqual(defaultState);
  });
});
