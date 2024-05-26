import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Loading from './Loading';

describe('Loading tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Loading />)).toBeTruthy();
  });
});
