import { Response } from 'node-fetch';
import { Action } from 'redux';
import { apiCall } from 'app/common/utils';
import { FetchStoryReturnType, IStory } from 'app/common/interfaces';
import {
  FETCH_STORY_PENDING,
  FETCH_STORY_SUCCESS,
  FETCH_STORY_FAILURE,
  RESET_STORY,
} from './types';

export const fetchStory = (slug: string) : FetchStoryReturnType => (dispatch: any) => {
  dispatch({
    type: FETCH_STORY_PENDING,
  });

  return apiCall(`/content/story/${slug}`)
    .then((response: Response) => response.json())
    .then((response: IStory) => {
      dispatch({
        type: FETCH_STORY_SUCCESS,
        payload: { story: response },
      });
    })
    .catch((error: any) => {
      dispatch({
        type: FETCH_STORY_FAILURE,
        error,
      });
    });
};

export const resetStory = (): Action => ({
  type: RESET_STORY,
});

export default fetchStory;
