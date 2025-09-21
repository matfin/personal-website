import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProcessContent from '.';

describe('ProcessContent', () => {
  it('should render with plain text', (): void => {
    render(<ProcessContent content="This is some plain text" />);

    expect(screen.getByText('This is some plain text')).not.toBeNull();
  });

  it('should render with a link', (): void => {
    render(<ProcessContent content="[Test link](https://test.de) is a link" />);

    const link = screen.getByRole('link');

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('https://test.de');
    expect(link.textContent).toBe('Test link');
    expect(screen.getByText('Test link')).not.toBeNull();
    expect(screen.getByText('Test link')).not.toBeNull();
  });
});
