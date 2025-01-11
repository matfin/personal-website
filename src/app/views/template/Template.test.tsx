import {
  afterEach,
  afterAll,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import { fireEvent } from '@testing-library/react';

import { renderWrapped } from '@testutils';
import { setBodyOverflow } from '@utils/general';
import useApp from '@hooks/useApp';
import Template from './index';

vi.mock('@utils/general', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@utils/general')>();

  return {
    ...mod,
    setBodyOverflow: vi.fn(),
  };
});

vi.mock('@hooks/useApp', () => ({
  default: vi.fn().mockReturnValue({
    currentTheme: 'day',
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('@hooks/usePage', () => ({
  default: vi.fn().mockReturnValue({
    isNested: false,
  }),
}));

describe('template tests', (): void => {
  afterEach((): void => {
    (setBodyOverflow as unknown as MockInstance).mockClear();
  });

  afterAll((): void => {
    (setBodyOverflow as unknown as MockInstance).mockReset();
  });

  it('renders the component', (): void => {
    expect(() => renderWrapped(<Template />)).not.toThrow();
  });

  it('sets the body overflow on navigation menu button tap', (): void => {
    const { getByTestId } = renderWrapped(<Template />);
    const button = getByTestId('menubutton');

    fireEvent.click(button);

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(false);
  });

  it('toggles the theme', (): void => {
    const spyToggleTheme = vi.fn();

    (useApp as unknown as MockInstance).mockReturnValue({
      toggleTheme: spyToggleTheme,
    });

    const container = renderWrapped(<Template />);
    const toggle = container.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(spyToggleTheme).toHaveBeenCalledTimes(1);
  });
});
