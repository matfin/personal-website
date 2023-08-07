import React from 'react';
import 'jest-styled-components';
import { fireEvent, render } from '@testing-library/react';
import { ToggleValue } from 'models';
import Toggle, { Props } from './Toggle';

const defaultProps: Props = {
  value: ToggleValue.OFF,
  onToggle: jest.fn(),
};

describe('Toggle tests', () => {
  it('renders the component', () => {
    expect(render(<Toggle {...defaultProps} />)).toBeTruthy();
  });

  it('toggles to the ON value', () => {
    const spyOnToggle = jest.fn();
    const wrapper = render(<Toggle {...defaultProps} onToggle={spyOnToggle} />);
    const toggle = wrapper.getByTestId('toggle');

    fireEvent.click(toggle);
    expect(spyOnToggle).toHaveBeenCalledWith(ToggleValue.ON);
  });

  it('toggles to the OFF value', () => {
    const spyOnToggle = jest.fn();
    const wrapper = render(
      <Toggle
        {...defaultProps}
        onToggle={spyOnToggle}
        value={ToggleValue.ON}
      />,
    );
    const toggle = wrapper.getByTestId('toggle');

    fireEvent.click(toggle);
    expect(spyOnToggle).toHaveBeenCalledWith(ToggleValue.OFF);
  });

  it('shows the correct toggle position given OFF state', () => {
    const wrapper = render(<Toggle {...defaultProps} />);
    const indicator = wrapper.getByTestId('indicator');

    expect(indicator).toHaveStyleRule('left', '-2px');
  });

  it('shows the correct toggle position given ON state', () => {
    const wrapper = render(<Toggle {...defaultProps} value={ToggleValue.ON} />);
    const indicator = wrapper.getByTestId('indicator');

    expect(indicator).toHaveStyleRule('left', '1.5rem');
  });
});
