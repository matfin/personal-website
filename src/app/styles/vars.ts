import { Breakpoints, Colours, Fonts, FontWeights } from 'common/interfaces';

export const sizes: Breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440
};

export const fontSizes: Fonts = {
  jumbo: 100,
  heading: 48,
  subheading: 32,
  text: 24,
  small: 12,
};


export const fontWeights: FontWeights = {
  bold: 500,
  light: 200,
  normal: 400,
  superLight: 100,
};

export const letterSpacing: Fonts = {
  jumbo: 20,
  heading: 12,
  subheading: 8,
  text: 2,
  small: 1,
}

export const lineHeight: Fonts = {
  jumbo: 120,
  heading: 64,
  subheading: 40,
  text: 32,
  small: 16,
}

export const colours: Colours = {
  primary: '#fff5c4',
  secondary: '#4f4b37',
  tertiary: '#b5b596',
};

export const defaultFont = '"Helvetica Neue", Helvetica, Arial, sans-serif';
