import { useEffect } from 'react';

import { ThemeType } from '@models';

const useAppearanceChange = (cb: (theme: ThemeType) => void): void => {
  useEffect((): (() => void) => {
    const handler = ({ matches }: MediaQueryListEvent): void =>
      cb(matches ? ThemeType.NIGHT : ThemeType.DAY);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handler);

    return (): void => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handler);
    };
  }, [cb]);
};

export default useAppearanceChange;
