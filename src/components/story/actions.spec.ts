import { createMockStore } from 'app/common/utils/testutils';
import * as api from 'app/common/utils/api';
import { IStory } from 'app/common/interfaces';
import { fetchStory, resetStory } from './actions';
import {
  FETCH_STORY_PENDING,
  FETCH_STORY_SUCCESS,
  FETCH_STORY_FAILURE,
  RESET_STORY,
} from './types';

describe('story actions', () => {
  let store: any;

  beforeEach(() => {
    store = createMockStore([]);
  });

  it('should fetch the story with success', async () => {
    const story: IStory = {
      id: '1',
      title: 'One',
      slug: 'story-one',
      content: ['Story one'],
    };
    const expectedActions = [
      { type: FETCH_STORY_PENDING },
      { type: FETCH_STORY_SUCCESS, payload: { story } },
    ];

    jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockResolvedValue(story),
    });

    await (store.dispatch(fetchStory('1')));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail to fetch a story', async () => {
    const error: any = { dummy: 'error' };
    const expectedActions = [
      { type: FETCH_STORY_PENDING },
      { type: FETCH_STORY_FAILURE, error },
    ];

    jest.spyOn(api, 'apiCall').mockRejectedValue(error);

    await (store.dispatch(fetchStory('1')));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should reset the story', async () => {
    const expectedActions = [
      { type: RESET_STORY },
    ];

    await (store.dispatch(resetStory()));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
