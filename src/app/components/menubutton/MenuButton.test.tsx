import { fireEvent, render } from '@testing-library/react';
import { isTouchDevice } from '@utils/general';
import {
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest';
import MenuButton, { type Props } from './index';

const defaultProps: Props = {
  onClick: vi.fn(),
  navrevealed: undefined,
};

vi.mock('@utils/general', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@utils/general')>();

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
    expect(render(<MenuButton {...defaultProps} />)).toBeTruthy();
  });

  it('executes the callback on click', () => {
    const spyOnClick = vi.fn();
    const wrapper = render(
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
    const wrapper = render(
      <MenuButton {...defaultProps} onClick={spyOnClick} />,
    );
    const button = wrapper.getByTestId('menubutton');

    fireEvent.click(button);
    fireEvent.touchStart(button);

    expect(spyOnClick).toHaveBeenCalledTimes(1);
  });
});
