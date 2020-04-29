import { Breakpoints, Colours, Fonts } from 'common/interfaces';

export const sizes: Breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440
};

export const fontSizes: Fonts = {
  jumbo: '100px',
  heading: '48px',
  subheading: '32px',
  text: '24px',
  small: '12px',
};

export const letterSpacing: Fonts = {
  jumbo: '20px',
  heading: '12px',
  subheading: '8px',
  text: '2px',
  small: '1px',
}

export const lineHeight: Fonts = {
  jumbo: '120px',
  heading: '64px',
  subheading: '40px',
  text: '32px',
  small: '16px',
}

export const colours: Colours = {
  primary: '#fff5c4',
  secondary: '#4f4b37',
  tertiary: '#b5b596',
};

export const defaultFont = '"Helvetica Neue", Helvetica, Arial, sans-serif';
