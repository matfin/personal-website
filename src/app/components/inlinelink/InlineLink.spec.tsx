import React from 'react';
import { renderWithRouter } from 'common/utils/testutils';
import { InlineLink, IProps } from './InlineLink';

const defaultProps: IProps = {
  text: 'Test Link',
  url: '/test/link',
};

describe('InlineLink tests', () => {
  it('renders an internal link', () => {
    const wrapper = renderWithRouter(<InlineLink {...defaultProps} />);
    const link = wrapper.getByText('Test Link') as HTMLLinkElement;

    expect(wrapper).toBeTruthy();
    expect(link).toBeTruthy();
    expect(link.href).toContain('/test/link');
    expect(link.title).toEqual('');
    expect(link.rel).toBeFalsy();
  });

  it('renders an external link', () => {
    const wrapper = renderWithRouter(<InlineLink {...defaultProps} url="https://somewhere.out" />);
    const link = wrapper.getByText('Test Link') as HTMLLinkElement;

    expect(link.rel).toEqual('external');
  });

  it('renders with a title', () => {
    const wrapper = renderWithRouter(<InlineLink {...defaultProps} title="Test title" />);
    const link = wrapper.getByText('Test Link') as HTMLLinkElement;

    expect(wrapper).toBeTruthy();
    expect(link.title).toEqual('Test title');
  });
});
