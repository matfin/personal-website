import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ContentRenderer, { Props } from './index';

const defaultProps: Props = {
  root: {
    tagName: 'section',
    id: 'abcd-1',
    content: [
      {
        id: 'abcd-1',
        tagName: 'h1',
        content: 'Heading',
      },
      {
        id: 'abcd-3',
        tagName: 'p',
        content: 'Test text',
      },
      {
        id: 'abcd-4',
        tagName: 'ul',
        content: [
          {
            id: 'abcd-5',
            tagName: 'li',
            content: 'First list item',
          },
          {
            id: 'abcd-6',
            tagName: 'li',
            content: 'Second list item',
          },
        ],
      },
    ],
  },
};

describe('ContentRenderer', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<ContentRenderer {...defaultProps} />)).not.toThrow();
  });

  it('renders text content', (): void => {
    render(<ContentRenderer {...defaultProps} />);

    expect(screen.getByText('Heading')).not.toBeNull();
    expect(screen.getByText('Test text')).not.toBeNull();
    expect(screen.getByText('First list item')).not.toBeNull();
    expect(screen.getByText('Second list item')).not.toBeNull();
  });
});
