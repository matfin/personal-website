import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IListState, IStoryState } from './reduxStates';

export type FetchStoriesReturnType = ThunkAction<void, IListState, unknown, Action<string>>;

export type FetchStoryReturnType = ThunkAction<void, IStoryState, unknown, Action<string>>;
