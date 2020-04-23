import { createMockStore } from 'app/common/utils/testutils';
import * as api from 'app/common/utils/api';
import { IStory } from 'app/common/interfaces';
import { fetchStories } from './actions';
import {
  FETCH_STORIES_PENDING,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
} from './types';

describe('list actions', () => {
  let store: any;

  beforeEach(() => {
    store = createMockStore([]);
  });

  it('should fetch stories with success', async () => {
    const stories: IStory[] = [
      {
        id: '1', slug: 'chapter-one', title: 'One', content: ['Story one'],
      },
      {
        id: '2', slug: 'chapter-two', title: 'Two', content: ['Story two'],
      },
      {
        id: '3', slug: 'chapter-three', title: 'Three', content: ['Story three'],
      },
    ];
    const expectedActions = [
      { type: FETCH_STORIES_PENDING },
      { type: FETCH_STORIES_SUCCESS, payload: { stories } },
    ];

    jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockReturnValue(stories),
    });

    await store.dispatch(fetchStories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail to fetch stories', async () => {
    const error: any = { dummy: 'error' };
    const expectedActions = [
      { type: FETCH_STORIES_PENDING },
      { type: FETCH_STORIES_FAILURE, error },
    ];

    jest.spyOn(api, 'apiCall').mockRejectedValue(error);

    await store.dispatch(fetchStories());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
