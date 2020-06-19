import { colours } from './vars';

export const day = {
  colours: {
    primary: colours.primary,
    secondary: colours.secondary,
    tertiary: colours.tertiary,
  },
  brightness: 1.0,
};

export const night = {
  colours: {
    primary: colours.secondary,
    secondary: colours.primary,
    tertiary: colours.tertiary,
  },
  brightness: 0.6,
};
