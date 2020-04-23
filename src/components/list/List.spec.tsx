import React from 'react';
import { Link } from 'react-router-dom';
import { mount } from 'enzyme';
import { mountWithRouter } from 'app/common/utils/testutils';
import { FetchStoriesReturnType, IStory } from 'app/common/interfaces';
import List from './List';
import { ListItemSt } from './List.css';

const noopPromise = (): FetchStoriesReturnType => Promise.resolve([]) as any;
const defaultProps = {
  error: null,
  fetchStories: noopPromise,
  pending: false,
  stories: [],
};

describe('List', () => {
  it('should render', () => {
    const wrapper = mount(<List {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find(Link)).toHaveLength(0);
  });

  it('should contain a list of links to stories', () => {
    const stories: IStory[] = [
      {
        id: '1', slug: 'test-one', title: 'Test title one', content: [],
      },
      {
        id: '2', slug: 'test-two', title: 'Test title two', content: [],
      },
    ];
    const wrapper = mountWithRouter(<List {...defaultProps} stories={stories} />);

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Link).at(0).text()).toEqual('Test title one');
    expect(wrapper.find(Link).at(1).text()).toEqual('Test title two');
  });

  it('should render dummy stories while loading', () => {
    const wrapper = mountWithRouter(<List {...defaultProps} pending />);

    expect(wrapper.find(ListItemSt)).toHaveLength(5);
    expect(wrapper.find(Link).at(0).text()).toEqual('Loading');
    expect(wrapper.find(Link).at(4).text()).toEqual('Loading');
  });
});
