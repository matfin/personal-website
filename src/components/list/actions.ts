import { Response } from 'node-fetch';
import { apiCall } from 'app/common/utils';
import { FetchStoriesReturnType, IStory } from 'app/common/interfaces';
import {
  FETCH_STORIES_PENDING,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
} from './types';

export const fetchStories = (): FetchStoriesReturnType => (dispatch: any) => {
  dispatch({
    type: FETCH_STORIES_PENDING,
  });

  return apiCall('/content/stories')
    .then((response: Response) => response.json())
    .then((response: IStory[]): void => {
      dispatch({
        type: FETCH_STORIES_SUCCESS,
        payload: { stories: response },
      });
    })
    .catch((error: any) => {
      dispatch({
        type: FETCH_STORIES_FAILURE,
        error,
      });
    });
};

export default fetchStories;
