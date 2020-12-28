import {
  ContentItemProps,
  ImageProps,
  PositionProps,
  ProjectProps,
  TopicProps,
} from 'models';

export type ContentTypes =
  | ContentItemProps
  | ImageProps
  | TopicProps
  | PositionProps
  | ProjectProps
  | string;

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

export type JSXChildren = string | JSX.Element | JSX.Element[];
