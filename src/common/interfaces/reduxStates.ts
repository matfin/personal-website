import { IStory } from './story';

export interface IListState {
  error: any,
  pending: boolean,
  stories: IStory[],
}

export interface IStoryState {
  error: any,
  pending: boolean,
  story?: IStory,
}
