import {
  Breakpoints,
  Colours,
  Fonts,
  FontWeights,
  Layers,
  Orientations,
} from 'common/models';

// units: px
export const sizes: Breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
};

// units: em
export const fontSize: Fonts = {
  heading: 2.5,
  subheading: 1.5,
  thirdHeading: 1,
  text: 1,
  small: 0.75,
};

// units: em
export const letterSpacing: Fonts = {
  heading: 0.125,
  subheading: 0.125,
  thirdHeading: 0.0625,
  text: 0.0625,
  small: 0.25,
};

// units: em
export const lineHeight: Fonts = {
  heading: 4,
  subheading: 2.25,
  thirdHeading: 1.25,
  text: 1.5,
  small: 1.25,
};

export const fontWeight: FontWeights = {
  bold: 500,
  light: 200,
  normal: 400,
  superLight: 100,
};

export const colours: Colours = {
  modal: '#ccc',
  primary: '#000',
  secondary: '#ecedef',
  tertiary: '#fdfeff',
};

export const layers: Layers = {
  top: 2,
  upper: 1,
  base: 0,
  lower: -1,
};

export const orientations: Orientations = {
  landscape: 'landscape',
  portrait: 'portrait',
};

export const boxShadow = 'rgba(0, 0, 0, 0.3) 0 1px 3px';
export const animationCurve = 'cubic-bezier(0.91, 0.03, 0.12, 1)';
export const defaultFont = '"Helvetica Neue", Helvetica, Arial, sans-serif';
