import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { ToggleValue } from '@models/enums';
import Toggle, { Props } from './index';

const defaultProps: Props = {
  value: ToggleValue.OFF,
  onToggle: vi.fn(),
};

describe('Toggle tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Toggle {...defaultProps} />)).toBeTruthy();
  });

  it('toggles to the ON value', (): void => {
    const spyOnToggle = vi.fn();
    const wrapper = render(<Toggle {...defaultProps} onToggle={spyOnToggle} />);
    const toggle = wrapper.getByTestId('toggle');

    fireEvent.click(toggle);
    expect(spyOnToggle).toHaveBeenCalledWith(ToggleValue.ON);
  });

  it('toggles to the OFF value', (): void => {
    const spyOnToggle = vi.fn();
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
});
