import React from 'react';
import { render } from '@testing-library/react';
import { InlineLink, IProps } from './InlineLink';

const defaultProps: IProps = {
  text: 'Test Link',
  url: '/test/link',
};

describe('InlineLink tests', () => {
  it('renders the component', () => {
    const wrapper = render(<InlineLink {...defaultProps} />);
    const link = wrapper.getByText('Test Link') as HTMLLinkElement;

    expect(wrapper).toBeTruthy();
    expect(link).toBeTruthy();
    expect(link.href).toContain('/test/link');
    expect(link.title).toEqual('');
  });

  it('renders with a title', () => {
    const wrapper = render(<InlineLink {...defaultProps} title="Test title" />);
    const link = wrapper.getByText('Test Link') as HTMLLinkElement;

    expect(wrapper).toBeTruthy();
    expect(link.title).toEqual('Test title');
  });
});
