import React from 'react';
import 'jest-styled-components';
import { fireEvent, render } from '@testing-library/react';
import * as utils from 'common/utils/utils';
import { MenuButton, IProps } from './MenuButton';

const defaultProps: IProps = {
  onClick: (): void => {},
  navRevealed: false,
};

describe('MenuButton tests', () => {
  it('renders the component', () => {
    expect(
      render(<MenuButton {...defaultProps} />),
    ).toBeTruthy();
  });

  it('executes the callback on click', () => {
    const spyIsTouchDevice = jest.spyOn(utils, 'isTouchDevice').mockReturnValue(false);
    const spyOnClick = jest.fn();
    const wrapper = render(
      <MenuButton
        {...defaultProps}
        onClick={spyOnClick}
      />,
    );
    const button = wrapper.getByTestId('menubutton');

    fireEvent.click(button);
    fireEvent.touchStart(button);

    expect(spyOnClick).toHaveBeenCalledTimes(1);

    spyIsTouchDevice.mockRestore();
  });

  it('executes the callback on touch', () => {
    const spyIsTouchDevice = jest.spyOn(utils, 'isTouchDevice').mockReturnValue(true);
    const spyOnClick = jest.fn();
    const wrapper = render(
      <MenuButton
        {...defaultProps}
        onClick={spyOnClick}
      />,
    );
    const button = wrapper.getByTestId('menubutton');

    fireEvent.click(button);
    fireEvent.touchStart(button);

    expect(spyOnClick).toHaveBeenCalledTimes(1);

    spyIsTouchDevice.mockRestore();
  });

  it('has the correct style when revealed', async () => {
    const { container } = render(
      <MenuButton
        {...defaultProps}
        navRevealed
      />,
    );
    const lines = container.getElementsByTagName('span');

    expect(lines[0])
      .toHaveStyleRule('transform', 'translate3d(0,10px,0) rotate(-45deg)');
    expect(lines[1])
      .toHaveStyleRule('transform', 'rotate(135deg)');
    expect(lines[2])
      .toHaveStyleRule('transform', 'translate3d(0,-11px,0) rotate(45deg)');
  });
});
