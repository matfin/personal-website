import React from 'react';
import { isTouchDevice } from 'common/utils';
import { LinePlacement, LineSt, MenuButtonSt } from './MenuButton.css';

export interface IProps {
  className?: string;
  navRevealed: boolean;
  onClick(e: React.MouseEvent | React.TouchEvent): void;
}

const MenuButton = ({
  className,
  onClick,
  navRevealed,
}: IProps): JSX.Element => {
  const shouldUseTouch: boolean = isTouchDevice();

  return (
    <MenuButtonSt
      aria-label="Menu"
      data-testid="menubutton"
      className={className}
      onClick={!shouldUseTouch ? onClick : (): void => {}}
      onTouchStart={shouldUseTouch ? onClick : (): void => {}}
    >
      <LineSt placement={LinePlacement.TOP} revealed={navRevealed} />
      <LineSt placement={LinePlacement.MIDDLE} revealed={navRevealed} />
      <LineSt placement={LinePlacement.BOTTOM} revealed={navRevealed} />
    </MenuButtonSt>
  );
};

export default MenuButton;
