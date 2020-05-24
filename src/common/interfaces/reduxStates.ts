import { IPage, ThemeType } from 'common/interfaces';

export interface IAction {
  error?: any,
  payload?: any,
  type: string,
}

export interface IPageState {
  error: any,
  pending: boolean,
  page?: IPage,
}

export interface IAppState {
  currentTheme: ThemeType
}
