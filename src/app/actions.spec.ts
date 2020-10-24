import { ThemeType } from 'common/models';
import { SWITCH_THEME } from './types';
import { switchTheme } from './actions';

describe('app actions tests', () => {
  it('sets the current theme', () => {
    expect(switchTheme(ThemeType.DAY)).toEqual({
      type: SWITCH_THEME,
      payload: ThemeType.DAY,
    });

    expect(switchTheme(ThemeType.NIGHT)).toEqual({
      type: SWITCH_THEME,
      payload: ThemeType.NIGHT,
    });
  });
});
