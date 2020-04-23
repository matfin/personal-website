import React from 'react';
import { Route } from 'react-router-dom';
import { mountWithRouter } from 'app/common/utils/testutils';
import { IStory } from 'app/common/interfaces';
import Story, { IProps, placeholderStory } from './Story';
import { ChapterSt, ParagraphSt } from './Story.css';

const noopPromise = (): Promise<any> => Promise.resolve();
const defaultProps: IProps = {
  error: null,
  pending: false,
  story: placeholderStory,
  fetchStory: noopPromise as any,
  resetStory: noopPromise as any,
};

describe('Story', () => {
  it('should fetch a story and render', () => {
    const spy_fetchStory = jest.fn();
    const wrapper = mountWithRouter(
      <Route>
        <Story {...defaultProps} fetchStory={spy_fetchStory} />
      </Route>,
    );

    expect(wrapper).toBeDefined();
    expect(spy_fetchStory.mock.calls.length).toEqual(1);
  });

  it('shows the loading screen when pending', () => {
    const wrapper = mountWithRouter(
      <Route>
        <Story {...defaultProps} pending />
      </Route>,
    );

    expect(wrapper.find(ChapterSt).text()).toEqual('Loading...');
  });

  it('shows the story', () => {
    const story: IStory = {
      id: '1',
      title: 'Test',
      slug: 'test',
      content: ['This is a test'],
    };
    const wrapper = mountWithRouter(
      <Route>
        <Story {...defaultProps} story={story} />
      </Route>,
    );

    expect(wrapper.find(ChapterSt).text()).toEqual('Test');
    expect(wrapper.find(ParagraphSt).text()).toEqual('This is a test');
  });

  it('shows an error', () => {
    const wrapper = mountWithRouter(
      <Route>
        <Story {...defaultProps} error />
      </Route>,
    );

    expect(wrapper.find(ChapterSt).text()).toEqual('Error');
  });
});
