import React from 'react';
import { isTouchDevice } from 'utils';
import { LinePlacement, LineSt, MenuButtonSt } from './MenuButton.css';

export interface Props {
  className?: string;
  navrevealed?: string;
  onClick(e: React.MouseEvent | React.TouchEvent): void;
}

const MenuButton = ({
  className,
  onClick,
  navrevealed,
}: Props): React.ReactElement => {
  const shouldUseTouch: boolean = isTouchDevice();

  return (
    <MenuButtonSt
      aria-label="Menu"
      data-testid="menubutton"
      className={className}
      onClick={!shouldUseTouch ? onClick : undefined}
      onTouchStart={shouldUseTouch ? onClick : undefined}
    >
      <LineSt placement={LinePlacement.TOP} $revealed={navrevealed} />
      <LineSt placement={LinePlacement.MIDDLE} $revealed={navrevealed} />
      <LineSt placement={LinePlacement.BOTTOM} $revealed={navrevealed} />
    </MenuButtonSt>
  );
};

export default MenuButton;
