import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IPageState } from 'common/interfaces';

export type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type Fonts = {
  heading: number;
  subheading: number;
  thirdHeading: number;
  text: number;
  small: number;
};

export type FontWeights = {
  bold: number;
  light: number;
  normal: number;
  superLight: number;
};

export type Colours = {
  modal: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

export type Layers = {
  top: number;
  upper: number;
  base: number;
  lower: number;
};

export type Orientations = {
  landscape: string;
  portrait: string;
};

export type AppState = IPageState;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
