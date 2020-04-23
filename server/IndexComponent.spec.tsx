import React from 'react';
import { Request } from 'express';
import { shallow } from 'enzyme';
import { createMockStore } from 'app/common/utils/testutils';
import IndexComponent, { IProps } from './IndexComponent';

const defaultProps: IProps = {
  context: {},
  req: {} as Request,
  store: createMockStore([]),
};

describe('IndexComponent tests', () => {
  it('should render the component', () => {
    const wrapper = shallow(<IndexComponent {...defaultProps} />);

    expect(wrapper).toBeDefined();
  });
});
