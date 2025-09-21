import { isTouchDevice } from '@utils/general';
import { clsx } from 'clsx/lite';
import classNames from './MenuButton.module.css';

export type Props = {
  className?: string;
  navrevealed?: string;
  onClick(e: React.MouseEvent | React.TouchEvent): void;
};

const MenuButton = ({
  className,
  onClick,
  navrevealed,
}: Props): React.ReactNode => {
  const shouldUseTouch: boolean = isTouchDevice();

  return (
    <button
      type="button"
      aria-label="Menu"
      className={clsx(classNames.container, className)}
      data-testid="menubutton"
      onClick={!shouldUseTouch ? onClick : undefined}
      onTouchStart={shouldUseTouch ? onClick : undefined}
    >
      <span
        className={clsx(
          classNames.line,
          classNames.lineTop,
          navrevealed && classNames.revealed,
        )}
      />
      <span
        className={clsx(
          classNames.line,
          classNames.lineMiddle,
          navrevealed && classNames.revealed,
        )}
      />
      <span
        className={clsx(
          classNames.line,
          classNames.lineBottom,
          navrevealed && classNames.revealed,
        )}
      />
    </button>
  );
};

export default MenuButton;
