import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toBeDefined();
  });
});
