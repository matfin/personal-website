import { Page, ThemeType } from 'models';

export interface ReduxAction {
  error?: Error | null;
  type: string;
}

export interface PageReduxAction extends ReduxAction {
  payload?: Page;
}

export interface AppReduxAction extends ReduxAction {
  payload: ThemeType;
}

export interface PageReducerState {
  error?: Error | null;
  pending: boolean;
  page: Page | null;
}

export interface AppReducerState {
  currentTheme: ThemeType;
}

export interface CombinedAppState {
  appState: AppReducerState;
  pageState: PageReducerState;
}
