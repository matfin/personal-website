import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@testutils';
import InlineLink, { Props } from './InlineLink';

const defaultProps: Props = {
  text: 'Test Link',
  url: '/test/link',
};

describe('InlineLink tests', (): void => {
  beforeEach((): void => {
    vi.resetAllMocks();
  });

  it('renders an internal link', (): void => {
    renderWithRouter(<InlineLink {...defaultProps} />);

    const link = screen.getByText('Test Link') as HTMLLinkElement;

    expect(link).toBeTruthy();
    expect(link.href).toContain('/test/link');
    expect(link.title).toEqual('');
    expect(link.rel).toBeFalsy();
  });

  it('renders an external link', (): void => {
    renderWithRouter(
      <InlineLink text="External Link" url="https://somewhere.out" />,
    );

    const link = screen.getByText('External Link') as HTMLLinkElement;

    expect(link.rel).toEqual('external');
  });

  it('renders with a title', (): void => {
    renderWithRouter(<InlineLink {...defaultProps} title="Test title" />);

    const link = screen.getByText('Test Link') as HTMLLinkElement;

    expect(link.title).toEqual('Test title');
  });
});
