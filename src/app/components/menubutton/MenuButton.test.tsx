import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest';
import { fireEvent } from '@testing-library/react';

import { renderWithTheme } from '@testutils';
import { isTouchDevice } from '@utils';
import MenuButton, { Props } from './MenuButton';

const defaultProps: Props = {
  onClick: vi.fn(),
  navrevealed: undefined,
};

vi.mock('@utils', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@utils')>();

  return {
    ...mod,
    isTouchDevice: vi.fn().mockReturnValue(false),
  };
});

describe('MenuButton tests', (): void => {
  beforeEach((): void => {
    (isTouchDevice as unknown as MockInstance).mockClear();
  });

  it('renders the component', (): void => {
    expect(renderWithTheme(<MenuButton {...defaultProps} />)).toBeTruthy();
  });

  it('executes the callback on click', () => {
    const spyOnClick = vi.fn();
    const wrapper = renderWithTheme(
      <MenuButton {...defaultProps} onClick={spyOnClick} />,
    );
    const button = wrapper.getByTestId('menubutton');

    fireEvent.click(button);
    fireEvent.touchStart(button);

    expect(spyOnClick).toHaveBeenCalledTimes(1);
  });

  it('executes the callback on touch', (): void => {
    (isTouchDevice as unknown as MockInstance).mockReturnValue(true);

    const spyOnClick = vi.fn();
    const wrapper = renderWithTheme(
      <MenuButton {...defaultProps} onClick={spyOnClick} />,
    );
    const button = wrapper.getByTestId('menubutton');

    fireEvent.click(button);
    fireEvent.touchStart(button);

    expect(spyOnClick).toHaveBeenCalledTimes(1);
  });
});
