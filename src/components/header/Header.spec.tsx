import React from 'react';
import { mountWithRouter } from 'app/common/utils/testutils';
import Header from './Header';

describe('Header tests', () => {
  it('renders the component with children', () => {
    const wrapper = mountWithRouter(
      <Header>
        <h1>Test</h1>
      </Header>,
    );

    expect(wrapper.find(Header)).toBeDefined();
    expect(wrapper.find('h1').text()).toEqual('Test');
  });
});
