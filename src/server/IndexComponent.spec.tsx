import React from 'react';
import { Request } from 'express';
import { render } from '@testing-library/react';
import { createMockStore } from 'common/utils/testutils';
import IndexComponent, { Props } from './IndexComponent';

const defaultProps: Props = {
  context: {},
  req: {} as Request,
  store: createMockStore(),
};

describe('IndexComponent tests', () => {
  it('should render the component', () => {
    const wrapper = render(<IndexComponent {...defaultProps} />);

    expect(wrapper).toBeDefined();
  });
});
