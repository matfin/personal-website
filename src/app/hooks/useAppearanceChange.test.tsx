import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { ThemeType } from 'models';
import { setupMatchMedia } from 'utils/testutils';
import useAppearanceChange from './useAppearanceChange';

describe('useAppearanceChange tests', (): void => {
  const spyCb = jest.fn();

  const TestComponent = (): React.ReactElement => {
    useAppearanceChange(spyCb);
    return <></>;
  };

  afterEach((): void => {
    spyCb.mockReset();
  });

  it('should excute the correct callback on appearance change to dark mode', async (): Promise<void> => {
    setupMatchMedia(true);
    render(<TestComponent />);

    await waitFor((): void => {
      expect(spyCb).toHaveBeenCalledTimes(1);
      expect(spyCb).toHaveBeenCalledWith(ThemeType.NIGHT);
    });
  });

  it('should excute the correct callback on appearance change to dark mode', async (): Promise<void> => {
    setupMatchMedia(false);
    render(<TestComponent />);

    await waitFor((): void => {
      expect(spyCb).toHaveBeenCalledTimes(1);
      expect(spyCb).toHaveBeenCalledWith(ThemeType.DAY);
    });
  });
});
