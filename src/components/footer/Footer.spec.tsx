import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';

describe('Footer tests', () => {
  it('renders the component', () => {
    const wrapper = mount(<Footer />);

    expect(wrapper.find(Footer)).toBeDefined();
  });
});
