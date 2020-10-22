import { PageProps, ThemeType } from 'common/models';

export interface ReduxAction {
  error: Error | null;
  payload?: unknown;
  type: string;
}

export interface PageReducerState {
  error: Error | null;
  pending: boolean;
  page: PageProps | null;
}

export interface AppReducerState {
  currentTheme: ThemeType;
}

export interface CombinedAppState {
  appState: AppReducerState;
  pageState: PageReducerState;
}
