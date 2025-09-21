import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loading from './index';

describe('Loading tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Loading />)).toBeTruthy();
  });
});
